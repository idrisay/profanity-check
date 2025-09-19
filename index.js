/**
 * Utilities: normalization & tokenization
 */
const DEFAULT_LEET_MAP = {
  '@': 'a', '4': 'a',
  '1': 'i', '!': 'i', '¡': 'i', 'l': 'l',
  '0': 'o',
  '3': 'e',
  '$': 's', '5': 's',
  '7': 't',
};

function normalizeText(text, { map = DEFAULT_LEET_MAP, collapseRepeats = true } = {}) {
  // Lowercase & NFKD to strip diacritics (ä -> a)
  let s = text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');

  // Remove non-alphanumerics except spaces
  s = s.replace(/[^a-z0-9\s]/g, '');

  // Map common leetspeak
  s = s.replace(/[@4013$5!¡7]/g, ch => map[ch] ?? ch);

  // Collapse long character runs: shiiiiit -> shiit
  if (collapseRepeats) s = s.replace(/([a-z])\1{2,}/g, '$1$1');

  return s;
}

// Unicode-aware tokenization: letters, numbers, apostrophes
const WORD_RE = /[\p{L}\p{N}’'_]+/gu;

function tokenize(text) {
  return text.match(WORD_RE) ?? [];
}

/**
 * Build language config
 * badWords: Set<string> (single-word profanity, already lowercased/normalized)
 * badPatterns: RegExp[] (multi-word or obfuscated forms)
 * exceptions: Set<string> or RegExp[] (true homographs you want to allow)
 */
function buildLangConfig({ badWords = [], badPatterns = [], exceptions = [] }) {
  return {
    badWords: new Set(badWords.map(w => normalizeText(w))),
    badPatterns: badPatterns.map(p => (p instanceof RegExp ? p : new RegExp(p, 'iu'))),
    exceptions: exceptions.map(e => (e instanceof RegExp ? e : new RegExp(`^${e}$`, 'iu'))),
  };
}

/**
 * Example: you can keep your existing bad_words/* lists,
 * just ensure they are single tokens and normalized once at load.
 * Replace massive valid_words with a tiny set of true exceptions.
 */
import badWordsDE from "./bad_words/de.js";
import badWordsEN from "./bad_words/en.js";
import badWordsES from "./bad_words/es.js";
import badWordsFR from "./bad_words/fr.js";
import badWordsIT from "./bad_words/it.js";
import badWordsPT from "./bad_words/pt.js";

// Small, targeted exception samples (keep these short!)
const exceptionsEN = [
  // Proper nouns or benign homographs
  /^dick$/i,                // Name; keep if you want to allow it
  /^scunthorpe$/i,
  /^peninsula$/i,           // “penis” substring, but token != "penis"
];

const patternsEN = [
  // Multi-word/spacing/obfuscation
  /\bf\s*u\s*c\s*k\b/iu,
  /\bson\s+of\s+a\s+bitch\b/iu,
  /\bmother\s*f(?:\W|_)*?er\b/iu,  // mother f_ _ er
  // Add language-specific phrases here
];

/**
 * Portuguese multi-word patterns
 * These run on the *normalized* text (accents stripped; punctuation removed).
 * Examples matched:
 *  - "vá se foder", "vai se foder", "vai te foder"
 *  - "foda-se" -> "fodase"
 */
const patternsPT = [
  // "va"/"vai se|te foder|fode|foda..." with common inflections
  /\bva(?:i)?\s+(?:se|te)\s+fod(?:er|e|a|am|endo|eu)?\b/iu,

  // Standalone "foda-se" (hyphen removed by normalization -> "fodase")
  /\bfodase\b/iu,

  // Optional: milder/alt spellings often used to bypass filters (comment out if too aggressive)
  // /\bva(?:i)?\s+pra\s+merda\b/iu,
];

const LANG = {
  de: buildLangConfig({ badWords: badWordsDE }),
  en: buildLangConfig({ badWords: badWordsEN, badPatterns: patternsEN, exceptions: exceptionsEN }),
  es: buildLangConfig({ badWords: badWordsES }),
  fr: buildLangConfig({ badWords: badWordsFR }),
  it: buildLangConfig({ badWords: badWordsIT }),
  pt: buildLangConfig({ badWords: badWordsPT, badPatterns: patternsPT }), // <-- added patterns
};

/**
 * Main API
 */
export function isProfane(text, language = 'en') {
  const cfg = LANG[language];
  if (!cfg) {
    console.warn(`Language ${language} not supported.`);
    return false;
  }

  const normalized = normalizeText(text);
  const tokens = tokenize(normalized);

  // 1) exceptions: if the whole text is a single allowed token, skip quickly
  if (tokens.length === 1 && cfg.exceptions.some(rx => rx.test(tokens[0]))) {
    return false;
  }

  // 2) single-token profanity
  for (const tok of tokens) {
    // Skip super-short tokens except explicit ones you keep in badWords
    if (tok.length <= 2 && !cfg.badWords.has(tok)) continue;

    // If token matches an exception, skip it
    if (cfg.exceptions.some(rx => rx.test(tok))) continue;

    if (cfg.badWords.has(tok)) return true;
  }

  // 3) multi-word / fuzzy patterns on the normalized text
  if (cfg.badPatterns.some(rx => rx.test(normalized))) return true;

  return false;
}
