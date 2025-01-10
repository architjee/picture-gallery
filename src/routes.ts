import { createWebHistory, createRouter, type RouteLocation } from 'vue-router'

import HomeView from '@/pages/HomePage.vue';
import AboutView from '@/pages/AboutPage.vue';

export const routes = [
  {
    path: '/',
    component: HomeView,
    name: 'home',
    props: (route: RouteLocation) => ({ page: route.query.page || '1' })
  },
  { path: '/about', component: AboutView, name: 'about' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
