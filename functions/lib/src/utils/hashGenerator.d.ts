/**
 * Generates a unique 4-alphanumeric hash.
 * Checks for collisions in the 'contacts' collection.
 * @returns {Promise<string>} A unique 4-alphanumeric hash.
 */
export declare function generateUniqueHash(): Promise<string>;
