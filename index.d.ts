export type ProfanityCheckFunction = (text: string, language?: string) => boolean;

declare const isProfane: ProfanityCheckFunction;
export default isProfane; 