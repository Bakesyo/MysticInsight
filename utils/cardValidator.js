const fs = require('fs');
const path = require('path');
const cards = require('../data/cards');
const config = require('../config');

/**
 * Validates all card images and generates a detailed report
 */
function validateCards() {
  const imagesDir = config.paths.cardImages;
  
  console.log('Validating tarot card images...');
  console.log('====================================');
  
  const report = {
    total: cards.length,
    present: 0,
    placeholders: 0,
    missing: 0,
    details: []
  };
  
  // Check each card
  cards.forEach(card => {
    const imagePath = path.join(imagesDir, card.image);
    const status = {
      id: card.id,
      name: card.name,
      image: card.image,
      path: imagePath,
      exists: fs.existsSync(imagePath),
      isPlaceholder: false
    };
    
    if (status.exists) {
      try {
        // Check if it's an SVG placeholder or a real image
        const fileContent = fs.readFileSync(imagePath, 'utf8').toString();
        status.isPlaceholder = fileContent.includes('<svg') || fileContent.includes('Placeholder');
        
        if (status.isPlaceholder) {
          report.placeholders++;
          status.status = 'placeholder';
        } else {
          report.present++;
          status.status = 'present';
        }
      } catch (err) {
        // Binary file (likely a real image)
        report.present++;
        status.status = 'present';
      }
    } else {
      report.missing++;
      status.status = 'missing';
    }
    
    report.details.push(status);
  });
  
  // Print summary
  console.log(`Total cards: ${report.total}`);
  console.log(`Present: ${report.present}`);
  console.log(`Placeholders: ${report.placeholders}`);
  console.log(`Missing: ${report.missing}`);
  
  // Print details for problem cards
  if (report.placeholders > 0 || report.missing > 0) {
    console.log('\nProblem cards:');
    report.details
      .filter(card => card.status === 'placeholder' || card.status === 'missing')
      .forEach(card => {
        console.log(`- ${card.name}: ${card.status}`);
      });
  }
  
  return report;
}

// Run this script directly
if (require.main === module) {
  validateCards();
}

module.exports = {
  validateCards
};
