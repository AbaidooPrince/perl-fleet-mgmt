<template>
  <div>
    <v-list-item two-line dense class="px-0">
      <v-list-item-avatar>
        <v-avatar size="40" rounded="lg">
        <v-img :src="photo ? photo : defaultVehicle"></v-img>
        </v-avatar>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          {{ name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          <span v-if="vehicleStatusId">
            <v-badge dot inline :value="vehicleStatusId" :color="getVehicleStatus(vehicleStatusId).color"></v-badge>
            {{ vehicleStatusId ? getVehicleStatus(vehicleStatusId).name : '' }}
          </span>
          <span v-if="vehicleGroupId"
            >.
            {{ " " + getGroup(vehicleGroupId)[0].name }}
          </span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script>
import common from '../../mixins/common'
import vehicles from '../../mixins/vehicles'
export default {
  name: 'VehicleItem',
  props: ['name', 'vehicleStatusId', 'vehicleGroupId', 'photo'],
  mixins: [common, vehicles]
}
</script>
<style scoped></style>
