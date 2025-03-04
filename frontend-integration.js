// Add to the end of your existing script tag in index.html

// Auth functionality with Netlify Identity
const netlifyIdentity = window.netlifyIdentity;

// Initialize Netlify Identity
netlifyIdentity.init({
  container: '#netlify-modal', // defaults to body
  locale: 'en' // defaults to 'en'
});

// Auth state management
let currentUser = null;

// Check if user is logged in
netlifyIdentity.on('init', user => {
  if (user) {
    handleLogin(user);
  }
});

// Handle login
netlifyIdentity.on('login', user => {
  handleLogin(user);
  netlifyIdentity.close();
});

// Handle logout
netlifyIdentity.on('logout', () => {
  currentUser = null;
  isLoggedIn = false;
  updateAuthUI();
  showToast('Logged out successfully', 'success');
});

async function handleLogin(user) {
  currentUser = user;
  isLoggedIn = true;
  
  try {
    // Register/update user in Fauna
    const token = await user.jwt();
    const response = await fetch('/.netlify/functions/auth', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    // Store user data
    currentUser.faunaUser = data.user;
    
    // Fetch subscription status
    await fetchSubscription();
    
    updateAuthUI();
    showToast(`Welcome ${user.user_metadata.full_name || user.email}!`, 'success');
  } catch (error) {
    console.error('Error registering user:', error);
  }
}

// Fetch user subscription details
async function fetchSubscription() {
  if (!currentUser) return;
  
  try {
    const token = await currentUser.jwt();
    const response = await fetch('/.netlify/functions/payments/subscription', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    currentUser.subscription = data.subscription;
  } catch (error) {
    console.error('Error fetching subscription:', error);
  }
}

// Update UI based on auth state
function updateAuthUI() {
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  
  if (isLoggedIn) {
    // Update buttons
    loginBtn.textContent = 'My Account';
    loginBtn.onclick = showUserAccount;
    signupBtn.textContent = 'Logout';
    signupBtn.onclick = () => netlifyIdentity.logout();
    
    // Update premium features availability
    if (currentUser.subscription && currentUser.subscription.plan !== 'free') {
      document.querySelectorAll('.premium-feature').forEach(el => {
        el.classList.remove('disabled');
      });
    }
  } else {
    // Reset to default
    loginBtn.textContent = 'Login';
    loginBtn.onclick = () => netlifyIdentity.open('login');
    signupBtn.textContent = 'Sign Up';
    signupBtn.onclick = () => netlifyIdentity.open('signup');
    
    // Disable premium features
    document.querySelectorAll('.premium-feature').forEach(el => {
      el.classList.add('disabled');
    });
  }
}

// User account modal
function showUserAccount() {
  // Create modal for user account if it doesn't exist
  let accountModal = document.getElementById('account-modal');
  
  if (!accountModal) {
    accountModal = document.createElement('div');
    accountModal.id = 'account-modal';
    accountModal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    modalContent.innerHTML = `
      <span class="close-modal" id="close-account-modal">&times;</span>
      <h2>My Account</h2>
      
      <div class="account-section">
        <h3>Profile</h3>
        <p><strong>Email:</strong> <span id="account-email"></span></p>
        <p><strong>Name:</strong> <span id="account-name"></span></p>
      </div>
      
      <div class="account-section">
        <h3>Subscription</h3>
        <div id="subscription-details"></div>
      </div>
      
      <div class="account-section">
        <h3>My Readings</h3>
        <div id="readings-list"></div>
      </div>
    `;
    
    accountModal.appendChild(modalContent);
    document.body.appendChild(accountModal);
    
    // Close button event
    document.getElementById('close-account-modal').addEventListener('click', () => {
      accountModal.classList.remove('active');
    });
    
    // Close when clicking outside
    accountModal.addEventListener('click', (e) => {
      if (e.target === accountModal) {
        accountModal.classList.remove('active');
      }
    });
  }
  
  // Populate user data
  document.getElementById('account-email').textContent = currentUser.email;
  document.getElementById('account-name').textContent = 
    currentUser.user_metadata.full_name || 'Not provided';
  
  // Populate subscription details
  const subDetails = document.getElementById('subscription-details');
  
  if (currentUser.subscription) {
    if (currentUser.subscription.plan === 'free') {
      subDetails.innerHTML = `
        <p>You are on the <strong>Free</strong> plan.</p>
        <button class="btn btn-signup" id="upgrade-btn">Upgrade Now</button>
      `;
      
      document.getElementById('upgrade-btn').addEventListener('click', () => {
        accountModal.classList.remove('active');
        document.getElementById('nav-pricing').click();
      });
    } else {
      let statusText = '';
      
      if (currentUser.subscription.cancelAtPeriodEnd) {
        statusText = `<p>Your subscription will end on ${new Date(currentUser.subscription.currentPeriodEnd).toLocaleDateString()}</p>`;
      }
      
      subDetails.innerHTML = `
        <p>You are on the <strong>${getPlanName(currentUser.subscription.plan)}</strong> plan.</p>
        <p>Status: <strong>${currentUser.subscription.status}</strong></p>
        ${statusText}
        ${!currentUser.subscription.cancelAtPeriodEnd ? '<button class="btn btn-login" id="cancel-btn">Cancel Subscription</button>' : ''}
      `;
      
      if (!currentUser.subscription.cancelAtPeriodEnd) {
        document.getElementById('cancel-btn').addEventListener('click', cancelSubscription);
      }
    }
  } else {
    subDetails.innerHTML = '<p>Loading subscription details...</p>';
  }
  
  // Fetch and display readings
  fetchReadings();
  
  // Show modal
  accountModal.classList.add('active');
}

// Get plan name from id
function getPlanName(planId) {
  const plans = {
    'free': 'Free Seeker',
    'mystic-adept': 'Mystic Adept',
    'divine-oracle': 'Divine Oracle'
  };
  
  return plans[planId] || planId;
}

// Cancel subscription
async function cancelSubscription() {
  if (!confirm('Are you sure you want to cancel your subscription? You will still have access until the end of your billing period.')) {
    return;
  }
  
  try {
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

// Fetch user's readings
async function fetchReadings() {
  if (!currentUser) return;
  
  const readingsList = document.getElementById('readings-list');
  readingsList.innerHTML = '<p>Loading your readings...</p>';
  
  try {
    const token = await currentUser.jwt();
    const response = await fetch('/.netlify/functions/readings', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (data.readings && data.readings.length > 0) {
      readingsList.innerHTML = '<ul class="readings-list"></ul>';
      const list = readingsList.querySelector('ul');
      
      data.readings.forEach(reading => {
        const date = new Date(reading.createdAt);
        const listItem = document.createElement('li');
        listItem.className = 'reading-item';
        listItem.innerHTML = `
          <div class="reading-meta">
            <strong>${reading.spread} Reading</strong>
            <span>${date.toLocaleDateString()}</span>
          </div>
          <div class="reading-actions">
            <button class="btn-small view-reading" data-id="${reading.id}">View</button>
            <button class="btn-small delete-reading" data-id="${reading.id}">Delete</button>
          </div>
        `;
        list.appendChild(listItem);
      });
      
      // Add event listeners
      list.querySelectorAll('.view-reading').forEach(btn => {
        btn.addEventListener('click', () => viewReading(btn.dataset.id));
      });
      
      list.querySelectorAll('.delete-reading').forEach(btn => {
        btn.addEventListener('click', () => deleteReading(btn.dataset.id));
      });
    } else {
      readingsList.innerHTML = '<p>You have no saved readings yet.</p>';
    }
  } catch (error) {
    console.error('Error fetching readings:', error);
    readingsList.innerHTML = '<p>Failed to load readings. Please try again.</p>';
  }
}

// View a saved reading
async function viewReading(id) {
  try {
    const token = await currentUser.jwt();
    const response = await fetch(`/.netlify/functions/readings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    const reading = data.reading;
    
    // Close account modal
    document.getElementById('account-modal').classList.remove('active');
    
    // Set up the reading interface
    readingInterface.style.display = 'flex';
    startReadingBtn.style.display = 'none';
    
    // Select the correct spread
    currentSpread = reading.spread;
    spreadOptions.forEach(option => {
      option.classList.toggle('active', option.dataset.spread === currentSpread);
    });
    
    // Initialize the spread
    initializeSpread(currentSpread);
    
    // Assign the cards from the saved reading
    currentCards = reading.cards;
    
    // Flip all cards immediately
    document.querySelectorAll('.card').forEach((card, index) => {
      if (index < currentCards.length) {
        const cardFront = card.querySelector('.card-front');
        cardFront.innerHTML = `
          <img src="${currentCards[index].card.image}" alt="${currentCards[index].card.name}" class="card-image">
        `;
        card.classList.add('flipped');
      }
    });
    
    // Display the reading
    displayReading();
    
    // Scroll to reading
    readingInterface.scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    console.error('Error fetching reading:', error);
    showToast('Failed to load reading', 'error');
  }
}

// Delete a reading
async function deleteReading(id) {
  if (!confirm('Are you sure you want to delete this reading? This action cannot be undone.')) {
    return;
  }
  
  try {
    const token = await currentUser.jwt();
    const response = await fetch(`/.netlify/functions/readings/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      showToast('Reading deleted successfully', 'success');
      fetchReadings(); // Refresh readings list
    } else {
      showToast('Failed to delete reading', 'error');
    }
  } catch (error) {
    console.error('Error deleting reading:', error);
    showToast('An error occurred', 'error');
  }
}

// Save current reading
async function saveCurrentReading() {
  if (!isLoggedIn) {
    netlifyIdentity.open('signup');
    showToast('Please sign up to save readings', 'error');
    return;
  }
  
  if (currentCards.length === 0) {
    showToast('Please generate a reading first', 'error');
    return;
  }
  
  try {
    const token = await currentUser.jwt();
    const response = await fetch('/.netlify/functions/readings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        spread: currentSpread,
        cards: currentCards,
        notes: ''
      })
    });
    
    const data = await response.json();
    
    if (data.reading) {
      showToast('Reading saved successfully', 'success');
    } else {
      showToast('Failed to save reading', 'error');
    }
  } catch (error) {
    console.error('Error saving reading:', error);
    showToast('An error occurred', 'error');
  }
}

// Create checkout session for subscription
async function createCheckout(planId) {
  if (!isLoggedIn) {
    netlifyIdentity.open('signup');
    showToast('Please sign up or log in first', 'error');
    return;
  }
  
  try {
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
      const stripe = Stripe(STRIPE_PUBLIC_KEY); // Set STRIPE_PUBLIC_KEY in your actual code
      stripe.redirectToCheckout({
        sessionId: data.sessionId
      });
    } else {
      showToast('Failed to create checkout session', 'error');
    }
  } catch (error) {
    console.error('Error creating checkout:', error);
    showToast('An error occurred', 'error');
  }
}

// Update existing event listeners
saveReadingBtn.addEventListener('click', saveCurrentReading);

// Add subscription button event listeners
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
      showToast('You are already on the Free plan', 'success');
      return;
    }
    
    createCheckout(planId);
  });
});

// Update auth related functions
loginBtn.addEventListener('click', () => netlifyIdentity.open('login'));
signupBtn.addEventListener('click', () => netlifyIdentity.open('signup'));

// Remove the old auth modal events as we're using Netlify Identity now
document.getElementById('close-modal').removeEventListener('click', closeModalFunc);
authModal.removeEventListener('click', (e) => {
  if (e.target === authModal) {
    closeModalFunc();
  }
});
modalTabs.forEach(tab => {
  tab.removeEventListener('click', () => {
    modalTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    if (tab.dataset.tab === 'login') {
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
    } else {
      loginForm.style.display = 'none';
      signupForm.style.display = 'block';
    }
  });
});

// Success URL handler
// Add this if your app is loaded after a successful payment
(function checkForSuccessParam() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');
  
  if (sessionId) {
    showToast('Subscription successful! Welcome to your premium membership.', 'success');
    // Clean the URL
    window.history.replaceState({}, document.title, window.location.pathname);
    
    // Refresh subscription details
    if (currentUser) {
      fetchSubscription().then(() => {
        updateAuthUI();
      });
    }
  }
})();
