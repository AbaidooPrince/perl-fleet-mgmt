<template>
  <div class="">
    <v-toolbar flat height="" extension-height="20">
    <div class="w-100">
    <ul class="line">
      <li @click="switchComponent(tab.routeName)" :class="isActiveTab === tab.routeName ? 'activeLink' : 'text-muted'" class="list mr-5 defaultLink" v-for="(tab, t) in tabs" :key="t+'ttab'"> {{ tab.name }}
      </li>
    </ul>
    <!-- <v-divider class="mt-0"></v-divider> -->
    </div>
    <template v-slot:extension>
        <h4 class="font-weight-bold">Vehicle Assignment</h4>
        <v-spacer></v-spacer>
        <v-btn small @click="triggerDialog" color="primary" depressed>
          <v-icon small>mdi-plus</v-icon>
          Add Assignment
        </v-btn>
    </template>
    </v-toolbar>
    <v-container class="bg-grey" fluid>
  <v-data-table
  :loading="loading"
  fixed-header
  height="400"
  hide-default-footer
    v-model="selected"
    :headers="headers"
    :items="allVehicleAssignments"
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
    <template  class="pl-0" v-slot:[`item.vehicleId`]="{ item }">
      <router-link :to="{name: 'Overview', params: {vehicleID:  item.id, userRouteID: userRouteID}}">
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="item.Vehicle ? item.Vehicle.photo : defaultVehicle"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
      {{  item.Vehicle ? item.Vehicle.name : ''}}
          </v-list-item-title>
                        <v-list-item-subtitle>
                        </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
        <!-- <v-avatar size="35">
        </v-avatar> -->
      </router-link>
    </template>
    <!-- vehicle status  -->
    <template  class="pl-0" v-slot:[`item.startDate`]="{ item }">
      {{ item.startDate ? getDateTime(item.startDate) : '' }}
    </template>
    <!-- user classs  -->
    <template  class="pl-0" v-slot:[`item.operatorAccountId`]="{ item }">
      <div class="">
        {{ item.operatorAccountId }}
      <!-- <v-badge color="grey" class="text-black" :value="item.employee" :content="item.employee ? 'Employee' : ''"></v-badge> -->
      </div>
      <!-- <div class=""> -->
      <!-- <v-badge color="grey" class="text-dark"  :value="item.operator" :content="item.operator ? 'Operator' : ''"></v-badge> -->
      <!-- </div> -->
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
    </v-container>
    <v-dialog
      v-model="dialog"
      width="600px"
      persistent
      transition="dialog-transition"
    >
    <vehicle-assignment-form :form="assignmentForm">
      <template #close>
      </template>
      <template #action class="">
        <div class="d-flex w-100 justify-content-between">
          <div>
          <v-btn @click="dialog = false" color="primary" text>Cancel</v-btn>
          </div>
          <div class="">
          <v-btn depressed color="primary" @click="saveAssignment">Save</v-btn>
          </div>
        </div>
      </template>
    </vehicle-assignment-form>

    </v-dialog>
  </div>
</template>

<script>
// import { format } from 'date-fns'
// import ListPageLayout from '../layouts/ListPageLayout.vue'
import common from '../../mixins/common'
import users from '../../mixins/user'
// import VehicleFilterGroup from '../../components/common/VehicleFilterGroup.vue'
import vehicles from '../../mixins/vehicles'
import VehicleAssignmentForm from '../../components/vehicle/VehicleAssignmentForm.vue'
export default {
  components: { VehicleAssignmentForm },
  name: 'VehicleAssingmentList',
  mixins: [common, users, vehicles],
  data () {
    return {
      dialog: false,
      // eslint-disable-next-line no-undef
      assignmentForm: new Form({
        vehicleId: null,
        operatorAccountId: null,
        startDate: null,
        startTime: null,
        startingDate: null,
        endingDate: null,
        endTime: null,
        endDate: null,
        comment: ''
      }),
      defaultImage: require('../../assets/profile.svg'),
      singleSelect: false,
      loading: false,
      tabs: [
        { name: 'Vehicle List', routeName: 'AssignedVehicles' },
        { name: 'Vehicle Assignment', routeName: 'VehicleAssignmentList' }
      ],
      actionItems: [
        { id: 1, name: 'View', icon: 'mdi-arrow-right', routeName: 'ViewVehicle' },
        { id: 2, name: 'Edit', icon: 'mdi-pencil-outline', routeName: 'EditVehicle' },
        { id: 3, name: 'Deactivate User Access', icon: 'mdi-account-minus-outline', routeName: 'DeactivateVehicle' }
      ],
      selected: [],
      headers: [
        {
          text: 'Vehicle',
          align: 'start',
          sortable: false,
          value: 'vehicleId',
          width: 200,
          class: 'pl-0'
        },
        { text: 'Assignee', value: 'operatorAccountId' },
        { text: 'Sart Date', value: 'startDate', width: 120 },
        { text: 'End Date', value: 'endDate' },
        { text: 'Comment', value: 'comment' },
        { text: '', value: 'id' }
      ],
      links: [
        { id: 1, routeName: 'VehicleList', name: 'All' },
        { id: 2, routeName: 'AssignedVehicles', name: 'Assigned Vehicles' },
        { id: 3, routeName: 'UnassignedVehicles', name: 'Unassigned Vehicles' },
        { id: 4, routeName: 'ArchivedVehicles', name: 'Archived' }
      ]
    }
  },
  computed: {
    isActiveTab: {
      get () {
        return this.$route.name
      }
    },
    filter: {
      get () {
        return this.$route.meta.filter
      }
    },
    allVehicleAssignments: {
      get () {
        return this.$store.state.vehicles.allVehicleAssignments
      }
    }
  },
  methods: {
    getDateTime (date) {
      return date.toLocaleString()
    },
    triggerDialog () {
      this.dialog = true
    },
    async saveAssignment () {
      this.assignmentForm.startDate = `${this.assignmentForm.startingDate}T${this.assignmentForm.startTime}:00Z`
      this.assignmentForm.endDate = `${this.assignmentForm.endingDate}T${this.assignmentForm.endTime}:00Z`
      console.log('date', this.startDate)
      const response = this.$store.dispatch('vehicles/addVehicleAssignment', this.assignmentForm)
      if (response === 'success') {
        this.$store.dispatch('showSnackBar', { message: 'Vehicle Assigned Successfully', error: false })
        this.dialog = false
      }
    },
    getData () {
      this.$store.dispatch('vehicles/getAllVehicleModels')
    },
    async action (data, action) {
      if (action === 'Edit') {
        this.assignmentForm.fill(data)
        // this.assignmentForm.sartingDate = this.assignmentForm.startDate.toLocaleDateString()
        // this.assignmentForm.endingDate = this.assignmentForm.endingDate.toLocaleDateString()
        // this.assignmentForm.startTime = this.assignmentForm.startDate.toLocaleTimeString()
        // this.assignmentForm.endTime = this.assignmentForm.endDate.toLocaleTimeString()
        this.dialog = true
        // const response = await this.$store.dispatch('vehicles/getVehicle', data.id)
        // if (response === 'success') {
        //   this.$router.push({ name: 'EditVehicleDetails', params: { vehicleID: data.id } })
        // }
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
