<template>
  <div>
    <v-container class="" fluid>
      <list-page-layout
      title="Personnel"
      addButtonLabel="Add Person"
      :addRoute="{name: 'NewPersonnel'}"
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
    :items="allPersonnel"
    :single-select="singleSelect"
    item-key="name"
    show-select
    class="tables bg-white"
  >
    <template v-slot:top>
      <v-container class="pt-0 filter-group bg-white pt-3">
      <filter-group :filter="filter" ></filter-group>
        <v-row>
        <v-divider class="my-0"></v-divider>
        </v-row>
      </v-container>
    </template>

    <!-- personnel name  -->
    <template  class="pl-0" v-slot:[`item.firstName`]="{ item }">
      <router-link :to="{name: 'ViewPersonnel', params: {userID:  item.id, userRouteID: userRouteID}}">
      <span class="pr-1">
        <v-avatar size="35">
          <v-img :src="item.profileImage ? item.profileImage : defaultImage"></v-img>
        </v-avatar>
      </span>
      <span class="mt-auto">
      {{  item.firstName }} {{ item.middleName }} {{ item.lastName }}
      </span>
      </router-link>
    </template>
    <!-- user status  -->
    <template  class="pl-0" v-slot:[`item.userStatusId`]="{ item }">
      <v-badge dot :color="getUserStatus(item.userStatusId).color" inline></v-badge> {{ getUserStatus(item.userStatusId).name }}
    </template>
    <!-- user group  -->
    <template  class="pl-0" v-slot:[`item.groupId`]="{ item }">
      <span v-if="getGroup(item.groupId).length">{{ getGroup(item.groupId)[0].name ? getGroup(item.groupId)[0].name : ''  }}</span>
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
    <template  class="pl-0" v-slot:[`item.userTypeId`]="{ item }">
      {{ getUserType(item.userTypeId)}}
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
import FilterGroup from '../../components/common/FilterGroup.vue'
import common from '../../mixins/common'
import users from '../../mixins/user'
export default {
  components: { ListPageLayout, FilterGroup },
  props: [''],
  name: 'PersonnelList',
  mixins: [common, users],
  data () {
    return {
      defaultImage: require('../../assets/profile.svg'),
      singleSelect: false,
      loading: false,
      actionItems: [
        { id: 1, name: 'View', icon: 'mdi-arrow-right', routeName: 'ViewPersonnel' },
        { id: 2, name: 'Edit', icon: 'mdi-pencil-outline', routeName: 'EditPersonnel' },
        { id: 3, name: 'Deactivate User Access', icon: 'mdi-account-minus-outline', routeName: 'DeactivatePersonnel' }
      ],
      selected: [],
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'firstName',
          width: 200,
          class: 'pl-0'
        },
        { text: 'Email', value: 'email' },
        { text: 'User Status', value: 'userStatusId', width: 120 },
        { text: 'User Type', value: 'userTypeId' },
        { text: 'Classification', value: 'employee', width: 130 },
        { text: 'Group', value: 'groupId', width: 120 },
        { text: 'Employee Number', value: 'employeeNumber', width: 170 },
        { text: 'Assigned Vehicles', value: 'assignedVehicles', width: 250 },
        { text: '', value: 'id' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
          id: '2'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ],
      links: [
        { id: 1, routeName: 'PersonnelList', name: 'All' },
        { id: 2, routeName: 'UsersList', name: 'Users' },
        { id: 3, routeName: 'NonAccessList', name: 'No Access Users' },
        { id: 4, routeName: 'ArchivedUsersList', name: 'Archived' }
      ]
    }
  },
  methods: {
    getGroups (id) {
      return this.groups.filter(group => group.id === id)
    },
    async getUser () {
      const response = await this.$store.dispatch('users/getUser', this.userID)
      if (response === 'success') {
      }
    },
    async action (data, action) {
      if (action === 'Edit') {
        const response = await this.$store.dispatch('users/getUser', data.id)
        if (response === 'success') {
          this.$router.push({ name: 'EditPersonnel', params: { userID: data.id } })
        }
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
    async getAllPersonnel () {
      this.loading = true
      const response = await this.$store.dispatch(`users/${this.filter.dispatch}`, { page: 1 })
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
  computed: {
    // userTypes: {
    //   get () {
    //     return this.$store.state.userStatus
    //   }
    // },
    // userStatus: {
    //   get () {
    //     return this.$store.state.userStatus
    //   }
    // },
    filter: {
      get () {
        return this.$route.meta.filter
      }
    },
    allPersonnel: {
      get () {
        return this.$store.state.users.users
      }
    }
  },
  mounted () {
    this.getAllPersonnel()
  }
}
</script>

<style scoped>
.tables .table-actions {
  display: none;
}
.tables:hover .table-actions {
  display: block;
}
.filter-group {
  position: sticky;
  position: -webkit-sticky;
  top: 25%;
  z-index: 4;
}
.others {
  position: absolute;
  top: 2%;
}

</style>
