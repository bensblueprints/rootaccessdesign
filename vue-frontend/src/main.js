// import './assets/main.css' // Temporarily remove or replace this if main.css is not used
import './assets/css/style.css' // Import the project-specific styles

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import the router

const app = createApp(App)

app.use(router) // Tell Vue to use the router

app.mount('#app')
