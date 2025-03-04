// Complete Stripe integration for subscription management
// This file contains the frontend implementation for Stripe

// Add to the end of your existing script tag in index.html

// ----- Stripe Integration -----
// Configuration
const STRIPE_PUBLIC_KEY = 'pk_test_your_public_key'; // Replace with environment variable in production

// Initialize Stripe
let stripe;

// Load Stripe.js dynamically to avoid loading it if not needed
function loadStripeJs() {
  return new Promise((resolve, reject) => {
    if (window.Stripe) {
      stripe = Stripe(STRIPE_PUBLIC_KEY);
      resolve(stripe);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.onload = () => {
      stripe = Stripe(STRIPE_PUBLIC_KEY);
      resolve(stripe);
    };
    script.onerror = () => {
      reject(new Error('Failed to load Stripe.js'));
    };
    document.head.appendChild(script);
  });
}

// Create checkout session for subscription
async function createCheckout(planId) {
  if (!isLoggedIn) {
    netlifyIdentity.open('signup');
    showToast('Please sign up or log in first', 'error');
    return;
  }
  
  try {
    // Show loading state
    showToast('Preparing checkout...', 'info');
    
    // Make sure Stripe is loaded
    await loadStripeJs();
    
    const token = await currentUser.jwt();
    const response = await fetch('/.netlify/functions/payments/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        plan: planId
      })
    });
    
    const data = await response.json();
    
    if (data.sessionId) {
      // Redirect to Stripe Checkout
      stripe.redirectToCheckout({
        sessionId: data.sessionId
      }).then(result => {
        if (result.error) {
          showToast(result.error.message, 'error');
        }
      });
    } else {
      showToast('Failed to create checkout session', 'error');
    }
  } catch (error) {
    console.error('Error creating checkout:', error);
    showToast('An error occurred during checkout', 'error');
  }
}

// Open customer portal to manage subscription
async function openCustomerPortal() {
  if (!isLoggedIn || !currentUser.subscription || currentUser.subscription.plan === 'free') {
    showToast('You don\'t have an active subscription to manage', 'error');
    return;
  }
  
  try {
    // Show loading state
    showToast('Opening customer portal...', 'info');
    
    // Make sure Stripe is loaded
    await loadStripeJs();
    
    const token = await currentUser.jwt();
    const response = await fetch('/.netlify/functions/payments/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (data.url) {
      // Redirect to Stripe Customer Portal
      window.location.href = data.url;
    } else {
      showToast('Failed to open customer portal', 'error');
    }
  } catch (error) {
    console.error('Error opening customer portal:', error);
    showToast('An error occurred', 'error');
  }
}

// Handle subscription cancellation
async function cancelSubscription() {
  if (!isLoggedIn || !currentUser.subscription || currentUser.subscription.plan === 'free') {
    showToast('You don\'t have an active subscription to cancel', 'error');
    return;
  }
  
  if (!confirm('Are you sure you want to cancel your subscription? You will still have access until the end of your billing period.')) {
    return;
  }
  
  try {
    // Show loading state
    showToast('Processing your request...', 'info');
    
    const token = await currentUser.jwt();
    const response = await fetch('/.netlify/functions/payments/cancel', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      showToast('Subscription cancelled successfully', 'success');
      await fetchSubscription();
      showUserAccount(); // Refresh account modal
    } else {
      showToast('Failed to cancel subscription', 'error');
    }
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    showToast('An error occurred', 'error');
  }
}

// Update existing function to include Stripe Customer Portal
// Replaces the subscription details section in showUserAccount()
function renderSubscriptionDetails() {
  const subDetails = document.getElementById('subscription-details');
  
  if (!currentUser.subscription) {
    subDetails.innerHTML = '<p>Loading subscription details...</p>';
    return;
  }
  
  if (currentUser.subscription.plan === 'free') {
    subDetails.innerHTML = `
      <p>You are on the <strong>Free</strong> plan.</p>
      <button class="btn btn-signup" id="upgrade-btn">Upgrade Now</button>
    `;
    
    document.getElementById('upgrade-btn').addEventListener('click', () => {
      document.getElementById('account-modal').classList.remove('active');
      document.getElementById('nav-pricing').click();
    });
  } else {
    let statusText = '';
    let buttonText = 'Manage Subscription';
    let buttonAction = openCustomerPortal;
    
    if (currentUser.subscription.cancelAtPeriodEnd) {
      statusText = `<p>Your subscription will end on ${new Date(currentUser.subscription.currentPeriodEnd).toLocaleDateString()}</p>`;
      buttonText = 'Reactivate Subscription';
    }
    
    subDetails.innerHTML = `
      <p>You are on the <strong>${getPlanName(currentUser.subscription.plan)}</strong> plan.</p>
      <p>Status: <strong>${currentUser.subscription.status}</strong></p>
      ${statusText}
      <button class="btn btn-primary" id="manage-subscription-btn">${buttonText}</button>
    `;
    
    document.getElementById('manage-subscription-btn').addEventListener('click', buttonAction);
  }
}

