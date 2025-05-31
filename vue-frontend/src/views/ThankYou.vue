<template>
  <div class="thank-you-page" :style="dynamicStyles">
    <div class="container">
      <div class="confetti-container" ref="confettiContainer"></div>
      
      <!-- Success Icon -->
      <div class="success-icon-container">
        <div class="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <!-- Thank You Content -->
      <div class="thank-you-content" v-if="funnelData">
        <h1 class="main-title">{{ getThankYouTitle() }}</h1>
        <h2 class="subtitle">{{ getThankYouSubtitle() }}</h2>
        <p class="description">{{ getThankYouDescription() }}</p>

        <!-- Next Steps Section -->
        <div class="next-steps-card">
          <h3 class="steps-title">What Happens Next?</h3>
          <div class="steps-list">
            <div v-for="(step, index) in getNextSteps()" :key="index" class="step-item">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <h4>{{ step.title }}</h4>
                <p>{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bonus Section (for paid products) -->
        <div v-if="isPaidFunnel() && getBonuses().length > 0" class="bonus-section">
          <h3 class="bonus-title">Your Exclusive Access</h3>
          <div class="bonus-grid">
            <div v-for="(bonus, index) in getBonuses()" :key="index" class="bonus-card">
              <h4>{{ bonus.title }}</h4>
              <p>{{ bonus.description }}</p>
            </div>
          </div>
        </div>

        <!-- Download Section (for digital products) -->
        <div v-if="isDigitalProduct()" class="download-section">
          <h3 class="download-title">Your Download Links</h3>
          <div class="download-grid">
            <div v-for="(download, index) in getDownloadLinks()" :key="index" class="download-card">
              <h4>{{ download.title }}</h4>
              <p>{{ download.description }}</p>
              <p v-if="download.size" class="file-size">File Size: {{ download.size }}</p>
              <a :href="download.url" target="_blank" class="download-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                Download Now
              </a>
            </div>
          </div>
        </div>

        <!-- Back Navigation -->
        <div class="navigation">
          <router-link to="/funnels" class="back-button">
            Back to Funnels
          </router-link>
          <router-link to="/" class="home-button">
            Back to Home
          </router-link>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="loading">
        <div class="loading-spinner"></div>
        Loading...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThankYou',
  data() {
    return {
      funnelData: null,
      funnelId: null
    }
  },
  async created() {
    this.funnelId = this.$route.query.funnel
    if (this.funnelId) {
      await this.loadFunnelData()
      setTimeout(() => {
        this.createConfetti()
      }, 500)
    }
  },
  computed: {
    dynamicStyles() {
      if (!this.funnelData) return {}
      
      const color = this.funnelData.primaryColor
      return {
        '--primary-color': color,
        '--primary-rgb': this.hexToRgb(color),
        '--primary-dark': this.darkenHex(color, 20),
        '--primary-light': this.lightenHex(color, 20),
        '--primary-alpha': `${this.hexToRgb(color)}, 0.1`
      }
    }
  },
  methods: {
    async loadFunnelData() {
      try {
        const response = await fetch('/salesFunnels.json')
        const data = await response.json()
        this.funnelData = data.salesFunnels.find(funnel => funnel.id === this.funnelId)
      } catch (error) {
        console.error('Error loading funnel data:', error)
      }
    },
    
    getThankYouTitle() {
      if (this.isPaidFunnel()) {
        return "Thank You for Your Purchase!"
      }
      return "Thank You!"
    },
    
    getThankYouSubtitle() {
      if (!this.funnelData) return ''
      
      if (this.funnelId === 'upwork-proposal-mastery') {
        return "Welcome to the Community!"
      } else if (this.isDigitalProduct()) {
        return "Your Digital Empire Awaits!"
      } else {
        return `Your ${this.funnelData.title.split(':')[0]} is on the way!`
      }
    },
    
    getThankYouDescription() {
      if (this.isPaidFunnel()) {
        return "Your purchase has been processed successfully. Check your email for access details and next steps."
      }
      return "We've sent your free guide to your email inbox. Please check your email in the next few minutes."
    },
    
    getNextSteps() {
      if (!this.funnelData || !this.funnelData.nextSteps) {
        // Fallback to basic step if no nextSteps defined in JSON
        return [
          {
            title: "Check Your Email",
            description: "We've sent you important information. Check your spam folder if you don't see it within 5 minutes."
          }
        ]
      }
      return this.funnelData.nextSteps
    },
    
    getBonuses() {
      if (!this.funnelData || !this.funnelData.bonuses) {
        return []
      }
      return this.funnelData.bonuses
    },
    
    getDownloadLinks() {
      if (!this.funnelData || !this.funnelData.downloadLinks) {
        return []
      }
      return this.funnelData.downloadLinks
    },
    
    isPaidFunnel() {
      if (!this.funnelData) return false
      return this.funnelData.ctaText.includes('$') || 
             this.funnelData.ctaText.includes('PAY') || 
             this.funnelData.ctaText.includes('MONTH')
    },
    
    isDigitalProduct() {
      return this.funnelId === 'digital-products-empire-27'
    },
    
    createConfetti() {
      // Advanced confetti system based on the CodePen implementation
      const Utils = {
        parsePx: (value) => parseFloat(value.replace(/px/, "")),
        getRandomInRange: (min, max, precision = 0) => {
          const multiplier = Math.pow(10, precision);
          const randomValue = Math.random() * (max - min) + min;
          return Math.floor(randomValue * multiplier) / multiplier;
        },
        getRandomItem: (array) => array[Math.floor(Math.random() * array.length)],
        getScaleFactor: () => Math.log(window.innerWidth) / Math.log(1920),
        debounce: (func, delay) => {
          let timeout;
          return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
          };
        },
      };

      const DEG_TO_RAD = Math.PI / 180;

      const defaultConfettiConfig = {
        confettiesNumber: 200,
        confettiRadius: 6,
        confettiColors: [
          this.funnelData?.primaryColor || '#646cff',
          "#fcf403", "#62fc03", "#f4fc03", "#03e7fc", "#03fca5", "#a503fc", "#fc03ad", "#fc03c2"
        ],
        emojies: [],
        svgIcon: null,
      };

      class Confetti {
        constructor({ initialPosition, direction, radius, colors, emojis, svgIcon }) {
          const speedFactor = Utils.getRandomInRange(0.9, 1.7, 3) * Utils.getScaleFactor();
          this.speed = { x: speedFactor, y: speedFactor };
          this.finalSpeedX = Utils.getRandomInRange(0.2, 0.6, 3);
          this.rotationSpeed = emojis.length || svgIcon ? 0.01 : Utils.getRandomInRange(0.03, 0.07, 3) * Utils.getScaleFactor();
          this.dragCoefficient = Utils.getRandomInRange(0.0005, 0.0009, 6);
          this.radius = { x: radius, y: radius };
          this.initialRadius = radius;
          this.rotationAngle = direction === "left" ? Utils.getRandomInRange(0, 0.2, 3) : Utils.getRandomInRange(-0.2, 0, 3);
          this.emojiRotationAngle = Utils.getRandomInRange(0, 2 * Math.PI);
          this.radiusYDirection = "down";

          const angle = direction === "left" ? Utils.getRandomInRange(82, 15) * DEG_TO_RAD : Utils.getRandomInRange(-15, -82) * DEG_TO_RAD;
          this.absCos = Math.abs(Math.cos(angle));
          this.absSin = Math.abs(Math.sin(angle));

          const offset = Utils.getRandomInRange(-150, 0);
          const position = {
            x: initialPosition.x + (direction === "left" ? -offset : offset) * this.absCos,
            y: initialPosition.y - offset * this.absSin
          };

          this.position = { ...position };
          this.initialPosition = { ...position };
          this.color = emojis.length || svgIcon ? null : Utils.getRandomItem(colors);
          this.emoji = emojis.length ? Utils.getRandomItem(emojis) : null;
          this.svgIcon = null;

          if (svgIcon) {
            this.svgImage = new Image();
            this.svgImage.src = svgIcon;
            this.svgImage.onload = () => {
              this.svgIcon = this.svgImage;
            };
          }

          this.createdAt = Date.now();
          this.direction = direction;
        }

        draw(context) {
          const { x, y } = this.position;
          const { x: radiusX, y: radiusY } = this.radius;
          const scale = window.devicePixelRatio;

          if (this.svgIcon) {
            context.save();
            context.translate(scale * x, scale * y);
            context.rotate(this.emojiRotationAngle);
            context.drawImage(this.svgIcon, -radiusX, -radiusY, radiusX * 2, radiusY * 2);
            context.restore();
          } else if (this.color) {
            context.fillStyle = this.color;
            context.beginPath();
            context.ellipse(x * scale, y * scale, radiusX * scale, radiusY * scale, this.rotationAngle, 0, 2 * Math.PI);
            context.fill();
          } else if (this.emoji) {
            context.font = `${radiusX * scale}px serif`;
            context.save();
            context.translate(scale * x, scale * y);
            context.rotate(this.emojiRotationAngle);
            context.textAlign = "center";
            context.fillText(this.emoji, 0, radiusY / 2);
            context.restore();
          }
        }

        updatePosition(deltaTime, currentTime) {
          const elapsed = currentTime - this.createdAt;

          if (this.speed.x > this.finalSpeedX) {
            this.speed.x -= this.dragCoefficient * deltaTime;
          }

          this.position.x += this.speed.x * (this.direction === "left" ? -this.absCos : this.absCos) * deltaTime;
          this.position.y = this.initialPosition.y - this.speed.y * this.absSin * elapsed + 0.00125 * Math.pow(elapsed, 2) / 2;

          if (!this.emoji && !this.svgIcon) {
            this.rotationSpeed -= 1e-5 * deltaTime;
            this.rotationSpeed = Math.max(this.rotationSpeed, 0);

            if (this.radiusYDirection === "down") {
              this.radius.y -= deltaTime * this.rotationSpeed;
              if (this.radius.y <= 0) {
                this.radius.y = 0;
                this.radiusYDirection = "up";
              }
            } else {
              this.radius.y += deltaTime * this.rotationSpeed;
              if (this.radius.y >= this.initialRadius) {
                this.radius.y = this.initialRadius;
                this.radiusYDirection = "down";
              }
            }
          }
        }

        isVisible(canvasHeight) {
          return this.position.y < canvasHeight + 100;
        }
      }

      class ConfettiManager {
        constructor(container) {
          this.canvas = document.createElement("canvas");
          this.canvas.style = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000; pointer-events: none;";
          container.appendChild(this.canvas);
          this.context = this.canvas.getContext("2d");
          this.confetti = [];
          this.lastUpdated = Date.now();
          this.animationId = null;
          
          this.resizeHandler = Utils.debounce(() => this.resizeCanvas(), 200);
          window.addEventListener("resize", this.resizeHandler);
          this.resizeCanvas();
          this.startLoop();
        }

        resizeCanvas() {
          this.canvas.width = window.innerWidth * window.devicePixelRatio;
          this.canvas.height = window.innerHeight * window.devicePixelRatio;
        }

        addConfetti(config = {}) {
          const mergedConfig = { ...defaultConfettiConfig, ...config };
          const { confettiesNumber, confettiRadius, confettiColors, emojies, svgIcon } = mergedConfig;

          const baseY = (5 * window.innerHeight) / 7;
          for (let i = 0; i < confettiesNumber / 2; i++) {
            this.confetti.push(new Confetti({
              initialPosition: { x: 0, y: baseY },
              direction: "right",
              radius: confettiRadius,
              colors: confettiColors,
              emojis: emojies,
              svgIcon,
            }));
            this.confetti.push(new Confetti({
              initialPosition: { x: window.innerWidth, y: baseY },
              direction: "left",
              radius: confettiRadius,
              colors: confettiColors,
              emojis: emojies,
              svgIcon,
            }));
          }
        }

        startLoop() {
          const loop = () => {
            const currentTime = Date.now();
            const deltaTime = currentTime - this.lastUpdated;
            this.lastUpdated = currentTime;

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.confetti = this.confetti.filter((item) => {
              item.updatePosition(deltaTime, currentTime);
              item.draw(this.context);
              return item.isVisible(this.canvas.height);
            });

            if (this.confetti.length > 0) {
              this.animationId = requestAnimationFrame(loop);
            } else {
              this.cleanup();
            }
          };
          this.animationId = requestAnimationFrame(loop);
        }

        cleanup() {
          if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
          }
          window.removeEventListener("resize", this.resizeHandler);
          if (this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
          }
        }
      }

      // Initialize the confetti manager
      const container = this.$refs.confettiContainer;
      if (!container) return;

      // Clear any existing content
      container.innerHTML = '';

      const manager = new ConfettiManager(container);
      manager.addConfetti();

      // Cleanup after 6 seconds
      setTimeout(() => {
        manager.cleanup();
      }, 6000);
    },
    
    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result 
        ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
        : '100, 108, 255'
    },
    
    darkenHex(hex, percent) {
      const num = parseInt(hex.replace('#', ''), 16)
      const amt = Math.round(2.55 * percent)
      const R = (num >> 16) - amt
      const G = (num >> 8 & 0x00FF) - amt  
      const B = (num & 0x0000FF) - amt
      return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
    },
    
    lightenHex(hex, percent) {
      const num = parseInt(hex.replace('#', ''), 16)
      const amt = Math.round(2.55 * percent)
      const R = (num >> 16) + amt
      const G = (num >> 8 & 0x00FF) + amt
      const B = (num & 0x0000FF) + amt
      return '#' + (0x1000000 + (R > 255 ? 255 : R) * 0x10000 +
        (G > 255 ? 255 : G) * 0x100 + (B > 255 ? 255 : B)).toString(16).slice(1)
    }
  }
}
</script>

