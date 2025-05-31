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
          <!-- MailerLite Form - Now used for both paid and free products -->
          <div v-if="funnelData.mailerLiteEmbedId" class="mailerlite-html-form">
            <div v-html="mailerLiteFormHTML"></div>
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
      isSubmitting: false,
      capturedEmail: null
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
    mailerLiteFormHTML() {
      if (!this.funnelData || !this.funnelData.mailerLiteEmbedId) {
        return ''
      }
      
      // MailerLite form configurations for different funnels
      const mailerLiteConfigs = {
        'reddit-ranking-2025': {
          formId: '26658422',
          actionId: '155902866312136442',
          primaryColor: '#FF4444',
          primaryColorHover: '#d72d2d',
          buttonTextColor: '#ffffff'
        },
        'supplement-brand-igniter': {
          formId: '26660281',
          actionId: '155909907245171718',
          primaryColor: '#08ebec',
          primaryColorHover: '#3fc5c5',
          buttonTextColor: '#000000'
        },
        'instagram-growth-masterclass': {
          formId: '26660413',
          actionId: '155910259277301277',
          primaryColor: '#e1306c', // Instagram pink
          primaryColorHover: '#c4295a',
          buttonTextColor: '#ffffff'
        },
        'ai-jobs-guide-2025': {
          formId: '26660497',
          actionId: '155910495951390569',
          primaryColor: '#f7652f', // AI orange
          primaryColorHover: '#ae4b26',
          buttonTextColor: '#FFFFFF'
        },
        'upwork-proposal-mastery': {
          formId: '26664813',
          actionId: '155923057676911939',
          primaryColor: '#14A800', // Upwork green
          primaryColorHover: '#0c9d00',
          buttonTextColor: '#FFFFFF'
        },
        'digital-products-empire-27': {
          formId: '26665382',
          actionId: '155924399209317923',
          primaryColor: '#A855F7', // Purple
          primaryColorHover: '#9333ea',
          buttonTextColor: '#FFFFFF'
        },
        'cybersecurity-cheat-sheet': {
          formId: '26665504',
          actionId: '155924794322192107',
          primaryColor: '#00ff41', // Green
          primaryColorHover: '#00cc34',
          buttonTextColor: '#000000'
        }
      }
      
      const config = mailerLiteConfigs[this.funnelId] || mailerLiteConfigs['reddit-ranking-2025']
      const buttonText = this.funnelData.ctaText || 'GET FREE GUIDE'
      
      // Check if this is a paid product (has stripeUrl)
      const isPaidProduct = !!this.funnelData.stripeUrl
      
      return `
<style type="text/css">@import url("https://assets.mlcdn.com/fonts.css?version=1748530");</style>
<style type="text/css">
/* LOADER */
.ml-form-embedSubmitLoad {
  display: inline-block;
  width: 20px;
  height: 20px;
}

.g-recaptcha {
transform: scale(1);
-webkit-transform: scale(1);
transform-origin: 0 0;
-webkit-transform-origin: 0 0;
height: ;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}

.ml-form-embedSubmitLoad:after {
  content: " ";
  display: block;
  width: 11px;
  height: 11px;
  margin: 1px;
  border-radius: 50%;
  border: 4px solid #fff;
border-color: #ffffff #ffffff #ffffff transparent;
animation: ml-form-embedSubmitLoad 1.2s linear infinite;
}
@keyframes ml-form-embedSubmitLoad {
  0% {
  transform: rotate(0deg);
  }
  100% {
  transform: rotate(360deg);
  }
}
  #mlb2-${config.formId}.ml-form-embedContainer {
    box-sizing: border-box;
    display: table;
    margin: 0 auto;
    position: static;
    width: 100% !important;
  }
  #mlb2-${config.formId}.ml-form-embedContainer h4,
  #mlb2-${config.formId}.ml-form-embedContainer p,
  #mlb2-${config.formId}.ml-form-embedContainer span,
  #mlb2-${config.formId}.ml-form-embedContainer button {
    text-transform: none !important;
    letter-spacing: normal !important;
  }
  #mlb2-${config.formId}.ml-form-embedContainer .ml-form-embedWrapper {
    background-color: transparent;
    border-width: 0px;
    border-color: transparent;
    border-radius: 4px;
    border-style: solid;
    box-sizing: border-box;
    display: inline-block !important;
    margin: 0;
    padding: 0;
    position: relative;
          }
  #mlb2-${config.formId}.ml-form-embedContainer .ml-form-embedWrapper.embedPopup,
  #mlb2-${config.formId}.ml-form-embedContainer .ml-form-embedWrapper.embedDefault { width: 100%; }
  #mlb2-${config.formId}.ml-form-embedContainer .ml-form-embedWrapper.embedForm { max-width: 100%; width: 100%; }
  #mlb2-${config.formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody,
  #mlb2-${config.formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody {
    padding: 20px 20px 0 20px;
  }
  #mlb2-${config.formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-fieldRow input {
    background-color: rgba(255, 255, 255, 0.1) !important;
    color: #ffffff !important;
    border-color: #444 !important;
    border-radius: 8px !important;
    border-style: solid !important;
    border-width: 2px !important;
    font-family: inherit !important;
    font-size: 1rem !important;
    height: auto;
    line-height: 21px !important;
    margin-bottom: 1rem !important;
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
    padding: 1rem !important;
    width: 100% !important;
    box-sizing: border-box !important;
    max-width: 100% !important;
  }
  #mlb2-${config.formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-fieldRow input:focus {
    border-color: ${config.primaryColor} !important;
    outline: none !important;
  }
  #mlb2-${config.formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-fieldRow input::placeholder {
    color: rgba(255, 255, 255, 0.6) !important;
  }
  #mlb2-${config.formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button {
    background: ${config.primaryColor} !important;
    border: none !important;
    border-radius: 8px !important;
    box-shadow: none !important;
    color: ${config.buttonTextColor} !important;
    cursor: pointer;
    font-family: inherit !important;
    font-size: 1.1rem !important;
    font-weight: bold !important;
    line-height: 21px !important;
    height: auto;
    padding: 1.2rem 2rem !important;
    width: 100% !important;
    box-sizing: border-box !important;
    transition: transform 0.3s ease, box-shadow 0.3s ease !important;
  }
  #mlb2-${config.formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button:hover {
    background: ${config.primaryColorHover} !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(0,0,0,0.3) !important;
  }
  #mlb2-${config.formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody {
    background: rgba(0,255,0,0.1) !important;
    border: 1px solid #4ade80 !important;
    border-radius: 8px !important;
    padding: 2rem !important;
    text-align: center !important;
  }
  #mlb2-${config.formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody h4 {
    color: #4ade80 !important;
    font-size: 1.5rem !important;
    margin-bottom: 1rem !important;
  }
  #mlb2-${config.formId}.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody p {
    color: #ffffff !important;
    font-size: 1rem !important;
  }
</style>

<div id="mlb2-${config.formId}" class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-${config.formId}">
  <div class="ml-form-align-center">
    <div class="ml-form-embedWrapper embedForm">
      <div class="ml-form-embedBody ml-form-embedBodyDefault row-form">
        <form class="ml-block-form" action="https://assets.mailerlite.com/jsonp/1312118/forms/${config.actionId}/subscribe" data-code="" method="post" target="_blank">
          <div class="ml-form-formContent">
            ${!isPaidProduct ? `
            <div class="ml-form-fieldRow">
              <div class="ml-field-group ml-field-name">
                <input aria-label="name" type="text" class="form-control" name="fields[name]" placeholder="Name" autocomplete="given-name">
              </div>
            </div>` : ''}
            <div class="ml-form-fieldRow ml-last-item">
              <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                <input aria-label="email" aria-required="true" type="email" class="form-control" name="fields[email]" placeholder="Email" autocomplete="email">
              </div>
            </div>
          </div>
          <input type="hidden" name="ml-submit" value="1">
          <div class="ml-form-embedSubmit">
            <button type="submit" class="primary">${buttonText}</button>
            <button disabled="disabled" style="display: none;" type="button" class="loading">
              <div class="ml-form-embedSubmitLoad"></div>
              <span class="sr-only">Loading...</span>
            </button>
          </div>
          <input type="hidden" name="anticsrf" value="true">
        </form>
      </div>
      <div class="ml-form-successBody row-success" style="display: none">
        <div class="ml-form-successContent">
          <h4>✅ Success!</h4>
          <p>Check your email for the free guide. You should receive it within the next few minutes.</p>
        </div>
      </div>
    </div>
  </div>
</div>
      `
    }
  },
  async created() {
    await this.loadFunnelData()
  },
  mounted() {
    // Scripts will be loaded when funnelData is available via watcher
  },
  watch: {
    funnelData: {
      handler(newData) {
        if (newData && newData.mailerLiteEmbedId) {
          this.$nextTick(() => {
            this.loadMailerLiteScripts()
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    async loadFunnelData() {
      try {
        const response = await fetch('/salesFunnels.json')
        const data = await response.json()
        this.funnelData = data.salesFunnels.find(funnel => funnel.id === this.funnelId)
        
        // Initialize form data - no longer needed but keeping for compatibility
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
    goToThankYou() {
      this.$router.push({
        path: '/thank-you',
        query: { funnel: this.funnelId }
      })
    },
    loadMailerLiteScripts() {
      // Get the config for this funnel
      const mailerLiteConfigs = {
        'reddit-ranking-2025': {
          formId: '26658422',
          actionId: '155902866312136442'
        },
        'supplement-brand-igniter': {
          formId: '26660281',
          actionId: '155909907245171718'
        },
        'instagram-growth-masterclass': {
          formId: '26660413',
          actionId: '155910259277301277'
        },
        'ai-jobs-guide-2025': {
          formId: '26660497',
          actionId: '155910495951390569'
        },
        'upwork-proposal-mastery': {
          formId: '26664813',
          actionId: '155923057676911939'
        },
        'digital-products-empire-27': {
          formId: '26665382',
          actionId: '155924399209317923'
        },
        'cybersecurity-cheat-sheet': {
          formId: '26665504',
          actionId: '155924794322192107'
        }
      }
      
      const config = mailerLiteConfigs[this.funnelId] || mailerLiteConfigs['reddit-ranking-2025']
      
      // Define the success callback function globally with dynamic form ID
      const callbackFunctionName = `ml_webform_success_${config.formId}`
      window[callbackFunctionName] = () => {
        console.log('MailerLite success callback triggered for:', this.funnelId)
        
        const $ = window.ml_jQuery || window.jQuery;
        if ($) {
          $(`.ml-subscribe-form-${config.formId} .row-success`).show();
          $(`.ml-subscribe-form-${config.formId} .row-form`).hide();
        }
        
        // Check if this is a free product (no stripeUrl)
        if (!this.funnelData.stripeUrl) {
          console.log('Redirecting to thank you page in 3 seconds...')
          // For free products: redirect to thank you page
          setTimeout(() => {
            this.goToThankYou()
          }, 3000);
        }
        // Note: For paid products, Stripe already opened in new tab on form submission
      }
      
      // Load MailerLite webforms script
      if (!document.querySelector('script[src*="webforms.min.js"]')) {
        const script1 = document.createElement('script');
        script1.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024';
        script1.type = 'text/javascript';
        document.head.appendChild(script1);
      }
      
      // Load MailerLite tracking script for this specific form
      const trackingUrl = `https://assets.mailerlite.com/jsonp/1312118/forms/${config.actionId}/takel`;
      if (!document.querySelector(`script[src*="${config.actionId}"]`)) {
        fetch(trackingUrl)
          .catch(error => console.log('MailerLite tracking load error:', error));
      }
      
      // Add form submission listener for paid products
      if (this.funnelData.stripeUrl) {
        this.$nextTick(() => {
          const submitButton = document.querySelector(`#mlb2-${config.formId} button[type="submit"]`)
          if (submitButton) {
            submitButton.addEventListener('click', (e) => {
              console.log('Submit button clicked for paid product')
              
              // Get the form to validate and capture email
              const form = document.querySelector(`#mlb2-${config.formId} form`)
              const emailInput = form ? form.querySelector('input[name="fields[email]"]') : null
              const emailValue = emailInput ? emailInput.value : null
              
              console.log('Captured email on button click:', emailValue)
              
              // Only open Stripe if email is provided and valid
              if (emailValue && emailValue.includes('@')) {
                // Small delay to let MailerLite validation pass, then open Stripe
                setTimeout(() => {
                  this.openStripeInNewTab(emailValue)
                }, 100)
              }
              
              // Let the button click and form submission continue normally
              // (don't prevent default - let MailerLite handle the form)
            })
          } else {
            console.log('Submit button not found for form:', config.formId)
          }
        })
      }
    },
    openStripeInNewTab(email) {
      console.log('Opening Stripe in new tab with email:', email)
      const stripeUrl = this.funnelData.stripeUrl
      
      if (stripeUrl) {
        const params = new URLSearchParams({
          client_reference_id: this.funnelId
        })
        
        if (email) {
          params.append('prefilled_email', email)
        }
        
        const finalUrl = `${stripeUrl}?${params.toString()}`
        console.log('Opening new tab with:', finalUrl)
        
        // Open Stripe in new tab
        window.open(finalUrl, '_blank')
      } else {
        console.error('No Stripe URL configured for this funnel')
      }
    },
    handleStripeCheckout() {
      console.log('handleStripeCheckout called')
      console.log('Captured email:', this.capturedEmail)
      // Use the stripeUrl from the JSON configuration
      const stripeUrl = this.funnelData.stripeUrl
      console.log('StripeUrl:', stripeUrl)
      
      if (stripeUrl) {
        // For MailerLite integration, we capture the email from the form
        // and pass both email and client reference ID to Stripe
        const params = new URLSearchParams({
          client_reference_id: this.funnelId
        })
        
        // Add email if we captured it
        if (this.capturedEmail) {
          params.append('prefilled_email', this.capturedEmail)
        }
        
        const finalUrl = `${stripeUrl}?${params.toString()}`
        console.log('Redirecting to:', finalUrl)
        
        // Redirect to Stripe with email and client reference ID
        window.location.href = finalUrl
      } else {
        console.error('No Stripe URL configured for this funnel')
        alert('Payment processing unavailable. Please try again later.')
      }
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

.formspree-email-form {
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