// ----- Additional Netlify Function for Customer Portal -----
// This goes in functions/payments.js

/*
// Create a Stripe Customer Portal session
if (event.httpMethod === 'POST' && path === 'create-portal-session') {
  try {
    // Get user from FaunaDB
    const user = await client.query(
      q.Get(q.Match(q.Index('users_by_id'), userId))
    );
    
    if (!user.data.stripeCustomerId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No Stripe customer found' })
      };
    }
    
    // Create a Customer Portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: user.data.stripeCustomerId,
      return_url: process.env.URL + '/account',
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url })
    };
  } catch (error) {
    console.error('Error creating portal session:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create portal session' })
    };
  }
}
*/

// ----- Implement Premium Features Checking -----

// Function to check if user has access to premium features
function hasPremiumAccess() {
  if (!isLoggedIn || !currentUser.subscription) {
    return false;
  }
  
  return currentUser.subscription.plan !== 'free' && 
         currentUser.subscription.status === 'active';
}

// Function to handle premium feature access
function handlePremiumFeature(featureElement, featureName) {
  if (!hasPremiumAccess()) {
    showPremiumUpgradeModal(featureName);
    return false;
  }
  return true;
}

// Show upgrade modal for premium features
function showPremiumUpgradeModal(featureName) {
  // Create modal if it doesn't exist
  let premiumModal = document.getElementById('premium-modal');
  
  if (!premiumModal) {
    premiumModal = document.createElement('div');
    premiumModal.id = 'premium-modal';
    premiumModal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    modalContent.innerHTML = `
      <span class="close-modal" id="close-premium-modal">&times;</span>
      <h2>Premium Feature</h2>
      <div id="premium-modal-content"></div>
      <div class="premium-actions">
        <button class="btn btn-signup" id="premium-upgrade-btn">Upgrade Now</button>
        <button class="btn btn-login" id="premium-close-btn">Maybe Later</button>
      </div>
    `;
    
    premiumModal.appendChild(modalContent);
    document.body.appendChild(premiumModal);
    
    // Close button event
    document.getElementById('close-premium-modal').addEventListener('click', () => {
      premiumModal.classList.remove('active');
    });
    
    // Close when clicking outside
    premiumModal.addEventListener('click', (e) => {
      if (e.target === premiumModal) {
        premiumModal.classList.remove('active');
      }
    });
    
    // Close button
    document.getElementById('premium-close-btn').addEventListener('click', () => {
      premiumModal.classList.remove('active');
    });
    
    // Upgrade button
    document.getElementById('premium-upgrade-btn').addEventListener('click', () => {
      premiumModal.classList.remove('active');
      document.getElementById('nav-pricing').click();
    });
  }
  
  // Set feature-specific content
  const content = document.getElementById('premium-modal-content');
  
  content.innerHTML = `
    <p>The <strong>${featureName}</strong> is a premium feature available with our Mystic Adept and Divine Oracle plans.</p>
    <p>Upgrade your account to unlock:</p>
    <ul class="premium-features-list">
      <li>All reading spreads unlocked</li>
      <li>AI-enhanced personalized interpretations</li>
      <li>Unlimited reading history</li>
      <li>Spiritual journal</li>
      <li>Community access</li>
      ${featureName === 'Professional Reading' ? '<li>Live sessions with professional readers</li>' : ''}
    </ul>
  `;
  
  // Show modal
  premiumModal.classList.add('active');
}

// ----- Enhanced AI Interpretation Integration -----

// Function to get AI enhanced interpretations
async function getAIEnhancedInterpretation(cards, spreadType) {
  // If not premium, use the basic interpretation
  if (!hasPremiumAccess()) {
    return generateBasicInterpretation(cards, spreads[spreadType]);
  }
  
  try {
    // In a real implementation, this would call an AI service
    // For this example, we're using a more sophisticated local function
    const enhancedInterpretation = generateAIEnhancedInterpretation(cards, spreads[spreadType]);
    return enhancedInterpretation;
  } catch (error) {
    console.error('Error getting AI interpretation:', error);
    // Fallback to basic interpretation on error
    return generateBasicInterpretation(cards, spreads[spreadType]);
  }
}

