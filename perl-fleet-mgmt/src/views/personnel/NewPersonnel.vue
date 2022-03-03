<template>
  <div>
    <new-item-page-layout
    listLink="PersonnelList"
    listPage="Personnel"
    :crumb="editMode ? personnel.firstName : ''"
    title="New Person"
    :processing="processing"
    @cancel-action="cancelAction"
    @add-action="addUser"
    >
    <!-- <v-container> -->
    <template #formView>
      <v-form ref="userForm">
      <v-container class="">
      <basic-details-form
      :form="basicDetails"
      ></basic-details-form>
      <user-access-form :form="userAccess" />
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
          <v-btn @click="addUser" depressed color="primary">Save Personnel
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
import BasicDetailsForm from '../../components/personnel/BasicDetailsForm.vue'
import UserAccessForm from '../../components/personnel/UserAccessForm.vue'
import NewItemPageLayout from '../layouts/NewItemPageLayout.vue'

export default {
  name: 'NewPersonnel',
  props: ['editMode'],
  components: { NewItemPageLayout, BasicDetailsForm, UserAccessForm },
  data () {
    return {
      processing: false,
      // eslint-disable-next-line no-undef
      basicDetails: new Form({
        id: '',
        firstName: '',
        middleName: '',
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
        accessEnabled: false,
        role: 1
      })
    }
  },
  computed: {
    personnel: {
      get () {
        return this.$store.state.users.user
      }
    }
  },
  methods: {
    actionMode () {
      if (this.editMode === true) {
        this.updateUser()
      } else {
        this.addUser()
      }
    },
    fillForm () {
      if (this.editMode === true) {
        this.basicDetails.fill(this.personnel)
        this.userAccess.fill(this.personnel)
      }
    },
    cancelAction () {
      this.$refs.userForm.reset()
      this.$router.push({ name: 'PersonnelList' })
      // userForm
    },
    async addUser () {
      if (!this.$refs.userForm.validate()) return
      this.processing = true
      const user = {
        ...this.basicDetails,
        ...this.userAccess
      }
      const response = await this.$store.dispatch('users/addUser', user)
      console.log(response)
      if (response === 'success') {
        this.processing = false
        this.$store.dispatch('showSnackBar', { error: false, message: 'User added successfully!' })
        // this.$router.push({ name: 'UserDashboard', params: { userRouteID: user.computed.userRouteID } })
      } else if (response === 'error') {
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error adding user!' })
        this.processing = false
        console.log('error', response)
      } else {
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error adding user!' })
        this.processing = false
      }
    },
    async updateUser () {
      if (!this.$refs.userForm.validate()) return
      this.processing = true
      const user = {
        ...this.basicDetails,
        ...this.userAccess
      }
      const response = await this.$store.dispatch('users/updateUser', user)
      console.log(response)
      if (response === 'success') {
        this.processing = false
        this.$store.dispatch('showSnackBar', { error: false, message: 'User updated successfully!' })
        // this.$router.push({ name: 'UserDashboard', params: { userRouteID: user.computed.userRouteID } })
      } else if (response === 'error') {
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error updating user!' })
        this.processing = false
        console.log('error', response)
      } else {
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error updating user!' })
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
