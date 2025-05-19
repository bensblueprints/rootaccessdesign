import { createRouter, createWebHistory } from 'vue-router';

// We'll create these component files in subsequent steps
// import Home from '../views/Home.vue';
// import MeetUp from '../views/MeetUp.vue';
// import Courses from '../views/Courses.vue';
// import CourseMaterials from '../views/CourseMaterials.vue';
// import TestWebhook from '../views/TestWebhook.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home,
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'), // Lazy load
  },
  {
    path: '/meet-up',
    name: 'MeetUp',
    // component: MeetUp,
    component: () => import(/* webpackChunkName: "meetup" */ '@/views/MeetUp.vue'), // Lazy load
  },
  {
    path: '/courses',
    name: 'Courses',
    // component: Courses,
    component: () => import(/* webpackChunkName: "courses" */ '@/views/Courses.vue'), // Lazy load
  },
  {
    path: '/course-materials',
    name: 'CourseMaterials',
    // component: CourseMaterials,
    component: () => import(/* webpackChunkName: "coursematerials" */ '@/views/CourseMaterials.vue'), // Lazy load
  },
  {
    path: '/test-webhook',
    name: 'TestWebhook',
    // component: TestWebhook,
    component: () => import(/* webpackChunkName: "testwebhook" */ '@/views/TestWebhook.vue'), // Lazy load
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Vite uses import.meta.env.BASE_URL
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 70, // Optional: Adjust for fixed header height, if any
      };
    } else {
      return { left: 0, top: 0, behavior: 'smooth' };
    }
  },
});

export default router; 