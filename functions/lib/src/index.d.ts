import * as admin from "firebase-admin";
import * as functions from "firebase-functions/v2";
import { getPageMetadata } from "./getPageMetadata";
export { gemini25ProProxy, gemini25FlashProxy, gemini25FlashLiteProxy, secretDiag } from './geminiProxies';
export declare const whoAmI: functions.https.HttpsFunction;
/**
 * Callable function to add a lead to the SMS queue.
 *
 * Expected input (must be wrapped in a 'data' field for callable functions):
 * {
 *   data: {
 *     contactId: string,     // The Firestore contact ID
 *     phone: string,         // Normalized phone number (+1XXXXXXXXXX)
 *     campaignId: number     // ID of the campaign (99 = SMS campaign)
 *   }
 * }
 */
/**
 * Core logic for adding a lead to the SMS queue.
 * This function is separated from the callable wrapper for easier testing and internal use.
 */
export declare function _addLeadToSMSQueueLogic(contactId: string, phone: string, campaignId: number): Promise<{
    contactId: string;
    phone: string;
    campaignId: number;
    status: string;
    createdAt: admin.firestore.FieldValue;
    success: boolean;
    id: string;
}>;
export declare const addLeadToSMSQueue: functions.https.CallableFunction<any, Promise<{
    contactId: string;
    phone: string;
    campaignId: number;
    status: string;
    createdAt: admin.firestore.FieldValue;
    success: boolean;
    id: string;
}>, unknown>;
export declare const emailDispatcherProc: functions.CloudFunction<functions.firestore.FirestoreEvent<functions.firestore.QueryDocumentSnapshot | undefined, {
    docId: string;
}>>;
export declare const receiveLeadData: functions.https.HttpsFunction;
export declare const sendLeadNotification: functions.https.HttpsFunction;
export declare const getServiceClientData: functions.https.HttpsFunction;
export { getPageMetadata };
export { saveArbitrageData } from './saveArbitrageData';
export { populateWeatherDataAndNews } from './agents/personalizationAgent';
