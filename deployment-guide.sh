# Deployment Guide for Mystic Insights

## Project Structure
```
mystic-insights/
├── functions/           # Netlify serverless functions
│   ├── auth.js          # Authentication endpoints
│   ├── readings.js      # Readings CRUD operations
│   ├── payments.js      # Stripe integration
│   └── utils/           # Shared utilities
│       ├── fauna.js     # FaunaDB client
│       └── auth.js      # Auth middleware
├── public/              # Static files
│   ├── index.html       # Main application
│   ├── css/             # Optional separated CSS
│   ├── js/              # Optional separated JS
│   └── images/          # Card images and icons
├── netlify.toml         # Netlify configuration
└── package.json         # Dependencies
```

## Prerequisites
1. Netlify account (https://app.netlify.com)
2. FaunaDB account (https://dashboard.fauna.com)
3. Stripe account (https://dashboard.stripe.com)
4. Node.js and npm installed locally

## Step 1: Local Development Setup

```bash
# Create project directory
mkdir mystic-insights
cd mystic-insights

# Initialize package.json
npm init -y

# Install dependencies
npm install faunadb netlify-identity-widget stripe jsonwebtoken
npm install --save-dev netlify-cli

# Setup project directories
mkdir -p functions/utils public

# Create netlify.toml
cat > netlify.toml << EOF
[build]
  command = "npm run build"
  functions = "functions"
  publish = "public"

[dev]
  framework = "#static"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
EOF

# Create package.json scripts
npm pkg set scripts.build="echo 'No build step required'"
npm pkg set scripts.dev="netlify dev"
```

## Step 2: FaunaDB Setup

1. Create a new database in FaunaDB
2. Create the following collections:
   - Users
   - Readings

3. Create the following indexes:
   - users_by_id: Index on Users collection by data.netlifyId
   - readings_by_user: Index on Readings collection by data.userId

4. Retrieve your FaunaDB secret key from the Security tab

## Step 3: Stripe Setup

1. Create a Stripe account and navigate to the developers section
2. Create the following products and prices:
   - Mystic Adept: $9.99/month
   - Divine Oracle: $19.99/month
3. Get your Stripe publishable key and secret key
4. Set up a webhook to point to your netlify URL, e.g., https://your-app.netlify.app/.netlify/functions/payments/webhook
5. Store the webhook secret

## Step 4: Netlify Setup

1. Install Netlify CLI and login:
```bash
npm install -g netlify-cli
netlify login
```

2. Initialize Netlify site:
```bash
netlify init
```

3. Setup Netlify Identity:
   - Go to your Netlify site dashboard
   - Navigate to Identity
   - Enable Identity
   - Add external providers if needed (Google, GitHub, etc.)
   - Configure the identity widget settings
   - Set registration to invite only if desired

4. Configure environment variables:
```bash
netlify env:set FAUNA_SECRET_KEY your-fauna-secret
netlify env:set STRIPE_SECRET_KEY your-stripe-secret-key
netlify env:set STRIPE_WEBHOOK_SECRET your-stripe-webhook-secret
netlify env:set STRIPE_PUBLIC_KEY your-stripe-public-key
netlify env:set JWT_SECRET your-jwt-secret
```

## Step 5: Adding Identity Widget to Your Site

Add the following to your index.html before the closing </body> tag:

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
<script>
  // Initialize Netlify Identity
  if (window.netlifyIdentity) {
    window.netlifyIdentity.init();
  }
</script>
```

## Step 6: Deploy to Netlify

```bash
# Add your HTML, CSS, and JS files to the public directory
cp path/to/your/html/files/* public/

# Deploy to Netlify
git add .
git commit -m "Initial commit"
netlify deploy --prod
```

## Step 7: Test the Deployment

1. Visit your Netlify URL
2. Test user registration/login
3. Test tarot reading functionality
4. Test subscription purchases

## Troubleshooting

### Function Logs
Check function logs in Netlify dashboard:
- Go to Functions
- Click on a function to see its logs

### Common Issues
- CORS errors: Check your function headers
- Authentication issues: Ensure Netlify Identity is configured correctly
- Database connection: Verify FaunaDB secret is set correctly
- Payment issues: Check Stripe configuration and webhook setup

### Local Development
Run the app locally to test changes:
```bash
netlify dev
```

## Production Considerations

1. Set up a custom domain in Netlify settings
2. Enable HTTPS
3. Configure branch deploys for staging/development
4. Set up build notifications
5. Configure form handling if needed
6. Set up monitoring and analytics
