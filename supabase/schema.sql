-- ============================================================================
-- BRAND & CREATOR MARKETPLACE - SUPABASE SCHEMA & RLS POLICIES
-- Core Principle: "One Campaign. One Selected Creator. The Right Audience."
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. ENUMS & TYPES
-- ============================================================================
CREATE TYPE user_role AS ENUM ('brand', 'creator', 'admin');
CREATE TYPE verification_status AS ENUM ('unverified', 'pending_review', 'verified', 'flagged', 'rejected');
CREATE TYPE data_source_type AS ENUM ('official_api', 'manual_submission', 'estimated', 'unavailable');
CREATE TYPE campaign_status AS ENUM ('draft', 'active', 'applications_closed', 'shortlisted', 'in_progress', 'completed', 'cancelled');
CREATE TYPE application_status AS ENUM ('applied', 'in_review', 'question_asked', 'shortlisted', 'selected', 'rejected');
CREATE TYPE selection_status AS ENUM ('active', 'revoked', 'finalized', 'cancelled');
CREATE TYPE question_status AS ENUM ('pending', 'answered', 'declined');
CREATE TYPE milestone_status AS ENUM ('pending', 'in_progress', 'submitted', 'completed', 'disputed');
CREATE TYPE audit_action_type AS ENUM ('create', 'update', 'delete', 'shortlist', 'select', 'revoke', 'verify', 'flag_fraud');

-- ============================================================================
-- 2. HELPER FUNCTIONS
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 3. PROFILES (Extends Supabase auth.users)
-- ============================================================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    preferred_language VARCHAR(10) NOT NULL DEFAULT 'en', -- 'en' or 'hi'
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 4. BRANDS
-- ============================================================================
CREATE TABLE IF NOT EXISTS brands (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    website TEXT,
    industry TEXT,
    bio TEXT,
    location_city TEXT NOT NULL,
    location_country TEXT NOT NULL DEFAULT 'India',
    logo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 5. CREATORS
-- ============================================================================
CREATE TABLE IF NOT EXISTS creators (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    handle TEXT UNIQUE NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'India',
    primary_niche TEXT NOT NULL,
    secondary_niches TEXT[] DEFAULT '{}',
    supported_languages TEXT[] NOT NULL DEFAULT '{"English"}',
    bio TEXT,
    base_rate NUMERIC(12,2) DEFAULT 0.0,
    rates JSONB NOT NULL DEFAULT '{}',
    verification_status verification_status DEFAULT 'unverified' NOT NULL,
    overall_authenticity_score NUMERIC(5,2) DEFAULT 0.0,
    authenticity_confidence NUMERIC(5,2) DEFAULT 0.0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 6. CREATOR SOCIAL ACCOUNTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS creator_social_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    platform TEXT NOT NULL, -- 'instagram', 'youtube', etc.
    platform_user_id TEXT,
    handle TEXT NOT NULL,
    profile_url TEXT NOT NULL,
    is_connected_via_api BOOLEAN DEFAULT FALSE NOT NULL,
    access_token_encrypted TEXT,
    followers INT DEFAULT 0 NOT NULL,
    following INT DEFAULT 0 NOT NULL,
    media_count INT DEFAULT 0 NOT NULL,
    data_source data_source_type DEFAULT 'manual_submission' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE (creator_id, platform)
);

-- ============================================================================
-- 7. CREATOR ANALYTICS
-- ============================================================================
CREATE TABLE IF NOT EXISTS creator_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    average_views INT DEFAULT 0 NOT NULL,
    average_reach INT DEFAULT 0 NOT NULL,
    engagement_rate NUMERIC(5,2) DEFAULT 0.0 NOT NULL,
    average_likes INT DEFAULT 0 NOT NULL,
    average_comments INT DEFAULT 0 NOT NULL,
    average_shares INT DEFAULT 0 NOT NULL,
    average_saves INT DEFAULT 0 NOT NULL,
    audience_demographics JSONB DEFAULT '{}' NOT NULL,
    audience_languages JSONB DEFAULT '{}' NOT NULL,
    audience_locations JSONB DEFAULT '{}' NOT NULL,
    data_source data_source_type DEFAULT 'manual_submission' NOT NULL,
    last_verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 8. CREATOR CONTENT (For content relevance & audio/video language checks)
-- ============================================================================
CREATE TABLE IF NOT EXISTS creator_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    content_format TEXT NOT NULL, -- 'reel', 'video', 'post', 'story'
    external_url TEXT NOT NULL,
    caption TEXT,
    detected_language VARCHAR(10), -- e.g. 'en', 'hi'
    detected_topics TEXT[] DEFAULT '{}',
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    comments INT DEFAULT 0,
    published_at TIMESTAMPTZ,
    is_sponsored BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 9. CREATOR VERIFICATIONS (Manual analytics evidence & audit trail)
-- ============================================================================
CREATE TABLE IF NOT EXISTS creator_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    evidence_urls TEXT[] NOT NULL DEFAULT '{}',
    notes TEXT,
    status verification_status DEFAULT 'pending_review' NOT NULL,
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    review_comments TEXT,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 10. CAMPAIGNS
-- ============================================================================
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    objective TEXT NOT NULL,
    category TEXT NOT NULL,
    niche TEXT[] NOT NULL DEFAULT '{}',
    target_audience TEXT NOT NULL,
    target_location TEXT NOT NULL,
    primary_language VARCHAR(10) NOT NULL DEFAULT 'en',
    secondary_languages TEXT[] DEFAULT '{}',
    required_content_language VARCHAR(10) NOT NULL DEFAULT 'en',
    platform TEXT NOT NULL,
    content_format TEXT NOT NULL,
    budget NUMERIC(12,2) NOT NULL CHECK (budget > 0),
    min_followers INT DEFAULT 0 NOT NULL,
    min_engagement NUMERIC(5,2) DEFAULT 0.0 NOT NULL,
    application_start_at TIMESTAMPTZ NOT NULL,
    application_end_at TIMESTAMPTZ NOT NULL,
    execution_start_at TIMESTAMPTZ NOT NULL,
    execution_end_at TIMESTAMPTZ NOT NULL,
    deliverables TEXT[] NOT NULL DEFAULT '{}',
    additional_requirements TEXT,
    status campaign_status DEFAULT 'draft' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT check_campaign_application_dates CHECK (application_end_at > application_start_at),
    CONSTRAINT check_campaign_execution_dates CHECK (execution_end_at >= execution_start_at)
);

