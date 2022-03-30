<template>
  <div>
      <AdminSingleCRUDPageLayout
      title="Vehicle Types"
      @add-action="openForm"
      >
      <template #body>
          <v-row justify="center" align="center">
              <v-col cols="12" md="8">
  <v-data-table
  :loading="loading"
  fixed-header
  height="400"
  hide-default-footer
    v-model="selected"
    :headers="headers"
    :items="allVehicleTypes"
    :single-select="singleSelect"
    item-key="name"
    show-select
    class="tables bg-white"
  >
    <template v-slot:top >
      <v-container class="pt-0 mt-4 filter-group pt-3">
          <div class="d-flex justify-content-between">
          <div class="text-muted">
              {{ selected.length }} selected:
              <span class="ml-1">
                  <v-btn icon color="grey">
                      <v-icon>mdi-delete</v-icon>
                  </v-btn>
              </span>
          </div>
          <custom-pagination></custom-pagination>
          </div>
      </v-container>
    </template>
    <template v-slot:[`item.name`]="{ item }" >
              {{ item.name }}
              <v-badge :value="item.default" inline color="grey" content="Default"></v-badge>
    </template>
    <template class="table-actions" v-slot:[`item.id`]="{ item }">
    <v-menu offset-y left rounded="lg"
      transition="slide-x-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        small
        depressed
          v-bind="attrs"
          v-on="on"
        ><v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </template>
        <v-list dense>
          <v-list-item v-for="menu in actionItems" :key="menu.id" @click="action(item, menu.name)">
            <v-list-item-title class="small">
              <v-icon  left small>{{ menu.icon }}</v-icon>
                {{ menu.name }}
            </v-list-item-title>
            <v-list-item-content>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-data-table>
              </v-col>
          </v-row>
      </template>
      </AdminSingleCRUDPageLayout>
      <v-dialog v-model="formDialog"
      width="600"
      >
      <vehicle-type-form :editMode="editMode" :form="vehicleTypeForm">
          <template #close>
            <v-btn @click="closeDialog" color="dark" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
          <template #action>
            <div class="d-flex w-100 justify-content-between">
              <div>
              <v-btn @click="closeDialog" color="primary" plain>Cancel
              </v-btn>
              </div>
              <div class="">
              <v-btn @click="saveOption" color="primary" depressed>Save
              </v-btn>
              </div>
            </div>
          </template>
      </vehicle-type-form>
      </v-dialog>
  </div>
</template>

<script>
import VehicleTypeForm from '../../../components/adminForms/VehicleTypeForm.vue'
import CustomPagination from '../../../components/common/CustomPagination.vue'
import common from '../../../mixins/common'
import validation from '../../../services/validation'
import AdminSingleCRUDPageLayout from '../../layouts/AdminSingleCRUDPageLayout.vue'

export default {
  name: 'VehicleTypes',
  components: { AdminSingleCRUDPageLayout, CustomPagination, VehicleTypeForm },
  mixins: [common],
  data () {
    return {
      editMode: false,
      ...validation,
      formDialog: false,
      // eslint-disable-next-line no-undef
      vehicleTypeForm: new Form({
        id: '',
        name: '',
        default: false
      }),
      singleSelect: false,
      loading: false,
      actionItems: [
        { id: 2, name: 'Edit', icon: 'mdi-pencil-outline', routeName: 'EditPersonnel' },
        { id: 3, name: 'Delete', icon: 'mdi-delete-outline', routeName: 'DeactivatePersonnel' }
      ],
      selected: [],
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Usage', value: '' },
        { text: '', value: 'id', align: 'end' }
      ],
      vehicleStatus: [
        { id: 1, name: 'Active', color: 'success' }
      ]
    }
  },
  methods: {
    action (item, action) {
      if (action === 'Edit') {
        const data = {
          ...item,
          statusName: item.name
        }
        console.log('item', item)
        this.editMode = true
        this.vehicleTypeForm.fill(data)
        this.formDialog = true
      } else {
        this.deleteVehicleType(item)
        // this.deleteItem = item
        // this.deleteDialog = true
      }
    },
    closeDialog () {
      this.formDialog = false
    },
    openForm () {
      this.vehicleTypeForm.reset()
      this.formDialog = true
    },
    saveOption () {
      if (this.editMode) {
        this.updateVehicleType()
      } else {
        this.addVehicleType()
      }
    },
    async deleteVehicleType (data) {
      const response = this.$store.dispatch('vehicles/deleteVehicleType', data)
      if (response === 'success') {
        this.$store.dispatch('showSnackBar', { message: 'Vehicle type deleted successfully', error: false })
      }
    },
    async updateVehicleType () {
      try {
        const response = await this.$store.dispatch('vehicles/updateVehicleType', this.vehicleTypeForm)
        if (response === 'success') {
          this.$store.dispatch('showSnackBar', { message: 'Vehicle type updated successfully!', error: false })
          this.formDialog = false
        //   this.$store.dispatch('vehicles/getVehicleTypes')
        } else if (response.error) {
          this.$store.dispatch('showSnackBar', { message: `${response.error}`, error: true })
        }
      } catch (e) {

      }
    },
    async addVehicleType () {
      try {
        const response = await this.$store.dispatch('vehicles/addVehicleType', this.vehicleTypeForm)
        if (response.id) {
          this.$store.dispatch('showSnackBar', { message: 'Vehicle type added successfully!', error: false })
          this.formDialog = false
        //   this.$store.dispatch('vehicles/getVehicleTypes')
        } else if (response.error) {
          this.$store.dispatch('showSnackBar', { message: `${response.error}`, error: true })
        }
      } catch (e) {

      }
    },
    async getVehicleTypes () {
      this.loading = true
      try {
        const response = await this.$store.dispatch('vehicles/getVehicleTypes', { page: 1 })
        if (response === 'success') {
          this.loading = false
        }
      } catch (e) {
        this.loading = false
      }
    }
  },
  computed: {
    allVehicleTypes: {
      get () {
        return this.$store.state.vehicles.allVehicleTypes
      }
    }
  },
  created () {
    this.getVehicleTypes()
  }
}
</script>

<style>

</style>
