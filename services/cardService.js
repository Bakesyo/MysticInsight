const fs = require('fs');
const path = require('path');
const cards = require('../data/cards');
const config = require('../config');

/**
 * Randomly draws a specified number of cards from the deck
 * @param {number} count - Number of cards to draw
 * @returns {Array} - Array of drawn cards
 */
function drawCards(count = config.defaultCardCount) {
  // Create a copy of the cards array to avoid modifying the original
  const deck = [...cards];
  const drawnCards = [];
  
  // Shuffle the deck using Fisher-Yates algorithm
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  // Draw the requested number of cards
  for (let i = 0; i < count && i < deck.length; i++) {
    drawnCards.push(deck[i]);
  }
  
  return drawnCards;
}

/**
 * Adds the full image path to each card object
 * @param {Array} cardArray - Array of card objects 
 * @returns {Array} - Cards with image paths
 */
function addImagePathsToCards(cardArray) {
  return cardArray.map(card => ({
    ...card,
    imagePath: path.join(config.paths.cardImages, card.image),
    imageUrl: `/images/cards/${card.image}`
  }));
}

/**
 * Gets a card by its ID with full image path
 * @param {number} id - Card ID
 * @returns {Object|null} - Card object or null if not found
 */
function getCardById(id) {
  const card = cards.find(c => c.id === id);
  return card ? addImagePathsToCards([card])[0] : null;
}

/**
 * Verifies if all card images exist, logs missing ones
 * @returns {boolean} - True if all images exist
 */
function verifyCardImages() {
  let allImagesExist = true;
  const missingImages = [];

  cards.forEach(card => {
    const imagePath = path.join(config.paths.cardImages, card.image);
    if (!fs.existsSync(imagePath)) {
      allImagesExist = false;
      missingImages.push(card.name);
    }
  });

  if (!allImagesExist) {
    console.warn(`Missing images for: ${missingImages.join(', ')}`);
  }

  return allImagesExist;
}

module.exports = {
  drawCards,
  addImagePathsToCards,
  getCardById,
  verifyCardImages
};
