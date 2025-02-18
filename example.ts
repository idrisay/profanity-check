import ProfanityFilter from ".";

const filter = new ProfanityFilter('en');

// Test cases
const testStrings = [
  'hello world',
  'bad word here',  // Replace 'bad' with an actual word from your badwords/en.json
  'ass'
];

testStrings.forEach(text => {
  console.log(`"${text}" is${filter.isProfane(text) ? '' : ' not'} profane`);
});

console.log('----------------------------------------------------------------')
