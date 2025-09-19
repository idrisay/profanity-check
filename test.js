// test.js
import { isProfane } from "./index.js"; // or default if you exported it that way

const cases = [
  // English
  { text: "Hello world", expected: false, lang: "en" },
  { text: "This is shit", expected: true, lang: "en" },
  { text: "I live in Scunthorpe", expected: false, lang: "en" },
  { text: "ass", expected: true, lang: "en" },
  { text: "passenger", expected: false, lang: "en" },

  // German
  { text: "du bist scheiße", expected: true, lang: "de" },
  { text: "Guten Morgen", expected: false, lang: "de" },
  { text: "Dick", expected: true, lang: "de" },

  // Spanish
  { text: "esto es una mierda", expected: true, lang: "es" },
  { text: "buenos días", expected: false, lang: "es" },

  // French
  { text: "c'est de la merde", expected: true, lang: "fr" },
  { text: "bonjour tout le monde", expected: false, lang: "fr" },

  // Italian
  { text: "sei uno stronzo", expected: true, lang: "it" },
  { text: "buongiorno a tutti", expected: false, lang: "it" },

  // Portuguese
  { text: "isso é uma merda", expected: true, lang: "pt" },
  { text: "bom dia", expected: false, lang: "pt" },
];

for (const { text, expected, lang } of cases) {
  const result = isProfane(text, lang);
  console.log(
    `[${lang}] "${text}" → ${result ? "PROFANE ✅" : "clean ✅"} ${
      result === expected ? "✓" : "✗ (wrong) 🚨"
    }`
  );
}
