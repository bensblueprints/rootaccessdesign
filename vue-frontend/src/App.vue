<script setup>
import SiteHeader from './components/SiteHeader.vue';
import TeamSection from './components/TeamSection.vue';
import SiteFooter from './components/SiteFooter.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Check if current route is a sales funnel or funnel demo
const isSalesFunnelPage = computed(() => {
  return route.name === 'SalesFunnel' || route.name === 'SalesFunnelDemo' || route.name === 'ThankYou';
});
</script>

<template>
  <div id="app-container">
    <SiteHeader v-if="!isSalesFunnelPage" />
    <router-view />
    <TeamSection v-if="!isSalesFunnelPage" />
    <SiteFooter v-if="!isSalesFunnelPage" />
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

/* Remove text-align center for sales funnel pages */
#app-container:has(.sales-funnel-view), 
#app-container:has(.funnel-demo) {
  text-align: left;
}
</style>
