import * as functions from "firebase-functions/v2";
export declare const getPageMetadata: functions.https.CallableFunction<any, Promise<{
    pageId: string;
    content: {
        id: string;
        resolvedString: string;
    }[];
    data: any[];
}>, unknown>;
