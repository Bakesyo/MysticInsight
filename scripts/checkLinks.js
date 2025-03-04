const { validateCardImages, printImageValidationReport } = require('../utils/linkValidator');
const { downloadMissingCardImages } = require('../utils/imageDownloader');

/**
 * Main function to check and fix all links
 */
async function checkAndFixLinks() {
  console.log('Starting link validation...');
  
  // Check if card images exist
  const imageReport = validateCardImages();
  
  if (!imageReport.allImagesExist) {
    console.log('Some card images are missing. Attempting to download them...');
    await downloadMissingCardImages();
    
    // Verify again after download attempt
    const updatedReport = validateCardImages();
    if (!updatedReport.allImagesExist) {
      console.error('Some images could not be downloaded automatically.');
      console.error('You may need to manually add these images:');
      updatedReport.missingImages.forEach(missing => {
        console.error(`- ${missing.cardName} (${missing.imagePath})`);
      });
    }
  }
  
  console.log('Link validation complete!');
}

// Run the script
checkAndFixLinks()
  .then(() => console.log('Link checking process complete'))
  .catch(error => console.error('Error in link checking process:', error));
