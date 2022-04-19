export default {
  data () {
    return {
    }
  },
  methods: {
    async getAllInspectionForms () {
      this.loading = true
      try {
        const response = await this.$store.dispatch('inspections/getAllInspectionForms')
        if (response === 'success') {
          this.loading = false
        }
      } catch (e) {
        console.log(e)
        this.loading = false
      }
    }
  },
  created () {
    this.getAllInspectionForms()
  }
}