-- ============================================================================
-- 11. CAMPAIGN REQUIREMENTS (Structured mandatory rules for deterministic checks)
-- ============================================================================
CREATE TABLE IF NOT EXISTS campaign_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    mandatory_niche_match BOOLEAN DEFAULT TRUE NOT NULL,
    mandatory_language_match BOOLEAN DEFAULT TRUE NOT NULL,
    mandatory_location_match BOOLEAN DEFAULT FALSE NOT NULL,
    min_authenticity_score NUMERIC(5,2) DEFAULT 50.0 NOT NULL,
    max_quote NUMERIC(12,2),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 12. APPLICATIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    pitch TEXT NOT NULL,
    quote NUMERIC(12,2) NOT NULL CHECK (quote > 0),
    status application_status DEFAULT 'applied' NOT NULL,
    passed_mandatory_eligibility BOOLEAN DEFAULT TRUE NOT NULL,
    eligibility_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE (campaign_id, creator_id)
);

-- ============================================================================
-- 13. BRAND CREATOR HISTORY (For repeat-creator cool-down & new audience check)
-- ============================================================================
CREATE TABLE IF NOT EXISTS brand_creator_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    completed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    audience_overlap_percent NUMERIC(5,2) DEFAULT 0.0,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_history_brand_creator ON brand_creator_history(brand_id, creator_id);

-- ============================================================================
-- 14. CREATOR SHORTLISTS (General saved vs Campaign-specific shortlist)
-- ============================================================================
CREATE TABLE IF NOT EXISTS creator_shortlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    shortlisted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    revoked_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- CRITICAL RULE 1: Only ONE creator can be actively shortlisted per campaign at any time!
CREATE UNIQUE INDEX IF NOT EXISTS idx_one_active_shortlist_per_campaign 
ON creator_shortlists(campaign_id) 
WHERE (campaign_id IS NOT NULL AND is_active = true);

-- Brand cannot save duplicate general creators
CREATE UNIQUE INDEX IF NOT EXISTS idx_brand_saved_creator_unique 
ON creator_shortlists(brand_id, creator_id) 
WHERE (campaign_id IS NULL);

