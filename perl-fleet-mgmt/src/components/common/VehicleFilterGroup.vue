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
          <div class="custom-input-width mr-2">
          <v-autocomplete
          dense
          multiple
          background-color="grey lighten-4"
          label="Types"
          :items="vehicleTypes"
          item-text="name"
          outlined
          clearable
          item-color="primary"
          rounded
          >
                <template v-slot:item="data">
                  <v-list-item-content class="pb-0 pt-0">
                    <v-list-item-title>
                    {{ data.item.name }}
                      </v-list-item-title>
                  </v-list-item-content>
                </template>
          </v-autocomplete>
        </div>
          <div class="custom-input-width mr-2">
          <v-autocomplete
          dense
          label="Group"
          background-color="grey lighten-4"
          :items="groups"
          item-text="name"
          outlined
          clearable
          item-color="primary"
          rounded
          >
          </v-autocomplete>
        </div>
          <div class="custom-input-width mr-2">
          <v-autocomplete
          dense
          label="Status"
          background-color="grey lighten-4"
          :items="vehicleStatus"
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
        <custom-pagination
        @get-prev-page-data="getPreviousPageData"
        @get-next-page-data="getNextPageData"
        :module="module"
        :state="state"
        >
        </custom-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import common from '../../mixins/common'
import vehicles from '../../mixins/vehicles'
import CustomPagination from './CustomPagination.vue'
export default {
  components: { CustomPagination },
  props: ['filter', 'module', 'state'],
  name: 'VehicleFilterGroup',
  mixins: [vehicles, common],
  data () {
    return {
      search: '',
      userSatus: ['Active', 'Dormant', 'No Access']
    }
  },
  methods: {
    getPreviousPageData () {
      this.$emit('get-prev-page-vehicles')
    },
    getNextPageData () {
      this.$emit('get-next-page-vehicles')
    }
  },
  computed: {
    userSdftatuses: {
      get () {
        return this.$store.state.userStatus
      }
    },
    vehicleTyfgpes: {
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
