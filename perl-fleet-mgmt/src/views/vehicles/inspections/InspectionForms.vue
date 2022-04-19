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
        <v-col cols="12" md="4" v-for="(form, f) in allInspectionForms" :key="f+'_form'">
          <v-card outlined>
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
          <v-list-item v-for="menu in actionItems" :key="menu.id" @click="action(form, menu.name)">
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
              <div class="h4 text-dark" style="height: 4rem;">
                {{ form.name }}
              </div>
              <div class="" style="height: 6rem;">
                {{ form.description }}
              </div>
              <v-divider class=""></v-divider>
              <div class="d-flex justify-content-between pr-4 mt-2">
                <div class="text-dark">
                  Items
                </div>
                <div>
                  <v-badge :content="form.elements === null ? '0' : form.elements.length" color="grey"></v-badge>
                </div>
              </div>
              <!-- <v-divider class="my-1"></v-divider> -->
              <!-- <div class="d-flex justify-content-between pr-4 mt-2">
                <div class="text-dark">
                  Vehicles
                </div>
                <div>
                  <v-badge content="2" color="grey"></v-badge>
                </div>
              </div>
              <v-divider class="my-1"></v-divider> -->
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>
    </v-container>
      <v-dialog v-model="formDialog"
      width="600"
      >
      <v-form ref="InspectionFormForm" @submit.prevent="saveOption">
        <inspection-form-form
        @delete-item="deleteItem"
        @add-new-item="addNewItem"
        :form="inspectionFormForm"
        :editMode="editMode"
        >
        <template #action>
            <div class="d-flex w-100 justify-content-between">
              <div>
              <v-btn @click="closeDialog" color="primary" plain>Cancel
              </v-btn>
              </div>
              <div class="">
              <v-btn type="submit" @click="saveOption" color="primary" depressed>Save
              </v-btn>
              </div>
            </div>
        </template>
        </inspection-form-form>
        </v-form>
        </v-dialog>

  </div>
</template>

<script>
import InspectionFormForm from '../../../components/adminForms/InspectionFormForm.vue'
import validation from '../../../services/validation'
export default {
  components: { InspectionFormForm },
  name: 'InspectionForms',
  data () {
    return {
      ...validation,
      formDialog: false,
      actionItems: [
        { id: 2, name: 'Edit', icon: 'mdi-pencil-outline', routeName: 'EditPersonnel' },
        { id: 3, name: 'Delete', icon: 'mdi-delete-outline', routeName: 'DeactivatePersonnel' }
      ],
      editMode: false,
      item: {
        name: '',
        status: null,
        comment: ''
      },
      // eslint-disable-next-line no-undef
      inspectionFormForm: new Form({
        id: '',
        name: '',
        description: '',
        elements: [
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
    saveOption () {
      if (!this.$refs.InspectionFormForm.validate()) return
      if (this.editMode) {
        this.updateInspectionForm()
      } else {
        this.addInspectionForm()
      }
    },
    closeDialog () {
      this.$refs.InspectionFormForm.reset()
      this.editMode = false
      this.formDialog = false
    },
    deleteItem (i) {
      if (i === 0) return
      this.inspectionFormForm.elements.splice(i)
    },
    addNewItem () {
      this.inspectionFormForm.elements.push({
        name: '',
        status: null,
        comment: ''
      })
    },
    openForm () {
      this.formDialog = true
      this.$refs.InspectionFormForm.reset()
      this.$refs.InspectionFormForm.resetValidation()
    },
    action (item, action) {
      if (action === 'Edit') {
        this.editMode = true
        const data = item
        if (data.elements === null) {
          data.elements = [{ ...this.item }]
        }
        console.log('item', data)
        // const data = {
        //   ...item,
        //   groupName: item.name
        // }
        this.inspectionFormForm.fill(data)
        this.formDialog = true
      } else {
        this.deleteInspectionForm(item)
        // this.deleteItem = item
        // this.deleteDialog = true
      }
    },
    async getAllInspectionForms () {
      this.loading = true
      try {
        const response = await this.$store.dispatch('inspections/getAllInspectionForms')
        if (response === 'success') {
          this.loading = false
        }
      } catch (e) {
        this.loading = false
      }
    },
    async addInspectionForm () {
      try {
        const response = await this.$store.dispatch('inspections/addInspectionForm', this.inspectionFormForm)
        if (response === 'success') {
          this.$store.dispatch('showSnackBar', { message: 'Form added successfully!', error: false })
          this.formDialog = false
        } else if (response.error) {
          this.$store.dispatch('showSnackBar', { message: `${response.error}`, error: true })
        }
      } catch (e) {
        this.$store.dispatch('showSnackBar', { message: 'Form added successfully!', error: true })
      }
    },
    async updateGroup () {
      try {
        const response = await this.$store.dispatch('inspections/updateGroup', this.groupForm)
        if (response === 'success') {
          this.$store.dispatch('showSnackBar', { message: 'Group updated successfully!', error: false })
          this.formDialog = false
        }
      } catch (e) {

      }
    },
    async deleteInspectionForm (data) {
      const response = this.$store.dispatch('inspections/deleteInspectionForm', data)
      if (response === 'success') {
        this.$store.dispatch('showSnackBar', { message: 'Group deleted successfully', error: false })
      }
    }
  },
  computed: {
    allInspectionForms: {
      get () {
        return this.$store.state.inspections.allInspectionForms
      }
    }
  },
  created () {
    this.getAllInspectionForms()
  }

}
// InspectionForms
</script>

<style>

</style>
