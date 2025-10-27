import * as admin from "firebase-admin";

export interface RawContact {
  post_id: string;
  business_name: string | null;
  category: string | null;
  services_rendered: string[] | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  website_url: string | null;
  last_sent?: string | null;
  image_hash?: string | null;
  source_url?: string | null;
  timestamp?: admin.firestore.FieldValue; // Use FieldValue for server timestamp
  zip_code?: string | null;
  hash?: string | null; // Add hash to RawContact
  raw_contact?: { // Add raw_contact to RawContact
    city?: string | null;
    state?: string | null;
    lat?: number | null; // Added lat
    lon?: number | null; // Added lon
  };
  enriched_data?: { // Add enriched_data to RawContact
    website_status?: any;
    zip_code?: string | null;
    address?: string | null;
    gmb_data?: any;
    website_analysis?: any;
    gmb_enhanced_status?: 'enhanced' | 'failed' | null; // New flag for GMB enhancement, now includes 'failed'
  };
  error_message?: string; // Add error_message to RawContact
  status?: string; // Add status to RawContact
}

export interface ContactPipeline {
  raw_data: RawContact;
  email: string | null; // Promoted to top-level
  phone: string | null; // Promoted to top-level
  enriched_data: {
    website_status?: any; // Made optional
    zip_code?: string | null; // Made optional to align with RawContact
    address?: string | null; // Made optional
    gmb_data?: any;
    website_analysis?: any; // Made optional
    gmb_enhanced_status?: 'enhanced' | 'failed' | null; // New flag for GMB enhancement, now includes 'failed'
  };
  status: string;
  contact_id: string;
  hash?: string; // Add hash to ContactPipeline
  error_message?: string;
}

export interface SmsQueueDocument {
  leadId: string; // Changed from contactId to leadId
  status: 'pending' | 'processed' | 'failed';
  firstname?: string | null; // Allow null for firstname
  smstext?: string;
  // Add other fields that might exist in smsQueue documents
}

export interface LlmSmsResponse {
  name: string | null;
  phone: string;
  smsText: string;
}
