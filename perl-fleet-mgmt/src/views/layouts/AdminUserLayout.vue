<template>
  <div>
    <v-toolbar class="transparent hidden-md-and-up" flat>
     <v-app-bar-nav-icon @click="drawer = !drawer">
     </v-app-bar-nav-icon>
    </v-toolbar>
    <v-navigation-drawer light app
    clipped v-model="drawer"
    :permanent="activateDrawer ? false : true"
    color="white">
      <!-- regular user menu  -->
      <v-list
      class="menu-items"
      dense nav
      >
      <!-- return to dashboard  -->
      <div class="pl-3 mb-4 mt-4">
          <router-link :to="{ name: 'UserDashboard' }">
            <v-icon color="primary">mdi-arrow-left-thin</v-icon> Back to Fleetgh
          </router-link>
      </div>
      <div class="d-flex align-center justify-space-around">
        <div>
          <v-avatar rounded="" color="grey" size="50">M</v-avatar>
        </div>
        <div class="py-4">
          <div class="small">
            Account Setting
          </div>
          <div>
            <h5 class="font-weight-bold">MegaMinds Inc</h5>
          </div>
        </div>
      </div>
      <v-divider></v-divider>

      <!-- logged in user  -->

      <!-- User Profile  -->
            <v-list-item dense exact-path link :to="{name: 'AdminProfile'}">
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            User Profile
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <!-- user management  -->
            <v-list-item dense exact-path target="_blank" link :to="{name: 'UsersList'}">
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            User Management
          </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon size="15">mdi-open-in-new</v-icon>
              </v-list-item-action>
            </v-list-item>

      <!-- roles  -->
            <v-list-item exact-path dense link>
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            Role
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
 <!-- roles  -->
            <v-list-item dense link exact-path :to="{name: 'Groups'}">
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            Groups
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <!-- vehicle settings  -->
            <v-list-item dense>
          <v-list-item-subtitle class="small font-weight-bold">
            VEHICLES
          </v-list-item-subtitle>
            </v-list-item>

             <!-- roles  -->
            <v-list-item dense link exact-path :to="{name: 'VehicleStatus'}">
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            Vehicle Status
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

      <!-- Inspection  -->
      <v-list-group
      active-class="menu-active-class"
      append-icon="mdi-chevron-down"
      >
        <template v-slot:activator>
          <v-icon class="pa-2" color="grey lighten-3">mdi-check-circle</v-icon>
          <v-list-item-title>Inspections</v-list-item-title>
        </template>
            <v-list-item link>
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            Inspection History
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            Forms
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
        </v-list-group>
      <!-- Issues  -->
      <v-list-group
      active-class="menu-active-class"
      append-icon="mdi-chevron-down"
      >
        <template v-slot:activator>
          <v-icon class="pa-2" color="grey lighten-3">mdi-alert-rhombus</v-icon>
          <v-list-item-title>Issues</v-list-item-title>
        </template>
            <v-list-item link>
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            Inspection History
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            Forms
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
        </v-list-group>
      <!-- Reminders  -->
      <v-list-group
      active-class="menu-active-class"
      append-icon="mdi-chevron-down"
      >
        <template v-slot:activator>
          <v-icon class="pa-2" color="grey lighten-3">mdi-alarm</v-icon>
          <v-list-item-title>Reminders</v-list-item-title>
        </template>
            <v-list-item link>
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            Inspection History
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            Forms
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
        </v-list-group>

      <!-- Service  -->
      <v-list-group
      active-class="menu-active-class"
      append-icon="mdi-chevron-down"
      >
        <template v-slot:activator>
          <v-icon class="pa-2" color="grey lighten-3">mdi-wrench</v-icon>
          <v-list-item-title>Service</v-list-item-title>
        </template>
            <v-list-item link>
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            Inspection History
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            Forms
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
        </v-list-group>

      <!-- personnel  -->
      <v-list-group
      active-class="menu-active-class"
      append-icon="mdi-chevron-down"
      >
        <template v-slot:activator>
          <v-icon class="pa-2" color="grey lighten-3">mdi-account-supervisor</v-icon>
          <v-list-item-title>Personnel</v-list-item-title>
        </template>
            <v-list-item link>
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            Inspection History
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            Forms
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
        </v-list-group>

      <!-- Vendors  -->
      <v-list-group
      active-class="menu-active-class"
      append-icon="mdi-chevron-down"
      >
        <template v-slot:activator>
          <v-icon class="pa-2" color="grey lighten-3">mdi-home</v-icon>
          <v-list-item-title>Vendors</v-list-item-title>
        </template>
            <v-list-item link>
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            Inspection History
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            Forms
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'AdminUserLayout',
  data () {
    return {
      mini: true,
      drawer: true
    }
  },
  computed: {
    activateDrawer () {
      return this.$vuetify.breakpoint.width < '1000'
    }
  },
  methods: {
    watchResize () {
      // alert(this.$vuetify.breakpoint.width)
      if (this.$vuetify.breakpoint.width < '986') {
        this.drawer = false
      } else {
        this.drawer = true
      }
    }
  },
  mounted () {
    this.watchResize()
  }
}
</script>

<style scoped>
.drawer-app-bar {
  position: sticky;
  position: -webkit-sticky;
  z-index: 1;
  top: 0;
}
.v-list-group--active {
  color: white !important;
}

</style>
