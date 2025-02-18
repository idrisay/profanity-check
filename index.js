/**
 * Import bad words lists for each supported language
 */
import badWordsDE from "./bad_words/de.js";
import badWordsEN from "./bad_words/en.js";
import badWordsES from "./bad_words/es.js";
import badWordsFR from "./bad_words/fr.js";
import badWordsIT from "./bad_words/it.js";
import badWordsPT from "./bad_words/pt.js";

/**
 * Import valid words lists for each supported language
 */
import validWordsDE from "./valid_words/de.js";
import validWordsEN from "./valid_words/en.js";
import validWordsES from "./valid_words/es.js";
import validWordsFR from "./valid_words/fr.js";
import validWordsIT from "./valid_words/it.js";
import validWordsPT from "./valid_words/pt.js";

/**
 * Word lists for each supported language
 * @type {Object.<string, { badWords: string[], validWords: string[] }>}
 */
const wordLists = {
  de: { badWords: badWordsDE, validWords: validWordsDE },
  en: { badWords: badWordsEN, validWords: validWordsEN },
  es: { badWords: badWordsES, validWords: validWordsES },
  fr: { badWords: badWordsFR, validWords: validWordsFR },
  it: { badWords: badWordsIT, validWords: validWordsIT },
  pt: { badWords: badWordsPT, validWords: validWordsPT },
};

/**
 * Checks if the given text contains profanity
 * @param {string} text - The text to check for profanity
 * @param {string} [language='en'] - The language code
 * @returns {boolean} True if profanity is found, false otherwise
 */
function isProfane(text, language = "en") {
  if (!wordLists[language]) {
    console.warn(`Language ${language} not supported.`);
    return false;
  }

  const { badWords, validWords } = wordLists[language];
  const words = text.toLowerCase().split(/\s+/);

  return words.some(
    (word) => badWords.includes(word) && !validWords.includes(word)
  );
}

export default isProfane;
