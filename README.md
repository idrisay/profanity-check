# @idrisay/profanity-check

A simple and efficient profanity filter for multiple languages.

## Installation

```bash
npm install @idrisay/profanity-check
```

## Usage

```typescript
import ProfanityFilter from '@idrisay/profanity-check';

// Initialize with language (defaults to 'en')
const filter = new ProfanityFilter('en');

// Check if text contains profanity
console.log(filter.isProfane('hello world')); // false
console.log(filter.isProfane('bad word')); // true (if "bad" is in bad_words list)

// Clean text by replacing profanity with asterisks
console.log(filter.cleanText('hello bad word')); // "hello *** word"

// Add custom words to the filter
filter.addWord('customBadWord');

// Remove words from the filter
filter.removeWord('customBadWord');
```

## Features

- 🌍 Multiple language support
- 📝 Custom word lists
- 🔤 Case-insensitive matching
- ⭐ Word replacement
- ✨ Add/remove words dynamically

## File Structure

```
your-project/
├── bad_words/
│   ├── en.json
│   └── other-language.json
└── valid_words/
    ├── en.json
    └── other-language.json
```

## API Reference

### `new ProfanityFilter(language?: string)`
Creates a new instance of the filter. Language defaults to 'en'.

### `isProfane(text: string): boolean`
Returns true if the text contains profanity.

### `cleanText(text: string, replacement: string = "*"): string`
Replaces profane words with the specified replacement character.

### `addWord(word: string): void`
Adds a new word to the profanity list.

### `removeWord(word: string): void`
Removes a word from the profanity list.

## Contributing

Contributions, issues, and feature requests are welcome!

## License

This project is licensed under the ISC License.

## Author

**idrisay**

---

If you find this package helpful, please consider giving it a ⭐️!
