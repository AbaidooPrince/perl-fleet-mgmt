import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import admin from './admin'
import users from './users'

Vue.use(VueRouter)

const index = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/Login.vue')
  },
  {
    path: '/verification',
    name: 'Verification',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/Verification.vue')
  },
  {
    path: '/password/verification',
    name: 'PasswordVerfication',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/Verification.vue')
  },
  {
    path: '/reset-password',
    name: 'PasswordSetting',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/PasswordSetting.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/ForgotPassword.vue')
  },
  {
    path: '/login',
    name: 'Logout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/Login.vue')
  }
]

const routes = index.concat(users, admin)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
Vue.nextTick(() => {
  document.title = process.env.VUE_APP_APP_TITLE
})

export default router
