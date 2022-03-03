<template>
  <div>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="12" class="pa-0">
          <v-card class="pa-4">
            <v-card-title class="pt-0">New Vehicle Status
              <div class="close ml-auto">
                <slot name="close"/>
              </div>
            </v-card-title>
            <v-divider class="mt-0"></v-divider>
            <v-card-text>
              <div>
                <label>Vehicle Status <strong>*</strong></label>
                <v-text-field :rules="[required('Status Name')]" dense outlined
                v-model="form.statusName"
                >
                </v-text-field>
              </div>
              <div class="d-flex">
                <span>
                <v-simple-checkbox v-model="form.default" label="Default">
                </v-simple-checkbox></span>
                <span>Default</span>
              </div>
              <div class="w-100">
                <v-radio-group row v-model="form.color" dense>
                  <v-radio :value="color.color" class="" v-for="(color,c) in vehicleStatusColors" :key="c">
                    <template v-slot:label>
                      <small class="px-1 text-white" :class="color.color ? color.color : ''">{{ color.name }}</small>
                    </template>
                  </v-radio>
                </v-radio-group>
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <slot name="action"/>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import validation from '../../services/validation'
import common from '../../mixins/common'
export default {
  name: 'VehicleStatusForm',
  props: ['form'],
  mixins: [common],
  data () {
    return {
      ...validation
    }
  },
  computed: {
    vehicleStatusColsors: {
      get () {
        return this.$store.state.vehicles.vehicleStatusColors
      }
    }
  }

}
</script>

<style>

</style>
