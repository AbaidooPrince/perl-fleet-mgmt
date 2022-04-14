<template>
  <div>
    <v-container class="bg-grey" fluid>
      <v-row justify="end">
        <v-col cols="12" md="4" class="mt-4">
          <v-btn depressed
          @click="openForm"
          color="primary"
          >
          <v-icon left>mdi-plus</v-icon>
          Add New Form</v-btn>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-row>
        <v-col cols="12" md="4">
          <v-card>
            <v-card-text>
              <div class="ml-auto close">
                <v-menu>
                  <template v-slot:activator="{ on, attrs }">
              <v-icon
              v-on="on"
              v-bind="attrs"
              >mdi-dots-vertical</v-icon>
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
              </div>
              <div class="h4 text-dark">
                Title
              </div>
              <div>
                Descriptions
              </div>
              <div class="d-flex justify-content-between pr-4 mt-2">
                <div class="text-dark">
                  Items
                </div>
                <div>
                  <v-badge content="6" color="grey"></v-badge>
                </div>
              </div>
              <v-divider class="my-1"></v-divider>
              <div class="d-flex justify-content-between pr-4 mt-2">
                <div class="text-dark">
                  Vehicles
                </div>
                <div>
                  <v-badge content="2" color="grey"></v-badge>
                </div>
              </div>
              <v-divider class="my-1"></v-divider>
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>
    </v-container>
      <v-dialog v-model="formDialog"
      width="600"
      >
      <v-form ref="inspectionFormForm">
        <inspection-form-form
        @add-new-item="addNewItem"
        :form="inspectionFormForm"
        >
        </inspection-form-form>
        </v-form>
        </v-dialog>

  </div>
</template>

<script>
import InspectionFormForm from '../../../components/adminForms/InspectionFormForm.vue'
export default {
  components: { InspectionFormForm },
  name: 'InspectionForms',
  data () {
    return {
      formDialog: false,
      actionItems: [
        { id: 2, name: 'Edit', icon: 'mdi-pencil-outline', routeName: 'EditPersonnel' },
        { id: 3, name: 'Delete', icon: 'mdi-delete-outline', routeName: 'DeactivatePersonnel' }
      ],
      item: {
        name: '',
        status: null,
        comment: ''
      },
      // eslint-disable-next-line no-undef
      inspectionFormForm: new Form({
        id: '',
        name: '',
        items: [
          {
            name: '',
            status: null,
            comment: ''
          }
        ]
      })
    }
  },
  methods: {
    addNewItem () {
      this.inspectionFormForm.items.push(this.item)
    },
    openForm () {
      this.formDialog = true
      this.$refs.inspectionFormForm.reset()
    },
    action (item, action) {
      if (action === 'Edit') {
        this.editMode = true
        // const data = {
        //   ...item,
        //   groupName: item.name
        // }
        this.inspectionFormForm.fill(item)
        this.formDialog = true
      } else {
        this.deleteGroup(item)
        // this.deleteItem = item
        // this.deleteDialog = true
      }
    },
    async deleteGroup (data) {
      const response = this.$store.dispatch('users/deleteGroup', data)
      if (response === 'success') {
        this.$store.dispatch('showSnackBar', { message: 'Group deleted successfully', error: false })
      }
    }
  }

}
// InspectionForms
</script>

<style>

</style>
