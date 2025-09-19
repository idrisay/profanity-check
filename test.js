// test.js
import { isProfane } from "./index.js"; // or default if you exported it that way

const cases = [
  // --- English (en) ---
  { text: "Hello world", expected: false, lang: "en" },
  { text: "This is shit", expected: true, lang: "en" },
  { text: "I live in Scunthorpe", expected: false, lang: "en" },
  { text: "ass", expected: true, lang: "en" },
  { text: "passenger", expected: false, lang: "en" },
  { text: "SHIT!", expected: true, lang: "en", note: "Punctuation and case" },
  { text: "ass-hole", expected: true, lang: "en", note: "Hyphenated profanity" },
  { text: "fucking fantastic", expected: true, lang: "en", note: "Profanity within a sentence" },
  { text: "Dickinson", expected: false, lang: "en", note: "False positive check for 'Dick'" },
  { text: "What an asshole!", expected: true, lang: "en", note: "Common profanity" },
  { text: "This is a bunch of crap", expected: true, lang: "en", note: "Common slang profanity" },
  { text: "damn it", expected: true, lang: "en", note: "Common mild profanity" },
  { text: "That was a hell of a ride.", expected: true, lang: "en", note: "Mild profanity" },
  { text: "bitch, please!", expected: true, lang: "en", note: "Profanity with punctuation" },

  // --- German (de) ---
  { text: "du bist scheiße", expected: true, lang: "de" },
  { text: "Guten Morgen", expected: false, lang: "de" },
  { text: "Dick", expected: true, lang: "de" },
  { text: "Scheiße! Das ist ja blöd.", expected: true, lang: "de", note: "Profanity with punctuation" },
  { text: "Hurensohn", expected: true, lang: "de", note: "Common slur" },
  { text: "Arschloch", expected: true, lang: "de", note: "Common profanity" },
  { text: "Dickmacher", expected: false, lang: "de", note: "False positive check for 'Dick'" },
  { text: "Fick dich!", expected: true, lang: "de", note: "Common profanity" },
  { text: "Das ist doch ein Kacke-Wetter.", expected: true, lang: "de", note: "Profanity within a sentence" },
  { text: "Verdammt!", expected: true, lang: "de", note: "Common mild profanity" },

  // --- Spanish (es) ---
  { text: "esto es una mierda", expected: true, lang: "es" },
  { text: "buenos días", expected: false, lang: "es" },
  { text: "Puta madre", expected: true, lang: "es", note: "Common profane phrase" },
  { text: "cabrón", expected: true, lang: "es", note: "Common profanity" },
  { text: "Joder!", expected: true, lang: "es", note: "Common profanity with punctuation" },
  { text: "Estupenda", expected: false, lang: "es", note: "False positive check for similar words" },
  { text: "coño", expected: true, lang: "es", note: "Common profanity" },
  { text: "Que te den por culo.", expected: true, lang: "es", note: "Common profane phrase" },
  { text: "pinche", expected: true, lang: "es", note: "Mexican slang" },

  // --- French (fr) ---
  { text: "c'est de la merde", expected: true, lang: "fr" },
  { text: "bonjour tout le monde", expected: false, lang: "fr" },
  { text: "Putain!", expected: true, lang: "fr", note: "Common profanity with punctuation" },
  { text: "Connard", expected: true, lang: "fr", note: "Common profanity" },
  { text: "Fils de pute", expected: true, lang: "fr", note: "Common profane phrase" },
  { text: "Merguez", expected: false, lang: "fr", note: "False positive check" },
  { text: "Bordel de merde", expected: true, lang: "fr", note: "Profane phrase" },
  { text: "Va te faire foutre.", expected: true, lang: "fr", note: "Common profane phrase" },
  { text: "conasse", expected: true, lang: "fr", note: "Feminine variant" },

  // --- Italian (it) ---
  { text: "sei uno stronzo", expected: true, lang: "it" },
  { text: "buongiorno a tutti", expected: false, lang: "it" },
  { text: "Cazzo!", expected: true, lang: "it", note: "Common profanity with punctuation" },
  { text: "vaffanculo", expected: true, lang: "it", note: "Common profanity" },
  { text: "Puttana", expected: true, lang: "it", note: "Common profanity" },
  { text: "stronzata", expected: true, lang: "it", note: "Another variation" },
  { text: "Che palle!", expected: true, lang: "it", note: "Common profane phrase" },
  { text: "Porca miseria", expected: true, lang: "it", note: "Mild profanity" },
  { text: "figlio di puttana", expected: true, lang: "it", note: "Common slur" },

  // --- Portuguese (pt) ---
  { text: "isso é uma merda", expected: true, lang: "pt" },
  { text: "bom dia", expected: false, lang: "pt" },
  { text: "Caralho!", expected: true, lang: "pt", note: "Common profanity with punctuation" },
  { text: "Porra", expected: true, lang: "pt", note: "Common profanity" },
  { text: "Filho da puta", expected: true, lang: "pt", note: "Common profane phrase" },
  { text: "Merda", expected: true, lang: "pt", note: "Common profanity" },
  { text: "Vá se foder!", expected: true, lang: "pt", note: "Common profane phrase" },
  { text: "Puta que pariu!", expected: true, lang: "pt", note: "Very common profane phrase" },
  { text: "cacete", expected: true, lang: "pt", note: "Profanity for penis, also used as an interjection" },

  // --- Edge Cases and General Checks ---
  { text: "This is a clean sentence.", expected: false, lang: "en", note: "Simple clean sentence" },
  { text: "", expected: false, lang: "en", note: "Empty string" },
  { text: "  ass  ", expected: true, lang: "en", note: "Leading/trailing whitespace" },
  { text: "Ass-HOLE", expected: true, lang: "en", note: "Mixed case and punctuation" },
  { text: "sh1t", expected: true, lang: "en", note: "Leetspeak/phonetic" },
  { text: "This is a bunch of ****!", expected: true, lang: "en", note: "Asterisks as profanity" },
];

for (const { text, expected, lang, note } of cases) {
  const result = isProfane(text, lang);
  console.log(
    `[${lang}] "${text}" ${note ? `(${note})` : ''} → ${result ? "PROFANE ✅" : "clean ✅"} ${
      result === expected ? "✓" : "✗ (wrong) 🚨"
    }`
  );
}