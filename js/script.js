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