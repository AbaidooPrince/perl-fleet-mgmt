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
    :items="allInspections"
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
    <template  class="pl-0" v-slot:[`item.Vehicle`]="{ item }">
      <router-link :to="{name: 'ViewPersonnel', params: {userID:  item.id, userRouteID: userRouteID}}">
      <span class="pr-1">
        <v-avatar size="35" rounded="lg">
          <v-img :src="item.Vehicle.photo ? item.Vehicle.photo : defaultVehicle"></v-img>
        </v-avatar>
      </span>
      <span class="mt-auto">
      {{  item.Vehicle.name }}
      </span>
      </router-link>
    </template>
    <!-- vehicle status  -->
    <template  class="pl-0" v-slot:[`item.checkList`]="{ item }">
      <span v-if="item.checkList !== null">
        <v-chip x-small v-for="(name, n) in getFailedData(item.checkList)" :key="n+'name'">
          {{ name.itemName }}
        </v-chip>
      </span>
    </template>
    <!-- user group  -->
    <template  class="pl-0" v-slot:[`item.inspectorId`]="{ item }">
      <span v-if="item.inspectorId !== null">
        {{ getUser(item.inspectorId).firstName }}
        {{ getUser(item.inspectorId).lastName }}
      </span>
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
        { id: 1, name: 'View', icon: 'mdi-arrow-right', routeName: 'ViewInspectionReport' }
        // { id: 2, name: 'Edit', icon: 'mdi-pencil-outline', routeName: 'EditVehicle' }
      ],
      selected: [],
      headers: [
        {
          text: 'Vehicle',
          align: 'start',
          sortable: false,
          value: 'Vehicle',
          width: 250,
          class: 'pl-0'
        },
        { text: 'Failed Items', value: 'checkList' },
        { text: 'Inspected by', value: 'inspectorId', width: 100 },
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
    allInspections: {
      get () {
        return this.$store.state.vehicles.allInspections
      }
    }
  },
  methods: {
    getFailedData (data) {
      console.log('data', data)
      if (data !== null) {
        const failed = data.filter((fail) => {
          return fail.status === false
        // if (fail.status === false) {
        //   failed.push(fail)
        // }
        })
        return failed
      }
    },
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
        this.$router.push({ name: 'ViewInspectionReport', params: { inspectionId: data.id } })
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
      console.log('dispatch', this.filter.dispatch)
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
