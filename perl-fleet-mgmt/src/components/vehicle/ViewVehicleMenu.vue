<template>
  <div>
    <div v-for="(menu, m) in menuLinks" :key="m+'men'">
      <v-hover v-slot="{ hover }">
        <router-link :to="{name: menu.routeName}">
    <ol :class="(hover || isActiveMenu(menu.routeName)) ? 'active' : ''" class="mb-0 py-1">
      <div class="pa-0 ma-0 d-flex">
      <span class="pl-1"><v-icon small :color="(hover || isActiveMenu(menu.routeName)) ? '' : 'grey lighten-1'" class="mb-1">{{ menu.icon }}
        </v-icon> {{menu.name}}
        </span>
        <span v-if="menu.count" class="ml-auto pr-1">0</span>
      </div>
    </ol>
        </router-link>
      </v-hover>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewVehicleMenu',
  data () {
    return {
      menuLinks: [
        { name: 'Overview', routeName: 'Overview', icon: 'mdi-view-dashboard', count: false },
        { name: 'Photos', routeName: 'VehiclePhotos', icon: 'mdi-image', count: true, countValue: `${this.allPhotosCount}` },
        { name: 'Documents', routeName: 'VehicleDocuments', icon: 'mdi-file-document', count: true, countValue: `${this.allPhotosCount}` },
        { name: 'Commnets', routeName: 'VehicleComments', icon: 'mdi-comment-text', count: true, countValue: `${this.allPhotosCount}` }
      ]
    }
  },
  computed: {
    currentRoute: {
      get () {
        return this.$route.name
      }
    }
  },
  methods: {
    isActiveMenu (route) {
      return route ? route === this.currentRoute : false
    }
  }

}
</script>

<style scoped>
.active {
  cursor: pointer;
  background-color: rgba(128, 128, 128, 0.295);
  border-radius: 5px;
  font-weight: bold;
  /* color: rgb(26, 110, 236); */
}
.v-application ol {
  padding-left: 0 !important;
}

</style>
