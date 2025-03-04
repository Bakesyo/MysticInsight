const { drawCards } = require('./services/cardService');
const config = require('./config');

// Draw cards based on config (now 5 instead of 3)
const reading = drawCards();
console.log(`Your reading consists of ${reading.length} cards:`);
reading.forEach(card => {
  console.log(`- ${card.name}: ${card.description}`);
});

// Or specify a custom number
const customReading = drawCards(7); // Draw 7 cards
console.log(`Your custom reading consists of ${customReading.length} cards.`);
