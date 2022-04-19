<template>
  <div class="bg-white">
    <v-toolbar flat class="toolbar-header">
      <v-toolbar-title>
        <h4 class="font-weight-bold">{{ title ? title : "Page Title" }}</h4>
      </v-toolbar-title>
      <!-- <v-toolbar-items> -->
      <v-spacer></v-spacer>
      <slot name="addButton" v-if="!addRoute">
      </slot>
      <v-btn v-if="addRoute && addButtonLabel" depressed color="primary" small>
        <v-icon left>mdi-plus </v-icon>
        {{ addButtonLabel ? addButtonLabel : "Add Item" }}
      </v-btn>
      <!-- </v-toolbar-items> -->
      <template  class="pl-0 pb-0" #extension>
          <div v-for="nav in links" :key="nav.id">
          <v-btn
          plain
          link
          exact-path
          :to="{name: `${nav.routeName}`}"
            :ripple="false"
            style="text-transform: none;"
            class="subtitle-2"
          >
            <label style="cursor: pointer;" class="pb-2"
            :style="activeRoute === `${nav.routeName}` ? activeMenu : ''">
            {{ nav.name ? nav.name : 'All'}}
            </label>
          </v-btn>
          </div>
      </template>
    </v-toolbar>
    <v-divider class="mt-0 mb-0"></v-divider>
    <div>
      <slot name="body"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListPageLayout',
  props: ['title', 'addButtonLabel', 'addRoute', 'links'],
  data () {
    return {
      toggle_exclusive: 1
    }
  },
  computed: {
    activeMenu () {
      return {
        borderBottom: `${2.5}px solid #004c84`,
        fontWeight: 'bold',
        color: '#004c84'
        // borderBottomColor: '#004c84'
      }
    },
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
.toolbar__extension {
  padding: 0px 0px 0px 0px !important;
}
.active-menu {
  border-bottom: 2px !important;
  color: #004c84 !important;
  border-bottom-color: #004c84 !important;
}
</style>
