<template>
  <div>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" md="12" class="pa-0">
          <v-card class="pa-4">
            <v-card-title class="pt-0">New Vehicle Type
              <div class="close ml-auto">
                <slot name="close"/>
              </div>
            </v-card-title>
            <v-divider class="mt-0"></v-divider>
            <v-card-text>
              <v-form ref="groupForm">
              <div>
                <label> Name <strong>*</strong></label>
                <v-text-field :rules="[required('Type Name')]" dense outlined
                v-model="form.name"
                >
                </v-text-field>
              </div>
              <div>
                <v-switch inset class="mt-0" label="Default type for new vehicles" dense
                v-model="form.default"
                >
                </v-switch>
              </div>
              </v-form>
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
export default {
  name: 'VehicleTypeForm',
  props: ['form', 'editMode'],
  data () {
    return {
      ...validation
    }
  }

}
</script>

<style>

</style>
