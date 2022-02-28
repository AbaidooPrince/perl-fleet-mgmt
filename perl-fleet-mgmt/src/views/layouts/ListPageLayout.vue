<template>
  <div>
    <v-toolbar flat class="transparent">
      <v-toolbar-title >
       <h4 class="font-weight-bold"> {{ title ? title  : 'Page Title'}} </h4>
      </v-toolbar-title>
      <!-- <v-toolbar-items> -->
        <v-spacer></v-spacer>
        <v-btn depressed color="primary" :to="addRoute" small>
          <v-icon left>mdi-plus
          </v-icon>
          {{ addButtonLabel ? addButtonLabel : 'Add Item'}}
        </v-btn>
      <!-- </v-toolbar-items> -->
      <template #extension>
        <div class="d-flex justify-space-around">
          <div class="d-flex px-3" :class="activeRoute === 'VehicleList' ? 'dash' : ''">
            <router-link class="" active-class="active-menu" :to="{name: 'VehicleList'}">All</router-link>
          </div>
          <div class="px-3">
            <router-link exact="" exact-active-class="" :to="{name: 'Dashboard'}">One</router-link>
          </div>
        </div>
      </template>
    </v-toolbar>
      <!-- <v-divider class="mt-n1"></v-divider> -->
  </div>
</template>

<script>
export default {
  name: 'ListPageLayout',
  props: ['title', 'addButtonLabel', 'addRoute'],
  computed: {
    activeRoute () {
      return this.$route.name
    }
  }

}
</script>

<style scoped>
.dash {
  color: red;
  border-bottom-style: solid;
  border-bottom: 4px;
}
.active-menu {
  border-bottom: 2px;
  color: #004C84;
  border-bottom-color: #004C84;
}
</style>
