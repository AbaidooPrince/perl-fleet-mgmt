import store from '../store/index'
import axios from 'axios'
// import router from 'vue-router'
import * as Cookies from 'js-cookie'
// import api from './api'

const AUTH_TOKEN_KEY = 'fleetAuthToken'
// const SET_CURRENT_USER = 'currentUser'
export function setUserSession () {
  const jwt = store.state.authentication.authToken
  setAuthToken(jwt)
}

export function isLoggedIn () {
  const authToken = store.state.authentication.authToken
  return !!authToken
}
export function isAdmin () {
  if (isLoggedIn()) {
    const role = store.state.authentication.userType.name
    return role === 'administrator' || role === 'superAdmin'
  } else return false
}
// super admin
export function isSuperAdmin () {
  if (isLoggedIn()) {
    const role = store.state.authentication.userType.name
    return role === 'administrator'
  } else return false
}
// regular
export function isRegular () {
  if (isLoggedIn()) {
    const role = store.state.authentication.userRole
    return role === 'regularUser'
  } else return false
}
// Non user
export function isNonUser () {
  if (isLoggedIn()) {
    const role = store.state.authentication.userRole
    return role === 'nonUser'
  } else return false
}
// Account
export function isAccountant () {
  if (isLoggedIn()) {
    const role = store.state.authentication.userRole
    return role === 'Restaurant-Accountant'
  } else return false
}
export function logout () {
  clearAuthToken()
  store.dispatch('authentication/clearCurrentUser')
  sessionStorage.clear()
  Cookies.set(AUTH_TOKEN_KEY, null)
}
export function clearAuthToken () {
  axios.defaults.headers.common.Authorization = ''
  Storage.removeItem('vuex')
  return Cookies.remove(AUTH_TOKEN_KEY)
}
// set token
export function setAuthToken (token) {
  // sessionStorage.setItem(AUTH_TOKEN_KEY, token)
  Cookies.set(f, token)
}
