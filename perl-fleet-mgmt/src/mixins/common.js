export default {
  data () {
    return {
      defaultProfile: require('../assets/profile.svg'),
      defaultVehicle: require('../assets/defaultVehicle.png'),
      units: {
        volume: 'ft<sup>3</sup>',
        length: 'in',
        weight: 'kg'
      },
      bodyType: [
        'Conventional',
        'Hatchback',
        'Full-Size',
        'Pickup'
      ],
      subBodyType: [
        'Cargo',
        'Ccrew Crab',
        'Sleep Crab'
      ],
      ownerships: [
        'Owned',
        'Leased',
        'Rented',
        'Customer'
      ],
      vehicleStatusColors: [
        { name: 'Navy', color: 'navy' },
        { name: 'Blue', color: 'blue' },
        { name: 'Aqua', color: 'blue lighten-3' },
        { name: 'Teal', color: 'teal' },
        { name: 'Olive', color: 'green darken-2' },
        { name: 'Green', color: 'green' },
        { name: 'Yellow', color: 'yellow' },
        { name: 'Orange', color: 'orange' },
        { name: 'Red', color: 'red' },
        { name: 'Maroon', color: 'purple darken-4' },
        { name: 'Fuchsia', color: 'fuchsia' },
        { name: 'Silver', color: 'grey lighten-2' },
        { name: 'Purple', color: 'purple' },
        { name: 'Gray', color: 'grey' },
        { name: 'Black', color: 'black lighten-1' }
      ]
    }
  },
  methods: {
    getUser (id) {
      return this.allUsers?.filter((user) => user.id === id)[0]
    },
    addnewItem (name, store, dispatch) {
      this.$store.dispatch(`${store}/${dispatch}`, name)
      // const length = this.$store.state.users[`${store}`].length
      // const value = document.querySelector(`input[name=${name}]`).value
      // console.log(value)
      // const newItem = {
      //   id: length,
      //   name: value
      // }
      // console.log(newItem)
      // this.$store.commit(`users/${commit}`, newItem)
      // document.querySelector(`input[name=${name}]`).value = newItem.name
      // this.form.makeId = newItem.id
    },
    getFullName (fN, mN, lN) {
      console.log(fN, mN, lN)
      return fN + ' ' + mN ? (mN + ' ') : '' + lN
    },
    truncateId (id) {
      return id.split('-')[0]
    },
    getGroup (id) {
      return this.groups.filter(group => group.id === id)
    },
    getUserStatus (id) {
      return this.userStatus.filter(user => user.id === id)[0]
    },
    getUserType (id) {
      return this.userTypes.filter(user => user.id === id)[0].name
    }
  },
  computed: {
    saving: {
      get () {
        return this.$store.state.save
      }
    },
    updating: {
      get () {
        return this.$store.state.update
      }
    },
    formEditMode: {
      get () {
        return this.$store.state.formEditMode
      }
    },
    userTypes: {
      get () {
        return this.$store.state.userType
      }
    },
    groups: {
      get () {
        return this.$store.state.users.allGroups
      }
    },
    allUsers: {
      get () {
        return this.$store.state.users.users
      }
    },
    allOperators: {
      get () {
        return this.$store.state.users.allOperators
      }
    },
    userStatus: {
      get () {
        return this.$store.state.userStatus
      }
    },
    vehicleStatus: {
      get () {
        return this.$store.state.vehicles.allStatus
      }
    }
  }
}
