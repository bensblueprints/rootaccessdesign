<template>
  <section id="pricing-calculator" class="section calculator-section">
    <h2>&lt;MVP Cost Calculator /&gt;</h2>
    <p class="section-tagline">Calculate the cost of your next software project with our interactive pricing tool.</p>
    
    <div class="calculator-container">
      <!-- Inputs Column -->
      <div class="calculator-inputs">
        <!-- Complexity -->
        <div class="form-group">
          <label>Project Complexity <span class="value-display">{{ displayComplexityValue }}</span></label>
          <input type="range" min="1" max="5" v-model.number="complexity" class="slider input-slider" id="complexity">
          <div class="slider-labels">
            <span>Very Simple</span>
            <span>Simple</span>
            <span>Medium</span>
            <span>Complex</span>
            <span>Very Complex</span>
          </div>
        </div>
        
        <!-- Features -->
        <div class="form-group">
          <label>Features <span class="value-display">{{ features }}</span></label>
          <input type="range" min="1" max="10" v-model.number="features" class="slider input-slider" id="features">
          <div class="slider-labels">
            <span>Minimal</span>
            <span>Full Suite</span>
          </div>
        </div>
        
        <!-- Development Speed -->
        <div class="form-group">
          <label>Development Speed <span class="value-display">{{ displaySpeedValue }}</span></label>
          <input type="range" min="1" max="3" v-model.number="speed" class="slider input-slider" id="speed">
          <div class="slider-labels">
            <span>Standard</span>
            <span>Normal</span>
            <span>Urgent</span>
          </div>
        </div>
        
        <!-- Platform Type -->
        <div class="form-group">
          <label>Platform Type</label>
          <div class="radio-group platform-types">
            <button
              v-for="platform in platformOptions"
              :key="platform.id"
              @click="selectedPlatform = platform.id"
              :class="{ active: selectedPlatform === platform.id }"
              class="radio-option-btn"
            >
              {{ platform.label }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- Results Column -->
      <div class="calculator-results">
        <h3>Estimated Project Details</h3>
        
        <div class="price-display single-price-display">
          <span class="estimated-price-label">Estimated Price:</span>
          <span class="price-value">{{ displayPrice }}</span>
        </div>
        
        <div class="timeframe">
          <h4>Estimated Timeline</h4>
          <div class="timeframe-display">
            <div class="timeframe-comparison">
              <div class="timeframe-bar traditional">
                <span class="timeframe-label">Traditional</span>
                <span class="timeframe-value">{{ displayTraditionalTime }}</span>
              </div>
              <div class="timeframe-bar rootaccess">
                <span class="timeframe-label">Root Access</span>
                <span class="timeframe-value">{{ displayRootaccessTime }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="project-details">
          <div class="detail-item">
            <span class="detail-label">Features included:</span>
            <span class="detail-value">User auth, API integration, Dashboard, Admin panel, Database</span> <!-- Static for now -->
          </div>
          <div class="detail-item">
            <span class="detail-label">Recommended approach:</span>
            <span class="detail-value">AI-Accelerated MVP</span> <!-- Static for now -->
          </div>
        </div>
        
        <button class="cta-button" @click="getDetailedQuote">Get Detailed Quote</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';

// --- Reactive Data ---
const complexity = ref(3); // 1-5 (maps to Very Simple to Very Complex)
const features = ref(5);   // 1-10 (represents base workdays)
const speed = ref(2);      // 1-3 (Standard, Normal, Urgent)
const selectedPlatform = ref('web');

// --- Static Data ---
const complexityLabels = ['Very Simple', 'Simple', 'Medium', 'Complex', 'Very Complex'];
const speedLabels = ['Standard', 'Normal', 'Urgent'];
const platformOptions = ref([
  { id: 'web', label: 'Basic Website' },
  { id: 'custom_basic', label: 'Custom Website' },
  { id: 'custom_high', label: 'High-End Custom Website' },
  { id: 'ecommerce_basic', label: 'Basic E-commerce' },
  { id: 'ecommerce_advanced', label: 'Advanced E-commerce' },
  { id: 'webapp_small', label: 'Small/Medium Web App' },
  { id: 'webapp_large', label: 'Large Custom Web App' },
  { id: 'mobile', label: 'Mobile App' }, // Assuming 'mobile' was the value for "Mobile App"
  { id: 'desktop', label: 'Desktop App' }, // Assuming 'desktop' was for "Desktop App"
  { id: 'pwa_basic', label: 'Basic PWA' },
  { id: 'pwa_advanced', label: 'Advanced PWA' },
]);

const complexityDayMultiplier = {
  1: 0.5, // Very Simple
  2: 1.0, // Simple
  3: 1.5, // Medium
  4: 2.0, // Complex
  5: 3.0  // Very Complex
};

const platformDayMultiplier = { // Renamed from platformTimeModifiers for clarity
  'web': 0.5, 'custom_basic': 0.7, 'custom_high': 1, 'ecommerce_basic': 1,
  'ecommerce_advanced': 1.2, 'webapp_small': 1.3, 'webapp_large': 2, 'mobile': 1,
  'desktop': 1, 'pwa_basic': 1, 'pwa_advanced': 1.5,
};

const urgencyPriceMultiplier = { // Renamed from urgencyModifiers for clarity
  1: 1.0, // Standard
  2: 1.2, // Normal
  3: 1.5  // Urgent
};

const DAILY_RATE = 3000;
const MIN_EFFECTIVE_DAYS = 0.5; // Minimum billable days after all multipliers

// --- Helper function to format days into a readable string ---
function formatDaysToTimeString(days) {
  if (days < 0.1) return 'Less than 1 day'; // Or handle as error/specific message
  if (days < 1) return `${days.toFixed(1)} days`;
  
  const daysPerWeek = 5;
  if (days >= daysPerWeek) {
    const weeks = days / daysPerWeek;
    if (weeks >= 4) { // Roughly a month or more
        const months = weeks / 4;
        return `${months.toFixed(1)} months`; // Or format as X months Y weeks
    }
    return `${weeks.toFixed(1)} weeks`;
  }
  return `${days.toFixed(0)} day${days.toFixed(0) == '1' ? '' : 's'}`;
}

// --- Computed Properties for Display ---
const displayComplexityValue = computed(() => complexityLabels[complexity.value - 1]);
const displaySpeedValue = computed(() => speedLabels[speed.value - 1]);

const effectiveDays = computed(() => {
  const baseDays = features.value; // Features directly map to base days
  const currentComplexityMod = complexityDayMultiplier[complexity.value] || 1;
  const currentPlatformMod = platformDayMultiplier[selectedPlatform.value] || 1;
  
  let calculatedDays = baseDays * currentComplexityMod * currentPlatformMod;
  return Math.max(MIN_EFFECTIVE_DAYS, calculatedDays); // Ensure minimum effective days
});

const calculatedPrice = computed(() => {
  const priceBeforeUrgency = effectiveDays.value * DAILY_RATE;
  const currentUrgencyMod = urgencyPriceMultiplier[speed.value] || 1;
  const finalPrice = priceBeforeUrgency * currentUrgencyMod;
  return Math.round(finalPrice / 100) * 100; // Round to nearest 100
});

const displayPrice = computed(() => `$${calculatedPrice.value.toLocaleString()}`);

const displayRootaccessTime = computed(() => {
  return formatDaysToTimeString(effectiveDays.value);
});

const displayTraditionalTime = computed(() => {
  // Traditional time as a multiple of effective Root Access days (e.g., 4x to 6x longer)
  // This is a simplified approximation.
  const traditionalMinDays = effectiveDays.value * 4;
  const traditionalMaxDays = effectiveDays.value * 6;
  if (effectiveDays.value < 0.1) return 'N/A';
  
  const formattedMin = formatDaysToTimeString(traditionalMinDays);
  const formattedMax = formatDaysToTimeString(traditionalMaxDays);

  if (Math.round(traditionalMinDays) === Math.round(traditionalMaxDays)) {
      return formattedMin;
  }
  // Ensure the - only appears if both are actual time strings not N/A or <1 day
  if (formattedMin.includes('day') || formattedMin.includes('week') || formattedMin.includes('month')) {
    if (formattedMax.includes('day') || formattedMax.includes('week') || formattedMax.includes('month')) {
      return `${formattedMin} - ${formattedMax}`;
    }
  }
  return formattedMin; // Fallback if max is not a typical duration
});

// --- Methods ---
const getDetailedQuote = () => {
  const subject = "Project Quote Inquiry";
  const body = `
Selected Project Details:
---------------------------
Complexity: ${displayComplexityValue.value}
Features (Base Workdays): ${features.value}
Development Speed: ${displaySpeedValue.value}
Platform Type: ${platformOptions.value.find(p => p.id === selectedPlatform.value)?.label || selectedPlatform.value}

Estimated Price: ${displayPrice.value}
Estimated Root Access Timeline: ${displayRootaccessTime.value}
Estimated Traditional Timeline: ${displayTraditionalTime.value}
---------------------------

Please provide any additional details or specific requirements below:

  `;
  
  window.location.href = `mailto:contact@rootaccess.design?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

// Note: Vue's reactivity with computed properties handles updates automatically when refs change,
// so explicit watchEffect for recalculation might not be needed if all outputs are computed properties.
</script>

<style scoped>
.calculator-section {
  /* Styles for the overall section */
  padding: 40px 20px;
  background-color: var(--calculator-bg, #121212); /* Dark background */
  color: var(--calculator-text-color, #fff);
}

.calculator-section h2,
.calculator-section .section-tagline {
  text-align: center;
  margin-bottom: 30px;
}

.calculator-container {
  display: flex;
  flex-wrap: wrap; /* Allow results to stack below inputs on small screens */
  gap: 40px; /* Space between inputs and results columns */
  max-width: 1200px; /* Max width of the calculator */
  margin: 0 auto; /* Center the calculator */
}

.calculator-inputs,
.calculator-results {
  flex: 1;
  min-width: 300px; /* Minimum width before stacking */
}

.calculator-inputs {
  display: flex;
  flex-direction: column;
  gap: 25px; /* Space between form groups */
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: var(--label-color, #00bcd4); /* Accent color for labels */
}

.form-group .value-display {
  background-color: var(--value-display-bg, #00bcd4);
  color: var(--value-display-text, #121212);
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  margin-left: 10px;
}

/* Basic Slider Styling (customize heavily for image match) */
.slider {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  background: var(--slider-track-bg, #333);
  outline: none;
  border-radius: 4px;
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--slider-thumb-bg, #00bcd4);
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid var(--slider-thumb-border, #121212);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 0 8px var(--slider-thumb-hover-shadow, rgba(0, 188, 212, 0.7));
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--slider-thumb-bg, #00bcd4);
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid var(--slider-thumb-border, #121212);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.slider::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 0 8px var(--slider-thumb-hover-shadow, rgba(0, 188, 212, 0.7));
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
  color: var(--slider-label-color, #aaa);
  margin-top: 5px;
}

.platform-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
}

.radio-option-btn {
  background-color: var(--btn-bg, #333);
  color: var(--btn-text-color, #ccc);
  border: 1px solid var(--btn-border-color, #555);
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s, border-color 0.3s;
  font-size: 0.9em;
}

.radio-option-btn.active {
  background-color: var(--btn-active-bg, #00bcd4);
  color: var(--btn-active-text-color, #121212);
  border-color: var(--btn-active-border-color, #00bcd4);
  font-weight: bold;
}

.platform-note {
  font-size: 0.8em;
  color: var(--note-color, #888);
  margin-top: 15px;
  text-align: center;
}

/* Results Styling */
.calculator-results h3 {
  color: var(--results-heading-color, #00bcd4); /* Accent color for results heading */
  text-align: center;
  margin-bottom: 20px;
}

.price-display {
  margin-bottom: 30px;
}

.price-range {
  display: flex;
  justify-content: space-between;
  font-size: 1.8em;
  font-weight: bold;
  margin-bottom: 10px;
}

.price-slider-container {
  position: relative;
  height: 10px;
}

.price-slider-track {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--price-track-bg, #333);
  border-radius: 5px;
}

.price-slider-fill {
  position: absolute;
  height: 100%;
  background-color: var(--price-fill-color, #00bcd4); /* Accent color for fill */
  border-radius: 5px;
}

.price-slider-thumb {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: var(--price-thumb-bg, #fff);
  border-radius: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid var(--price-thumb-border, #00bcd4);
  box-shadow: 0 0 5px rgba(0,0,0,0.3);
}

.timeframe {
  margin-bottom: 30px;
}
.timeframe h4 { text-align: center; margin-bottom: 15px; }

.timeframe-comparison {
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* New styles for chart-like appearance */
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.03); /* Subtle background for this chart area */
  border-radius: 8px;
}

.timeframe-bar {
  padding: 12px 15px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* font-weight: bold; */ /* Moved to specific spans for more control */
  /* Add a subtle border or shadow for better separation */
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  box-sizing: border-box;
}

.timeframe-label {
  font-weight: bold;
  font-size: 0.95em;
}

.timeframe-value {
  font-weight: bold;
  font-size: 1.1em;
}

.timeframe-bar.traditional {
  background-color: var(--traditional-bar-bg, #5c2c2c); /* Dark red */
  color: var(--traditional-bar-text, #f5c6cb);
}

.timeframe-bar.rootaccess {
  background-color: var(--rootaccess-bar-bg, #2c5c3b); /* Dark green */
  color: var(--rootaccess-bar-text, #c6f5d5);
}

/* Ensure labels and values within bars have good contrast */
.timeframe-bar.traditional .timeframe-label,
.timeframe-bar.traditional .timeframe-value {
  color: #fce1e1; /* Lighter shade for text on dark red */
}

.timeframe-bar.rootaccess .timeframe-label,
.timeframe-bar.rootaccess .timeframe-value {
  color: #e1fce1; /* Lighter shade for text on dark green */
}

.project-details {
  margin-bottom: 30px;
  font-size: 0.9em;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: var(--detail-text-color, #ccc);
}

.detail-label {
  font-weight: bold;
  color: var(--detail-label-color, #aaa);
}

.cta-button {
  display: block;
  width: 100%;
  padding: 15px;
  background-color: var(--cta-btn-bg, #00bcd4); /* Accent color */
  color: var(--cta-btn-text, #121212);
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: var(--cta-btn-hover-bg, #00a5bb);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .calculator-inputs,
  .calculator-results {
    flex-basis: 100%; /* Stack columns */
  }
  .price-range {
    font-size: 1.5em;
  }
}

/* Adjustments for single price display */
.single-price-display {
  text-align: center; /* Center the single price */
  margin-bottom: 30px;
}

.estimated-price-label {
  display: block; /* Or inline, depending on desired layout with value */
  font-size: 1.1em;
  color: var(--label-color, #00bcd4);
  margin-bottom: 5px;
}

.price-value {
  font-size: 2.2em; /* Larger font for the single price */
  font-weight: bold;
  color: var(--price-value-color, #fff);
}

/* Remove styles related to .price-slider-container, .price-slider-track, .price-slider-fill, .price-slider-thumb if they are no longer in the template */
.price-slider-container,
.price-slider-track,
.price-slider-fill,
.price-slider-thumb {
  display: none !important; /* Ensure they are hidden if classes somehow remain */
}

.price-range { /* This class was previously used for min/max, can be removed or repurposed if not used */
  display: none !important; 
}



</style> 