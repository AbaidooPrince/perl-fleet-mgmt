<template>
  <div>
    <new-item-page-layout
    listLink="VehicleList"
    listPage="Vehicle"
    :crumb="editMode ? vehicle.name : ''"
    :title="editMode ? 'Edit Vehicle' : 'Add Vehicle'"
    :processing="editMode ? updating: saving"
    @cancel-action="cancelAction"
    @add-action="saveOption"
    >
    <!-- <v-container> -->
    <template #formView>
      <v-container>
        <v-row>
          <v-col class="sub-menu-sticky" cols="12" md="3" sm="12">
            <v-card>
                <v-list dense>
                  <v-list-item active-class="sub-menu-active" exact-path :to="{name: editMode ? menu.editRoute : menu.routeName}" v-for="(menu, m) in subMenu" :key="'menu'+m">
                    <v-list-item-icon>
                      <v-icon size="20">{{ menu.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="ml-2 small">
                      {{ menu.name }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" md="9" sm="12">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template #actions>
      <v-container>
      <!-- <v-row align="center" justify="center">
        <v-col order-sm="2" cols="12" md="3" sm="3">
          <v-btn plain color="primary">Cancel
          </v-btn>
        </v-col>
        <v-col order-sm="3" cols="12" md="5" sm="9" class="text-right" justify="end">
          <div class="">
          <v-btn class="mx-2" outlined color="primary">Save &amp; Add Another
          </v-btn>
          <v-btn @click="saveOption" depressed color="primary">Save Personnel
          </v-btn>
          </div>
        </v-col>
      </v-row> -->
      </v-container>
    </template>
    <!-- </v-container> -->
    </new-item-page-layout>
  </div>
</template>

<script>
import common from '../../mixins/common'
import NewItemPageLayout from '../layouts/NewItemPageLayout.vue'

export default {
  name: 'NewVehicle',
  props: ['editMode'],
  mixins: [common],
  components: { NewItemPageLayout },
  data () {
    return {
      subMenu: [
        { id: 1, name: 'Details', icon: 'mdi-note-text-outline', routeName: 'NewVehicle', editRoute: 'EditVehicleDetails' },
        { id: 2, name: 'Maintenance', icon: 'mdi-wrench-outline', routeName: 'Maintenance', editRoute: 'EditVehicleMaintenance' },
        { id: 3, name: 'Specifications', icon: 'mdi-calendar-text-outline', routeName: 'Specifications', editRoute: 'EditVehicleSpecifications' }
      ],
      processing: false
    }
  },
  computed: {
    saving: {
      get () {
        return this.$store.state.save
      }
    },
    vehicle: {
      get () {
        return this.$store.state.vehicles.vehicle
      }
    }
  },
  methods: {
    saveOption () {
      if (this.formEditMode === true) {
        this.$store.commit('TRIGGER_UPDATE', true)
        // this.updateUser()
      } else {
        console.log('save')
        this.$store.commit('TRIGGER_SAVE', true)
        // this.save = true
        // eslint-disable-next-line no-undef
        // Fire.$emit('add-vehicle')
      }
    },
    formMode () {
      if (this.editMode === true) {
        this.$store.commit('EDIT_MODE', true)
      } else {
        this.$store.commit('EDIT_MODE', false)
      }
    },
    cancelAction () {
      // this.$refs.userForm.reset()
      this.$store.commit('CAN_LEAVE_ROUTE', true)
      this.$router.push({ name: 'VehicleList' })
      // userForm
    },
    async addUser () {
      if (!this.$refs.userForm.validate()) return
      this.processing = true
      const user = {
        ...this.basicDetails,
        ...this.userAccess
      }
      const response = await this.$store.dispatch('users/addUser', user)
      console.log(response)
      if (response === 'success') {
        this.processing = false
        this.$store.dispatch('showSnackBar', { error: false, message: 'User added successfully!' })
        // this.$router.push({ name: 'UserDashboard', params: { userRouteID: user.computed.userRouteID } })
      } else if (response === 'error') {
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error adding user!' })
        this.processing = false
        console.log('error', response)
      } else {
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error adding user!' })
        this.processing = false
      }
    },
    async updateUser () {
      if (!this.$refs.userForm.validate()) return
      this.processing = true
      const user = {
        ...this.basicDetails,
        ...this.userAccess
      }
      const response = await this.$store.dispatch('users/updateUser', user)
      console.log(response)
      if (response === 'success') {
        this.processing = false
        this.$store.dispatch('showSnackBar', { error: false, message: 'User updated successfully!' })
        this.processing = false
        // this.$router.push({ name: 'UserDashboard', params: { userRouteID: user.computed.userRouteID } })
      } else if (response === 'error') {
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error updating user!' })
        this.processing = false
        console.log('error', response)
      } else {
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error updating user!' })
        this.processing = false
      }
    }
  },
  async beforeMount () {
    if (this.vehicle && this.editMode && this.vehicle.id !== this.$route.params.vehicleID) {
      await this.$store.dispatch('vehicles/getVehicle', this.$route.params.vehicleID)
    }
  },
  beforeDestroy () {
    this.$store.commit('RESET_MODE')
  },
  mounted () {
    this.$store.commit('TRIGGER_SAVE', false)
    this.formMode()
  },
  created () {
    this.$store.dispatch('users/getAllOperators', { page: 1 })
  }

}
</script>

<style>

</style>
