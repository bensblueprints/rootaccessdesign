<template>
  <section id="team" class="section team-section">
    <h2>Meet Our Team</h2>
    <div class="team-members-container">
      <div v-for="member in teamMembers" :key="member.id" class="team-member-card">
        <img :src="member.imageUrl || defaultImageUrl" :alt="member.name" class="team-member-photo">
        <h3>{{ member.name }}</h3>
        <p class="title">{{ member.title }}</p>
        <a v-if="member.linkedinUrl" :href="member.linkedinUrl" target="_blank" rel="noopener noreferrer" class="linkedin-link">
          <i class="fab fa-linkedin"></i> LinkedIn
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const defaultImageUrl = ref('https://via.placeholder.com/150/333333/FFFFFF?text=Person'); // A default placeholder

const teamMembers = ref([
  {
    id: 1,
    name: 'Ben Boyce',
    title: 'Root Access Founder',
    imageUrl: '/ben.jpeg', // No image provided for Ben Boyce
  }
  
]);
</script>

<style scoped>
.team-section {
  padding: 60px 20px;
  text-align: center;
  background-color: var(--section-bg-dark, #1e1e1e); /* Assuming a dark theme */
  color: var(--text-color-light, #f0f0f0);
}

.team-section h2 {
  font-size: 2.5em;
  margin-bottom: 40px;
  color: var(--heading-color, #fff);
}

.team-members-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.team-member-card {
  background-color: var(--card-bg-color, #2a2a2a);
  border-radius: 10px;
  padding: 25px;
  width: 280px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-member-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.team-member-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 3px solid var(--primary-accent-color, #50fa7b); /* Accent color border */
}

.team-member-card h3 {
  font-size: 1.5em;
  margin-top: 0;
  margin-bottom: 8px;
  color: var(--heading-color, #fff);
}

.team-member-card .title {
  font-size: 1em;
  color: var(--text-color-medium, #ccc);
  margin-bottom: 15px;
}

.linkedin-link {
  display: inline-flex;
  align-items: center;
  padding: 8px 15px;
  background-color: var(--linkedin-button-bg, #0077b5); /* LinkedIn blue */
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.linkedin-link:hover {
  background-color: var(--linkedin-button-hover-bg, #005582); /* Darker LinkedIn blue */
}

.linkedin-link i {
  margin-right: 8px;
}
</style> 