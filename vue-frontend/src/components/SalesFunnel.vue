<template>
  <div class="sales-funnel" v-if="funnelData" :style="cssVars">
    <!-- Main Content Area -->
    <div class="funnel-container">
      
      <!-- Left Side - Video and Mobile App Preview -->
      <div class="left-section">
        <!-- Video Player Area -->
        <div class="video-container">
          <div class="video-player">
            <video v-if="funnelData.videoUrl" :src="funnelData.videoUrl" controls>
              Your browser does not support the video tag.
            </video>
            <div v-else class="video-placeholder">
              <div class="play-button">▶</div>
            </div>
          </div>
        </div>

        <!-- Mobile App Preview -->
        <div class="mobile-preview" v-if="funnelData.mobileApp">
          <div class="mobile-device">
            <div class="mobile-screen">
              <div class="mobile-status-bar">
                <span class="time">9:41</span>
                <div class="signal-indicators">
                  <span class="signal-dots">●●●</span>
                  <span class="battery">🔋 100%</span>
                </div>
              </div>
              
              <div class="mobile-content">
                <div class="app-icon">
                  <div class="reddit-icon">📱</div>
                </div>
                
                <h3 class="mobile-title">{{ funnelData.mobileApp.title }}</h3>
                <p class="mobile-subtitle">{{ funnelData.mobileApp.subtitle }}</p>
                
                <div class="mobile-cta">
                  <h4>{{ funnelData.mobileApp.description }}</h4>
                  <p class="mobile-description">{{ funnelData.mobileApp.features }}</p>
                </div>

                <div class="mobile-features" v-if="funnelData.whatYoullMaster">
                  <h5>WHAT YOU'LL MASTER:</h5>
                  <ul>
                    <li v-for="feature in funnelData.whatYoullMaster" :key="feature">
                      ✓ {{ feature }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Main Content -->
      <div class="right-section">
        <!-- Header -->
        <div class="funnel-header">
          <h1 class="main-title">
            {{ funnelData.title }}
            <span class="subtitle-text">{{ funnelData.subtitle }}</span>
          </h1>
          <h2 class="description">{{ funnelData.description }}</h2>
          <p class="content-text">{{ funnelData.content }}</p>
        </div>

        <!-- Lead Capture Form -->
        <div class="lead-form">
          <!-- Paid Product Form - Custom form that redirects to Stripe -->
          <form v-if="funnelData.stripeUrl" @submit.prevent="submitForm">
            <div class="form-fields">
              <input 
                v-for="field in funnelData.formFields" 
                :key="field.name"
                :type="field.type"
                :placeholder="field.placeholder"
                :required="field.required"
                v-model="formData[field.name]"
                class="form-input"
              />
            </div>
            <button type="submit" class="cta-button" :disabled="isSubmitting">
              <span v-if="isSubmitting">Submitting...</span>
              <span v-else>{{ funnelData.ctaText }}</span>
            </button>
          </form>
          
          <!-- Free Lead Magnet - MailerLite Popup -->
          <div v-else-if="funnelData.mailerLiteEmbedId" class="mailerlite-popup-form">
            <div v-html="mailerLiteButtonHTML"></div>
            <p class="form-description">{{ funnelData.description }}</p>
            
            <!-- Debug info (can be removed later) -->
            <div class="debug-info" style="background: rgba(0,255,0,0.1); padding: 1rem; margin-top: 1rem; border-radius: 4px;">
              <p style="color: #4ade80; margin: 0;"><strong>✅ Using MailerLite Raw HTML</strong></p>
              <p style="color: #ccc; margin: 0.5rem 0 0 0; font-size: 0.9rem;">Form ID: {{ funnelData.mailerLiteEmbedId }}</p>
              <p style="color: #ccc; margin: 0.5rem 0 0 0; font-size: 0.8rem;">HTML: {{ mailerLiteButtonHTML }}</p>
              
              <!-- Advanced Debug -->
              <div style="margin-top: 1rem; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 4px;">
                <p style="color: #ff9800; margin: 0 0 0.5rem 0; font-weight: bold;">🔍 Debug Info:</p>
                <p style="color: #ccc; margin: 0; font-size: 0.8rem;">window.ml exists: {{ typeof window !== 'undefined' && typeof window.ml !== 'undefined' ? 'YES ✅' : 'NO ❌' }}</p>
                <p style="color: #ccc; margin: 0; font-size: 0.8rem;">ml type: {{ typeof window !== 'undefined' ? typeof window.ml : 'N/A' }}</p>
                <button @click="runDebugTests" style="background: #ff9800; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; margin-top: 0.5rem; cursor: pointer;">
                  Run Debug Tests
                </button>
              </div>
            </div>
          </div>
          
          <!-- Fallback for funnels without forms configured -->
          <div v-else class="fallback-form">
            <p>{{ funnelData.description }}</p>
            <button class="cta-button" @click="goToThankYou">
              {{ funnelData.ctaText }}
            </button>
          </div>
        </div>

        <!-- Benefits Grid -->
        <div class="benefits-grid" v-if="funnelData.benefits">
          <div 
            v-for="benefit in funnelData.benefits" 
            :key="benefit.title"
            class="benefit-card"
          >
            <h4 class="benefit-title">{{ benefit.title }}</h4>
            <p class="benefit-description">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="testimonials-section" v-if="funnelData.testimonials">
      <h2 class="testimonials-title">{{ funnelData.socialProofTitle }}</h2>
      <div class="testimonials-grid">
        <div 
          v-for="testimonial in funnelData.testimonials" 
          :key="testimonial.name"
          class="testimonial-card"
        >
          <div class="testimonial-avatar">{{ testimonial.initials }}</div>
          <blockquote class="testimonial-quote">"{{ testimonial.quote }}"</blockquote>
          <div class="testimonial-author">
            <span class="author-name">- {{ testimonial.name }}</span>
            <span class="author-title">{{ testimonial.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to Home -->
    <div class="back-to-home">
      <router-link to="/funnels" class="back-button">
        {{ funnelData.backToHomeText }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalesFunnel',
  props: {
    funnelId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      funnelData: null,
      formData: {},
      isSubmitting: false
    }
  },
  computed: {
    cssVars() {
      if (!this.funnelData || !this.funnelData.primaryColor) {
        return {
          '--primary-color': '#ff4444',
          '--primary-color-dark': '#cc3333',
          '--primary-color-light': '#ff6666',
          '--primary-color-alpha': 'rgba(255, 68, 68, 0.1)',
          '--primary-color-shadow': 'rgba(255, 68, 68, 0.3)'
        }
      }
      
      const primaryColor = this.funnelData.primaryColor;
      // Convert hex to RGB for alpha variations
      const r = parseInt(primaryColor.slice(1, 3), 16);
      const g = parseInt(primaryColor.slice(3, 5), 16);
      const b = parseInt(primaryColor.slice(5, 7), 16);
      
      // Create darker and lighter variants
      const darkerColor = `rgb(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)})`;
      const lighterColor = `rgb(${Math.min(255, r + 40)}, ${Math.min(255, g + 40)}, ${Math.min(255, b + 40)})`;
      
      return {
        '--primary-color': primaryColor,
        '--primary-color-dark': darkerColor,
        '--primary-color-light': lighterColor,
        '--primary-color-alpha': `rgba(${r}, ${g}, ${b}, 0.1)`,
        '--primary-color-shadow': `rgba(${r}, ${g}, ${b}, 0.3)`
      }
    },
    mailerLiteButtonHTML() {
      if (!this.funnelData || !this.funnelData.mailerLiteEmbedId) {
        return ''
      }
      
      return `<button class="cta-button ml-onclick-form" onclick="ml('show', '${this.funnelData.mailerLiteEmbedId}', true)">${this.funnelData.ctaText}</button>`
    }
  },
  async created() {
    await this.loadFunnelData()
  },
  methods: {
    async loadFunnelData() {
      try {
        const response = await fetch('/salesFunnels.json')
        const data = await response.json()
        this.funnelData = data.salesFunnels.find(funnel => funnel.id === this.funnelId)
        
        // Initialize form data
        if (this.funnelData && this.funnelData.formFields) {
          this.formData = {}
          this.funnelData.formFields.forEach(field => {
            this.formData[field.name] = ''
          })
        }
      } catch (error) {
        console.error('Error loading funnel data:', error)
      }
    },
    async submitForm() {
      if (this.isSubmitting) return // Prevent double submission
      
      this.isSubmitting = true
      
      try {
        // This method is now only for paid products with Stripe URLs
        if (this.funnelData.stripeUrl) {
          this.handleStripeCheckout()
        } else {
          // This shouldn't happen with the new template logic, but just in case
          console.warn('submitForm called for non-Stripe funnel')
          this.goToThankYou()
        }
      } catch (error) {
        console.error('Form submission error:', error)
        alert('There was an error submitting the form. Please try again.')
      } finally {
        this.isSubmitting = false
      }
    },
    handleStripeCheckout() {
      // Use the stripeUrl from the JSON configuration
      const stripeUrl = this.funnelData.stripeUrl
      
      if (stripeUrl) {
        // Create URL with prefilled email and client reference ID
        const params = new URLSearchParams({
          prefilled_email: this.formData.email,
          client_reference_id: this.funnelId
        })
        
        // Redirect to Stripe with prefilled data
        window.location.href = `${stripeUrl}?${params.toString()}`
      } else {
        console.error('No Stripe URL configured for this funnel')
        alert('Payment processing unavailable. Please try again later.')
      }
    },
    goToThankYou() {
      this.$router.push({
        path: '/thank-you',
        query: { funnel: this.funnelId }
      })
    },
    runDebugTests() {
      // Implement the logic to run debug tests
      console.log('Running debug tests...')
    }
  }
}
</script>

<style scoped>
.sales-funnel {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #ffffff;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.funnel-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

/* Left Section */
.left-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.video-container {
  background: #2a2a2a;
  border-radius: 12px;
  border: 2px dashed #4a90e2;
  padding: 2rem;
  text-align: center;
}

.video-player {
  width: 100%;
  aspect-ratio: 16/9;
  background: #000;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.video-player video {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.video-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-button {
  width: 80px;
  height: 80px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.play-button:hover {
  transform: scale(1.1);
  background: var(--primary-color-dark);
}

/* Mobile Preview */
.mobile-preview {
  display: flex;
  justify-content: center;
}

.mobile-device {
  width: 280px;
  height: 480px;
  background: #1a1a1a;
  border-radius: 25px;
  padding: 8px;
  border: 3px solid #333;
}

.mobile-screen {
  width: calc(100% - 32px);
  height: calc(100% - 32px);
  background: #2a2a2a;
  border-radius: 20px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.mobile-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.signal-indicators {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.mobile-content {
  flex: 1;
  text-align: center;
}

.app-icon {
  margin-bottom: 1rem;
}

.reddit-icon {
  width: 60px;
  height: 60px;
  background: var(--primary-color);
  border-radius: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.mobile-title {
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: bold;
  margin: 0.5rem 0;
  text-align: center;
}

.mobile-subtitle {
  font-size: 0.75rem;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.mobile-cta h4 {
  color: var(--primary-color);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.mobile-description {
  font-size: 0.75rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}

.mobile-features h5 {
  color: var(--primary-color);
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.mobile-features ul {
  list-style: none;
  padding: 0;
  font-size: 0.7rem;
  line-height: 1.3;
}

.mobile-features li {
  margin-bottom: 0.3rem;
  text-align: left;
}

/* Right Section */
.right-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.funnel-header {
  text-align: left;
}

.main-title {
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.subtitle-text {
  color: var(--primary-color);
  display: block;
}

.description {
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.content-text {
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 2rem;
}

/* Form */
.lead-form {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.mailerlite-popup-form {
  text-align: center;
}

.form-description {
  color: var(--primary-color);
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 0;
}

.fallback-form {
  text-align: center;
}

.fallback-form p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  opacity: 0.9;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-input {
  padding: 1rem;
  border: 2px solid #444;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.cta-button {
  width: 100%;
  padding: 1.2rem 2rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-dark) 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--primary-color-shadow);
}

.cta-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.cta-button:disabled:hover {
  transform: none;
  box-shadow: none;
}

/* Benefits Grid */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.benefit-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: background 0.3s ease;
}

.benefit-card:hover {
  background: var(--primary-color-alpha);
}

.benefit-title {
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.benefit-description {
  font-size: 0.9rem;
  opacity: 0.8;
  line-height: 1.4;
}

/* Testimonials */
.testimonials-section {
  background: rgba(0, 0, 0, 0.3);
  padding: 4rem 2rem;
  margin-top: 4rem;
}

.testimonials-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--primary-color);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.testimonial-avatar {
  width: 80px;
  height: 80px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin: 0 auto 1.5rem;
}

.testimonial-quote {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.author-name {
  color: var(--primary-color);
  font-weight: bold;
  display: block;
}

.author-title {
  font-size: 0.9rem;
  opacity: 0.8;
  display: block;
  margin-top: 0.3rem;
}

/* Back to Home */
.back-to-home {
  text-align: center;
  padding: 3rem 0;
}

.back-button {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: background 0.3s ease;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .funnel-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1rem;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .benefits-grid {
    grid-template-columns: 1fr;
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
  
  .mobile-preview {
    order: -1;
  }
}
</style> 