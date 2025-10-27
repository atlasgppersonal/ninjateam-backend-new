import { RawContact } from '../types/contact';
import * as functions from "firebase-functions/v2";
export declare function normalizeCityState(city: string, state: string): string;
/**
 * Prepares personalized SMS campaigns for a given number of leads.
 * This function is not directly callable via HTTP or PubSub, but is intended for internal use.
 * It pulls pending SMS queue documents, fetches contact, news, and weather data,
 * uses an LLM to generate personalized SMS text, and updates the smsQueue documents.
 *
 * @param numberOfLeads The maximum number of leads to process.
 * @param llmPrompt Additional instructions for the LLM to personalize the message.
 */
export declare function prepareSmsCampaign(numberOfLeads: number, llmPrompt: string): Promise<void>;
/**
 * Internal helper function to generate personalized email content using LLM.
 *
 * @param contact The RawContact object for personalization.
 * @param emailTemplate The email template string with placeholders.
 * @param llmPrompt Additional instructions for the LLM to personalize the message.
 * @returns The fully resolved and personalized email content as a string.
 */
export declare function _getEmailContentLogic(contact: RawContact, emailTemplate: string, llmPrompt: string): Promise<string>;
/**
 * Callable Firebase function to generate personalized email content.
 *
 * @param data - An object containing:
 *   - contact: RawContact - The contact object for personalization.
 *   - emailTemplate: string - The email template string with placeholders.
 *   - llmPrompt: string - Additional instructions for the LLM.
 * @returns A Promise that resolves to the personalized email content string.
 */
export declare const getEmailContent: functions.https.CallableFunction<any, Promise<string>, unknown>;
export declare const populateWeatherDataAndNews: functions.scheduler.ScheduleFunction;
