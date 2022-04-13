<template>
  <div>
      <router-link
          :to="{name: 'ViewPersonnel', params: {userID:  user, userRouteID: userRouteID}}">
    <v-menu
      open-on-hover
      bottom
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <div
          v-bind="attrs"
          v-on="on">
      <span class="pr-1">
        <v-avatar size="35">
          <v-img :lazy-src="user.profileImage ? user.profileImage : defaultProfile" :src="user.profileImage ? user.profileImage : defaultImage"></v-img>
        </v-avatar>
      </span>
      <span class="mt-auto">
      {{  user.firstName }} {{ user.middleName }} {{ user.lastName }}
      </span>
      </div>
      </template>
      <v-card width="400">
        <v-card-text>
          <div class="d-flex align-center">
            <div>
        <v-avatar size="45">
          <v-img :lazy-src="user.profileImage ? user.profileImage : defaultImage" :src="user.profileImage ? user.profileImage : defaultImage"></v-img>
        </v-avatar>
            </div>
            <div class="px-4 font-weight-bold text-dark title">

      {{  user.firstName }} {{ user.middleName }} {{ user.lastName }}
            </div>
          </div>
        </v-card-text>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4" sm="12" class="pb-0 pt-0">
              <p class="mb-0">Email</p>
            </v-col>
            <v-col cols="12" md="8" sm="12" class="pb-0 pt-0">
              <p class="mb-0">{{ user.email }}</p>
            </v-col>
            <v-col cols="12" md="4" sm="12" class="pb-0 pt-0">
              <p class="mb-0">Group</p>
            </v-col>
            <v-col cols="12" md="8" sm="12" class="pb-0 pt-0">
              <p class="mb-0">{{ getGroup(user.groupId).name }}</p>
            </v-col>
            <v-col cols="12" md="4" sm="12" class="pb-0 pt-0">
              <p>Classifications</p>
            </v-col>
            <v-col cols="12" md="8" sm="12" class="pb-0 pt-0">
              <p class="mb-0">{{ (user.employee && user.operator) ? 'Employee, Operator' : (user.employee && !user.operator) ? 'Employee' : (user.operator && !user.employee) ? 'Operator' : '' }}</p>
            </v-col>
          </v-row>
        </v-card-text>

      </v-card>
      </v-menu>
      </router-link>
  </div>
</template>

<script>
import common from '../../mixins/common'

export default {
  name: 'UserItem',
  props: ['user'],
  mixins: [common.methods],
  data () {
    return {
      defaultProfile: require('../../assets/profile.svg')
    }
  },
  methods: {
    getGroup (id) {
      return this.groups.filter(group => group.id === id)[0] || { name: 'None' }
    }
  },
  computed: {
    groups: {
      get () {
        return this.$store.state.users.allGroups
      }
    },
    userRouteID: {
      get () {
        return this.$store.state.authentication.userRouteID
      }
    }
  }

}
</script>

<style>

</style>
