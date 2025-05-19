<template>
  <section id="our-vibe" class="section vibe-section">
    <h2>&lt;Our Vibe /&gt;</h2>
    <div class="vibe-container">
      <div class="vibe-content">
        <h3>We're Not Just Fast.<br>We're <span class="highlight">20x Faster</span>.</h3>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-icon"><i class="fas fa-rocket"></i></div>
            <h4>Rapid MVP Development</h4>
            <p>While others are still setting up their dev environments, we've already deployed your first version. We build your core product in days, not months.</p>
          </div>
          <div class="timeline-item">
            <div class="timeline-icon"><i class="fas fa-code"></i></div>
            <h4>AI-Augmented Engineering</h4>
            <p>Our engineers use cutting-edge AI tools to accelerate development without sacrificing quality. It's like bringing a rocket ship to a supercar race.</p>
          </div>
          <div class="timeline-item">
            <div class="timeline-icon"><i class="fas fa-bolt"></i></div>
            <h4>Polished Execution</h4>
            <p>We land at the finish line and wait for your competitors to catch up. Every product is refined, tested, and market-ready in record time.</p>
          </div>
        </div>
        <div class="vibe-cta">
          <div class="comparison-chart">
            <div class="comparison-item traditional">
              <div class="comparison-text">
                <h5>Traditional Development</h5>
                <div class="comparison-time">6-12 months</div>
              </div>
              <div class="comparison-bar-container">
                <div class="comparison-bar actual-bar" style="width: 100% ;"></div>
              </div>
            </div>
            <div class="comparison-item rootaccess">
              <div class="comparison-text">
                <h5>Root Access Method</h5>
                <div class="comparison-time">2-4 weeks</div>
              </div>
              <div class="comparison-bar-container">
                <div class="comparison-bar actual-bar" style="max-width: 20%;"></div>
              </div>
            </div>
          </div>
          <p class="vibe-note">Your app isn't cheaper — it's just in market faster. And that makes us all more money.</p>
          <button class="cta-button-green" @click="accelerateProject">Accelerate Your Project</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const accelerateProject = () => {
  window.location.href = 'mailto:contact@rootaccess.design?subject=Accelerate My Project';
};
</script>

<style scoped>
/* Existing styles for vibe-section, vibe-container, vibe-content should remain or be adjusted as needed */
.vibe-section {
  text-align: center; /* Center the main heading and other content if desired */
}

.timeline {
  display: flex;
  justify-content: space-around; /* Distribute pillars evenly */
  align-items: flex-start; /* Align tops of pillars if text lengths vary */
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  gap: 20px; /* Space between pillars */
  margin-top: 30px; /* Space above the pillars */
  margin-bottom: 30px; /* Space below the pillars */
}

.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content of each pillar */
  text-align: center;
  flex-basis: calc(33.333% - 40px); /* Aim for 3 pillars, accounting for gap. Adjust as needed. */
  min-width: 280px; /* Minimum width before wrapping */
  padding: 20px;
  /* background-color: #2a2a2a; */ /* Optional: if pillars need a distinct background */
  /* border-radius: 8px; */
}

.timeline-icon {
  width: 70px; /* Size of the circle */
  height: 70px;
  border-radius: 50%; /* Makes it a circle */
  background-color: var(--icon-circle-bg, #00bcd4); /* Accent color for circle, can be from CSS vars */
  color: var(--icon-circle-color, white); /* Icon color */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px; /* Space below the icon circle */
  border: 2px solid var(--icon-circle-border-color, transparent);
}

.timeline-icon i {
  font-size: 28px; /* Size of the Font Awesome icon */
}

.timeline-item h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.2em; /* Adjust as needed */
  color: var(--heading-color, #fff); /* Match theme */
}

.timeline-item p {
  font-size: 0.9em; /* Adjust as needed */
  line-height: 1.6;
  color: var(--text-color-light, #ccc); /* Lighter text color for description */
}

.vibe-cta {
  margin-top: 40px; /* Space above the CTA section */
  text-align: center; /* Center the button */
}

/* Styles for the comparison bars and button can remain or be adjusted */
.comparison-chart { 
  display: flex;
  flex-direction: column; 
  align-items: center; 
  gap: 10px; /* Reduced gap between items a bit */
  margin-bottom: 25px;
  padding: 20px;
  background-color: rgba(30, 30, 30, 0.7); /* Darker, more solid background for chart area */
  border-radius: 8px;
  max-width: 500px; /* Adjusted max-width for a tighter look */
  margin-left: auto;
  margin-right: auto;
}

.comparison-item {
  width: 100%;
  padding: 15px;
  border-radius: 6px;
  background-color: rgba(20, 20, 20, 0.5); /* Darker item background */
  display: flex; /* Use flex to align text and bar container */
  align-items: center;
  justify-content: space-between; /* Pushes text and bar to opposite ends */
  overflow: hidden; /* Add this line to clip overflowing content */
}

.comparison-text {
  flex-basis: 45%; /* Give text a defined space */
  text-align: left;
}

.comparison-item h5 {
  margin: 0 0 2px 0; /* Slightly reduced margin */
  font-size: 0.95em; /* Slightly adjusted font size */
  color: #e0e0e0; /* Lighter gray for title */
  font-weight: 500;
}

.comparison-item .comparison-time {
  font-size: 1.1em; /* Slightly adjusted */
  font-weight: bold;
  margin-bottom: 0; /* Removed margin as items are now flex-aligned */
}

.comparison-item.traditional .comparison-time {
  color: #ff7878; /* Adjusted red for time */
}

.comparison-item.rootaccess .comparison-time {
  color: #50fa7b; /* Adjusted green for time - using a known vibrant green */
}

.comparison-bar-container { /* New container for the bar */
  flex-basis: 50%; /* Give bar container a defined space */
  height: 12px; /* Slightly thicker bar height */
  background-color: rgba(0, 0, 0, 0.3); /* Track for the bar */
  border-radius: 6px;
  display: flex;
  align-items: center;
}

.comparison-bar.actual-bar { /* This is the actual colored bar now */
  height: 100%; /* Fill the container's height */
  border-radius: 6px; /* Match container's radius */
}

.comparison-item.traditional .actual-bar {
  background-color: #ff5555; /* Bright Red */
}

.comparison-item.rootaccess .actual-bar {
  background-color: #50fa7b; /* Drac Green / Bright Green */
}

.vibe-note {
  margin-top: 20px; /* Added margin-top for spacing from chart */
  margin-bottom: 25px;
  font-style: italic;
  color: #aaa;
  font-size: 0.9em;
}

.cta-button-green {
  background-color: #50fa7b; /* Drac Green / Bright Green */
  color: #282a36; /* Dark color for text (Dracula background) */
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  font-size: 1.2em;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 10px rgba(80, 250, 123, 0.3);
}

.cta-button-green:hover {
  background-color: #62fc8d; /* Lighter green on hover */
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(80, 250, 123, 0.4);
}

.cta-button-green:active {
  background-color: #40e06c; /* Slightly darker green on active/click */
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(80, 250, 123, 0.25);
}

/* Keep other existing styles for .vibe-content, .highlight, .vibe-cta button etc. */
</style> 