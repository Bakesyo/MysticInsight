const fs = require('fs');
const path = require('path');
const cards = require('../data/cards');
const config = require('../config');

/**
 * Validates that all card images exist
 * @returns {Object} Report of missing images
 */
function validateCardImages() {
  const imagesDir = config.paths.cardImages;
  const report = {
    totalCards: cards.length,
    missingImages: [],
    allImagesExist: true
  };

  cards.forEach(card => {
    const imagePath = path.join(imagesDir, card.image);
    if (!fs.existsSync(imagePath)) {
      report.missingImages.push({
        cardId: card.id,
        cardName: card.name,
        imagePath: imagePath
      });
      report.allImagesExist = false;
    }
  });

  return report;
}

/**
 * Prints a report about image validation
 */
function printImageValidationReport() {
  const report = validateCardImages();
  
  console.log('========== Card Image Validation ==========');
  console.log(`Total cards: ${report.totalCards}`);
  
  if (report.allImagesExist) {
    console.log('✅ All card images are present.');
  } else {
    console.log(`❌ Missing ${report.missingImages.length} card images:`);
    report.missingImages.forEach(missing => {
      console.log(`   - ${missing.cardName} (${missing.imagePath})`);
    });
    console.log('\nRun the image downloader to fix missing images:');
    console.log('node utils/imageDownloader.js');
  }
  
  console.log('===========================================');
  
  return report.allImagesExist;
}

// Run this script directly to validate all images
if (require.main === module) {
  printImageValidationReport();
}

module.exports = {
  validateCardImages,
  printImageValidationReport
};
