<template>
  <div>
  <div>
    <v-row>
      <v-flex>
        <v-col cols="12">
          <dimensions></dimensions>
        </v-col>
        <v-col cols="12">
        </v-col>
      </v-flex>
      <v-flex md6 >
        <v-col cols="12" md="12" sm="12">
          <weight></weight>
        </v-col>
        <v-col>
          <performance></performance>
        </v-col>
      </v-flex>
    </v-row>
  </div>
  </div>
</template>

<script>
import Dimensions from '../../../components/vehicle/overview/specs/Dimensions.vue'
import Performance from '../../../components/vehicle/overview/specs/Performance.vue'
import Weight from '../../../components/vehicle/overview/specs/Weight.vue'
export default {
  components: { Dimensions, Weight, Performance },
  name: 'Specs'

}
</script>

<style>

</style>
