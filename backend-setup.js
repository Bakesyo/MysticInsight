// Project structure
// mystic-insights/
// ├── functions/           # Netlify serverless functions
// │   ├── auth.js          # Authentication endpoints
// │   ├── readings.js      # Readings CRUD operations
// │   ├── payments.js      # Stripe integration
// │   └── utils/           # Shared utilities
// │       ├── fauna.js     # FaunaDB client
// │       └── auth.js      # Auth middleware
// ├── netlify.toml         # Netlify configuration
// ├── package.json         # Dependencies
// └── public/              # Static files (our existing HTML)
//     └── index.html       # Main application

// netlify.toml
// Basic Netlify configuration
`[build]
  command = "npm run build"
  functions = "functions"
  publish = "public"

[dev]
  framework = "#static"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200`

// package.json
// Dependencies
`{
  "name": "mystic-insights",
  "version": "1.0.0",
  "description": "Tarot reading SaaS application",
  "main": "index.js",
  "scripts": {
    "build": "echo 'No build step required'",
    "dev": "netlify dev"
  },
  "dependencies": {
    "faunadb": "^4.8.0",
    "netlify-identity-widget": "^1.9.2",
    "stripe": "^12.3.0",
    "jsonwebtoken": "^9.0.0"
  },
  "devDependencies": {
    "netlify-cli": "^15.0.0"
  }
}`

// functions/utils/fauna.js
// FaunaDB client setup
const faunadb = require('faunadb');
const q = faunadb.query;

// Initialize FaunaDB client with secret from environment variable
const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY
});

module.exports = {
  client,
  q
};

// functions/utils/auth.js
// Authentication utility functions
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token from Netlify Identity
const verifyToken = async (event) => {
  const authHeader = event.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { 
      statusCode: 401, 
      body: JSON.stringify({ error: 'Unauthorized' }) 
    };
  }

  const token = authHeader.split(' ')[1];
  
  try {
    // Verify token with JWT_SECRET from Netlify Identity
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { user: decoded.sub };
  } catch (err) {
    return { 
      statusCode: 401, 
      body: JSON.stringify({ error: 'Invalid token' }) 
    };
  }
};

module.exports = {
  verifyToken
};

// functions/auth.js
// Authentication functions
const { client, q } = require('./utils/fauna');

exports.handler = async (event, context) => {
  const { user } = context.clientContext;
  
  // Only proceed if authenticated by Netlify Identity
  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      // Create or update user in FaunaDB
      const result = await client.query(
        q.Let(
          {
            userExists: q.Exists(q.Match(q.Index('users_by_id'), user.sub)),
            user: q.If(
              q.Var('userExists'),
              q.Get(q.Match(q.Index('users_by_id'), user.sub)),
              q.Create(q.Collection('Users'), {
                data: {
                  netlifyId: user.sub,
                  email: user.email,
                  subscription: 'free',
                  createdAt: q.Now()
                }
              })
            )
          },
          q.Var('user')
        )
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ 
          user: {
            id: result.ref.id,
            ...result.data
          }
        })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create user' })
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method not allowed' })
  };
};

// functions/readings.js
// CRUD operations for tarot readings
const { client, q } = require('./utils/fauna');
const { verifyToken } = require('./utils/auth');

exports.handler = async (event, context) => {
  // Verify authentication
  const auth = await verifyToken(event);
  if (auth.statusCode) return auth;
  
  const userId = auth.user;
  const path = event.path.split('/').pop();

  // GET /api/readings - List user's readings
  if (event.httpMethod === 'GET' && path === 'readings') {
    try {
      const result = await client.query(
        q.Map(
          q.Paginate(
            q.Match(q.Index('readings_by_user'), userId)
          ),
          q.Lambda('ref', q.Get(q.Var('ref')))
        )
      );

      const readings = result.data.map(item => ({
        id: item.ref.id,
        ...item.data
      }));

      return {
        statusCode: 200,
        body: JSON.stringify({ readings })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch readings' })
      };
    }
  }

  // POST /api/readings - Create a new reading
  if (event.httpMethod === 'POST' && path === 'readings') {
    try {
      const data = JSON.parse(event.body);
      
      // Validate reading data
      if (!data.cards || !Array.isArray(data.cards)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid reading data' })
        };
      }

      const result = await client.query(
        q.Create(q.Collection('Readings'), {
          data: {
            userId,
            spread: data.spread,
            cards: data.cards,
            notes: data.notes || '',
            createdAt: q.Now()
          }
        })
      );

      return {
        statusCode: 201,
        body: JSON.stringify({
          reading: {
            id: result.ref.id,
            ...result.data
          }
        })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create reading' })
      };
    }
  }

  // GET /api/readings/:id - Get a specific reading
  if (event.httpMethod === 'GET' && path !== 'readings') {
    try {
      const readingId = path;
      
      const result = await client.query(
        q.Let(
          {
            reading: q.Get(q.Ref(q.Collection('Readings'), readingId)),
            isOwner: q.Equals(
              q.Select(['data', 'userId'], q.Var('reading')),
              userId
            )
          },
          q.If(
            q.Var('isOwner'),
            q.Var('reading'),
            q.Abort('Unauthorized')
          )
        )
      );

      return {
        statusCode: 200,
        body: JSON.stringify({
          reading: {
            id: result.ref.id,
            ...result.data
          }
        })
      };
    } catch (error) {
      if (error.description === 'Unauthorized') {
        return {
          statusCode: 403,
          body: JSON.stringify({ error: 'Access denied' })
        };
      }
      
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch reading' })
      };
    }
  }

  // DELETE /api/readings/:id - Delete a reading
  if (event.httpMethod === 'DELETE' && path !== 'readings') {
    try {
      const readingId = path;
      
      await client.query(
        q.Let(
          {
            reading: q.Get(q.Ref(q.Collection('Readings'), readingId)),
            isOwner: q.Equals(
              q.Select(['data', 'userId'], q.Var('reading')),
              userId
            )
          },
          q.If(
            q.Var('isOwner'),
            q.Delete(q.Ref(q.Collection('Readings'), readingId)),
            q.Abort('Unauthorized')
          )
        )
      );

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } catch (error) {
      if (error.description === 'Unauthorized') {
        return {
          statusCode: 403,
          body: JSON.stringify({ error: 'Access denied' })
        };
      }
      
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to delete reading' })
      };
    }
  }

  // PATCH /api/readings/:id - Update a reading (notes)
  if (event.httpMethod === 'PATCH' && path !== 'readings') {
    try {
      const readingId = path;
      const data = JSON.parse(event.body);
      
      const result = await client.query(
        q.Let(
          {
            reading: q.Get(q.Ref(q.Collection('Readings'), readingId)),
            isOwner: q.Equals(
              q.Select(['data', 'userId'], q.Var('reading')),
              userId
            )
          },
          q.If(
            q.Var('isOwner'),
            q.Update(
              q.Ref(q.Collection('Readings'), readingId),
              { data: { notes: data.notes } }
            ),
            q.Abort('Unauthorized')
          )
        )
      );

      return {
        statusCode: 200,
        body: JSON.stringify({
          reading: {
            id: result.ref.id,
            ...result.data
          }
        })
      };
    } catch (error) {
      if (error.description === 'Unauthorized') {
        return {
          statusCode: 403,
          body: JSON.stringify({ error: 'Access denied' })
        };
      }
      
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to update reading' })
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method not allowed' })
  };
};

