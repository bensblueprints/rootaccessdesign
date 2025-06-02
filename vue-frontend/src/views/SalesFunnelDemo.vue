<template>
  <div class="sales-funnel-overview">
    <NewsletterSection />
    <div class="container">
      <div class="header-section">
        <h1 class="main-title">Root Access Sales Funnels</h1>
        <p class="subtitle">Professional landing pages designed to convert visitors into customers</p>
      </div>

      <div class="funnels-grid" v-if="salesFunnels.length > 0">
        <!-- Dynamic funnels from JSON -->
        <div 
          v-for="funnel in salesFunnels" 
          :key="funnel.id"
          class="funnel-card"
        >
          <div class="card-image">
            <img 
              v-if="getFunnelImage(funnel.id)"
              :src="getFunnelImage(funnel.id)" 
              :alt="funnel.title"
              @error="handleImageError($event, funnel.id)"
              @load="handleImageLoad($event, funnel.id)"
            />
            <div class="image-placeholder" :class="{ 'show': shouldShowPlaceholder(funnel.id) }">
              <div class="placeholder-icon">{{ getFunnelIcon(funnel.id) }}</div>
              <span>{{ funnel.title.split(':')[0] }}</span>
            </div>
          </div>
          
          <div class="card-content">
            <h3 class="card-title">{{ funnel.title.replace(':', '') }}</h3>
            <p class="card-description">{{ getShortDescription(funnel.description) }}</p>
            
            <router-link 
              :to="{ name: 'SalesFunnel', params: { funnelId: funnel.id } }"
              class="card-button"
              :class="getFunnelColorClass(funnel.id)"
            >
              View Funnel
            </router-link>
          </div>
        </div>

        <!-- Coming Soon Cards -->
        <div class="funnel-card coming-soon">
          <div class="card-image">
            <div class="image-placeholder show">
              <div class="placeholder-icon">📧</div>
              <span>Newsletter</span>
            </div>
          </div>
          <div class="card-content">
            <h3 class="card-title">Instant Email List</h3>
            <p class="card-description">Build a huge email, and subscriber list by giving awway a free digital or physical product</p>
            <button class="card-button disabled" disabled>
              Coming Soon
            </button>
          </div>
        </div>

        <div class="funnel-card coming-soon">
          <div class="card-image">
            <div class="image-placeholder show">
              <div class="placeholder-icon">🤝</div>
              <span>Affiliate Marketing</span>
            </div>
          </div>
          <div class="card-content">
            <h3 class="card-title">Affiliate Marketing Mastery</h3>
            <p class="card-description">Join our affiliate program and earn commissions promoting digital products.</p>
            <button class="card-button disabled" disabled>
              Coming Soon
            </button>
          </div>
        </div>

        <div class="funnel-card coming-soon">
          <div class="card-image">
            <div class="image-placeholder show">
              <div class="placeholder-icon">💻</div>
              <span>Coding</span>
            </div>
          </div>
          <div class="card-content">
            <h3 class="card-title">Vibe Coding Secrets</h3>
            <p class="card-description">Learn the secrets of efficient and effective coding with modern techniques.</p>
            <button class="card-button disabled" disabled>
              Coming Soon
            </button>
          </div>
        </div>
      </div>
      
      <div v-else class="loading">
        <div class="loading-spinner"></div>
        Loading funnels...
      </div>
    </div>
  </div>
</template>

<script>
import NewsletterSection from '@/components/NewsletterSection.vue';

