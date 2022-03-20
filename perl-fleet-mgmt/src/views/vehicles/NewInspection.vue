<template>
  <div>
    <new-item-page-layout
    listLink="InspectionList"
    listPage="Inspection"
    :crumb="editMode ? inspection.firstName : ''"
    title="New Inspection"
    :processing="processing"
    @cancel-action="cancelAction"
    @add-action="saveOption"
    >
    <!-- <v-container> -->
    <template #formView>
      <v-form ref="inspectionForm">
      <v-container class="">
        <inspection-form :form="inspectionForm"></inspection-form>
      </v-container>
      </v-form>
    </template>
    <template #actions>
      <v-container>
      <v-row align="center" justify="center">
        <v-col order-sm="2" cols="12" md="3" sm="3">
          <v-btn plain color="primary">Cancel
          </v-btn>
        </v-col>
        <v-col order-sm="3" cols="12" md="5" sm="9" class="text-right" justify="end">
          <div class="">
          <v-btn class="mx-2" outlined color="primary">Save &amp; Add Another
          </v-btn>
          <v-btn @click="saveOption" depressed color="primary">Save Personnel
          </v-btn>
          </div>
        </v-col>
      </v-row>
      </v-container>
    </template>
    <!-- </v-container> -->
    </new-item-page-layout>
    add new person
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import InspectionForm from '../../components/inspection/InspectionForm.vue'
import user from '../../mixins/user'
// import BasicDetailsForm from '../../components/personnel/BasicDetailsForm.vue'
// import UserAccessForm from '../../components/personnel/UserAccessForm.vue'
import NewItemPageLayout from '../layouts/NewItemPageLayout.vue'

export default {
  name: 'NewPersonnel',
  props: ['editMode'],
  mixins: [user],
  components: { NewItemPageLayout, InspectionForm },
  data () {
    return {
      processing: false,
      role: 1,
      // eslint-disable-next-line no-undef
      inspectionForm: new Form({
        vehicleId: null,
        inspectorId: null,
        checkList: [
          {
            itemName: 'Brake Inspection',
            status: null,
            comment: ''
          },
          {
            itemName: 'Hitch Inspection',
            status: null,
            comment: ''
          },
          {
            itemName: 'Tyre Pressure',
            status: null,
            comment: ''
          },
          {
            itemName: 'Tank Equipment',
            status: null,
            comment: ''
          },
          {
            itemName: 'Oil Filter',
            status: null,
            comment: ''
          },
          {
            itemName: 'Service Time',
            status: null,
            comment: ''
          },
          {
            itemName: 'Alignment',
            status: null,
            comment: ''
          }
        ],
        lastName: '',
        email: '',
        profileImage: '',
        groupId: null,
        personnelType: null,
        employee: false,
        operator: false
      }),
      // eslint-disable-next-line no-undef
      userAccess: new Form({
        userTypeId: 2,
        accessEnabled: false
      })
    }
  },
  computed: {
    inspectionData: {
      get () {
        return this.$store.state.vehicles.inspectionData
      }
    }
  },
  methods: {
    saveOption () {
      if (this.editMode === true) {
        this.updateInspection()
      } else {
        this.addInspection()
      }
    },
    fillForm () {
      if (this.editMode === true) {
        this.inspectionForm.fill(this.inspectionData)
      }
    },
    cancelAction () {
      this.$refs.inspectionForm.reset()
      this.$router.push({ name: 'InspectionList' })
      // inspectionForm
    },
    async addInspection () {
      if (!this.$refs.inspectionForm.validate()) return
      this.processing = true
      this.inspectionForm.inspectorId = this.currentUser.id
      const response = await this.$store.dispatch('vehicles/addInspection', this.inspectionForm)
      console.log(response)
      if (response.message === 'success') {
        this.processing = false
        this.$router.push({ name: 'ViewInspectionReport', params: { inpspectionId: response.id } })
        this.$store.dispatch('showSnackBar', { error: false, message: 'Inspection added successfully!' })
        // this.$router.push({ name: 'UserDashboard', params: { userRouteID: user.computed.userRouteID } })
      } else if (response === 'error') {
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error adding inspection!' })
        this.processing = false
        console.log('error', response)
      } else {
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error adding inspection!' })
        this.processing = false
      }
    },
    async updateInspection () {
      if (!this.$refs.inspectionForm.validate()) return
      this.processing = true
      const response = await this.$store.dispatch('vehicles/updateInspection', this.inspectionForm)
      console.log(response)
      if (response === 'success') {
        this.processing = false
        this.$store.dispatch('showSnackBar', { error: false, message: 'Inspection updated successfully!' })
        this.processing = false
        // this.$router.push({ name: 'UserDashboard', params: { userRouteID: user.computed.userRouteID } })
      } else if (response === 'error') {
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error updating inspection!' })
        this.processing = false
        console.log('error', response)
      } else {
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error updating inspection!' })
        this.processing = false
      }
    }
  },
  mounted () {
    this.fillForm()
  }

}
</script>

<style>

</style>
