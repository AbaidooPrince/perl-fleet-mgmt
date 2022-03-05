export default {
  data () {
    return {
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
    getFullName (fN, mN, lN) {
      console.log(fN, mN, lN)
      return fN + ' ' + mN ? (mN + ' ') : '' + lN
    },
    truncateId (id) {
      return id.split('-')[0]
    },
    getGroup (id) {
      const name = this.groups.filter(group => group.id === id)[0]
      if (name.length) {
        return name[0].name
      }
    }
  },
  computed: {
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
    userStatus: {
      get () {
        return this.$store.state.userStatus
      }
    }
  }
}