<style scoped>
.thank-you-page {
  min-height: 100vh;
  background: #0a0a0a;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  overflow-x: hidden;
}

.thank-you-page::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top left, rgba(var(--primary-rgb), 0.1), transparent 50%),
              radial-gradient(circle at bottom right, rgba(100, 108, 255, 0.05), transparent 60%);
  z-index: -1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  position: relative;
  z-index: 1;
}

.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1000;
  overflow: hidden;
}

.success-icon-container {
  text-align: center;
  margin-bottom: 3rem;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: var(--primary-color, #646cff);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 30px rgba(var(--primary-rgb), 0.5);
  animation: pulse 2s infinite;
}

.success-icon svg {
  width: 40px;
  height: 40px;
  color: white;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.thank-you-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary-color, #646cff) 0%, var(--primary-light, #747bff) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color, #646cff);
  margin-bottom: 1rem;
}

.description {
  font-size: 1.2rem;
  color: #bbb;
  margin-bottom: 3rem;
  line-height: 1.6;
}

.next-steps-card {
  background: rgba(26, 26, 26, 0.8);
  border: 1px solid rgba(var(--primary-rgb), 0.3);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;
  text-align: left;
}

.steps-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color, #646cff);
  margin-bottom: 2rem;
  text-align: center;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-number {
  background: var(--primary-color, #646cff);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 22px;
}

.step-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.step-content p {
  color: #bbb;
  line-height: 1.5;
}

.bonus-section, .download-section {
  margin-bottom: 3rem;
}

.bonus-title, .download-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color, #646cff);
  margin-bottom: 2rem;
}

.bonus-grid, .download-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.bonus-card, .download-card {
  background: rgba(31, 31, 31, 0.8);
  border: 1px solid rgba(var(--primary-rgb), 0.3);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: left;
}

.bonus-card h4, .download-card h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-color, #646cff);
  margin-bottom: 0.5rem;
}

.bonus-card p, .download-card p {
  color: #bbb;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.file-size {
  font-size: 0.9rem;
  color: var(--primary-color, #646cff);
  font-weight: 600;
  margin-bottom: 1rem !important;
}

.download-button {
  background: var(--primary-color, #646cff);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
  justify-content: center;
}

.download-button:hover {
  background: var(--primary-dark, #535bf2);
  transform: translateY(-1px);
}

.download-button svg {
  width: 16px;
  height: 16px;
}

.navigation {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 3rem;
}

.back-button, .home-button {
  background: #374151;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.back-button:hover, .home-button:hover {
  background: #4b5563;
  transform: translateY(-1px);
}

.loading {
  text-align: center;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #2a2a2a;
  border-top: 3px solid var(--primary-color, #646cff);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.5rem;
  }
  
  .bonus-grid, .download-grid {
    grid-template-columns: 1fr;
  }
  
  .navigation {
    flex-direction: column;
    align-items: center;
  }
}
</style> 