<template>
  <div>
      <AdminSingleCRUDPageLayout
      title="Roles"
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
    :items="allRoles"
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
      width="700"
      >
      <v-form ref="roleForm">
        <role-form :editMode="editMode" :form="roleForm">
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
        </role-form>
      </v-form>
      </v-dialog>

  </div>
</template>

<script>

import RoleForm from '../../components/adminForms/RoleForm.vue'
import CustomPagination from '../../components/common/CustomPagination.vue'
import validation from '../../services/validation'
import AdminSingleCRUDPageLayout from '../layouts/AdminSingleCRUDPageLayout.vue'
// import roles from '../../mixins/roles'

export default {
  name: 'ServiceTasks',
  // mixins: [roles],
  components: { AdminSingleCRUDPageLayout, CustomPagination, RoleForm },
  data () {
    return {
      editMode: false,
      ...validation,
      formDialog: false,
      // eslint-disable-next-line no-undef
      roleForm: new Form({
        name: 'Fleet Manager',
        description: '',
        id: '',
        permissions: [
          {
            name: 'Vehicle Entries',
            read: true,
            update: true,
            delete: true,
            create: true
          },
          {
            name: 'Vehicle Assignment Entries',
            read: true,
            update: true,
            delete: true,
            create: true
          },
          {
            name: 'Inspection Submissions',
            read: true,
            update: false,
            delete: true,
            create: true
          },
          {
            name: 'Personnel Entries',
            read: true,
            update: true,
            delete: true,
            create: true
          },
          {
            name: 'Fuel Entries',
            read: true,
            update: true,
            delete: true,
            create: true
          }
        ]
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
        { text: 'Usage', value: 'description' },
        { text: '', value: 'id', align: 'end' }
      ],
      vehicleStatus: [
        { id: 1, name: 'Active', color: 'success' }
      ]
    }
  },
  methods: {
    saveOption () {
      if (!this.$refs.roleForm.validate()) return
      if (this.editMode) {
        this.updateRole()
      } else {
        this.addRole()
      }
    },
    action (item, action) {
      if (action === 'Edit') {
        this.editMode = true
        const data = {
          ...item,
          roleName: item.name
        }
        this.roleForm.fill(data)
        this.formDialog = true
      } else {
        this.deleteRole(item)
        // this.deleteItem = item
        // this.deleteDialog = true
      }
    },
    closeDialog () {
      this.$refs.roleForm.reset()
      this.formDialog = false
    },
    openForm () {
      this.formDialog = true
      this.$refs.roleForm.reset()
    },
    async deleteRole (data) {
      const response = this.$store.dispatch('users/deleteRole', data)
      if (response === 'success') {
        this.$store.dispatch('showSnackBar', { message: 'Role deleted successfully', error: false })
      }
    },
    async updateRole () {
      try {
        const response = await this.$store.dispatch('users/updateRole', this.roleForm)
        if (response === 'success') {
          this.$store.dispatch('showSnackBar', { message: 'Role updated successfully!', error: false })
          this.formDialog = false
        }
      } catch (e) {

      }
    },
    async addRole () {
      try {
        const response = await this.$store.dispatch('users/addRole', this.roleForm)
        if (response === 'success') {
          this.$store.dispatch('showSnackBar', { message: 'Role added successfully!', error: false })
          this.formDialog = false
        }
      } catch (e) {

      }
    },
    async getAllRoles () {
      this.loading = true
      try {
        const response = await this.$store.dispatch('users/getAllRoles', { page: 1 })
        if (response === 'success') {
          this.loading = false
        }
      } catch (e) {
        this.loading = false
      }
    }
  },
  computed: {
    allRoles: {
      get () {
        return this.$store.state.users.allRoles
      }
    }
  },
  created () {
    this.getAllRoles()
  }

}
</script>

<style>

</style>
