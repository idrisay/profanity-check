import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
class ProfanityFilter {
    #language;
    #badWords;
    #validWords;
    constructor(language = "en") {
        this.#language = language;
        this.#badWords = this.#loadWords(`./bad_words/${language}.json`);
        this.#validWords = this.#loadWords(`./valid_words/${language}.json`);
    }
    #loadWords(filePath) {
        try {
            return JSON.parse(fs.readFileSync(path.join(__dirname, filePath), "utf-8"));
        }
        catch (error) {
            console.error(`Error loading ${filePath}:`, error);
            return [];
        }
    }
    isProfane(text) {
        const words = text.toLowerCase().split(/\s+/);
        return words.some((word) => this.#badWords.includes(word) && !this.#validWords.includes(word));
    }
    cleanText(text, replacement = "*") {
        return text
            .split(/\s+/)
            .map((word) => this.isProfane(word) ? replacement.repeat(word.length) : word)
            .join(" ");
    }
    addWord(word) {
        if (!this.#badWords.includes(word)) {
            this.#badWords.push(word);
            this.#saveWords(`./bad_words/${this.#language}.json`, this.#badWords);
        }
    }
    removeWord(word) {
        this.#badWords = this.#badWords.filter((w) => w !== word);
        this.#saveWords(`./bad_words/${this.#language}.json`, this.#badWords);
    }
    #saveWords(filePath, words) {
        fs.writeFileSync(path.join(__dirname, filePath), JSON.stringify(words, null, 2), "utf-8");
    }
}
export default ProfanityFilter;
