<template>
  <div class="w-100">
    <v-container class="bg-grey ml-0 mr-0">
      <list-page-layout
      title="Service History"
      addButtonLabel="Add Service"
      :addRoute="{name: 'NewIssue'}"
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
    :items="allServices"
    :single-select="singleSelect"
    item-key="name"
    show-select
    class="tables"
  >
    <template v-slot:top>
      <v-container class="pt-0 filter-group bg-white pt-3">
        <vehicle-filter-group
          @get-prev-page-vehicles="getPreviousPageData"
          @get-next-page-vehicles="getNextPageData"
          module="vehicles"
          state="vehiclePagination"
        ></vehicle-filter-group>
        <v-row>
        <v-divider class="my-0"></v-divider>
        </v-row>
      </v-container>
    </template>

    <!-- vehicle name  -->
    <template  class="pl-0" v-slot:[`item.vehicleId`]="{ item }">
      <router-link :to="{name: 'Overview', params: {vehicleID:  item.vehicleId, userRouteID: userRouteID}}">
      <span class="pr-1">
        <v-avatar size="35" rounded="lg">
          <v-img :src="item.Vehicle ? item.Vehicle.photo : defaultVehicle"></v-img>
        </v-avatar>
      </span>
      <span class="mt-auto">
      {{ item.Vehicle ? item.Vehicle.name : item.vehicleId }}
      </span>
      </router-link>
    </template>
    <!-- vehicle status  -->
    <template  class="pl-0" v-slot:[`item.endDate`]="{ item }">
     <span v-if="item.endDate"> {{ item.endDate | fullDateTime }}</span>
    </template>
    <!-- user group  -->
    <template  class="pl-0" v-slot:[`item.odometer`]="{ item }">
    {{ item.id }}
    </template><!-- user group  -->
    <template  class="pl-0" v-slot:[`item.issues`]="{ item }">
    {{ item.id }}
    </template>
    <!-- user classs  -->
    <template  class="pl-0" v-slot:[`item.total`]="{ item }">
      {{ item.id }}
    </template>
    <template class="table-actions" v-slot:[`item.id`]="{ item }">
      <div :id="`${item.id}_menu`">
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
      </div>
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
import VehicleFilterGroup from '../../components/common/VehicleFilterGroup.vue'
import vehicles from '../../mixins/vehicles'
import { format, parseISO } from 'date-fns'
export default {
  components: { ListPageLayout, VehicleFilterGroup },
  name: 'ServiceList',
  mixins: [common, users, vehicles],
  data () {
    return {
      defaultImage: require('../../assets/fleet1.jpg'),
      singleSelect: false,
      loading: false,
      actionItems: [
        { id: 1, name: 'View', icon: 'mdi-arrow-right', routeName: 'ViewVehicle' }
        // { id: 2, name: 'Edit', icon: 'mdi-pencil-outline', routeName: 'EditVehicle' }
      ],
      selected: [],
      headers: [
        {
          text: 'Asset Name',
          align: 'start',
          sortable: false,
          value: 'vehicleId',
          width: 250,
          class: 'pl-0'
        },
        { text: 'Assert Record Type', value: 'endDate' },
        { text: 'Issue', value: 'odometer', width: 100 },
        { text: 'Status', value: 'issues' },
        { text: 'Reported Date', value: 'vendor' },
        { text: 'Labels', value: 'vendor' },
        { text: 'Total', value: 'total' },
        { text: '', value: 'id' }
      ],
      links: [
        { id: 1, routeName: 'AllIssuesList', name: 'All' },
        { id: 2, routeName: 'IssuesList', name: 'Open' },
        { id: 3, routeName: 'OverdueIssuesList', name: 'Overdue' },
        { id: 4, routeName: 'ResolvedIssuesList', name: 'Resolved' },
        { id: 4, routeName: 'ClosedIssueList', name: 'Closed' }
      ]
    }
  },
  computed: {
    filter: {
      get () {
        return this.$route.meta.filter
      }
    },
    allServices: {
      get () {
        return this.$store.state.services.allServices
      }
    }
  },
  methods: {
    getDateTime (date) {
      console.log('date', format(parseISO(date), 'EEE do LLL yyy, hh:mm aaa'))
      return date.toLocaleString()
    },
    observe (id) {
      const newId = '#' + id
      console.log(newId)
      const el = document.getElementById('#1_menu')
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            console.log('ENTER')
            return
          }
          console.log('LEAVE')
        },
        {
          root: null,
          threshold: 0.1 // set offset 0.1 means trigger if atleast 10% of element in viewport
        }
      )
      observer.observe(el)
    },
    getPreviousPageData () {
      const prevPage = this.vehiclePagination.currentPage - 1
      this.getAllServices(prevPage)
    },
    getNextPageData () {
      const nextPage = this.vehiclePagination.currentPage + 1
      this.getAllServices(nextPage)
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
    async getAllServices (page) {
      const nextPage = page || this.vehiclePagination.currentPage
      this.loading = true
      const response = await this.$store.dispatch(`services/${this.filter.dispatch}`, { page: nextPage })
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
    // this.observe('#1_menu')
    this.getAllServices()
  }

}
</script>

<style>

</style>
