document.addEventListener("DOMContentLoaded", () => {
  // Logo typewriter effect in the hero section
  const logoText = document.getElementById("logoText");
  const logoCursor = document.getElementById("logo-cursor");
  const rootAccessText = "ROOT ACCESS";
  let logoIndex = 0;
  const logoSpeed = 120; // Speed for logo typing (slower than tagline)
  
  // Initially show the cursor
  logoCursor.style.display = "inline-block";
  
  function typeLogo() {
    if (logoIndex < rootAccessText.length) {
      logoText.innerHTML += rootAccessText.charAt(logoIndex);
      logoIndex++;
      setTimeout(typeLogo, logoSpeed);
    } else {
      // Typing complete, add glow effect
      setTimeout(() => {
        logoText.classList.add("glow");
        // Keep the cursor visible
        logoCursor.style.display = "inline-block";
      }, 500);
    }
  }

  // Start logo typing with a shorter delay since it's in the hero
  setTimeout(typeLogo, 800);
  
  // Tagline typewriter effect
  const taglineText = "We don't just build software. We launch revolutions. From AI to energy drinks, it's all code to us.";
  let taglineIndex = 0;
  const taglineSpeed = 40;
  const tagline = document.getElementById("tagline");

  function typeTagline() {
    if (taglineIndex < taglineText.length) {
      tagline.innerHTML += taglineText.charAt(taglineIndex);
      taglineIndex++;
      setTimeout(typeTagline, taglineSpeed);
    }
  }

  // Start tagline typing after logo is complete
  setTimeout(typeTagline, 800 + (rootAccessText.length * logoSpeed) + 500);

  // Pricing Calculator Functionality
  const complexitySlider = document.getElementById("complexity");
  const featuresSlider = document.getElementById("features");
  const speedSlider = document.getElementById("speed");
  const complexityValue = document.getElementById("complexityValue");
  const featuresValue = document.getElementById("featuresValue");
  const speedValue = document.getElementById("speedValue");
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");
  const priceSliderFill = document.getElementById("priceSliderFill");
  const priceSliderThumb = document.getElementById("priceSliderThumb");
  const traditionalTime = document.getElementById("traditionalTime");
  const rootaccessTime = document.getElementById("rootaccessTime");
  const featuresIncluded = document.getElementById("featuresIncluded");
  const recommendedApproach = document.getElementById("recommendedApproach");
  const platformOptions = document.querySelectorAll('input[name="platform"]');
  
  // Pricing constants (adjusted for wider scale)
  const BASE_PRICE_MIN = 500; // Starting at $500
  const BASE_PRICE_MAX = 500000; // Up to $500,000
  
  // Define weightings for each category (Speed, Features, Complexity)
  const SPEED_WEIGHT = 0;  // Speed doesn't affect price
  const FEATURES_WEIGHT = 0.5;  // 50% influence on price
  const COMPLEXITY_WEIGHT = 0.5;  // 50% influence on price
  
  // Normalize input to scale between 0 and 1
  const normalizeInput = (input, max) => {
    return input / max;
  };
  
  // Platform multiplier still applied after base calculation
  const PLATFORM_MULTIPLIER = {
    web: 1.0,  // Basic website - baseline
    mobile: 1.6,  // Mobile app
    desktop: 1.4,  // Desktop app
    ecommerce_basic: 0.8,  // Basic E-commerce (Shopify/WooCommerce): $10,000 - $30,000
    ecommerce_advanced: 1.8,  // Advanced E-commerce (Custom Build): $30,000 - $100,000
    webapp_small: 1.6,  // Small to Medium Web App: $25,000 - $100,000
    webapp_large: 3.0,  // Large Custom Web App: $100,000 - $500,000+
    custom_basic: 1.2,  // Custom Website (Basic): $15,000 - $50,000
    custom_high: 2.0,  // High-End Custom Website: $50,000 - $250,000
    pwa_basic: 1.4,  // Basic PWA: $20,000 - $50,000
    pwa_advanced: 2.0   // Advanced PWA: $50,000 - $150,000
  };
  
  // Project tiers based on price ranges and new platform types
  const PROJECT_TIERS = [
    { name: "Basic Website", max: 15000 },
    { name: "Basic E-commerce", max: 30000 },
    { name: "Custom Website (Basic)", max: 50000 },
    { name: "Small to Medium Web App", max: 100000 },
    { name: "Advanced E-commerce", max: 100000 },
    { name: "Advanced PWA", max: 150000 },
    { name: "High-End Custom Website", max: 250000 },
    { name: "Large Custom Web App", max: 500000 }
  ];
  
  // Feature sets based on feature count
  const FEATURE_SETS = [
    "User authentication",
    "User authentication, Basic dashboard",
    "User authentication, Basic dashboard, Simple database",
    "User authentication, Dashboard, Database, API integration",
    "User authentication, Dashboard, Database, API integration, Admin panel",
    "User authentication, Dashboard, Database, API integration, Admin panel, Reports",
    "User authentication, Dashboard, Database, API integration, Admin panel, Reports, Search functionality",
    "User authentication, Dashboard, Database, API integration, Admin panel, Reports, Search functionality, File uploads",
    "User authentication, Dashboard, Database, API integration, Admin panel, Reports, Search functionality, File uploads, Notifications",
    "User authentication, Dashboard, Database, API integration, Admin panel, Reports, Search functionality, File uploads, Notifications, Payment processing"
  ];
  
  // Complexity labels
  const COMPLEXITY_LABELS = ["Very Simple", "Simple", "Medium", "Complex", "Very Complex"];
  
  // Speed labels
  const SPEED_LABELS = ["Standard", "Normal", "Urgent"];
  
  // Timeframe estimates based on complexity and speed
  const TIMEFRAME_TRADITIONAL = [
    ["4-6 weeks", "6-8 weeks", "8-12 weeks", "12-16 weeks", "16-24 weeks"],
    ["3-5 weeks", "5-7 weeks", "7-10 weeks", "10-14 weeks", "14-20 weeks"],
    ["2-4 weeks", "4-6 weeks", "6-8 weeks", "8-12 weeks", "12-18 weeks"]
  ];
  
  const TIMEFRAME_ROOTACCESS = [
    ["2-3 weeks", "3-4 weeks", "4-6 weeks", "6-8 weeks", "8-12 weeks"],
    ["2 weeks", "2-3 weeks", "3-5 weeks", "5-7 weeks", "7-10 weeks"],
    ["2 weeks", "2-3 weeks", "3-4 weeks", "4-6 weeks", "6-8 weeks"]
  ];
  
  // Recommendation approaches based on complexity and features
  const APPROACHES = [
    "Quick MVP",
    "AI-Accelerated MVP",
    "Premium MVP",
    "Custom Development",
    "Enterprise Solution"
  ];
  
  // Define the Base Prices and Price Ranges for each platform type
  const platformPrices = {
    basicWebsite: { basePrice: 500, priceRange: 4500 },
    customWebsite: { basePrice: 1500, priceRange: 8500 },
    highEndCustom: { basePrice: 5000, priceRange: 20000 },
    basicEcommerce: { basePrice: 2500, priceRange: 12500 },
    advancedEcommerce: { basePrice: 5000, priceRange: 20000 },
    smallMediumWebApp: { basePrice: 5000, priceRange: 25000 },
    largeCustomWebApp: { basePrice: 7500, priceRange: 42500 },
    mobileApp: { basePrice: 6000, priceRange: 34000 },
    desktopApp: { basePrice: 7500, priceRange: 42500 },
    basicPWA: { basePrice: 3000, priceRange: 12000 },
    advancedPWA: { basePrice: 6000, priceRange: 24000 }
  };

  // Update calculator values based on inputs
  function updateCalculator() {
    // Get current values
    const complexity = parseInt(complexitySlider.value);
    const features = parseInt(featuresSlider.value);
    let platformValue = "basicWebsite";
    
    // Get selected platform
    platformOptions.forEach(option => {
      if (option.checked) {
        platformValue = option.value;
      }
    });
    
    // Update display values
    complexityValue.textContent = COMPLEXITY_LABELS[complexity - 1];
    featuresValue.textContent = features;
    
    // Calculate price using the previous algorithm
    // Normalize the inputs
    const featuresNormalized = normalizeInput(features, 10); // Features goes from 1-10
    const complexityNormalized = normalizeInput(complexity, 5); // Complexity goes from 1-5
    
    // Calculate weighted score (without speed)
    const weightedScore = (featuresNormalized * FEATURES_WEIGHT) +
                        (complexityNormalized * COMPLEXITY_WEIGHT);
    
    // Calculate base price based on the weighted score
    const priceRange = BASE_PRICE_MAX - BASE_PRICE_MIN;
    let basePrice = BASE_PRICE_MIN + (priceRange * weightedScore);
    
    // Apply platform multiplier
    const platformMultiplier = PLATFORM_MULTIPLIER[platformValue];
    const adjustedEstimate = basePrice * platformMultiplier;
    
    // Cap at maximum price and round to nearest thousand
    const cappedEstimate = Math.min(BASE_PRICE_MAX, Math.round(adjustedEstimate / 1000) * 1000);
    
    // Create a price range around the estimate
    const minEstimate = Math.round(cappedEstimate * 0.9 / 1000) * 1000;
    const maxEstimate = Math.min(BASE_PRICE_MAX, Math.round(cappedEstimate * 1.1 / 1000) * 1000);
    
    // Update price display with proper formatting
    minPrice.textContent = "$" + minEstimate.toLocaleString();
    maxPrice.textContent = "$" + maxEstimate.toLocaleString();
    
    // Calculate the logarithmic position on the price slider (for better visualization)
    // Using logarithmic scale for the slider to better visualize the wide price range
    const minLog = Math.log(BASE_PRICE_MIN);
    const maxLog = Math.log(BASE_PRICE_MAX);
    const priceLog = Math.log(cappedEstimate);
    
    // Convert to percentage position (0-100%)
    const fillPercent = ((priceLog - minLog) / (maxLog - minLog)) * 100;
    
    // Update slider fill and thumb position
    priceSliderFill.style.width = `${fillPercent}%`;
    priceSliderThumb.style.left = `${fillPercent}%`;
    
    // Update timeframes
    traditionalTime.textContent = TIMEFRAME_TRADITIONAL[speed - 1][complexity - 1];
    rootaccessTime.textContent = TIMEFRAME_ROOTACCESS[speed - 1][complexity - 1];
    
    // Update features included
    featuresIncluded.textContent = FEATURE_SETS[features - 1];
    
    // Update recommended approach based on price tier
    const tier = PROJECT_TIERS.findIndex(tier => cappedEstimate <= tier.max);
    recommendedApproach.textContent = tier >= 0 ? PROJECT_TIERS[tier].name : PROJECT_TIERS[PROJECT_TIERS.length - 1].name;
  }
  
  // Set up event listeners for calculator inputs
  if (complexitySlider && featuresSlider && speedSlider) {
    // Initial calculation
    updateCalculator();
    
    // Listen for changes
    complexitySlider.addEventListener("input", updateCalculator);
    featuresSlider.addEventListener("input", updateCalculator);
    speedSlider.addEventListener("input", updateCalculator);
    
    platformOptions.forEach(option => {
      option.addEventListener("change", updateCalculator);
    });
  }

  // Audio player functionality
  const audioPlayers = document.querySelectorAll('.audio-player');
  let currentlyPlaying = null;

  audioPlayers.forEach(player => {
    const playButton = player.querySelector('.play-button');
    const audio = player.querySelector('audio');
    const progressBar = player.querySelector('.progress-bar');
    const progressContainer = player.querySelector('.progress-container');

    // Update progress as audio plays
    audio.addEventListener('timeupdate', () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = `${progress}%`;
    });

    // Reset progress when audio ends
    audio.addEventListener('ended', () => {
      progressBar.style.width = '0%';
      playButton.classList.remove('playing');
      player.classList.remove('playing');
    });

    // Play/Pause toggle
    playButton.addEventListener('click', () => {
      // If another audio is playing, pause it
      if (currentlyPlaying && currentlyPlaying !== audio) {
        currentlyPlaying.pause();
        const otherPlayer = currentlyPlaying.closest('.audio-player');
        const otherButton = otherPlayer.querySelector('.play-button');
        otherButton.classList.remove('playing');
        otherPlayer.classList.remove('playing');
      }

      if (audio.paused) {
        audio.play()
          .then(() => {
            playButton.classList.add('playing');
            player.classList.add('playing');
            currentlyPlaying = audio;
          })
          .catch(error => {
            console.error('Error playing audio:', error);
          });
      } else {
        audio.pause();
        playButton.classList.remove('playing');
        player.classList.remove('playing');
        currentlyPlaying = null;
      }
    });

    // Click on progress bar to seek
    progressContainer.addEventListener('click', (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pos * audio.duration;
    });

    // Add cool glitch effect on hover
    playButton.addEventListener('mouseenter', () => {
      const randomDelay = Math.random() * 0.5;
      playButton.style.transition = `all 0.1s ease, transform ${randomDelay}s ease, box-shadow ${randomDelay}s ease`;
      playButton.style.transform = 'scale(1.1)';
    });

    playButton.addEventListener('mouseleave', () => {
      playButton.style.transition = 'all 0.3s ease';
      playButton.style.transform = 'scale(1)';
    });
  });

  // Discord Chat Functionality
  const chatForm = document.getElementById('chatForm');
  const messageContent = document.getElementById('messageContent');
  const userName = document.getElementById('userName');
  const chatMessages = document.getElementById('chatMessages');
  const floatingChatButton = document.getElementById('floatingChatButton');

  // Discord webhook URL - Use Netlify proxy to avoid CORS issues
  // This will be redirected via netlify.toml to the actual Discord webhook
  const DISCORD_WEBHOOK_URL = '/api/discord-webhook';

  // Handle the floating chat button
  if (floatingChatButton) {
    floatingChatButton.addEventListener('click', () => {
      const discordChat = document.getElementById('discord-chat');
      discordChat.scrollIntoView({ behavior: 'smooth' });
      
      // Pulse effect
      const chatInterface = document.querySelector('.discord-chat-interface');
      chatInterface.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.5)';
      setTimeout(() => {
        chatInterface.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.15)';
      }, 1000);
      
      // Focus the message input
      setTimeout(() => {
        userName.focus();
      }, 1000);
    });
  }

  // Handle autogrowing textarea
  if (messageContent) {
    messageContent.addEventListener('input', function() {
      this.style.height = 'auto';
      const newHeight = Math.min(this.scrollHeight, 100);
      this.style.height = newHeight + 'px';
    });
  }

  // Handle form submission
  if (chatForm) {
    chatForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = userName.value.trim();
      const message = messageContent.value.trim();
      
      if (!name || !message) {
        return;
      }
      
      // Add message to the chat display
      const userMessageElement = document.createElement('div');
      userMessageElement.className = 'chat-message user';
      userMessageElement.innerHTML = `
        <span class="message-author">${name}</span>
        <span class="message-content">${message}</span>
      `;
      chatMessages.appendChild(userMessageElement);
      
      // Scroll to bottom of chat
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      // Clear the text input
      messageContent.value = '';
      messageContent.style.height = '2.5rem';
      
      try {
        // Send message to Discord webhook
        await sendToDiscord(name, message);
        
        // Add system confirmation
        setTimeout(() => {
          const confirmationElement = document.createElement('div');
          confirmationElement.className = 'chat-message system';
          confirmationElement.innerHTML = `
            <span class="message-content">Message sent to our team! We'll get back to you on Discord.</span>
          `;
          chatMessages.appendChild(confirmationElement);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 500);
        
      } catch (error) {
        console.error('Error sending message to Discord:', error);
        
        // Add error message
        const errorElement = document.createElement('div');
        errorElement.className = 'chat-message system';
        errorElement.innerHTML = `
          <span class="message-content">Error sending message. Please try again later or contact us directly at contact@rootaccess.design</span>
        `;
        chatMessages.appendChild(errorElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    });
  }

  // Function to send message to Discord webhook
  async function sendToDiscord(name, message) {
    try {
      // Using the Netlify proxy to avoid CORS issues
      // NOTE: This is more secure than exposing the webhook URL in client-side code
      console.log('Sending message to Discord:', { name, message });
      
      const payload = {
        username: `${name} (via website)`,
        content: message,
        // You can also use embeds for richer messages
        embeds: [{
          title: 'Message from Website',
          description: message,
          color: 65535, // Cyan color in decimal
          timestamp: new Date().toISOString(),
          footer: {
            text: 'Root Access Website Chat'
          },
          author: {
            name: name
          }
        }]
      };
      
      console.log('Request payload:', JSON.stringify(payload));
      
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      console.log('Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Discord API error details:', errorData);
        
        // Add error message to UI with more details
        const errorElement = document.createElement('div');
        errorElement.className = 'chat-message system';
        errorElement.innerHTML = `
          <span class="message-content">Error (${response.status}): ${response.statusText}. Please try again or contact us directly.</span>
        `;
        chatMessages.appendChild(errorElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        throw new Error(`Failed to send message to Discord: ${response.status} ${response.statusText}`);
      }
      
      return { success: true };
      
    } catch (error) {
      console.error('Error sending to Discord:', error.message);
      
      // Show the specific error in the UI
      const errorElement = document.createElement('div');
      errorElement.className = 'chat-message system';
      errorElement.innerHTML = `
        <span class="message-content">Error: ${error.message}. Please try again later or contact us directly at contact@rootaccess.design</span>
      `;
      chatMessages.appendChild(errorElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      throw error;
    }
  }

  // Add some simulated typing and responses for demo purposes
  setTimeout(() => {
    const typingElement = document.createElement('div');
    typingElement.className = 'chat-message bot';
    typingElement.innerHTML = `
      <span class="message-author">DevTeam</span>
      <span class="message-content">We use artificial intelligence to speed up development dramatically. How can we help you today?</span>
    `;
    if (chatMessages) {
      chatMessages.appendChild(typingElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }, 3000);
});