-- ============================================================================
-- 15. CAMPAIGN SELECTIONS (Only ONE creator finally selected per campaign)
-- ============================================================================
CREATE TABLE IF NOT EXISTS campaign_selections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    status selection_status DEFAULT 'active' NOT NULL,
    agreed_quote NUMERIC(12,2) NOT NULL,
    selected_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- CRITICAL RULE 2: Only ONE active campaign selection per campaign!
CREATE UNIQUE INDEX IF NOT EXISTS idx_one_active_selection_per_campaign 
ON campaign_selections(campaign_id) 
WHERE (status = 'active');

-- ============================================================================
-- 16. MATCHING RESULTS (Deterministic calculations + AI explanations)
-- ============================================================================
CREATE TABLE IF NOT EXISTS matching_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    overall_match_score NUMERIC(5,2) NOT NULL,
    content_relevance_score NUMERIC(5,2) NOT NULL,
    audience_quality_score NUMERIC(5,2) NOT NULL,
    genuine_reach_score NUMERIC(5,2) NOT NULL,
    engagement_quality_score NUMERIC(5,2) NOT NULL,
    language_compatibility_score NUMERIC(5,2) NOT NULL,
    new_audience_score NUMERIC(5,2) NOT NULL,
    budget_fit_score NUMERIC(5,2) NOT NULL,
    ai_generated_explanation TEXT NOT NULL,
    potential_risks TEXT,
    missing_data_notes TEXT,
    algorithm_version TEXT NOT NULL DEFAULT 'v1.0',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE (campaign_id, creator_id)
);

-- ============================================================================
-- 17. AUTHENTICITY CHECKS (Fraud detection module)
-- ============================================================================
CREATE TABLE IF NOT EXISTS authenticity_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    authenticity_score NUMERIC(5,2) NOT NULL,
    confidence_level NUMERIC(5,2) NOT NULL,
    suspicious_patterns JSONB DEFAULT '[]' NOT NULL,
    fake_followers_estimate_percent NUMERIC(5,2) DEFAULT 0.0,
    automated_comments_flag BOOLEAN DEFAULT FALSE NOT NULL,
    growth_anomaly_flag BOOLEAN DEFAULT FALSE NOT NULL,
    is_disputed BOOLEAN DEFAULT FALSE NOT NULL,
    dispute_reason TEXT,
    dispute_status TEXT DEFAULT 'none',
    checked_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 18. CONVERSATIONS & MESSAGES (Restricted Chat)
-- ============================================================================
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    is_locked BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE (campaign_id, creator_id)
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    original_text TEXT NOT NULL,
    original_lang VARCHAR(10) NOT NULL DEFAULT 'en',
    translated_text TEXT,
    target_lang VARCHAR(10),
    translations JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 19. PRE-SELECTION QUESTIONS (Gated communication before shortlisting)
-- ============================================================================
CREATE TABLE IF NOT EXISTS preselection_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    answer_text TEXT,
    status question_status DEFAULT 'pending' NOT NULL,
    asked_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    answered_at TIMESTAMPTZ
);

-- ============================================================================
-- 20. CAMPAIGN MILESTONES & DUAL CONFIRMATIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS campaign_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    deliverables_description TEXT NOT NULL,
    due_date TIMESTAMPTZ NOT NULL,
    payout_amount NUMERIC(12,2) NOT NULL DEFAULT 0.0,
    status milestone_status DEFAULT 'pending' NOT NULL,
    ai_suggested BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS milestone_confirmations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    milestone_id UUID NOT NULL REFERENCES campaign_milestones(id) ON DELETE CASCADE,
    confirmed_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role user_role NOT NULL,
    confirmed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    notes TEXT,
    UNIQUE (milestone_id, confirmed_by)
);

-- ============================================================================
-- 21. REVIEWS
-- ============================================================================
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    reviewee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE (campaign_id, reviewer_id)
);

-- ============================================================================
-- 22. NOTIFICATIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 23. ADMIN AUDIT LOGS
-- ============================================================================
CREATE TABLE IF NOT EXISTS admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action_type audit_action_type NOT NULL,
    target_table TEXT NOT NULL,
    target_id UUID,
    details JSONB DEFAULT '{}' NOT NULL,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 24. TRIGGERS FOR updated_at
