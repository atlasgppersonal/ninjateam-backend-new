import fetch from 'node-fetch';

export class SeoReviewToolsClient {
    private apiKey: string;
    private baseUrl: string = "https://api.seoreviewtools.com";

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
     * Fetches bulk keyword metrics from SEO Review Tools.
     * @param keywords An array of keywords to get metrics for.
     * @param location The location for keyword statistics (e.g., "United States").
     * @param language The language for keyword statistics (e.g., "English").
     * @returns A promise that resolves to the keyword statistics data.
     */
    async getKeywordStatistics(keywords: string[], location: string, language: string): Promise<any> {
        const url = `${this.baseUrl}/keyword-statistics/?location=${encodeURIComponent(location)}&hl=${encodeURIComponent(language)}&key=${this.apiKey}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ keywords }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`SEO Review Tools API Error (getKeywordStatistics) - HTTP Status: ${response.status}, Response: ${errorText}`);
                return { error: `API returned non-OK status: ${response.status}`, rawResponse: errorText };
            }
            const result: any = await response.json();
            if (result.error) {
                console.error("SEO Review Tools API Error (getKeywordStatistics):", result.error);
                return { error: result.error };
            }
            return result;
        } catch (error: any) {
            console.error("Failed to fetch keyword statistics:", error);
            if (error.type === 'invalid-json') {
                console.error("Raw response that caused JSON parsing error:", error.body);
                return { error: error.message, rawResponse: error.body };
            }
            return { error: error.message };
        }
    }

    /**
     * Fetches authority scores for a list of URLs from SEO Review Tools.
     * @param urls An array of URLs to get authority scores for.
     * @returns A promise that resolves to the authority scores data.
     */
    async getAuthorityScores(urls: string[]): Promise<any> {
        // Updated URL to match PHP example's endpoint and parameters
        const url = `${this.baseUrl}/bulk-authority-score/?metrics=pa|da&key=${this.apiKey}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ urls }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`SEO Review Tools API Error (getAuthorityScores) - HTTP Status: ${response.status}, Response: ${errorText}`);
                return { error: `API returned non-OK status: ${response.status}`, rawResponse: errorText };
            }
            const result: any = await response.json();
            if (result.error) {
                console.error("SEO Review Tools API Error (getAuthorityScores):", result.error);
                return { error: result.error };
            }
            return result;
        } catch (error: any) {
            console.error("Failed to fetch authority scores:", error);
            if (error.type === 'invalid-json') {
                console.error("Raw response that caused JSON parsing error:", error.body);
                return { error: error.message, rawResponse: error.body };
            }
            return { error: error.message };
        }
    }

    /**
     * Fetches related keywords for a given keyword from SEO Review Tools.
     * @param keyword The keyword to find related keywords for.
     * @param location The location for keyword statistics (e.g., "United States").
     * @param language The language for keyword statistics (e.g., "English").
     * @returns A promise that resolves to the related keywords data.
     */
    async getRelatedKeywords(keyword: string, location: string, language: string): Promise<any> {
        // Construct the URL with all parameters for a GET request, as per the PHP example
        const url = `${this.baseUrl}/v2/related-keywords/?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}&hl=${encodeURIComponent(language)}&key=${this.apiKey}`;
        try {
            const response = await fetch(url); // This is a GET request, no body needed
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`SEO Review Tools API Error (getRelatedKeywords) - HTTP Status: ${response.status}, Response: ${errorText}`);
                return { error: `API returned non-OK status: ${response.status}`, rawResponse: errorText };
            }
            const result: any = await response.json();
            if (result.error) {
                console.error("SEO Review Tools API Error (getRelatedKeywords):", result.error);
                return { error: result.error };
            }
            return result;
        } catch (error: any) {
            console.error("Failed to fetch related keywords:", error);
            if (error.type === 'invalid-json') {
                console.error("Raw response that caused JSON parsing error:", error.body);
                return { error: error.message, rawResponse: error.body };
            }
            return { error: error.message };
        }
    }
}