// functions/payments.js
// Stripe integration for subscription management
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { client, q } = require('./utils/fauna');
const { verifyToken } = require('./utils/auth');

// Plan configuration
const plans = {
  'mystic-adept': {
    amount: 999, // $9.99
    name: 'Mystic Adept'
  },
  'divine-oracle': {
    amount: 1999, // $19.99
    name: 'Divine Oracle'
  }
};

exports.handler = async (event, context) => {
  // Verify authentication
  const auth = await verifyToken(event);
  if (auth.statusCode) return auth;
  
  const userId = auth.user;
  const path = event.path.split('/').pop();

  // POST /api/payments/create-checkout - Create Stripe checkout session
  if (event.httpMethod === 'POST' && path === 'create-checkout') {
    try {
      const data = JSON.parse(event.body);
      const plan = plans[data.plan];
      
      if (!plan) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid plan selected' })
        };
      }

      // Get user from FaunaDB
      const user = await client.query(
        q.Get(q.Match(q.Index('users_by_id'), userId))
      );

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: plan.name + ' Subscription',
                description: 'Monthly subscription to ' + plan.name,
              },
              unit_amount: plan.amount,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: process.env.URL + '/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: process.env.URL + '/pricing',
        customer_email: user.data.email,
        client_reference_id: userId,
        metadata: {
          plan: data.plan
        }
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ sessionId: session.id })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create checkout session' })
      };
    }
  }

  // POST /api/payments/webhook - Handle Stripe webhook events
  if (event.httpMethod === 'POST' && path === 'webhook') {
    const sig = event.headers['stripe-signature'];
    
    try {
      const stripeEvent = stripe.webhooks.constructEvent(
        event.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      
      // Handle subscription events
      if (stripeEvent.type === 'checkout.session.completed') {
        const session = stripeEvent.data.object;
        
        // Update user subscription in FaunaDB
        await client.query(
          q.Update(
            q.Select(
              ['ref'],
              q.Get(q.Match(q.Index('users_by_id'), session.client_reference_id))
            ),
            {
              data: {
                subscription: session.metadata.plan,
                stripeCustomerId: session.customer,
                stripeSubscriptionId: session.subscription
              }
            }
          )
        );
      }
      
      return {
        statusCode: 200,
        body: JSON.stringify({ received: true })
      };
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Webhook error' })
      };
    }
  }

  // GET /api/payments/subscription - Get user's subscription details
  if (event.httpMethod === 'GET' && path === 'subscription') {
    try {
      const user = await client.query(
        q.Get(q.Match(q.Index('users_by_id'), userId))
      );
      
      // If user has a Stripe subscription, fetch details
      if (user.data.stripeSubscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(
          user.data.stripeSubscriptionId
        );
        
        return {
          statusCode: 200,
          body: JSON.stringify({
            subscription: {
              plan: user.data.subscription,
              status: subscription.status,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              cancelAtPeriodEnd: subscription.cancel_at_period_end
            }
          })
        };
      }
      
      // Otherwise return basic subscription info
      return {
        statusCode: 200,
        body: JSON.stringify({
          subscription: {
            plan: user.data.subscription || 'free',
            status: 'active'
          }
        })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch subscription' })
      };
    }
  }

  // POST /api/payments/cancel - Cancel subscription
  if (event.httpMethod === 'POST' && path === 'cancel') {
    try {
      const user = await client.query(
        q.Get(q.Match(q.Index('users_by_id'), userId))
      );
      
      if (!user.data.stripeSubscriptionId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'No active subscription' })
        };
      }
      
      // Cancel at period end
      await stripe.subscriptions.update(user.data.stripeSubscriptionId, {
        cancel_at_period_end: true
      });
      
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to cancel subscription' })
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method not allowed' })
  };
};
