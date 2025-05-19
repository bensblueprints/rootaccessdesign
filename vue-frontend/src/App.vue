<script setup>
import SiteHeader from './components/SiteHeader.vue';
import TeamSection from './components/TeamSection.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
  <div id="app-container">
    <SiteHeader />
    <router-view />
    <TeamSection />
    <SiteFooter />
    <!-- We can add a global site footer here later if needed -->
  </div>
</template>

<style scoped>
/* Scoped styles for App.vue if any */
#app-container {
  /* Basic styles, can be expanded */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center; /* This might be overridden by page-specific styles */
  color: #2c3e50;
}
</style>
