require('dotenv').config();
const path = require('path');

const config = {
  // Card reading settings
  defaultCardCount: 5,
  
  // File paths
  paths: {
    root: __dirname,
    cardImages: path.join(__dirname, 'images', 'cards'),
    data: path.join(__dirname, 'data')
  },
  
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  },
  fauna: {
    secretKey: process.env.FAUNA_SECRET_KEY
  }
};

module.exports = config;