-- ============================================================================
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON profiles;
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_brands_updated_at ON brands;
CREATE TRIGGER trg_brands_updated_at BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_creators_updated_at ON creators;
CREATE TRIGGER trg_creators_updated_at BEFORE UPDATE ON creators FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_creator_social_accounts_updated_at ON creator_social_accounts;
CREATE TRIGGER trg_creator_social_accounts_updated_at BEFORE UPDATE ON creator_social_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_creator_analytics_updated_at ON creator_analytics;
CREATE TRIGGER trg_creator_analytics_updated_at BEFORE UPDATE ON creator_analytics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_creator_verifications_updated_at ON creator_verifications;
CREATE TRIGGER trg_creator_verifications_updated_at BEFORE UPDATE ON creator_verifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_campaigns_updated_at ON campaigns;
CREATE TRIGGER trg_campaigns_updated_at BEFORE UPDATE ON campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_applications_updated_at ON applications;
CREATE TRIGGER trg_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_creator_shortlists_updated_at ON creator_shortlists;
CREATE TRIGGER trg_creator_shortlists_updated_at BEFORE UPDATE ON creator_shortlists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_campaign_selections_updated_at ON campaign_selections;
CREATE TRIGGER trg_campaign_selections_updated_at BEFORE UPDATE ON campaign_selections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_conversations_updated_at ON conversations;
CREATE TRIGGER trg_conversations_updated_at BEFORE UPDATE ON conversations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_campaign_milestones_updated_at ON campaign_milestones;
CREATE TRIGGER trg_campaign_milestones_updated_at BEFORE UPDATE ON campaign_milestones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 25. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_creator_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_selections ENABLE ROW LEVEL SECURITY;
ALTER TABLE matching_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE authenticity_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE preselection_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestone_confirmations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --- PROFILES ---
DROP POLICY IF EXISTS "Profiles viewable by authenticated users" ON profiles;
CREATE POLICY "Profiles viewable by authenticated users"
ON profiles FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- --- BRANDS ---
DROP POLICY IF EXISTS "Brands viewable by authenticated users" ON brands;
CREATE POLICY "Brands viewable by authenticated users"
ON brands FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Brands can insert own profile" ON brands;
CREATE POLICY "Brands can insert own profile"
ON brands FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Brands can update own profile" ON brands;
CREATE POLICY "Brands can update own profile"
ON brands FOR UPDATE TO authenticated USING (auth.uid() = id OR is_admin());

-- --- CREATORS ---
DROP POLICY IF EXISTS "Creators viewable by authenticated users" ON creators;
CREATE POLICY "Creators viewable by authenticated users"
ON creators FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Creators can insert own profile" ON creators;
CREATE POLICY "Creators can insert own profile"
ON creators FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Creators can update own profile" ON creators;
CREATE POLICY "Creators can update own profile"
ON creators FOR UPDATE TO authenticated USING (auth.uid() = id OR is_admin());

-- --- CREATOR SOCIAL ACCOUNTS ---
DROP POLICY IF EXISTS "Creator social accounts viewable by authenticated" ON creator_social_accounts;
CREATE POLICY "Creator social accounts viewable by authenticated"
ON creator_social_accounts FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Creators can manage their own social accounts" ON creator_social_accounts;
CREATE POLICY "Creators can manage their own social accounts"
ON creator_social_accounts FOR ALL TO authenticated
USING (creator_id = auth.uid() OR is_admin())
WITH CHECK (creator_id = auth.uid() OR is_admin());

-- --- CREATOR ANALYTICS ---
DROP POLICY IF EXISTS "Creator analytics viewable by authenticated" ON creator_analytics;
CREATE POLICY "Creator analytics viewable by authenticated"
ON creator_analytics FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Creators can manage their analytics" ON creator_analytics;
CREATE POLICY "Creators can manage their analytics"
ON creator_analytics FOR ALL TO authenticated
USING (creator_id = auth.uid() OR is_admin())
WITH CHECK (creator_id = auth.uid() OR is_admin());

-- --- CREATOR CONTENT ---
DROP POLICY IF EXISTS "Creator content viewable by authenticated" ON creator_content;
CREATE POLICY "Creator content viewable by authenticated"
ON creator_content FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Creators can manage their content" ON creator_content;
CREATE POLICY "Creators can manage their content"
ON creator_content FOR ALL TO authenticated
USING (creator_id = auth.uid() OR is_admin())
WITH CHECK (creator_id = auth.uid() OR is_admin());