export default {
  name: 'SalesFunnelDemo',
  components: {
    NewsletterSection,
  },
  data() {
    return {
      salesFunnels: [],
      imageLoadStates: {}, // Track loading state per image
      funnelImages: {
        'reddit-ranking-2025': 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80',
        'upwork-proposal-mastery': 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80',
        'supplement-brand-igniter': 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80',
        'digital-products-empire-27': 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80',
        'instagram-growth-masterclass': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80',
        'cybersecurity-cheat-sheet': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80',
        'ai-jobs-guide-2025': 'https://images.unsplash.com/photo-1677442135968-6d89485dd9c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80'
      },
      funnelIcons: {
        'reddit-ranking-2025': '📱',
        'upwork-proposal-mastery': '💼',
        'supplement-brand-igniter': '💊',
        'digital-products-empire-27': '💾',
        'instagram-growth-masterclass': '📸',
        'cybersecurity-cheat-sheet': '🔐',
        'ai-jobs-guide-2025': '🤖'
      }
    }
  },
  async created() {
    await this.loadFunnels()
  },
  methods: {
    async loadFunnels() {
      try {
        const response = await fetch('/salesFunnels.json')
        const data = await response.json()
        this.salesFunnels = data.salesFunnels || []
      } catch (error) {
        console.error('Error loading funnels:', error)
      }
    },
    getShortDescription(description) {
      // Extract the main part before any detailed explanation
      const parts = description.split(':');
      return parts[0].length > 60 ? parts[0].substring(0, 60) + '...' : parts[0];
    },
    getFunnelImage(funnelId) {
      return this.funnelImages[funnelId] || null;
    },
    getFunnelIcon(funnelId) {
      return this.funnelIcons[funnelId] || '📊';
    },
    getFunnelColorClass(funnelId) {
      const colorMap = {
        'reddit-ranking-2025': 'reddit-color',
        'upwork-proposal-mastery': 'upwork-color',
        'supplement-brand-igniter': 'supplement-color',
        'digital-products-empire-27': 'digital-color',
        'instagram-growth-masterclass': 'instagram-color',
        'cybersecurity-cheat-sheet': 'cyber-color',
        'ai-jobs-guide-2025': 'ai-color'
      };
      return colorMap[funnelId] || 'default-color';
    },
    shouldShowPlaceholder(funnelId) {
      // Show placeholder if no image URL or if image failed to load
      return !this.getFunnelImage(funnelId) || this.imageLoadStates[funnelId] === 'error';
    },
    handleImageError(event, funnelId) {
      console.log('Image failed to load:', event.target.src, 'for funnel:', funnelId)
      this.imageLoadStates[funnelId] = 'error';
      event.target.style.display = 'none'
    },
    handleImageLoad(event, funnelId) {
      console.log('Image loaded successfully:', event.target.src, 'for funnel:', funnelId)
      this.imageLoadStates[funnelId] = 'loaded';
      event.target.style.display = 'block'
    }
  }
}
</script>

<style scoped>
.sales-funnel-overview {
  background: #0a0a0a;
  min-height: 100vh;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header-section {
  text-align: center;
  margin-bottom: 4rem;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #646cff 0%, #747bff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.2rem;
  color: #888;
  max-width: 600px;
  margin: 0 auto;
}

.funnels-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.funnel-card {
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #333;
}

.funnel-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.funnel-card.coming-soon {
  opacity: 0.7;
}

.card-image {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.funnel-card:hover .card-image img {
  transform: scale(1.05);
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.9rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-placeholder.show {
  opacity: 1;
}

.placeholder-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  opacity: 0.7;
}

.image-placeholder span {
  opacity: 0.8;
  text-align: center;
  font-weight: 500;
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #fff;
}

.card-description {
  color: #bbb;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.card-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.card-button.disabled {
  background: #333;
  color: #666;
  cursor: not-allowed;
}

.reddit-color {
  background: linear-gradient(135deg, #ff4444 0%, #cc3333 100%);
  color: white;
}

.reddit-color:hover {
  background: linear-gradient(135deg, #ff6666 0%, #ff4444 100%);
}

.upwork-color {
  background: linear-gradient(135deg, #14A800 0%, #108A00 100%);
  color: white;
}

.upwork-color:hover {
  background: linear-gradient(135deg, #17C400 0%, #14A800 100%);
}

.supplement-color {
  background: linear-gradient(135deg, #0AF0F0 0%, #08D0D0 100%);
  color: black;
}

.supplement-color:hover {
  background: linear-gradient(135deg, #2CFCFC 0%, #0AF0F0 100%);
}

.digital-color {
  background: linear-gradient(135deg, #A855F7 0%, #9333EA 100%);
  color: white;
}

.digital-color:hover {
  background: linear-gradient(135deg, #B866FF 0%, #A855F7 100%);
}

.instagram-color {
  background: linear-gradient(135deg, #e1306c 0%, #c13584 100%);
  color: white;
}

.instagram-color:hover {
  background: linear-gradient(135deg, #f56692 0%, #e1306c 100%);
}

.cyber-color {
  background: linear-gradient(135deg, #00ff41 0%, #00cc33 100%);
  color: black;
}

.cyber-color:hover {
  background: linear-gradient(135deg, #33ff66 0%, #00ff41 100%);
}

.ai-color {
  background: linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%);
  color: white;
}

.ai-color:hover {
  background: linear-gradient(135deg, #ff8555 0%, #ff6b35 100%);
}

.default-color {
  background: linear-gradient(135deg, #646cff 0%, #535bf2 100%);
  color: white;
}

.default-color:hover {
  background: linear-gradient(135deg, #747bff 0%, #646cff 100%);
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
  border-top: 3px solid #646cff;
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
  
  .funnels-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style> 
