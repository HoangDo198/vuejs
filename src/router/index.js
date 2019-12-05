import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/',
    meta: { 
      requiresAuth: true
    },
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: '/Dashboard',
        name: "Dashboard",
        component: () => import('../views/Home.vue')
      },
      {
        path: '/email-list',
        name: 'Email List',
        component: () => import('../views/ListMail.vue')
      },
      {
        path: '/campaign',
        name: 'Campaign',
        component: () => import('../views/Campaign.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
