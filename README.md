# @idrisay/profanity-check

A simple and efficient profanity filter for multiple languages.

## Installation

```bash
npm install @idrisay/profanity-check
```

## Usage

```javascript
import isProfane from '@idrisay/profanity-check';

// Check if text contains profanity (defaults to English)
console.log(isProfane('hello world')); // false
console.log(isProfane('bad word')); // true if "bad" is in badwords list

// Check with specific language
console.log(isProfane('hello world', 'en')); // false
console.log(isProfane('puta', 'es')); // true
```

## Features

- 🌍 Multiple language support (en, es, de, fr, it, pt)
- 📝 Pre-configured word lists
- 🔤 Case-insensitive matching
- ⭐ Simple and lightweight
- ✨ Zero dependencies

## Supported Languages

- 🇬🇧 English (en)
- 🇪🇸 Spanish (es)
- 🇩🇪 German (de)
- 🇫🇷 French (fr)
- 🇮🇹 Italian (it)
- 🇵🇹 Portuguese (pt)

## API Reference

### `isProfane(text: string, language?: string): boolean`

Checks if the given text contains profanity.

- `text`: The text to check
- `language`: Optional language code (defaults to 'en')
  - Supported codes: 'en', 'es', 'de', 'fr', 'it', 'pt'
- Returns: `boolean` - true if profanity is found

## Examples

```javascript
// Basic usage
isProfane('hello world'); // false
isProfane('some bad word'); // true if contains profanity

// Different languages
isProfane('hello', 'en'); // false
isProfane('puta', 'es'); // true
isProfane('arsch', 'de'); // true

// Sentence checking
isProfane('This is a normal sentence', 'en'); // false
isProfane('This ass is bad', 'en'); // true

// Unsupported language
isProfane('hello', 'xx'); // false (with warning)
```

## Contributing

Contributions, issues, and feature requests are welcome!

## License

This project is licensed under the ISC License.

## Author

**idrisay**

---

If you find this package helpful, please consider giving it a ⭐️!
