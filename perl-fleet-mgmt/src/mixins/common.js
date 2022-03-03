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
    truncateId (id) {
      return id.split('-')[0]
    }
  }
}
