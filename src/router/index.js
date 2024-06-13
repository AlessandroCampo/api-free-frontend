import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { useApiStore } from '@/stores/apiStore'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        const store = useApiStore();
        console.log(store.authToken);
        if (!store.authToken) {
          next({ name: 'login' });
        } else {
          next();
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
