<template>
  <header class="site-header">
    <div class="nav-container">
      <nav class="main-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/#process">Process</router-link>
        <router-link to="/#software">Software</router-link>
        <router-link to="/#our-vibe">Our Vibe</router-link>
        <router-link to="/#team">Team</router-link>
        <router-link to="/#pricing-calculator">Pricing</router-link>
        <!-- <div class="courses-menu-item">
          <router-link to="/courses">Courses</router-link>
          <div class="mega-menu">
            <div class="mega-menu-column">
              <h3 class="mega-menu-title">Web Development</h3>
              <ul class="mega-menu-list">
                <li><a href="#">Web Fundamentals</a></li>
                <li><a href="#">HTML & CSS Mastery</a></li>
                <li><a href="#">JavaScript Essentials</a></li>
                <li><a href="#">Intermediate JavaScript</a></li>
                <li><a href="#">Responsive Web Design</a></li>
              </ul>
            </div>
            <div class="mega-menu-column">
              <h3 class="mega-menu-title">Frontend Frameworks</h3>
              <ul class="mega-menu-list">
                <li><a href="#">React Fundamentals</a></li>
                <li><a href="#">Advanced React</a></li>
                <li><a href="#">React Design Patterns</a></li>
                <li><a href="#">UI/UX Fundamentals</a></li>
                <li><a href="#">Advanced UI/UX Design</a></li>
              </ul>
            </div>
            <div class="mega-menu-column">
              <h3 class="mega-menu-title">Backend & API</h3>
              <ul class="mega-menu-list">
                <li><a href="#">Node.js Backend</a></li>
                <li><a href="#">API Development</a></li>
                <li><a href="#">Database Design</a></li>
                <li><a href="#">Go Basics</a></li>
                <li><a href="#">Python Fundamentals</a></li>
              </ul>
            </div>
            <div class="mega-menu-column">
              <h3 class="mega-menu-title">AI & Machine Learning</h3>
              <ul class="mega-menu-list">
                <li><a href="#">Machine Learning Basics</a></li>
                <li><a href="#">ML for Developers</a></li>
                <li><a href="#">AI Systems Integration</a></li>
                <li><a href="#">Full-Stack AI</a></li>
                <li><a href="#">AI Cybersecurity</a></li>
              </ul>
            </div>
            <div class="mega-menu-footer">
              <router-link to="/courses" class="mega-menu-all">View All Courses</router-link>
              <router-link to="/meet-up" class="mega-menu-featured">
                <i class="fas fa-star"></i>
                <span class="mega-menu-featured-text">Free Coding Bootcamp</span>
              </router-link>
            </div>
          </div>
        </div> -->
        <router-link to="/meet-up" class="highlight-nav">Free Coding Bootcamp</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
// No specific script needed for now if CSS handles mega-menu visibility.
</script>

<style scoped>
.main-nav {
  display: flex;
  align-items: center; /* This will vertically center all direct children of main-nav */
  flex-wrap: wrap; /* Allow items to wrap on smaller screens if necessary */
  gap: 15px; /* Adjusts spacing between nav items, can be fine-tuned */
  padding: 10px 0; /* Example padding for the nav bar itself */
}

.courses-menu-item {
  display: inline-flex; /* Helps the div align like other inline-block elements (router-links) */
  align-items: center; /* Vertically aligns the 'Courses' link within this div */
  position: relative;  /* Important for absolute positioning of the mega-menu */
}

/* Assuming global styles from style.css will apply for general link appearance.
   If specific adjustments are needed for the header within Vue, they can be added here. */

.courses-menu-item .mega-menu {
  display: none; /* Hidden by default */
  position: absolute;
  top: 100%; /* Position mega-menu below the 'Courses' link */
  left: 0; /* Align with the left of the 'Courses' item, adjust as needed */
  background-color: var(--nav-bg-color, #333); /* Example, use actual background */
  border: 1px solid var(--nav-border-color, #444);
  z-index: 1000;
  padding: 20px;
  min-width: 600px; /* Example width, adjust based on content */
  flex-direction: row; /* Keep as row for columns */
  flex-wrap: nowrap; /* Prevent columns from wrapping by default */
  /* Add other necessary styles from the original style.css for positioning, shadow etc. */
}

.courses-menu-item:hover .mega-menu,
.courses-menu-item:focus-within .mega-menu { /* Added focus-within for accessibility */
  display: flex;
}

.mega-menu-column {
  margin-right: 20px; 
  flex: 1; /* Allow columns to take up space */
}
.mega-menu-column:last-child {
  margin-right: 0;
}
.mega-menu-list {
  list-style: none;
  padding-left: 0;
}

/* Make sure router-link active styles are visually distinct if not already handled globally */
.main-nav > a.router-link-active,
.main-nav > .courses-menu-item > a.router-link-active {
  /* color: var(--nav-active-color, #00bcd4); */ /* Example active color */
  /* font-weight: bold; */
}
</style> 