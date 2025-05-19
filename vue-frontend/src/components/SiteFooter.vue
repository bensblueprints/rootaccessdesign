<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-links">
        <!-- Placeholder for additional links if needed in the future -->
        <!-- <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a> -->
      </div>
      <div class="social-media-icons">
        <a href="https://instagram.com/rootaccessdesign" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="https://www.youtube.com/@rootaccessnomads" target="_blank" rel="noopener noreferrer" aria-label="Youtube"><i class="fab fa-youtube"></i></a>
        <!-- Add more social icons as needed -->
      </div>
      <div class="copyright">
        <p>&copy; {{ currentYear }} Root Access Design. All Rights Reserved.</p>
      </div>
      <div class="back-to-top">
        <a href="#app-container" @click.prevent="scrollToTop">Back to Top <i class="fas fa-arrow-up"></i></a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>

<style scoped>
.site-footer {
  background-color: var(--footer-bg-color, #181818); /* Dark background for footer */
  color: var(--footer-text-color, #aaa);
  padding: 40px 20px;
  text-align: center;
  border-top: 1px solid var(--footer-border-color, #333);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.footer-links a,
.social-media-icons a {
  color: var(--footer-link-color, #ccc);
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.3s ease;
}

.footer-links a:hover,
.social-media-icons a:hover {
  color: var(--primary-accent-color, #50fa7b); /* Use your site's accent color on hover */
}

.social-media-icons i {
  font-size: 1.5em; /* Adjust icon size as needed */
}

.copyright p {
  margin: 0;
  font-size: 0.9em;
}

.back-to-top a {
  color: var(--footer-link-color, #ccc);
  text-decoration: none;
  font-size: 0.9em;
  transition: color 0.3s ease;
}

.back-to-top a:hover {
  color: var(--primary-accent-color, #50fa7b);
}

.back-to-top i {
  margin-left: 5px;
}

/* Responsive adjustments if needed */
@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
    justify-content: space-between;
  }

  .copyright {
    order: 1; /* Copyright in the middle for larger screens */
  }
  .social-media-icons {
    order: 2;
  }
  .footer-links, .back-to-top {
    order: 0; /* Links and back-to-top on the sides or as preferred */
  }
  .back-to-top {
      order: 3;
  }
}
</style> 