<template>
  <div>
    <page-under-construction></page-under-construction>
  </div>
</template>

<script>
import PageUnderConstruction from './PageUnderConstruction.vue'
export default {
  components: { PageUnderConstruction },
  name: 'Dashboard',
  created () {
    this.$store.dispatch('users/getAllGroups')
    this.$store.dispatch('vehicles/getAllVehicleStatus')
  }

}
</script>

<style>

</style>
