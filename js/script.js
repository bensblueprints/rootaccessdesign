// Audio Player Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get all audio players
  const audioPlayers = document.querySelectorAll('.audio-player');
  
  // Add event listeners to each player
  audioPlayers.forEach(player => {
    const button = player.querySelector('.play-button');
    const audio = player.querySelector('audio');
    const progressBar = player.querySelector('.progress-bar');
    const progressContainer = player.querySelector('.progress-container');
    
    // Function to toggle play/pause
    function togglePlay() {
      if (audio.paused) {
        // Pause all other audio elements
        document.querySelectorAll('audio').forEach(a => {
          if (a !== audio && !a.paused) {
            a.pause();
            a.closest('.audio-player').querySelector('.play-button').classList.remove('playing');
          }
        });
        
        // Play this audio
        audio.play();
        button.classList.add('playing');
      } else {
        audio.pause();
        button.classList.remove('playing');
      }
    }
    
    // Update progress bar as audio plays
    audio.addEventListener('timeupdate', () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = progress + '%';
    });
    
    // Reset when audio ends
    audio.addEventListener('ended', () => {
      button.classList.remove('playing');
      progressBar.style.width = '0%';
    });
    
    // Click on progress bar to skip
    progressContainer.addEventListener('click', (e) => {
      const clickPosition = e.offsetX / progressContainer.offsetWidth;
      audio.currentTime = clickPosition * audio.duration;
    });
    
    // Play/pause button click event
    button.addEventListener('click', togglePlay);
  });
  
  // Logo typing animation
  const logoText = document.getElementById('logoText');
  if (logoText) {
    const text = "Root Access";
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        logoText.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
      }
    }, 150);
  }
  
  // Tagline typing animation
  const tagline = document.getElementById('tagline');
  if (tagline) {
    const text = "We build exceptional digital products at superhuman speed.";
    let i = 0;
    setTimeout(() => {
      const typing = setInterval(() => {
        if (i < text.length) {
          tagline.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typing);
        }
      }, 50);
    }, 1500);
  }
  
  // Cost calculator functionality
  initCalculator();
});

// Initialize the pricing calculator
function initCalculator() {
  const complexitySlider = document.getElementById('complexity');
  const featuresSlider = document.getElementById('features');
  const speedSlider = document.getElementById('speed');
  const platformRadios = document.querySelectorAll('input[name="platform"]');
  
  const complexityValue = document.getElementById('complexityValue');
  const featuresValue = document.getElementById('featuresValue');
  const speedValue = document.getElementById('speedValue');
  const minPrice = document.getElementById('minPrice');
  const maxPrice = document.getElementById('maxPrice');
  const traditionalTime = document.getElementById('traditionalTime');
  const rootaccessTime = document.getElementById('rootaccessTime');
  const priceSliderFill = document.getElementById('priceSliderFill');
  const priceSliderThumb = document.getElementById('priceSliderThumb');
  
  // Skip if calculator elements don't exist
  if (!complexitySlider) return;
  
  // Update display values
  function updateValues() {
    // Complexity labels
    const complexityLabels = ['Very Simple', 'Simple', 'Medium', 'Complex', 'Very Complex'];
    complexityValue.textContent = complexityLabels[parseInt(complexitySlider.value) - 1];
    
    // Features count
    featuresValue.textContent = featuresSlider.value;
    
    // Speed labels
    const speedLabels = ['Standard', 'Normal', 'Urgent'];
    speedValue.textContent = speedLabels[parseInt(speedSlider.value) - 1];
    
    // Calculate price based on all factors
    calculatePrice();
  }
  
  function calculatePrice() {
    // Get values
    const complexity = parseInt(complexitySlider.value);
    const features = parseInt(featuresSlider.value);
    const speed = parseInt(speedSlider.value);
    let platform = '';
    
    // Get selected platform
    platformRadios.forEach(radio => {
      if (radio.checked) {
        platform = radio.value;
      }
    });
    
    // Base prices by platform
    const basePrices = {
      'web': { min: 2000, max: 3000 },
      'custom_basic': { min: 3000, max: 4500 },
      'custom_high': { min: 5000, max: 7000 },
      'ecommerce_basic': { min: 4000, max: 6000 },
      'ecommerce_advanced': { min: 6000, max: 9000 },
      'webapp_small': { min: 5000, max: 7500 },
      'webapp_medium': { min: 7000, max: 10000 },
      'webapp_large': { min: 9000, max: 15000 },
      'pwa_basic': { min: 6000, max: 8000 },
      'pwa_advanced': { min: 8000, max: 12000 }
    };
    
    // Default to web if not found
    const basePrice = basePrices[platform] || basePrices.web;
    
    // Apply multipliers
    const complexityMultiplier = 0.8 + (complexity * 0.1);
    const featuresMultiplier = 0.8 + (features * 0.05);
    const speedMultiplier = 0.9 + (speed * 0.2);
    
    // Calculate final price
    let min = Math.round(basePrice.min * complexityMultiplier * featuresMultiplier * speedMultiplier / 100) * 100;
    let max = Math.round(basePrice.max * complexityMultiplier * featuresMultiplier * speedMultiplier / 100) * 100;
    
    // Update displayed price
    minPrice.textContent = '$' + min.toLocaleString();
    maxPrice.textContent = '$' + max.toLocaleString();
    
    // Update timeframes
    const timeframes = {
      1: { traditional: '6-8 weeks', rootaccess: '2-3 days' },
      2: { traditional: '8-12 weeks', rootaccess: '3-5 days' },
      3: { traditional: '12-16 weeks', rootaccess: '5-7 days' }
    };
    
    traditionalTime.textContent = timeframes[complexity].traditional;
    rootaccessTime.textContent = timeframes[complexity].rootaccess;
    
    // Update slider position
    const percentage = (min / basePrice.max) * 50 + 25; // Keep within 25-75% range
    priceSliderFill.style.width = percentage + '%';
    priceSliderThumb.style.left = percentage + '%';
  }
  
  // Attach event listeners
  if (complexitySlider) complexitySlider.addEventListener('input', updateValues);
  if (featuresSlider) featuresSlider.addEventListener('input', updateValues);
  if (speedSlider) speedSlider.addEventListener('input', updateValues);
  platformRadios.forEach(radio => {
    radio.addEventListener('change', updateValues);
  });
  
  // Initialize
  updateValues();
} 