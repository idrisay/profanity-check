declare class ProfanityFilter {
    #private;
    constructor(language?: string);
    isProfane(text: string): boolean;
    cleanText(text: string, replacement?: string): string;
    addWord(word: string): void;
    removeWord(word: string): void;
}
export default ProfanityFilter;
