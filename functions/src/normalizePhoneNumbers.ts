import * as functions from "firebase-functions";

/**
 * Normalizes a phone number to a 10-digit string (e.g., "1234567890").
 * Returns null if the number cannot be normalized.
 */
export function normalizePhoneNumber(phoneNumber: string | null | undefined): string | null {
  if (!phoneNumber) {
    return null;
  }

  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, "");

  // If it starts with a '1' and is 11 digits long, remove the '1' (assuming US numbers)
  if (digitsOnly.length === 11 && digitsOnly.startsWith("1")) {
    return digitsOnly.substring(1);
  }

  // If it's exactly 10 digits, return it
  if (digitsOnly.length === 10) {
    return digitsOnly;
  }

  // Otherwise, it's not a valid 10-digit number
  functions.logger.warn(`Could not normalize phone number: ${phoneNumber}`);
  return null;
}
