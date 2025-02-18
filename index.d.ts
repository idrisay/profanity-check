/** Supported language codes */
export type LanguageCode = 'en' | 'es' | 'de' | 'fr' | 'it' | 'pt';

/**
 * Checks if the given text contains profanity
 * @param text - The text to check for profanity
 * @param language - The language code (defaults to 'en')
 * @returns True if profanity is found, false otherwise
 * @example
 * ```js
 * isProfane('hello world', 'en') // false
 * isProfane('bad word', 'en') // true
 * ```
 */
export type ProfanityCheckFunction = (text: string, language?: LanguageCode) => boolean;

declare const isProfane: ProfanityCheckFunction;
export default isProfane; 