-- --- CREATOR VERIFICATIONS ---
DROP POLICY IF EXISTS "Verifications viewable by creator or admin" ON creator_verifications;
CREATE POLICY "Verifications viewable by creator or admin"
ON creator_verifications FOR SELECT TO authenticated
USING (creator_id = auth.uid() OR is_admin());

DROP POLICY IF EXISTS "Creators can submit verifications" ON creator_verifications;
CREATE POLICY "Creators can submit verifications"
ON creator_verifications FOR INSERT TO authenticated
WITH CHECK (creator_id = auth.uid());

DROP POLICY IF EXISTS "Admins can update verifications" ON creator_verifications;
CREATE POLICY "Admins can update verifications"
ON creator_verifications FOR UPDATE TO authenticated
USING (is_admin());

-- --- CAMPAIGNS ---
DROP POLICY IF EXISTS "Campaigns visibility policy" ON campaigns;
CREATE POLICY "Campaigns visibility policy"
ON campaigns FOR SELECT TO authenticated
USING (status != 'draft' OR brand_id = auth.uid() OR is_admin());

DROP POLICY IF EXISTS "Brands can create campaigns" ON campaigns;
CREATE POLICY "Brands can create campaigns"
ON campaigns FOR INSERT TO authenticated
WITH CHECK (brand_id = auth.uid() AND EXISTS (SELECT 1 FROM brands WHERE id = auth.uid()));

DROP POLICY IF EXISTS "Brands can update their campaigns" ON campaigns;
CREATE POLICY "Brands can update their campaigns"
ON campaigns FOR UPDATE TO authenticated
USING (brand_id = auth.uid() OR is_admin());

-- --- CAMPAIGN REQUIREMENTS ---
DROP POLICY IF EXISTS "Requirements viewable by authenticated" ON campaign_requirements;
CREATE POLICY "Requirements viewable by authenticated"
ON campaign_requirements FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Brands manage campaign requirements" ON campaign_requirements;
CREATE POLICY "Brands manage campaign requirements"
ON campaign_requirements FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = campaign_requirements.campaign_id AND campaigns.brand_id = auth.uid()) OR is_admin());

-- --- APPLICATIONS ---
DROP POLICY IF EXISTS "Applications viewable by creator or campaign brand" ON applications;
CREATE POLICY "Applications viewable by creator or campaign brand"
ON applications FOR SELECT TO authenticated
USING (
  creator_id = auth.uid()
  OR EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = applications.campaign_id AND campaigns.brand_id = auth.uid())
  OR is_admin()
);

DROP POLICY IF EXISTS "Creators can submit applications during active window" ON applications;
CREATE POLICY "Creators can submit applications during active window"
ON applications FOR INSERT TO authenticated
WITH CHECK (
  creator_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM campaigns
    WHERE campaigns.id = applications.campaign_id
    AND campaigns.status = 'active'
    AND NOW() BETWEEN campaigns.application_start_at AND campaigns.application_end_at
  )
);

DROP POLICY IF EXISTS "Brands update app status or creators edit pending" ON applications;
CREATE POLICY "Brands update app status or creators edit pending"
ON applications FOR UPDATE TO authenticated
USING (
  creator_id = auth.uid()
  OR EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = applications.campaign_id AND campaigns.brand_id = auth.uid())
  OR is_admin()
);

-- --- BRAND CREATOR HISTORY ---
DROP POLICY IF EXISTS "History viewable by participating brand or creator" ON brand_creator_history;
CREATE POLICY "History viewable by participating brand or creator"
ON brand_creator_history FOR SELECT TO authenticated
USING (brand_id = auth.uid() OR creator_id = auth.uid() OR is_admin());

DROP POLICY IF EXISTS "History managed by system or campaign brand" ON brand_creator_history;
CREATE POLICY "History managed by system or campaign brand"
ON brand_creator_history FOR ALL TO authenticated
USING (brand_id = auth.uid() OR is_admin());

-- --- CREATOR SHORTLISTS ---
DROP POLICY IF EXISTS "Shortlists viewable by brand or creator" ON creator_shortlists;
CREATE POLICY "Shortlists viewable by brand or creator"
ON creator_shortlists FOR SELECT TO authenticated
USING (brand_id = auth.uid() OR creator_id = auth.uid() OR is_admin());

