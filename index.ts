import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProfanityFilter {
  private language: string;
  private badWords: string[];
  private validWords: string[];

  constructor(language: string = "en") {
    this.language = language;
    this.badWords = this.loadWords(`./bad_words/${language}.json`);
    this.validWords = this.loadWords(`./valid_words/${language}.json`);
  }

  private loadWords(filePath: string): string[] {
    try {
      return JSON.parse(
        fs.readFileSync(path.join(__dirname, filePath), "utf-8")
      );
    } catch (error) {
      console.error(`Error loading ${filePath}:`, error);
      return [];
    }
  }

  public isProfane(text: string): boolean {
    const words = text.toLowerCase().split(/\s+/);
    return words.some(
      (word) => this.badWords.includes(word) && !this.validWords.includes(word)
    );
  }

  public cleanText(text: string, replacement: string = "*"): string {
    return text
      .split(/\s+/)
      .map((word) =>
        this.isProfane(word) ? replacement.repeat(word.length) : word
      )
      .join(" ");
  }

  public addWord(word: string): void {
    if (!this.badWords.includes(word)) {
      this.badWords.push(word);
      this.saveWords(`./badwords/${this.language}.json`, this.badWords);
    }
  }

  public removeWord(word: string): void {
    this.badWords = this.badWords.filter((w) => w !== word);
    this.saveWords(`./badwords/${this.language}.json`, this.badWords);
  }

  private saveWords(filePath: string, words: string[]): void {
    fs.writeFileSync(
      path.join(__dirname, filePath),
      JSON.stringify(words, null, 2),
      "utf-8"
    );
  }
}

export default ProfanityFilter;
