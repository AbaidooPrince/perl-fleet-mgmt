<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12" md="3" align-self="center">
        <v-text-field
        class="mr-2"
        dense
        outlined
        rounded
        prepend-inner-icon="mdi-magnify"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6" align-self="center">
        <div class="d-flex justify-start">
          <div class="custom-input-width mr-2">
          <v-autocomplete
          dense
          background-color="grey lighten-4"
          label="User Status"
          :items="userStatus"
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
          <div class="custom-input-width mr-2">
          <v-autocomplete
          dense
          label="User Type"
          background-color="grey lighten-4"
          :items="userType"
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
      <v-col cols="12" md="3" align-self="center">
        <div class="d-flex justify-space-around">
          <div>
            <label class="caption px-1">1 - 1 of 1</label>
          </div>
          <div>
        <v-btn-toggle v-model="pagination" mandatory>
          <v-btn small class="">
            <v-icon>mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn small>
            <v-icon>mdi-chevron-right
            </v-icon>
          </v-btn>
        </v-btn-toggle>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'FilterGroup',
  data () {
    return {
      search: '',
      pagination: 1,
      userSatus: ['Active', 'Dormant', 'No Access']
    }
  },
  computed: {
    userStatus: {
      get () {
        return this.$store.state.userStatus
      }
    },
    userType: {
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
