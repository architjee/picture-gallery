import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '@/pages/HomePage.vue';
import AboutView from '@/pages/AboutPage.vue';

export const routes = [
  { path: '/', component: HomeView, name: 'home' },
  { path: '/about', component: AboutView, name: 'about' },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
