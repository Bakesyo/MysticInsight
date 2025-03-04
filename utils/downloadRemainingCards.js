const fs = require('fs');
const path = require('path');
const https = require('https');
const cards = require('../data/cards');
const config = require('../config');

/**
 * Downloads images for specific problem cards
 * Focuses on The Hierophant, The Lovers, The Hanged Man, The Devil, and The Tower
 */
async function downloadRemainingCards() {
  console.log('Downloading remaining tarot card images...');
  
  const imagesDir = config.paths.cardImages;
  
  // Ensure the directory exists
  try {
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
      console.log(`Created directory: ${imagesDir}`);
    }
  } catch (err) {
    console.error(`Error creating directory ${imagesDir}: ${err.message}`);
    return;
  }

  // Problem cards with specific alternative sources
  const problemCards = {
    'The Hierophant': [
      'https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg',
      'https://www.tarotcardmeanings.net/images/tarotcards/hierophant-waite-tarot.jpg',
      'https://www.trustedtarot.com/img/cards/the-hierophant.png'
    ],
    'The Lovers': [
      'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg',
      'https://www.tarotcardmeanings.net/images/tarotcards/lovers-waite-tarot.jpg',
      'https://www.trustedtarot.com/img/cards/the-lovers.png'
    ],
    'The Hanged Man': [
      'https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg',
      'https://www.tarotcardmeanings.net/images/tarotcards/hanged-man-waite-tarot.jpg',
      'https://www.trustedtarot.com/img/cards/the-hanged-man.png'
    ],
    'The Devil': [
      'https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg',
      'https://www.tarotcardmeanings.net/images/tarotcards/devil-waite-tarot.jpg',
      'https://www.trustedtarot.com/img/cards/the-devil.png'
    ],
    'The Tower': [
      'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
      'https://www.tarotcardmeanings.net/images/tarotcards/tower-waite-tarot.jpg',
      'https://www.trustedtarot.com/img/cards/the-tower.png'
    ]
  };

  // Track results
  let successCount = 0;
  let failureCount = 0;

  // Process each problem card
  for (const [cardName, sources] of Object.entries(problemCards)) {
    const card = cards.find(c => c.name === cardName);
    
    if (!card) {
      console.error(`Card '${cardName}' not found in deck`);
      continue;
    }
    
    const imageFilePath = path.join(imagesDir, card.image);
    console.log(`Processing ${cardName}...`);
    
    // Skip if we already have a non-placeholder image
    if (fs.existsSync(imageFilePath)) {
      const fileContent = fs.readFileSync(imageFilePath, 'utf8').toString();
      if (!fileContent.includes('<svg') && !fileContent.includes('Placeholder')) {
        console.log(`✓ ${cardName} already has a proper image, skipping`);
        successCount++;
        continue;
      }
    }
    
    // Try each source
    let downloaded = false;
    for (const source of sources) {
      try {
        console.log(`  Trying source: ${source}`);
        await downloadImage(source, imageFilePath);
        console.log(`✓ Successfully downloaded ${cardName}`);
        downloaded = true;
        successCount++;
        break;
      } catch (error) {
        console.log(`  Source failed: ${error.message}`);
      }
    }
    
    // If all sources failed
    if (!downloaded) {
      console.error(`✗ All sources failed for ${cardName}`);
      failureCount++;
    }
  }
  
  // Show summary
  console.log('\nDownload summary:');
  console.log(`- Success: ${successCount} cards`);
  console.log(`- Failed: ${failureCount} cards`);
}

/**
 * Downloads an image from a URL to a local path
 */
function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download, status code: ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete the file if there was an error
        reject(err);
      });
    });
    
    request.on('error', reject);
    
    // Set a timeout of 15 seconds
    request.setTimeout(15000, function() {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Run this script directly
if (require.main === module) {
  downloadRemainingCards()
    .then(() => console.log('Remaining cards download complete'))
    .catch(error => console.error('Error in downloading remaining cards:', error));
}

module.exports = {
  downloadRemainingCards
};
