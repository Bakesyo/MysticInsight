const fs = require('fs');
const path = require('path');
const https = require('https');
const cards = require('../data/cards');
const config = require('../config');

/**
 * Downloads images for cards that don't have local images
 */
async function downloadMissingCardImages() {
  console.log('Checking for missing card images...');
  
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

  // Better card URL mappings using Rider-Waite public domain images
  const cardUrlMap = {
    'The Fool': 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg',
    'The Magician': 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
    'The High Priestess': 'https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg',
    'The Empress': 'https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg',
    'The Emperor': 'https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg',
    'The Hierophant': 'https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg',
    'The Lovers': 'https://upload.wikimedia.org/wikipedia/commons/3/3a/TheLovers.jpg',
    'The Chariot': 'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
    'Strength': 'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',
    'The Hermit': 'https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg',
    'Wheel of Fortune': 'https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg',
    'Justice': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg',
    'The Hanged Man': 'https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg',
    'Death': 'https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg',
    'Temperance': 'https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg',
    'The Devil': 'https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg',
    'The Tower': 'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
    'The Star': 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg',
    'The Moon': 'https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg',
    'The Sun': 'https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg',
    'Judgement': 'https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg',
    'The World': 'https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg'
  };

  // Additional backup URLs
  const backupSources = [
    // Format: cardName => URL template with {name} placeholder
    name => `https://www.isisbooks.com/images/Tarot/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    name => `https://www.free-tarot-reading.net/img/cards/rider-waite/${name.toLowerCase().replace(/\s+|the\s*/g, '')}.jpg`
  ];

  // For each card, check if image exists, if not download it
  let downloadCount = 0;
  let errorCount = 0;
  const failedCards = [];

  for (const card of cards) {
    const imageFilePath = path.join(imagesDir, card.image);
    
    if (!fs.existsSync(imageFilePath)) {
      console.log(`Downloading image for ${card.name}...`);
      
      // Try primary source first
      const primaryUrl = cardUrlMap[card.name];
      
      if (primaryUrl) {
        try {
          await downloadImage(primaryUrl, imageFilePath);
          console.log(`✓ Downloaded ${card.name} image successfully`);
          downloadCount++;
          continue; // Skip to next card if successful
        } catch (error) {
          console.log(`✗ Primary source failed: ${error.message}`);
        }
      }
      
      // Try backup sources in sequence
      let downloaded = false;
      for (const sourceGenerator of backupSources) {
        try {
          const backupUrl = sourceGenerator(card.name);
          console.log(`  Trying backup source: ${backupUrl}`);
          await downloadImage(backupUrl, imageFilePath);
          console.log(`✓ Downloaded ${card.name} from backup source`);
          downloadCount++;
          downloaded = true;
          break; // Exit backup source loop if successful
        } catch (error) {
          // Just continue to next source
        }
      }
      
      // If all sources failed, create a placeholder
      if (!downloaded) {
        try {
          await createPlaceholderImage(card.name, imageFilePath);
          console.log(`⚠ Created placeholder for ${card.name}`);
          failedCards.push(card.name);
        } catch (error) {
          console.error(`✗ Failed to create placeholder for ${card.name}: ${error.message}`);
          errorCount++;
        }
      }
    }
  }
  
  console.log('\nImage download summary:');
  console.log(`- Downloaded: ${downloadCount} images`);
  console.log(`- Placeholders created: ${failedCards.length}`);
  console.log(`- Failed: ${errorCount} images`);
  
  if (failedCards.length > 0) {
    console.log('\nThe following cards have placeholders:');
    failedCards.forEach(name => console.log(`- ${name}`));
    console.log('\nYou may want to manually download these images.');
  }
  
  console.log('Image check complete!');
}

/**
 * Downloads an image from a URL to a local path
 */
function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image, status code: ${response.statusCode}`));
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
    
    // Set a timeout of 10 seconds
    request.setTimeout(10000, function() {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Creates a simple text-based placeholder image for a card
 */
function createPlaceholderImage(cardName, filePath) {
  return new Promise((resolve, reject) => {
    // This is a very simple placeholder - in a real app, you might use Canvas or another
    // library to generate a more attractive placeholder image
    const placeholderContent = `
    <svg width="250" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f8f8f8"/>
      <text x="125" y="200" font-family="Arial" font-size="20" text-anchor="middle">${cardName}</text>
      <text x="125" y="230" font-family="Arial" font-size="14" text-anchor="middle">Placeholder Image</text>
    </svg>`;
    
    fs.writeFile(filePath, placeholderContent, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

/**
 * Downloads a specific card image by name
 */
async function downloadSpecificCardImage(cardName) {
  const card = cards.find(c => c.name.toLowerCase() === cardName.toLowerCase());
  
  if (!card) {
    console.error(`Card "${cardName}" not found in the deck`);
    return false;
  }
  
  const imagesDir = config.paths.cardImages;
  const imageFilePath = path.join(imagesDir, card.image);
  
  console.log(`Attempting to download image for ${card.name}...`);
  
  // Try to download from primary Wikipedia source
  const wikiUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/RWS_Tarot_${String(card.id).padStart(2, '0')}_${card.name.replace(/\s+/g, '_')}.jpg/240px-RWS_Tarot_${String(card.id).padStart(2, '0')}_${card.name.replace(/\s+/g, '_')}.jpg`;
  
  try {
    await downloadImage(wikiUrl, imageFilePath);
    console.log(`✓ Successfully downloaded ${card.name} image!`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to download from primary source: ${error.message}`);
    
    // Try alternative source
    const altUrl = `https://www.trustedtarot.com/img/cards/${card.name.toLowerCase().replace(/\s+|the\s*/g, '')}.png`;
    try {
      await downloadImage(altUrl, imageFilePath);
      console.log(`✓ Successfully downloaded ${card.name} image from alternative source!`);
      return true;
    } catch (altError) {
      console.error(`✗ Failed to download from alternative source: ${altError.message}`);
      console.log(`⚠ Creating placeholder for ${card.name} instead.`);
      
      try {
        await createPlaceholderImage(card.name, imageFilePath);
        console.log(`Created placeholder for ${card.name}`);
        return true;
      } catch (placeholderError) {
        console.error(`✗ Failed to create placeholder: ${placeholderError.message}`);
        return false;
      }
    }
  }
}

// Process command line arguments for specific card download
if (require.main === module) {
  const specificCard = process.argv[2];
  
  if (specificCard) {
    console.log(`Downloading specific card: ${specificCard}`);
    downloadSpecificCardImage(specificCard)
      .then(success => {
        if (success) {
          console.log('Specific card download complete.');
        } else {
          console.error('Failed to download specific card.');
        }
      })
      .catch(error => console.error('Error in specific card download:', error));
  } else {
    downloadMissingCardImages()
      .then(() => console.log('Image download process complete'))
      .catch(error => console.error('Error in image download process:', error));
  }
}

module.exports = {
  downloadMissingCardImages,
  downloadSpecificCardImage
};
