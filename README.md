# MysticInsights Tarot Application

This application provides tarot card readings with beautiful images and interpretations.

## Setup Instructions

1. First, run the setup batch file to create necessary directories:
   ```
   setup.bat
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables by creating a `.env` file based on `.env.example`.

4. Run the image validator to check for missing card images:
   ```
   run.bat validate
   ```

5. Download any missing card images:
   ```
   run.bat download
   ```

## Using the Application

Run the main application:
```
node index.js
```

This will generate a random tarot card reading.

## Troubleshooting

If you encounter errors with missing modules, make sure you:
1. Are in the correct directory (C:\Users\codym\Desktop\MysticInsights)
2. Have installed all dependencies with `npm install`
3. Have created all required directories with `setup.bat`

If images fail to download automatically, you may need to manually download tarot card images to the `images/cards` directory with the correct filenames.
