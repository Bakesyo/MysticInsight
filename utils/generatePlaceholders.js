const fs = require('fs');
const path = require('path');
const cards = require('../data/cards');
const config = require('../config');

/**
 * Creates placeholder images for all missing card images
 */
async function generatePlaceholders() {
  console.log('Generating placeholders for missing card images...');
  
  const imagesDir = config.paths.cardImages;
  
  // Ensure the directory exists
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log(`Created directory: ${imagesDir}`);
  }

  let placeholdersCreated = 0;
  
  for (const card of cards) {
    const imageFilePath = path.join(imagesDir, card.image);
    
    if (!fs.existsSync(imageFilePath)) {
      console.log(`Creating placeholder for ${card.name}...`);
      try {
        await createPlaceholderImage(card.name, imageFilePath);
        console.log(`✓ Created placeholder for ${card.name}`);
        placeholdersCreated++;
      } catch (error) {
        console.error(`✗ Failed to create placeholder for ${card.name}: ${error.message}`);
      }
    }
  }
  
  console.log(`\nCreated ${placeholdersCreated} placeholder images`);
}

/**
 * Creates a simple SVG placeholder image for a card
 */
function createPlaceholderImage(cardName, filePath) {
  return new Promise((resolve, reject) => {
    // Generate a random gradient background color
    const hue = Math.floor(Math.random() * 360);
    const backgroundColor = `hsl(${hue}, 60%, 80%)`;
    const borderColor = `hsl(${hue}, 60%, 60%)`;
    
    const placeholderContent = `
    <svg width="250" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${backgroundColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${borderColor};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" stroke="#333" stroke-width="5"/>
      <rect x="15" y="15" width="220" height="370" fill="white" fill-opacity="0.7" rx="10" ry="10"/>
      <text x="125" y="80" font-family="Arial" font-size="24" font-weight="bold" text-anchor="middle">${cardName}</text>
      <text x="125" y="200" font-family="Arial" font-size="18" text-anchor="middle">Tarot Card</text>
      <text x="125" y="320" font-family="Arial" font-size="14" font-style="italic" text-anchor="middle">Placeholder Image</text>
      <text x="125" y="370" font-family="Arial" font-size="12" text-anchor="middle">MysticInsights</text>
    </svg>`;
    
    fs.writeFile(filePath, placeholderContent, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

// Run this script directly to generate placeholders
if (require.main === module) {
  generatePlaceholders()
    .then(() => console.log('Placeholder generation complete'))
    .catch(error => console.error('Error generating placeholders:', error));
}

module.exports = {
  generatePlaceholders,
  createPlaceholderImage
};
