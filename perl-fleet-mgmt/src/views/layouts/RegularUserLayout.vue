<template>
  <div>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer" v-if="drawer === false"> </v-app-bar-nav-icon>
      <v-spacer>
      </v-spacer>
      <div class="">
      <v-btn color="primary" class="mx-2" outlined small>
        Manage</v-btn>
      <v-btn class="mx-2" small icon outlined>
        <v-icon size="15">mdi-bell-outline</v-icon>
      </v-btn>
      <v-btn class="mx-2" small icon outlined>
        <v-icon size="15">mdi-plus</v-icon>
      </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer dark app
    clipped v-model="drawer"
    :permanent="activateDrawer ? false : true"
    color="primary">
      <v-toolbar
      elevation="4"
      class="primary"
      >
        <!-- <v-toolbar-title>
          MegaMinds Inc
        </v-toolbar-title> -->
        <div>
          <div>
            <label class="mb-0 font-weight-bold">MegaMinds Inc</label>
            <span>
              <v-icon color="#ffffff50">mdi-chevron-down</v-icon>
            </span>
          </div>
          <label class="small font-weight-light">
            Prince Abaidoo
          </label>
        </div>
        <v-spacer>
        </v-spacer>
        <v-avatar
        size="40"
        color="grey"
        class="font-weight-light"
        >
        PA
        </v-avatar>
      </v-toolbar>

      <!-- regular user menu  -->
      <v-list
      class="menu-items"
      dense
      >
      <!-- dahsboard  -->
      <v-list-item link
      exact-active-class="menu-active-class"
      :to="{ name: 'UserDashboard' }"
      >
          <v-icon class="pa-2">mdi-speedometer</v-icon>
        <v-list-item-title class="">
          Dashoard
          </v-list-item-title>
      </v-list-item>
      <!-- vehicle  -->
      <v-list-group
      active-class="menu-active-class"
      append-icon="mdi-chevron-down"
      >
        <template v-slot:activator>
          <v-icon class="pa-2">mdi-home</v-icon>
          <v-list-item-title>Vehicles</v-list-item-title>
        </template>
            <v-list-item link>
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            Vehicle List
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link >
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content class="pt-0 pb-0">
          <v-list-item-subtitle>
            Vehicle Assignments
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item link>
              <v-list-item-icon>
              </v-list-item-icon>
              <v-list-item-content>
          <v-list-item-subtitle>
            Expense History
          </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
        </v-list-group>

      <!-- Inspection  -->
      <v-list-group
      active-class="menu-active-class"
      append-icon="mdi-chevron-down"
      >
        <template v-slot:activator>
          <v-icon class="pa-2">mdi-home</v-icon>
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
          <v-icon class="pa-2">mdi-home</v-icon>
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
          <v-icon class="pa-2">mdi-home</v-icon>
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
          <v-icon class="pa-2">mdi-home</v-icon>
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
          <v-icon class="pa-2">mdi-users</v-icon>
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
          <v-icon class="pa-2">mdi-home</v-icon>
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
  name: 'RegularUserLayout',
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
.v-list-group--active {
  color: white !important;
}

</style>
