<template>
  <v-app>
    <regular-user-layout v-if="this.$route.meta.layout === 'user'"></regular-user-layout>
    <admin-user-layout v-else-if="this.$route.meta.layout === 'admin'"></admin-user-layout>
    <v-main :class="this.$route.meta.layout !== 'admin' ? 'white' : ''" class="w-100 fullwidth">
      <v-container class="mx-0 container fullwidth">
      <router-view/>
      </v-container>
    </v-main>
    <v-snackbar
    dark
    :color="error ? 'error' : 'success'"
    v-model="snackbar"
    >
      {{ snackBarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
        @click="closeSnackbar"
          icon
          v-bind="attrs"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import AdminUserLayout from './views/layouts/AdminUserLayout.vue'
import RegularUserLayout from './views/layouts/RegularUserLayout.vue'

export default {
  components: {
    AdminUserLayout,
    RegularUserLayout
  },
  name: 'App',

  data: () => ({
    layout: 'RegularUserLayout'
  }),
  methods: {
    renderLayout () {
      switch (this.$route.meta.layout) {
        case 'user': this.layout = 'RegularUserLayout'
          break
        case 'admin': this.layout = 'AdminUserLayout'
          break
        default: this.layout = ''
          break
      }
    },
    closeSnackbar () {
      this.$store.commit('SET_SNACK_BAR_OFF')
    }
  },
  computed: {
    snackbar: {
      get () {
        return this.$store.state.snackbar
      }
    },
    snackBarText: {
      get () {
        return this.$store.state.snackBarText
      }
    },
    error: {
      get () {
        return this.$store.state.error
      }
    }
  },
  mounted () {
    this.$store.commit('SET_SNACKBAR_OFF')
    this.renderLayout()
  }
}
</script>
<style>
</style>
