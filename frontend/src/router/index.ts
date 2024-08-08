// Modules
import { createRouter, createWebHistory } from 'vue-router'

// Stores
import { useGlobalStore } from '@/stores/globalStore'


// Components
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }  // Add a meta field to indicate this route requires authentication
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

// Check if page requires auth before visit it
router.beforeEach((to, from, next) => {
  // verify if token is persisted
  const globalStore = useGlobalStore()
  const token = globalStore.token ?? ''

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      // No token found, redirect to login
      next({ name: 'login' });
    } else {
      // Token exists, proceed to the route
      next();
    }
  } else {
    // Route does not require authentication, proceed
    next();
  }
});

export default router
