import axios from "axios";

const BASE_URL = "https://api.serpstat.com/v4";
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0 Safari/537.36";

export class SerpstatClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async request(methodName: string, params: Record<string, any> = {}): Promise<any> {
    const url = `${BASE_URL}/?token=${this.apiKey}#${methodName}`;
    const requestBody = {
      id: "1", // Using a static ID for validation purposes
      method: methodName,
      params: params,
    };

    try {
      const response = await axios.post(url, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': USER_AGENT, // Consistent User-Agent
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(`Error in Serpstat API request to ${methodName}:`, error.message);
      throw error;
    }
  }

  async keywordInfo(keywords: string[], searchEngine: string = "g_us"): Promise<any> {
    return this.request("SerpstatKeywordProcedure.getKeywordsInfo", { keywords, se: searchEngine });
  }

  async domainInfo(domains: string[], searchEngine: string = "g_us"): Promise<any> {
    return this.request("SerpstatDomainProcedure.getDomainsInfo", { domains, se: searchEngine });
  }

  async getSuggestions(keyword: string, searchEngine: string = "g_us"): Promise<any> {
    return this.request("SerpstatKeywordProcedure.getSuggestions", { keyword, se: searchEngine });
  }

  async getCompetitors(keyword: string, searchEngine: string = "g_us"): Promise<any> {
    return this.request("SerpstatKeywordProcedure.getCompetitors", { keyword, se: searchEngine });
  }

  async getAdKeywords(keyword: string, searchEngine: string = "g_us"): Promise<any> {
    return this.request("SerpstatKeywordProcedure.getAdKeywords", { keyword, se: searchEngine });
  }

  async getRelatedKeywords(keyword: string, searchEngine: string = "g_us"): Promise<any> {
    return this.request("SerpstatKeywordProcedure.getRelatedKeywords", { keyword, se: searchEngine });
  }

  async getKeywords(params: {
    keyword: string;
    se?: string;
    minusKeywords?: string[];
    withIntents?: boolean;
    sort?: Record<string, "asc" | "desc">;
    filters?: Record<string, any>;
    order?: Record<string, "asc" | "desc">;
    page?: number;
    size?: number;
  }): Promise<any> {
    return this.request("SerpstatKeywordProcedure.getKeywords", params);
  }
}