DROP POLICY IF EXISTS "Brands manage shortlists" ON creator_shortlists;
CREATE POLICY "Brands manage shortlists"
ON creator_shortlists FOR ALL TO authenticated
USING (brand_id = auth.uid() OR is_admin())
WITH CHECK (brand_id = auth.uid() OR is_admin());

-- --- CAMPAIGN SELECTIONS ---
DROP POLICY IF EXISTS "Selections viewable by brand or creator" ON campaign_selections;
CREATE POLICY "Selections viewable by brand or creator"
ON campaign_selections FOR SELECT TO authenticated
USING (
  creator_id = auth.uid()
  OR EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = campaign_selections.campaign_id AND campaigns.brand_id = auth.uid())
  OR is_admin()
);

DROP POLICY IF EXISTS "Brands manage campaign selections" ON campaign_selections;
CREATE POLICY "Brands manage campaign selections"
ON campaign_selections FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = campaign_selections.campaign_id AND campaigns.brand_id = auth.uid()) OR is_admin())
WITH CHECK (EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = campaign_selections.campaign_id AND campaigns.brand_id = auth.uid()) OR is_admin());

-- --- MATCHING RESULTS ---
DROP POLICY IF EXISTS "Matching results viewable by brand or admin" ON matching_results;
CREATE POLICY "Matching results viewable by brand or admin"
ON matching_results FOR SELECT TO authenticated
USING (
  EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = matching_results.campaign_id AND campaigns.brand_id = auth.uid())
  OR is_admin()
);

-- --- AUTHENTICITY CHECKS ---
DROP POLICY IF EXISTS "Authenticity checks viewable by creator or admin" ON authenticity_checks;
CREATE POLICY "Authenticity checks viewable by creator or admin"
ON authenticity_checks FOR SELECT TO authenticated
USING (creator_id = auth.uid() OR is_admin());

DROP POLICY IF EXISTS "Creators update dispute on authenticity check" ON authenticity_checks;
CREATE POLICY "Creators update dispute on authenticity check"
ON authenticity_checks FOR UPDATE TO authenticated
USING (creator_id = auth.uid() OR is_admin());

-- --- CONVERSATIONS ---
DROP POLICY IF EXISTS "Conversations viewable by participants" ON conversations;
CREATE POLICY "Conversations viewable by participants"
ON conversations FOR SELECT TO authenticated
USING (brand_id = auth.uid() OR creator_id = auth.uid() OR is_admin());

DROP POLICY IF EXISTS "Conversations insertable when creator is active shortlist" ON conversations;
CREATE POLICY "Conversations insertable when creator is active shortlist"
ON conversations FOR INSERT TO authenticated
WITH CHECK (
  (brand_id = auth.uid() OR creator_id = auth.uid() OR is_admin())
  AND EXISTS (
    SELECT 1 FROM creator_shortlists cs
    WHERE cs.campaign_id = conversations.campaign_id
      AND cs.creator_id = conversations.creator_id
      AND cs.is_active = true
  )
);

-- --- MESSAGES ---
DROP POLICY IF EXISTS "Messages viewable by conversation participants" ON messages;
CREATE POLICY "Messages viewable by conversation participants"
ON messages FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM conversations c
    WHERE c.id = messages.conversation_id
      AND (c.brand_id = auth.uid() OR c.creator_id = auth.uid() OR is_admin())
  )
);

DROP POLICY IF EXISTS "Messages insertable ONLY by active shortlisted or selected creator" ON messages;
CREATE POLICY "Messages insertable ONLY by active shortlisted or selected creator"
ON messages FOR INSERT TO authenticated
WITH CHECK (
  sender_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM conversations c
    LEFT JOIN creator_shortlists cs ON cs.campaign_id = c.campaign_id AND cs.creator_id = c.creator_id AND cs.is_active = true
    LEFT JOIN campaign_selections sel ON sel.campaign_id = c.campaign_id AND sel.creator_id = c.creator_id AND sel.status = 'active'
    WHERE c.id = messages.conversation_id
      AND c.is_locked = false
      AND (c.brand_id = auth.uid() OR c.creator_id = auth.uid() OR is_admin())
      AND (cs.id IS NOT NULL OR sel.id IS NOT NULL)
  )
);

