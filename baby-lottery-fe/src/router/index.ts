import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('../views/Video.vue')
    },
    {
      path: '/send-live-blessings',
      name: 'sendLiveBlessings',
      component: () => import('../views/SendLiveBlessings.vue')
    },
    {
      path: '/lottery',
      name: 'lottery',
      component: () => import('../views/Lottery.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/LotterySetting.vue')
    },
    {
      path: '/closing',
      name: 'closing',
      component: () => import('../views/Closing.vue')
    }
  ]
})

export default router
