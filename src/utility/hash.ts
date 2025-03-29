import { compare, hash } from "bcryptjs";

/**
 * Hashes a given value using a specified salt value.
 * 
 * @param value - The value to be hashed.
 * @param saltValue - The salt value to be used in the hashing process.
 * @returns A promise that resolves to the hashed value.
 */
export const doHash = async (value: string, saltValue: number): Promise<string> => {
    const result = await hash(value, saltValue);
    return result;
};


/**
 * Compares a plain text value with a hashed value.
 * @param {string} value - The plain text value to compare.
 * @param {string} hashedValue - The hashed value to compare against.
 * @returns {Promise<boolean>} - Returns true if the values match, otherwise false.
 */
export const compareHash = async (value: any, hashedValue: any): Promise<boolean> => {
  // Await the comparison result from bcrypt and return the value
  const result = await compare(value, hashedValue);
  return result;
};