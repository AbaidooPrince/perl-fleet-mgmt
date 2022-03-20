<template>
  <div class="">
    <v-container class="bg-grey" fluid>
      <list-page-layout
      title="Inspection History"
      addButtonLabel="Add Inspection"
      :addRoute="{name: 'NewInspection'}"
      :links="links"
      >
      <template #body>
  <v-data-table
  :loading="loading"
  fixed-header
  height="400"
  hide-default-footer
    v-model="selected"
    :headers="headers"
    :items="allVehicles"
    :single-select="singleSelect"
    item-key="name"
    show-select
    class="tables"
  >
    <template v-slot:top>
      <v-container class="pt-0 filter-group bg-white pt-3">
        <!-- <vehicle-filter-group></vehicle-filter-group> -->
        <v-row>
        <v-divider class="my-0"></v-divider>
        </v-row>
      </v-container>
    </template>

    <!-- vehicle name  -->
    <template  class="pl-0" v-slot:[`item.name`]="{ item }">
      <router-link :to="{name: 'ViewPersonnel', params: {userID:  item.id, userRouteID: userRouteID}}">
      <span class="pr-1">
        <v-avatar size="35" rounded="lg">
          <v-img :src="item.photo ? item.photo : defaultImage"></v-img>
        </v-avatar>
      </span>
      <span class="mt-auto">
      {{  item.name }}
      </span>
      </router-link>
    </template>
    <!-- vehicle status  -->
    <template  class="pl-0" v-slot:[`item.VehicleClassification.vehicleStatusId`]="{ item }">
      <v-badge dot
      :color="getVehicleStatus(item.VehicleClassification.vehicleStatusId) ? getVehicleStatus(item.VehicleClassification.vehicleStatusId).color : ''" inline></v-badge> {{ getVehicleStatus(item.VehicleClassification.vehicleStatusId) ? getVehicleStatus(item.VehicleClassification.vehicleStatusId).name : '' }}
    </template>
    <!-- user group  -->
    <template  class="pl-0" v-slot:[`item.VehicleClassification.groupId`]="{ item }">
      <span v-if="getGroup(item.VehicleClassification.groupId).length">{{ getGroup(item.VehicleClassification.groupId)[0].name ? getGroup(item.VehicleClassification.groupId)[0].name : ''  }}</span>
    </template>
    <!-- user classs  -->
    <template  class="pl-0" v-slot:[`item.employee`]="{ item }">
      <div class="">
      <v-badge color="grey" class="text-black" :value="item.employee" :content="item.employee ? 'Employee' : ''"></v-badge>
      </div>
      <!-- <div class=""> -->
      <v-badge color="grey" class="text-dark"  :value="item.operator" :content="item.operator ? 'Operator' : ''"></v-badge>
      <!-- </div> -->
    </template>
    <!-- getUserType -->
    <template  class="pl-0" v-slot:[`item.vehicleTypeId`]="{ item }">
      <span v-if="item.vehicleTypeId !== null">
      {{ getVehicleType(item.vehicleTypeId) ? getVehicleType(item.vehicleTypeId) : '' }}
      </span>
    </template>
    <template class="table-actions" v-slot:[`item.id`]="{ item }">
    <v-menu offset-y left rounded="lg"
      transition="slide-x-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        small
        depressed
          v-bind="attrs"
          v-on="on"
        ><v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </template>
        <v-list dense>
          <v-list-item exact-path  v-for="menu in actionItems" :key="menu.id" @click="action(item, menu.name)">
            <v-list-item-title class="small">{{ menu.name }}</v-list-item-title>
            <v-list-item-content>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon small>{{ menu.icon }}</v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-divider class="my-1"></v-divider>
          <v-list-item @click="deleteUser(item)">
            <v-list-item-title class="small">Archive</v-list-item-title>
            <v-list-item-content>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon small>mdi-delete-outline</v-icon>
            </v-list-item-action>
          </v-list-item>

        </v-list>
      </v-menu>
    </template>
  </v-data-table>
      </template>
      </list-page-layout>
    </v-container>
  </div>
