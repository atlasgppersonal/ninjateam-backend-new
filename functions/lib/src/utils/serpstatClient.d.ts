export declare class SerpstatClient {
    private apiKey;
    constructor(apiKey: string);
    request(methodName: string, params?: Record<string, any>): Promise<any>;
    keywordInfo(keywords: string[], searchEngine?: string): Promise<any>;
    domainInfo(domains: string[], searchEngine?: string): Promise<any>;
    getSuggestions(keyword: string, searchEngine?: string): Promise<any>;
    getCompetitors(keyword: string, searchEngine?: string): Promise<any>;
    getAdKeywords(keyword: string, searchEngine?: string): Promise<any>;
    getRelatedKeywords(keyword: string, searchEngine?: string): Promise<any>;
    getKeywords(params: {
        keyword: string;
        se?: string;
        minusKeywords?: string[];
        withIntents?: boolean;
        sort?: Record<string, "asc" | "desc">;
        filters?: Record<string, any>;
        order?: Record<string, "asc" | "desc">;
        page?: number;
        size?: number;
    }): Promise<any>;
}
