export type UserRole = 'brand' | 'creator' | 'admin';
export type VerificationStatus = 'unverified' | 'pending_review' | 'verified' | 'flagged' | 'rejected';
export type DataSourceType = 'official_api' | 'manual_submission' | 'estimated' | 'unavailable';
export type CampaignStatus = 'draft' | 'active' | 'applications_closed' | 'shortlisted' | 'in_progress' | 'completed' | 'cancelled';
export type ApplicationStatus = 'applied' | 'in_review' | 'question_asked' | 'shortlisted' | 'selected' | 'rejected';
export type SelectionStatus = 'active' | 'revoked' | 'finalized' | 'cancelled';
export type QuestionStatus = 'pending' | 'answered' | 'declined';
export type MilestoneStatus = 'pending' | 'in_progress' | 'submitted' | 'completed' | 'disputed';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  avatar_url?: string | null;
  preferred_language: 'en' | 'hi';
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  company_name: string;
  website?: string | null;
  industry?: string | null;
  bio?: string | null;
  location_city: string;
  location_country: string;
  logo_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Creator {
  id: string;
  handle: string;
  city: string;
  country: string;
  primary_niche: string;
  secondary_niches: string[];
  supported_languages: string[];
  bio?: string | null;
  base_rate: number;
  rates: Record<string, number>;
  verification_status: VerificationStatus;
  overall_authenticity_score: number;
  authenticity_confidence: number;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  brand_id: string;
  title: string;
  description: string;
  objective: string;
  category: string;
  niche: string[];
  target_audience: string;
  target_location: string;
  primary_language: string;
  secondary_languages: string[];
  required_content_language: string;
  platform: string;
  content_format: string;
  budget: number;
  min_followers: number;
  min_engagement: number;
  application_start_at: string;
  application_end_at: string;
  execution_start_at: string;
  execution_end_at: string;
  deliverables: string[];
  additional_requirements?: string | null;
  status: CampaignStatus;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  campaign_id: string;
  creator_id: string;
  pitch: string;
  quote: number;
  status: ApplicationStatus;
  passed_mandatory_eligibility: boolean;
  eligibility_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreatorShortlist {
  id: string;
  brand_id: string;
  creator_id: string;
  campaign_id?: string | null;
  is_active: boolean;
  shortlisted_at: string;
  revoked_at?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CampaignSelection {
  id: string;
  campaign_id: string;
  creator_id: string;
  status: SelectionStatus;
  agreed_quote: number;
  selected_at: string;
  revoked_at?: string | null;
  created_at: string;
  updated_at: string;
}
