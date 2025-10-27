export declare class SerperClient {
    private apiKey;
    constructor();
    search(query: string, gl?: string, hl?: string): Promise<any>;
    news(query: string, gl?: string, hl?: string, num?: number): Promise<any>;
    maps(queries: {
        q: string;
    }[]): Promise<any>;
}
