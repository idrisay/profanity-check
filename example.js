import ProfanityFilter from './index.js';

const filter = new ProfanityFilter('en');

// Test cases
const testStrings = [
    'good',
    'ass'
];

testStrings.forEach(text => {
    console.log(`"${text}" is${filter.isProfane(text) ? '' : ' not'} profane`);
});