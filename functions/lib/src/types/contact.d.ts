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
    timestamp?: admin.firestore.FieldValue;
    zip_code?: string | null;
    hash?: string | null;
    raw_contact?: {
        city?: string | null;
        state?: string | null;
        lat?: number | null;
        lon?: number | null;
    };
    enriched_data?: {
        website_status?: any;
        zip_code?: string | null;
        address?: string | null;
        gmb_data?: any;
        website_analysis?: any;
        gmb_enhanced_status?: 'enhanced' | 'failed' | null;
    };
    error_message?: string;
    status?: string;
}
export interface ContactPipeline {
    raw_data: RawContact;
    email: string | null;
    phone: string | null;
    enriched_data: {
        website_status?: any;
        zip_code?: string | null;
        address?: string | null;
        gmb_data?: any;
        website_analysis?: any;
        gmb_enhanced_status?: 'enhanced' | 'failed' | null;
    };
    status: string;
    contact_id: string;
    hash?: string;
    error_message?: string;
}
export interface SmsQueueDocument {
    leadId: string;
    status: 'pending' | 'processed' | 'failed';
    firstname?: string | null;
    smstext?: string;
}
export interface LlmSmsResponse {
    name: string | null;
    phone: string;
    smsText: string;
}
