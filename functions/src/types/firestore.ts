import * as admin from 'firebase-admin';
import { RawContact } from './contact'; // Assuming RawContact is defined in contact.ts

// Interface for GMB Place data
export interface GmbPlace {
    snippet_id: string;
    business_name: string | null;
    phone: string | null;
    website_url: string | null;
    stars: string | null;
    number_of_reviews: string | null;
    has_posts: boolean;
    detailed_metadata: {
        address: string | null;
        latitude: number | null;
        longitude: number | null;
        priceLevel: string | null;
        type: string | null;
        types: string[] | null;
        description: string | null;
        openingHours: string[] | null;
        thumbnailUrl: string | null;
        cid: string | null;
        fid: string | null;
        placeId: string | null;
    };
}

// Interface for GMB Data structure
export interface GmbData {
    business: GmbPlace[];
    competitors_zip: GmbPlace[];
    competitors_city: GmbPlace[];
}

// Interface for Contact document in Firestore
export interface FirestoreContact {
    business_name: string | null;
    last_sent: string;
    contactId: string;
    raw_contact: {
        business_name: string | null;
        name_confidence: number;
        body_text: string;
        city: string;
        image_hash: string;
        services_rendered: string[];
        url: string;
        cant_text: number;
        post_id: string;
        website_url: string | null;
        phone: string;
        name: string | null;
        original_category: string;
        state: string;
        category: string;
        email: string | null;
    };
    image_hash: string;
    services_rendered: string[];
    source_url: string;
    phone: string;
    name: string | null;
    category: string;
    email: string | null;
    hash: string;
    timestamp: admin.firestore.Timestamp;
    status: string;
    enriched_data: {
        website_status: any | null; // 'any' as per inferred schema, can be refined
        zip_code: string | null;
        address: string | null;
        gmb_data: GmbData;
        website_analysis: any | null; // 'any' as per inferred schema, can be refined
    };
}

// Interface for DataUsaKeyPoints document in Firestore
export interface DataUsaKeyPoints {
    city: string;
    state: string;
    data: {
        demographics: {
            "2023 population": string;
            "2023 median age": string;
            "2023 poverty rate": string;
            "largest ethnic groups": string;
            "us citizenship": string;
            "foreign-born population": string;
            "homeownership rate": string;
        };
        economy: {
            "2023 median household income": string;
            "2023 median property value": string;
            "2023 employed population": string;
            "largest industries": string;
            "highest paying industries": string;
            "most common job groups": string;
            "average commute time": string;
            "average car ownership": string;
        };
    };
    lastUpdated: admin.firestore.Timestamp;
    // Assuming weather and news are subcollections, not directly in the document
    // If they were, they would be included here.
}

// Interface for MarketingStrategy document in Firestore
export interface MarketingStrategy {
    strategyData: {
        "executive summary": string;
        "key findings overview": string;
        "detailed target audience analysis": string;
        "geographic market analysis": string;
        "conversion probability analysis": string;
        "competitive landscape analysis": string;
        "refined marketing strategy recommendations": string;
        "success metrics and kpis": string;
    };
    lastUpdated: admin.firestore.Timestamp;
}

// Interface for ScoredKeyword (from arbitrageData)
export interface ScoredKeyword {
    keyword: string;
    search_volume: number;
    cpc: number;
    competition: number;
    base_value_score: number;
    arbitrage_score: number;
    velocity: number;
    t_mid_base: number; // Time to rank (mid authority)
    t_mid_low: number;
    t_mid_high: number;
    potential_roi: number;
    estimated_time: number; // Added estimated_time
    ranking_estimates_by_authority: { // Added this structure
        low: { v: { low: number; high: number; base: number; }; t: { low: number; high: number; base: number; }; };
        mid: { v: { low: number; high: number; base: number; }; t: { low: number; high: number; base: number; }; };
        high: { v: { low: number; high: number; base: number; }; t: { low: number; high: number; base: number; }; };
    };
    normalized_arbitrage_score: number;
}

// Interface for BandedCluster (from arbitrageData)
export interface BandedCluster {
    primary: string;
    related?: string[];
    cluster_keywords_details: ScoredKeyword[]; // Changed to array of ScoredKeyword
    aggregate_search_volume: number;
    average_competition: number;
    average_velocity: number;
    average_cpc: number;
    average_t_mid_base?: number;
    base_value_score?: number;
    value_score: number;
    long_term_arbitrage_score_cluster: number;
    llm_content_ideas?: any; // Can be refined if schema is known
}

// Interface for ArbitrageDataDocument structure as stored in Firestore
export interface ArbitrageDataDocument {
    id: string; // Added root level ID for category
    avgJobAmount: number; // This is a direct property of the document
    scored_keywords: ScoredKeyword[]; // Made non-optional
    selected_top_4_clusters: BandedCluster[]; // Made non-optional and used BandedCluster
    all_banded_clusters?: {
        [band: string]: BandedCluster[];
    };
    total_keywords_in_pool?: number;
    customer_domain_authority?: any; // Can be refined if schema is known
}

// Interface for ArbitrageData structure as it's used in getPageMetadata
export interface ArbitrageData {
    arbitrageData?: ArbitrageDataDocument; // The nested structure observed
    avgJobAmount: number; // Top-level avgJobAmount, extracted from the document
}

// Interface for LLM Input Objects
export interface LlmInputObjects {
    contact: FirestoreContact | null;
    gmbData: GmbData;
    annualRevenueGain: number;
    targetedBlob: any; // Can be refined if schema is known
    arbitrageData: ArbitrageDataDocument | undefined; // Changed to ArbitrageDataDocument
    avgJobAmount: number;
    lead_serp: {
        estimated_revenue_range: [string, string];
        total_search_volume: number;
        total_keywords_in_pool: number;
        visit_projection_range: [string, string];
        top_4_clusters: BandedCluster[];
        agr_top_4_roi: [string, string];
        scored_keywords: ScoredKeyword[];
        customer_domain_authority: any;
        estimated_conversions_aggressive: number;
        cluster_long_distance_search_volume: number;
        cluster_residential_search_volume: number;
        cluster_office_commercial_search_volume: number;
        cluster_other_search_volume: number;
        high_value_keywords_summary_html: string;
        potential_roi_summary_html: string;
        hidden_gems_summary_html: string;
        strategic_opportunity_prioritization_html: string;
    };
}
