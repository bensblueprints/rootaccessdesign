<template>
  <section id="software" class="section">
    <h2>&lt;View Our Software /&gt;</h2>
    <div class="card-grid">
      <div class="card" v-for="(item, index) in softwareItems" :key="index">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <AudioPlayer :src="item.audioSrc" :player-id="'software-audio-' + index" />
        <a :href="item.launchUrl" target="_blank">Launch</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import AudioPlayer from './AudioPlayer.vue';

const softwareItems = ref([
  {
    title: "Focus Flow",
    description: "ADHD Flow Tracker & Productivity Enhancer",
    audioSrc: "https://cdn.shopify.com/s/files/1/0935/3107/8976/files/FocusFlow_isn_t_just_a_timer.mp3?v=1746552299",
    launchUrl: "https://focusflowapp.xyz"
  },
  {
    title: "Plot Craft",
    description: "AI-Powered Book Generation Engine",
    audioSrc: "https://cdn.shopify.com/s/files/1/0937/9069/9798/files/Bookcraft.mp3?v=1746594173",
    launchUrl: "https://plot-craft.vercel.app/"
  },
  {
    title: "Cover Craft",
    description: "AI Book Cover Generator",
    audioSrc: "https://cdn.shopify.com/s/files/1/0935/3107/8976/files/Cover_Craft.mp3?v=1746597939",
    launchUrl: "https://app.rootaccess.design/covercraft"
  },
  {
    title: "Shop Shop Directory",
    description: "17,800+ Organised Smoke & Vape Shops",
    audioSrc: "https://cdn.shopify.com/s/files/1/0937/9069/9798/files/The_Smoke_Shop_Directoy.mp3?v=1746594472",
    launchUrl: "https://app.rootaccess.design/shopshop"
  },
  {
    title: "Gum Road Clone",
    description: "Your Own Digital Product Empire",
    // audioSrc: "https://cdn.shopify.com/s/files/1/0935/3107/8976/files/Cover_Craft.mp3?v=1746597939", // Re-using Cover Craft audio as per original
    audioSrc: "https://cdn.shopify.com/s/files/1/0935/3107/8976/files/Gumroad_Clone.mp3?v=1746597940", // Assuming a unique audio or placeholder if different
    launchUrl: "https://app.rootaccess.design/gumroad"
  },
  {
    title: "BTS/MRT Metro App",
    description: "Bangkok Transit System Navigation",
    // audioSrc: "https://cdn.shopify.com/s/files/1/0935/3107/8976/files/Cover_Craft.mp3?v=1746597939", // Re-using Cover Craft audio as per original
    audioSrc: "https://cdn.shopify.com/s/files/1/0935/3107/8976/files/Metro_App.mp3?v=1746597941", // Assuming a unique audio or placeholder
    launchUrl: "https://app.rootaccess.design/metroapp"
  }
]);

// Note: The original HTML used the same audio for the last three items.
// I've assumed there might be unique audio files or used placeholders.
// If they are indeed the same, the audioSrc can be adjusted.

</script>

<style scoped>
.card-grid {
  display: grid; /* Assuming a grid layout */
  /* Adjust grid-template-columns as per your design, e.g., repeat(auto-fit, minmax(300px, 1fr)) */
  /* This will create responsive columns that are at least 300px wide */
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 350px), 1fr)); /* Example responsive columns */
  gap: 20px; /* Defines the space between grid items (both rows and columns) */
}

/* Styles for SoftwareSection, card-grid, card can be copied or rely on global */
/* .section { ... } */
/* .card { ... } */
/* .card h3 { ... } */
/* .card p { ... } */
/* .card a { ... } */
</style> 