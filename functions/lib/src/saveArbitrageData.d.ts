import * as functions from "firebase-functions/v2";
/**
 * Callable function to save arbitrage data to Firestore.
 *
 * Expected input (must be wrapped in a 'data' field for callable functions):
 * {
 *   data: {
 *     id: string,             // The category ID (e.g., "movers")
 *     location: string,       // The city-state (e.g., "portland-or")
 *     arbitrageData: object,  // Contains scored_keywords, customer_domain_data
 *     serviceRadiusCities: string[],
 *     cityClusters: object,
 *     // ... other top-level fields from your payload
 *   }
 * }
 */
export declare const saveArbitrageData: functions.https.CallableFunction<any, Promise<{
    success: boolean;
    message: string;
    docPath: string;
}>, unknown>;
