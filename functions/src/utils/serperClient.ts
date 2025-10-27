import * as functions from "firebase-functions";
import axios from "axios";
import { ContactPipeline, RawContact } from "../types/contact";

const BASE_URL = "https://google.serper.dev";
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0 Safari/537.36";

export class SerperClient {
  private apiKey: string;

  constructor() {
    this.apiKey = functions.config().serper?.api_key || "4c2b84eef6e4d405893085516a905fef9b9040d1";
  }

  async search(query: string, gl: string = "us", hl: string = "en"): Promise<any> {
    const url = `${BASE_URL}/search`;
    const requestBody = {
      q: query,
      gl: gl,
      hl: hl,
    };

    try {
      const response = await axios.post(url, requestBody, {
        headers: {
          'X-API-KEY': this.apiKey,
          'Content-Type': 'application/json',
          'User-Agent': USER_AGENT,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(`Error in Serper.dev API search for "${query}":`, error.message);
      throw error;
    }
  }

  async news(query: string, gl: string = "us", hl: string = "en", num: number = 10): Promise<any> {
    const url = `${BASE_URL}/news`;
    const requestBody = {
      q: query,
      gl: gl,
      hl: hl,
      num: num,
    };

    try {
      const response = await axios.post(url, requestBody, {
        headers: {
          'X-API-KEY': this.apiKey,
          'Content-Type': 'application/json',
          'User-Agent': USER_AGENT,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(`Error in Serper.dev API news search for "${query}":`, error.message);
      throw error;
    }
  }

  async maps(queries: { q: string }[]): Promise<any> {
    const url = `${BASE_URL}/maps`;
    const requestBody = queries;

    try {
      const response = await axios.post(url, requestBody, {
        headers: {
          'X-API-KEY': this.apiKey,
          'Content-Type': 'application/json',
          'User-Agent': USER_AGENT,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.isAxiosError && error.response) {
        console.error(`Error in Serper.dev API maps search: Status ${error.response.status}`, error.response.data);
      } else {
        console.error(`Error in Serper.dev API maps search:`, error.message);
      }
      throw error;
    }
  }
}
