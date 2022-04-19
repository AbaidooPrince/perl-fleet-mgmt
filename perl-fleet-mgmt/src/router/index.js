import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import admin from './admin'
import vehicles from './vehicles'
import users from './users'
import inspections from './inspections'
import store from '../store'
import { isAdmin, isLoggedIn, isRegular } from '../services/auth'

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
    path: '/page-not-found',
    name: '404',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/error/404.vue')
  },
  {
    path: '/unauthorized',
    name: '403',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/error/403.vue')
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

const routes = index.concat(users, admin, vehicles, inspections)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// before each router hook
router.beforeEach((to, from, next) => {
  if (to.meta.layout && store.state.authentication.currentUser.token === '') {
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    })
    setTimeout(() => {
      store.dispatch('showSnackBar', { error: true, message: 'Please login to access the platform!' })
    })
  } else if (to.meta.layout && to.meta.layout === 'user' && isLoggedIn()) {
    if (isAdmin() || isRegular()) {
      console.log('running')
      next()
    } else {
      next({
        name: '403',
        query: { redirect: to.fullPath }
      })
    }
  } else if (to.meta.layout && to.meta.layout === 'admin' && isLoggedIn()) {
    if (isAdmin()) {
      next()
    } else {
      next({
        name: '403',
        query: { redirect: to.fullPath }
      })
    }
  } else if (!to.name) {
    next({
      name: '404',
      query: { redirect: to.fullPath }
    })
  } else {
    console.log('running')
    next()
  }
})
Vue.nextTick(() => {
  document.title = process.env.VUE_APP_APP_TITLE
})

export default router
