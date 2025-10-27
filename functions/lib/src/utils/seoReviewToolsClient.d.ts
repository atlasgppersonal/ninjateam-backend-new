export declare class SeoReviewToolsClient {
    private apiKey;
    private baseUrl;
    constructor(apiKey: string);
    /**
     * Fetches bulk keyword metrics from SEO Review Tools.
     * @param keywords An array of keywords to get metrics for.
     * @param location The location for keyword statistics (e.g., "United States").
     * @param language The language for keyword statistics (e.g., "English").
     * @returns A promise that resolves to the keyword statistics data.
     */
    getKeywordStatistics(keywords: string[], location: string, language: string): Promise<any>;
    /**
     * Fetches authority scores for a list of URLs from SEO Review Tools.
     * @param urls An array of URLs to get authority scores for.
     * @returns A promise that resolves to the authority scores data.
     */
    getAuthorityScores(urls: string[]): Promise<any>;
    /**
     * Fetches related keywords for a given keyword from SEO Review Tools.
     * @param keyword The keyword to find related keywords for.
     * @param location The location for keyword statistics (e.g., "United States").
     * @param language The language for keyword statistics (e.g., "English").
     * @returns A promise that resolves to the related keywords data.
     */
    getRelatedKeywords(keyword: string, location: string, language: string): Promise<any>;
}
