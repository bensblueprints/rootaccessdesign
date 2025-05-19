<template>
  <section class="hero">
    <div class="logo-container">
      <div class="terminal-prompt"></div>
      <div class="logo-text" ref="logoTextEl"></div><span id="logo-cursor"></span>
    </div>
    <p ref="taglineEl" id="tagline"></p>
    <div class="cta">
      <button @click="scrollToSoftware">View Our Software</button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const logoTextEl = ref(null);
const taglineEl = ref(null);
const router = useRouter();

const logoTextContent = "Root Access";
const taglineContent = "We build exceptional digital products at superhuman speed.";

const typeAnimation = (element, text, speed, callback) => {
  let i = 0;
  element.textContent = ''; // Clear current content
  const typingInterval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typingInterval);
      if (callback) callback();
    }
  }, speed);
};

onMounted(() => {
  if (logoTextEl.value) {
    typeAnimation(logoTextEl.value, logoTextContent, 150, () => {
      // After logo typing, start tagline typing
      if (taglineEl.value) {
        setTimeout(() => { // Delay before starting tagline
            typeAnimation(taglineEl.value, taglineContent, 50);
        }, 500); // Original script had a 1500ms delay after page load, here it's after logo
      }
    });
  }
});

const scrollToSoftware = () => {
  router.push({ path: '/', hash: '#software' });
};
</script>

<style scoped>
/* Styles for HeroSection can be copied from style.css if they are specific
   or rely on global styles. The IDs logoText and tagline are preserved if needed by CSS. */
.hero {
  /* Basic hero styles, assuming most come from global style.css */
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */
  /* justify-content: center; */
  /* text-align: center; */
  /* padding: 50px 20px; */ /* Example */
  /* min-height: 70vh; */ /* Example */
}

/* Ensure logo-cursor styling is present either globally or scoped here if needed */
#logo-cursor {
    /* display: inline-block; */
    /* background-color: #fff; */ /* or theme color */
    /* width: 10px; */
    /* height: 1.2em; */ /* match text line-height */
    /* animation: blink 1s step-end infinite; */
    /* margin-left: 2px; */
}

/* @keyframes blink { from, to { background-color: transparent; } 50% { background-color: #fff; } } */
</style> 