-- --- PRESELECTION QUESTIONS ---
DROP POLICY IF EXISTS "Questions viewable by brand, creator or admin" ON preselection_questions;
CREATE POLICY "Questions viewable by brand, creator or admin"
ON preselection_questions FOR SELECT TO authenticated
USING (brand_id = auth.uid() OR creator_id = auth.uid() OR is_admin());

DROP POLICY IF EXISTS "Brands ask preselection questions" ON preselection_questions;
CREATE POLICY "Brands ask preselection questions"
ON preselection_questions FOR INSERT TO authenticated
WITH CHECK (brand_id = auth.uid());

DROP POLICY IF EXISTS "Questions updatable by brand, creator or admin" ON preselection_questions;
CREATE POLICY "Questions updatable by brand, creator or admin"
ON preselection_questions FOR UPDATE TO authenticated
USING (brand_id = auth.uid() OR creator_id = auth.uid() OR is_admin());

-- --- CAMPAIGN MILESTONES ---
DROP POLICY IF EXISTS "Milestones viewable by brand or creator" ON campaign_milestones;
CREATE POLICY "Milestones viewable by brand or creator"
ON campaign_milestones FOR SELECT TO authenticated
USING (
  creator_id = auth.uid()
  OR EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = campaign_milestones.campaign_id AND campaigns.brand_id = auth.uid())
  OR is_admin()
);

DROP POLICY IF EXISTS "Milestones manageable by brand" ON campaign_milestones;
CREATE POLICY "Milestones manageable by brand"
ON campaign_milestones FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM campaigns WHERE campaigns.id = campaign_milestones.campaign_id AND campaigns.brand_id = auth.uid()) OR is_admin());

-- --- MILESTONE CONFIRMATIONS ---
DROP POLICY IF EXISTS "Milestone confirmations viewable by participants" ON milestone_confirmations;
CREATE POLICY "Milestone confirmations viewable by participants"
ON milestone_confirmations FOR SELECT TO authenticated
USING (
  confirmed_by = auth.uid()
  OR EXISTS (
    SELECT 1 FROM campaign_milestones cm
    JOIN campaigns c ON c.id = cm.campaign_id
    WHERE cm.id = milestone_confirmations.milestone_id
      AND (c.brand_id = auth.uid() OR cm.creator_id = auth.uid())
  )
  OR is_admin()
);

DROP POLICY IF EXISTS "Users can confirm their milestones" ON milestone_confirmations;
CREATE POLICY "Users can confirm their milestones"
ON milestone_confirmations FOR INSERT TO authenticated
WITH CHECK (confirmed_by = auth.uid());

-- --- REVIEWS ---
DROP POLICY IF EXISTS "Reviews viewable by authenticated users" ON reviews;
CREATE POLICY "Reviews viewable by authenticated users"
ON reviews FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Reviews insertable by participants of completed campaigns" ON reviews;
CREATE POLICY "Reviews insertable by participants of completed campaigns"
ON reviews FOR INSERT TO authenticated
WITH CHECK (
  reviewer_id = auth.uid()
  AND EXISTS (
    SELECT 1 FROM campaigns c
    WHERE c.id = reviews.campaign_id
      AND (c.brand_id = auth.uid() OR EXISTS (
        SELECT 1 FROM campaign_selections sel 
        WHERE sel.campaign_id = c.id AND sel.creator_id = auth.uid() AND sel.status = 'finalized'
      ))
      AND c.status = 'completed'
  )
);

-- --- NOTIFICATIONS ---
DROP POLICY IF EXISTS "Users see own notifications" ON notifications;
CREATE POLICY "Users see own notifications"
ON notifications FOR SELECT TO authenticated USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users mark own notifications read" ON notifications;
CREATE POLICY "Users mark own notifications read"
ON notifications FOR UPDATE TO authenticated USING (user_id = auth.uid());

-- --- ADMIN AUDIT LOGS ---
DROP POLICY IF EXISTS "Audit logs viewable only by admins" ON admin_audit_logs;
CREATE POLICY "Audit logs viewable only by admins"
ON admin_audit_logs FOR SELECT TO authenticated USING (is_admin());

DROP POLICY IF EXISTS "Audit logs insertable by system/authenticated" ON admin_audit_logs;
CREATE POLICY "Audit logs insertable by system/authenticated"
ON admin_audit_logs FOR INSERT TO authenticated WITH CHECK (true);
