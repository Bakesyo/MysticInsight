// AI Service Integration for Enhanced Tarot Interpretations
// This implementation uses OpenAI, but can be adapted for any LLM API

// Add this file to /functions/ai.js

const { verifyToken } = require('./utils/auth');
const { client, q } = require('./utils/fauna');

// Implementation for OpenAI API
async function getAIInterpretation(cards, spreadType, userContext = {}) {
  // OpenAI client configuration
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // Build context for the AI
  const cardsContext = cards.map((cardData, index) => {
    const { card, position, isReversed } = cardData;
    return {
      position: position.name,
      positionMeaning: position.description,
      card: card.name,
      orientation: isReversed ? 'reversed' : 'upright',
      meaning: card.meaning[isReversed ? 'reversed' : 'upright'],
      description: card.description
    };
  });

  // Build system prompt
  const systemPrompt = `
    You are a skilled and intuitive tarot reader with decades of experience. You provide insightful, 
    compassionate, and personalized tarot readings that help people gain clarity and perspective.
    
    When interpreting tarot cards:
    1. Consider the specific position of each card in the spread
    2. Analyze how cards relate to and influence each other
    3. Balance traditional card meanings with intuitive insights
    4. Use a warm, insightful tone that respects the querent's agency
    5. Focus on empowerment and choices rather than fixed outcomes
    6. Be detailed and specific, not generic
    
    The reading should be personalized based on the user's context if provided.
  `;

  // Build user prompt
  const userPrompt = `
    Please provide a detailed tarot reading for a ${spreadType} spread with the following cards:
    
    ${JSON.stringify(cardsContext, null, 2)}
    
    ${userContext.question ? `The querent's question is: "${userContext.question}"` : ''}
    ${userContext.birthDate ? `The querent's birth date is: ${userContext.birthDate}` : ''}
    ${userContext.concerns ? `The querent mentioned these concerns: ${userContext.concerns}` : ''}
    
    Provide interpretations for each individual card in its position, and then an overall synthesis 
    of the reading that connects the cards together. Make the reading personal, insightful, and focused 
    on empowerment.
    
    Format the response as a JSON object with the following structure:
    {
      "individual": [
        {
          "position": "Position name",
          "card": "Card name",
          "orientation": "upright or reversed",
          "interpretation": "Detailed interpretation"
        },
        // Additional cards...
      ],
      "overall": "Overall reading synthesis paragraph"
    }
  `;

  try {
    // Call OpenAI API
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    // Parse the AI response
    const content = response.data.choices[0].message.content;
    let parsedResponse;
    
    try {
      parsedResponse = JSON.parse(content);
    } catch (error) {
      // Handle non-JSON responses by extracting what we can
      const individualPattern = /position.*?:.*?["|'](.+?)["|'].*?card.*?:.*?["|'](.+?)["|'].*?orientation.*?:.*?["|'](.+?)["|'].*?interpretation.*?:.*?["|'](.+?)["|']/gis;
      const overallPattern = /overall.*?:.*?["|'](.+?)["|']/gis;
      
      const individual = [];
      let match;
      
      while ((match = individualPattern.exec(content)) !== null) {
        individual.push({
          position: match[1],
          card: match[2],
          orientation: match[3],
          interpretation: match[4]
        });
      }
      
      const overallMatch = overallPattern.exec(content);
      const overall = overallMatch ? overallMatch[1] : "This reading suggests multiple aspects of your situation are interconnected. Consider how these cards relate to different areas of your life and what message they might be conveying as a whole.";
      
      parsedResponse = { individual, overall };
    }
    
    return parsedResponse;
  } catch (error) {
    console.error('Error calling AI service:', error);
    throw new Error('Failed to generate AI interpretation');
  }
}

// Netlify function handler
exports.handler = async (event, context) => {
  // Verify authentication and premium access
  const auth = await verifyToken(event);
  if (auth.statusCode) return auth;
  
  const userId = auth.user;
  
  // Check if user has premium subscription
  try {
    const user = await client.query(
      q.Get(q.Match(q.Index('users_by_id'), userId))
    );
    
    if (!user.data.subscription || user.data.subscription === 'free') {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Premium subscription required' })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to verify subscription status' })
    };
  }
  
  // Process the request
  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body);
      
      // Validate data
      if (!data.cards || !data.spreadType) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Missing required fields' })
        };
      }
      
      // Get AI interpretation
      const interpretation = await getAIInterpretation(
        data.cards, 
        data.spreadType,
        data.userContext || {}
      );
      
      return {
        statusCode: 200,
        body: JSON.stringify({ interpretation })
      };
    } catch (error) {
      console.error('Error generating interpretation:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to generate interpretation' })
      };
    }
  }
  
  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method not allowed' })
  };
};

// ----- Frontend Integration -----
// Add to your main script to use the AI service

// Function to get AI-enhanced interpretations from the service
async function getAIInterpretationFromService(cards, spreadType, userContext = {}) {
  if (!hasPremiumAccess()) {
    return generateBasicInterpretation(cards, spreads[spreadType]);
  }
  
  try {
    const token = await currentUser.jwt();
    const response = await fetch('/.netlify/functions/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        cards,
        spreadType,
        userContext
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to get AI interpretation');
    }
    
    const data = await response.json();
    return data.interpretation;
  } catch (error) {
    console.error('Error getting AI interpretation:', error);
    // Fallback to basic interpretation
    return generateBasicInterpretation(cards, spreads[spreadType]);
  }
}

// Updated function to collect user context before reading
function collectUserContext() {
  if (!hasPremiumAccess()) {
    return {};
  }
  
  // Create modal for context collection
  let contextModal = document.getElementById('context-modal');
  
  if (!contextModal) {
    contextModal = document.createElement('div');
    contextModal.id = 'context-modal';
    contextModal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    modalContent.innerHTML = `
      <span class="close-modal" id="close-context-modal">&times;</span>
      <h2>Personalize Your Reading</h2>
      <p>Adding context will help enhance your AI-powered reading.</p>
      
      <div class="form-group">
        <label for="reading-question">What question would you like guidance on? (Optional)</label>
        <input type="text" id="reading-question" class="form-control" placeholder="e.g., Should I change careers?">
      </div>
      
      <div class="form-group">
        <label for="reading-concerns">Any specific concerns or areas of focus? (Optional)</label>
        <textarea id="reading-concerns" class="form-control" rows="3" placeholder="e.g., I'm feeling stuck in my current job but unsure about making a change"></textarea>
      </div>
      
      <div class="form-group">
        <label for="reading-birthdate">Birth date (Optional)</label>
        <input type="date" id="reading-birthdate" class="form-control">
      </div>
      
      <button class="btn btn-primary btn-block" id="context-submit-btn">Start Reading</button>
    `;
    
    contextModal.appendChild(modalContent);
    document.body.appendChild(contextModal);
    
    // Close button event
    document.getElementById('close-context-modal').addEventListener('click', () => {
      contextModal.classList.remove('active');
    });
    
    // Close when clicking outside
    contextModal.addEventListener('click', (e) => {
      if (e.target === contextModal) {
        contextModal.classList.remove('active');
      }
    });
  }
  
  // Return promise that resolves with user context
  return new Promise((resolve) => {
    contextModal.classList.add('active');
    
    document.getElementById('context-submit-btn').addEventListener('click', () => {
      const context = {
        question: document.getElementById('reading-question').value,
        concerns: document.getElementById('reading-concerns').value,
        birthDate: document.getElementById('reading-birthdate').value
      };
      
      contextModal.classList.remove('active');
      resolve(context);
    });
    
    // If they close without submitting, return empty context
    document.getElementById('close-context-modal').addEventListener('click', () => {
      resolve({});
    });
    
    contextModal.addEventListener('click', (e) => {
      if (e.target === contextModal) {
        resolve({});
      }
    });
  });
}

// Update the shuffleCards function to collect context for premium users
async function shuffleCards() {
  // Reset cards
  document.querySelectorAll('.card').forEach(card => {
    card.classList.remove('flipped');
    const cardFront = card.querySelector('.card-front');
    cardFront.innerHTML = '';
  });
  
  readingResults.innerHTML = '';
  readingResults.classList.remove('active');
  
  // For premium users, collect context first
  let userContext = {};
  if (isLoggedIn && hasPremiumAccess()) {
    userContext = await collectUserContext();
  }
  
  // Store context for later use in interpretation
  window.currentUserContext = userContext;
  
  // Shuffle and assign new cards
  const positions = spreads[currentSpread];
  currentCards = [];
  
  for (let i = 0; i < positions.length; i++) {
    // Randomly select card and orientation
    const randomIndex = Math.floor(Math.random() * tarotCards.length);
    const isReversed = Math.random() > 0.7; // 30% chance of reversed
    
    currentCards.push({
      card: tarotCards[randomIndex],
      position: positions[i],
      isReversed: isReversed
    });
  }
  
  // Show toast notification
  showToast('Cards shuffled successfully!', 'success');
}

// Update displayReading to use the AI service
async function displayReading() {
  readingResults.innerHTML = '<h3>Your Tarot Reading</h3>';
  
  // Show loading indicator
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-indicator';
  loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating your reading...';
  readingResults.appendChild(loadingIndicator);
  
  // Get AI interpretation
  const interpretation = await getAIInterpretationFromService(
    currentCards, 
    currentSpread,
    window.currentUserContext || {}
  );
  
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
  } else {
    // Add save button for premium users
    const saveSection = document.createElement('div');
    saveSection.style.marginTop = '30px';
    saveSection.style.textAlign = 'center';
    
    saveSection.innerHTML = `
      <button class="btn btn-primary" id="save-reading-btn-result">Save This Reading</button>
      <button class="btn btn-login" id="share-reading-btn">Share Reading</button>
    `;
    
    readingResults.appendChild(saveSection);
    
    document.getElementById('save-reading-btn-result').addEventListener('click', saveCurrentReading);
    document.getElementById('share-reading-btn').addEventListener('click', shareReading);
  }
  
  readingResults.classList.add('active');
  readingResults.scrollIntoView({ behavior: 'smooth' });
}

// Function to share reading (for premium users)
function shareReading() {
  if (!hasPremiumAccess()) {
    handlePremiumFeature(null, "Reading Sharing");
    return;
  }
  
  // Create share modal
  let shareModal = document.getElementById('share-modal');
  
  if (!shareModal) {
    shareModal = document.createElement('div');
    shareModal.id = 'share-modal';
    shareModal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    modalContent.innerHTML = `
      <span class="close-modal" id="close-share-modal">&times;</span>
      <h2>Share Your Reading</h2>
      
      <div class="form-group">
        <label for="share-email">Email Address</label>
        <input type="email" id="share-email" class="form-control" placeholder="friend@example.com">
      </div>
      
      <div class="form-group">
        <label for="share-message">Personal Message (Optional)</label>
        <textarea id="share-message" class="form-control" rows="3" placeholder="I thought you might find this tarot reading interesting..."></textarea>
      </div>
      
      <div class="share-social">
        <h4>Or share via:</h4>
        <div class="social-buttons">
          <button class="btn social-btn" id="share-facebook"><i class="fab fa-facebook-f"></i> Facebook</button>
          <button class="btn social-btn" id="share-twitter"><i class="fab fa-twitter"></i> Twitter</button>
          <button class="btn social-btn" id="share-link"><i class="fas fa-link"></i> Copy Link</button>
        </div>
      </div>
      
      <button class="btn btn-primary btn-block" id="share-submit-btn">Send Email</button>
    `;
    
    shareModal.appendChild(modalContent);
    document.body.appendChild(shareModal);
    
    // Close button event
    document.getElementById('close-share-modal').addEventListener('click', () => {
      shareModal.classList.remove('active');
    });
    
    // Close when clicking outside
    shareModal.addEventListener('click', (e) => {
      if (e.target === shareModal) {
        shareModal.classList.remove('active');
      }
    });
    
    // Email submit button
    document.getElementById('share-submit-btn').addEventListener('click', () => {
      const email = document.getElementById('share-email').value;
      const message = document.getElementById('share-message').value;
      
      if (!email) {
        showToast('Please enter an email address', 'error');
        return;
      }
      
      // In real implementation, this would send the email via a serverless function
      showToast('Sharing via email is not implemented in this demo', 'info');
      shareModal.classList.remove('active');
    });
    
    // Social sharing buttons
    document.getElementById('share-facebook').addEventListener('click', () => {
      // In real implementation, this would open Facebook sharing
      showToast('Facebook sharing is not implemented in this demo', 'info');
    });
    
    document.getElementById('share-twitter').addEventListener('click', () => {
      // In real implementation, this would open Twitter sharing
      showToast('Twitter sharing is not implemented in this demo', 'info');
    });
    
    document.getElementById('share-link').addEventListener('click', () => {
      // In real implementation, this would generate and copy a unique link
      navigator.clipboard.writeText('https://mysticinsights.netlify.app/shared-reading/demo')
        .then(() => {
          showToast('Link copied to clipboard', 'success');
        })
        .catch(() => {
          showToast('Failed to copy link', 'error');
        });
    });
  }
  
  // Show modal
  shareModal.classList.add('active');
}
