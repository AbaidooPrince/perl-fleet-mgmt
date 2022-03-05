<template>
  <div>
    <v-row no-gutters class="">
      <v-col cols="12" md="3" align-self="center" class="pt-0">
        <v-text-field
        class="mr-2"
        dense
        outlined
        rounded
        prepend-inner-icon="mdi-magnify"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6" align-self="center" class="pt-0">
        <div class="d-flex justify-start">
          <div class="custom-input-width mr-2" v-if="filter.userStatus">
          <v-autocomplete
          dense
          background-color="grey lighten-4"
          label="User Status"
          :items="userStatuses"
          item-text="name"
          outlined
          clearable
          item-color="primary"
          rounded
          >
                <template v-slot:item="data">
                  <v-list-item-content class="pb-0 pt-0">
                    <v-list-item-title>
                    <v-badge dot inline :color="data.item.color"></v-badge>
                      <span class="pl-3">
                    {{ data.item.name }}
                      </span>
                      </v-list-item-title>
                  </v-list-item-content>
                </template>
          </v-autocomplete>
        </div>
          <div class="custom-input-width mr-2" v-if="filter.userType">
          <v-autocomplete
          dense
          label="User Type"
          background-color="grey lighten-4"
          :items="userTypes"
          item-text="name"
          outlined
          clearable
          item-color="primary"
          rounded
          >
          </v-autocomplete>
        </div>
        </div>
      </v-col>
      <v-col cols="12" md="3" align-self="center" class="mt-n4">
        <custom-pagination></custom-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CustomPagination from './CustomPagination.vue'
export default {
  components: { CustomPagination },
  props: ['filter'],
  name: 'FilterGroup',
  data () {
    return {
      search: '',
      userSatus: ['Active', 'Dormant', 'No Access']
    }
  },
  computed: {
    userStatuses: {
      get () {
        return this.$store.state.userStatus
      }
    },
    userTypes: {
      get () {
        return this.$store.state.userType
      }
    }
  }
}
</script>

<style scoped>
.custom-input-width {
  width: 10rem;
  max-width: 12rem;
}
.pagination-btn {
  font-size: 10rem !important;
}
</style>