</template>

<script>
import ListPageLayout from '../layouts/ListPageLayout.vue'
import common from '../../mixins/common'
import users from '../../mixins/user'
// import VehicleFilterGroup from '../../components/common/VehicleFilterGroup.vue'
import vehicles from '../../mixins/vehicles'
export default {
  components: { ListPageLayout },
  name: 'InspectionList',
  mixins: [common, users, vehicles],
  data () {
    return {
      defaultImage: require('../../assets/fleet1.jpg'),
      singleSelect: false,
      loading: false,
      actionItems: [
        { id: 1, name: 'View', icon: 'mdi-arrow-right', routeName: 'ViewVehicle' },
        { id: 2, name: 'Edit', icon: 'mdi-pencil-outline', routeName: 'EditVehicle' },
        { id: 3, name: 'Deactivate User Access', icon: 'mdi-account-minus-outline', routeName: 'DeactivateVehicle' }
      ],
      selected: [],
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
          width: 250,
          class: 'pl-0'
        },
        { text: 'VIN', value: 'vin' },
        { text: 'License Plate', value: 'licensePlate', width: 100 },
        { text: 'Type', value: 'vehicleTypeId' },
        { text: 'Staus', value: 'VehicleClassification.vehicleStatusId' },
        { text: 'Group', value: 'VehicleClassification.groupId', width: 100 },
        { text: 'Operator', value: 'VehicleClassification.operatorAccountId', width: 100 },
        { text: 'Year', value: 'year' },
        { text: 'Make', value: 'Make', width: 100 },
        { text: 'Model', value: 'Model', width: 100 },
        { text: '', value: 'id' }
      ],
      links: [
        { id: 1, routeName: 'InspectionList', name: 'All' }
        // { id: 2, routeName: 'AssignedVehicles', name: 'Assigned Vehicles' },
        // { id: 3, routeName: 'UnassignedVehicles', name: 'Unassigned Vehicles' },
        // { id: 4, routeName: 'ArchivedVehicles', name: 'Archived' }
      ]
    }
  },
  computed: {
    filter: {
      get () {
        return this.$route.meta.filter
      }
    },
    allVehicles: {
      get () {
        return this.$store.state.vehicles.vehicles
      }
    }
  },
  methods: {
    getData () {
      this.$store.dispatch('vehicles/getAllVehicleModels')
    },
    async action (data, action) {
      if (action === 'Edit') {
        const response = await this.$store.dispatch('vehicles/getVehicle', data.id)
        if (response === 'success') {
          this.$router.push({ name: 'EditVehicleDetails', params: { vehicleID: data.id } })
        }
      } else if (action === 'View') {
        this.$router.push({ name: 'Overview', params: { vehicleID: data.id } })
      }
      // else if (action === 'Deactivate User Access') {
      //   this.deleteUser(data, this.filter.dispatch)
      // }
    },
    async deleteUser (data) {
      const response = this.$store.dispatch('users/deleteUser', { dispatch: this.filter.dispatch, ...data })
      if (response === 'success') {
        this.$store.dispatch('showSnackBar', { message: 'User deleted successfully', error: false })
      }
    },
    async getAllVehicles () {
      this.loading = true
      const response = await this.$store.dispatch(`vehicles/${this.filter.dispatch}`, { page: 1 })
      if (response === 'success') {
        this.loading = false
      } else if (response.error) {
        this.$store.dispatch('showSnackBar', { message: `${response.error}`, error: true })
        this.loading = false
      } else {
        this.$store.dispatch('showSnackBar', { message: 'Error fetching data', error: true })
        this.loading = false
      }
    }
  },
  created () {
    this.getAllVehicles()
  }

}
</script>

<style>

</style>
