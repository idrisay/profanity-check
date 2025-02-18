import isProfane from "./index.js";

// Test different languages
console.log("Testing English:");
console.log("hello world:", isProfane("hello world", "en")); // false
console.log("ass:", isProfane("ass", "en")); // true

console.log("\nTesting Spanish:");
console.log("hola mundo:", isProfane("hola mundo", "es")); // false
console.log("puta:", isProfane("puta", "es")); // true

console.log("\nTesting German:");
console.log("guten tag:", isProfane("guten tag", "de")); // false
console.log("arsch:", isProfane("arsch", "de")); // true

// Test unsupported language (will show warning)
console.log("\nTesting unsupported language:");
console.log("test:", isProfane("test", "xx")); // false

// Test with default language (English)
console.log("\nTesting default language (English):");
console.log("hello:", isProfane("hello")); // false
console.log("fuck:", isProfane("fuck")); // true

// Test sentences
console.log("\nTesting sentences:");
console.log(
  "This is a normal sentence:",
  isProfane("This is a normal sentence", "en")
); // false
console.log("This ass is bad:", isProfane("This ass is bad", "en")); // true
