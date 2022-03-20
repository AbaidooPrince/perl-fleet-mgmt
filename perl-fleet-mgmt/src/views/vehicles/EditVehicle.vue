<template>
  <div>
    <new-vehicle></new-vehicle>
  </div>
</template>

<script>
import NewVehicle from './NewVehicle.vue'
export default {
  components: { NewVehicle },
  props: ['vehicleID']

}
</script>

<style>

</style>
