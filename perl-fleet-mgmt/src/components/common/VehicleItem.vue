<template>
  <div>
    <v-list-item two-line dense class="px-0">
      <v-list-item-avatar>
        <v-img :src="photo ? photo : defaultVehicle"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          {{ name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          <span>
            {{ vehicleStatusId }}
          </span>
          <span v-if="vehicleGroupId"
            >.
            {{ " " + vehicleGroupId }}
          </span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script>
import common from '../../mixins/common'
export default {
  name: 'VehicleItem',
  props: ['name', 'vehicleStatusId', 'vehicleGroupId', 'photo'],
  mixins: [common]
}
</script>
<style scoped></style>
