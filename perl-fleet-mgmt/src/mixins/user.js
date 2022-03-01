import store from '../store/index'
import { isAdmin, isRegular, isNonUser } from '../services/auth'
export default {
  computed: {
    currentUser: {
      get () {
        return store.state.authentication.currentUser
      }
    },
    userType: {
      get () {
        return store.state.authentication.userType
      }
    },
    userRouteID: {
      get () {
        return store.state.authentication.userRouteID
      }
    },
    isNonUser: {
      get () {
        return isNonUser()
      }
    },
    isRegular: {
      get () {
        return isRegular()
      }
    },
    isAdmin: {
      get () {
        return isAdmin()
      }
    },
    userID: {
      get () {
        return store.state.authentication.currentUser.id
      }
    }

  }
}
