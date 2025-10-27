import * as functions from "firebase-functions/v2";
interface KeywordData {
    keyword: string;
    searchVolume: number;
    cpc: number;
    difficulty: number;
    adPresence: boolean;
    metricsReliable: boolean;
    score: number;
    serpResults?: any;
    screenshotPath?: string;
}
export declare const findArbitrageOpportunities: functions.https.CallableFunction<any, Promise<KeywordData[]>, unknown>;
export {};
