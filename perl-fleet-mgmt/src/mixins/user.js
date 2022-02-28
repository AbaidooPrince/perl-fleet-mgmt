import store from '../store/index'
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
    userID: {
      get () {
        return store.state.authentication.currentUser.id
      }
    }

  }
}
