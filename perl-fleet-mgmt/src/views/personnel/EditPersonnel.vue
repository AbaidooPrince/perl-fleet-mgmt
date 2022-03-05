<template>
  <div>
    <new-personnel :editMode="true"></new-personnel>
  </div>
</template>

<script>
import NewPersonnel from './NewPersonnel.vue'
export default {
  components: { NewPersonnel },
  name: 'EditPersonnel',
  props: ['userID'],
  methods: {
    async getUser () {
      const response = await this.$store.dispatch('users/getUser', this.userID)
      if (response === 'success') {
      }
    }
  },
  created () {
    // this.getUser()
  }
}
</script>

<style>

</style>