// Basic interpretation function (used for free tier)
function generateBasicInterpretation(cards, spreadPositions) {
  let interpretations = [];
  
  cards.forEach((cardData, index) => {
    if (index >= spreadPositions.length) return;
    
    const { card, position, isReversed } = cardData;
    const orientation = isReversed ? 'reversed' : 'upright';
    
    // Simple interpretation just combines card meaning with position
    const interpretation = `This ${orientation} card suggests ${card.meaning[orientation]} in relation to ${position.description}`;
    
    interpretations.push({
      position: position.name,
      card: card.name,
      orientation: orientation,
      interpretation: interpretation
    });
  });
  
  // Basic overall summary
  const overall = "This reading provides insights into different aspects of your situation. Consider how these cards interact with each other and what they might be telling you about your current path.";
  
  return {
    individual: interpretations,
    overall: overall
  };
}

// Update display reading function to use AI interpretations
async function displayReading() {
  readingResults.innerHTML = '<h3>Your Tarot Reading</h3>';
  
  // Show loading indicator
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-indicator';
  loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating your reading...';
  readingResults.appendChild(loadingIndicator);
  
  // Get AI interpretation (or basic if not premium)
  const interpretation = await getAIEnhancedInterpretation(currentCards, currentSpread);
  
  // Remove loading indicator
  readingResults.removeChild(loadingIndicator);
  
  // Display individual card interpretations
  interpretation.individual.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card-meaning';
    cardElement.innerHTML = `
      <h4>${card.card} <span class="position">(${card.position})</span></h4>
      <p><strong>${card.orientation.charAt(0).toUpperCase() + card.orientation.slice(1)}</strong></p>
      <p>${card.interpretation}</p>
    `;
    
    readingResults.appendChild(cardElement);
  });
  
  // Add overall reading insight
  const overall = document.createElement('div');
  overall.innerHTML = `
    <h4>Overall Insight</h4>
    <p>${interpretation.overall}</p>
  `;
  readingResults.appendChild(overall);
  
  // Add premium feature prompt if not logged in or not premium
  if (!isLoggedIn || !hasPremiumAccess()) {
    const premiumPrompt = document.createElement('div');
    premiumPrompt.style.marginTop = '30px';
    premiumPrompt.style.padding = '20px';
    premiumPrompt.style.backgroundColor = 'rgba(255, 152, 0, 0.1)';
    premiumPrompt.style.borderRadius = '10px';
    premiumPrompt.style.border = '1px solid var(--accent)';
    
    premiumPrompt.innerHTML = `
      <h4 style="color: var(--accent);">Unlock Enhanced Insights</h4>
      <p>${isLoggedIn ? 'Upgrade to a premium plan' : 'Sign up for our premium plan'} to receive AI-enhanced personalized interpretations, save your reading history, and connect with professional tarot readers.</p>
      <button class="btn btn-signup" style="margin-top: 15px;" id="premium-signup-btn">${isLoggedIn ? 'Upgrade Now' : 'Sign Up Now'}</button>
    `;
    
    readingResults.appendChild(premiumPrompt);
    
    document.getElementById('premium-signup-btn').addEventListener('click', () => {
      if (!isLoggedIn) {
        netlifyIdentity.open('signup');
      } else {
        document.getElementById('nav-pricing').click();
      }
    });
  }
  
  readingResults.classList.add('active');
  readingResults.scrollIntoView({ behavior: 'smooth' });
}

// ----- Add premium feature tags to UI elements -----

// Update the pricing cards click handlers
document.querySelectorAll('.pricing-card .btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const planCard = this.closest('.pricing-card');
    let planId;
    
    if (planCard.querySelector('h3').textContent === 'Mystic Adept') {
      planId = 'mystic-adept';
    } else if (planCard.querySelector('h3').textContent === 'Divine Oracle') {
      planId = 'divine-oracle';
    } else {
      // Free plan, no checkout needed
      if (isLoggedIn) {
        showToast('You are already on the Free plan', 'success');
      } else {
        netlifyIdentity.open('signup');
      }
      return;
    }
    
    createCheckout(planId);
  });
});
