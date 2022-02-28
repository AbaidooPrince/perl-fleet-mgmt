<template>
  <div>
    <v-container fluid>
      <list-page-layout
      title="Vehicles"
      addButtonLabel="Add Vehicle"
      :addRoute="{name: 'VehicleList'}"
      ></list-page-layout>
    </v-container>
  </div>
</template>

<script>
import ListPageLayout from '../layouts/ListPageLayout.vue'
export default {
  components: { ListPageLayout },
  name: 'VehicleList'

}
</script>

<style>

</style>
