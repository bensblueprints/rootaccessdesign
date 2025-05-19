<template>
  <section id="process" class="section process-section">
    <h2>&lt;Our Process /&gt;</h2>
    <p class="section-tagline">We build & deploy MVPs in days, not weeks. Your competitors won't know what hit them.</p>
    
    <div class="feature-boxes">
      <div class="feature-box">
        <div class="feature-icon"><i class="fas fa-bolt"></i></div>
        <h3>Rapid Development</h3>
        <p>Deploy your first version in 3-5 days while others are still in planning meetings.</p>
      </div>
      
      <div class="feature-box">
        <div class="feature-icon"><i class="fas fa-rocket"></i></div>
        <h3>Product Launch</h3>
        <p>From concept to market in record time. We compress months into days.</p>
      </div>
      
      <div class="feature-box">
        <div class="feature-icon"><i class="fas fa-brain"></i></div>
        <h3>AI Integration</h3>
        <p>Leveraging cutting-edge AI to accelerate development by 20x.</p>
      </div>
      
      <div class="feature-box">
        <div class="feature-icon"><i class="fas fa-code"></i></div>
        <h3>Elite Engineering</h3>
        <p>Our engineers use AI-augmented workflows to build faster than humanly possible.</p>
      </div>
      
      <div class="feature-box">
        <div class="feature-icon"><i class="fas fa-tachometer-alt"></i></div>
        <h3>Speed Advantage</h3>
        <p>While competitors are finalizing specifications, you'll be collecting user feedback.</p>
      </div>
      
      <div class="feature-box">
        <div class="feature-icon"><i class="fas fa-fighter-jet"></i></div>
        <h3>MVP Deployment</h3>
        <p>Our signature process delivers working software in your hands at supersonic speed.</p>
      </div>
    </div>
    
    <div class="speed-comparison">
      <div class="comparison-title">Development Time Comparison</div>
      <div class="comparison-bars">
        <div class="comparison-item">
          <div class="comparison-label">Traditional Development</div>
          <div class="comparison-bar traditional">
            <span class="comparison-time">10-12 Weeks</span>
          </div>
        </div>
        <div class="comparison-item">
          <div class="comparison-label">Root Access Method</div>
          <div class="comparison-bar rootaccess-bar">
            <span class="comparison-time">3-5 Days</span>
          </div>
        </div>
      </div>
      <div class="comparison-tagline">Your competitors won't know what hit them.</div>
    </div>
  </section>
</template>

<script setup>
// No script needed for this static section
</script>

<style scoped>
/* Styles for ProcessSection can be copied from style.css if they are specific
   or rely on global styles. The ID 'process' is kept for anchor scrolling. */
/* .process-section { ... } */
/* .feature-boxes { ... } */
/* .feature-box { ... } */
/* .speed-comparison { ... } */

.comparison-bar.rootaccess-bar{
  flex-grow: 0;
}

</style> 