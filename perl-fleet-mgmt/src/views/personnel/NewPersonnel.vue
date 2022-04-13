<template>
  <div>
    <new-item-page-layout
    listLink="PersonnelList"
    listPage="Personnel"
    :crumb="editMode ? personnel.firstName : ''"
    title="New Person"
    :processing="processing"
    @cancel-action="cancelAction"
    @add-action="saveOption"
    >
    <!-- <v-container> -->
    <template #formView>
      <v-form ref="userForm">
      <v-container class="">
      <basic-details-form
      @set-file-url="setFile"
      :form="basicDetails"
      ></basic-details-form>
      <user-access-form :role="role" :form="userAccess" />
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      role: 1,
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
        accessEnabled: false
      })
    }
  },
  computed: {
    canLeaveRoute: {
      get () {
        return this.$store.state.canLeaveRoute
      }
    },
    formEditMode: {
      get () {
        return this.$store.state.formEditMode
      }
    },
    ...mapGetters(
      { userBasicDetails: 'users/userBasicDetails' }
    ),
    ...mapGetters({ userUserAccess: 'users/userUserAccess' }),
    personnel: {
      get () {
        return this.$store.state.users.user
      }
    }
  },
  methods: {
    setFile (e) {
      this.basicDetails.profileImage = e
    },
    saveOption () {
      if (this.editMode === true) {
        this.updateUser()
      } else {
        this.addUser()
      }
    },
    fillForm () {
      this.$store.commit('CAN_LEAVE_ROUTE', false)
      if (this.editMode === true) {
        this.$store.commit('CAN_LEAVE_ROUTE', false)
        this.basicDetails.fill(this.userBasicDetails)
        this.userAccess.fill(this.userUserAccess)
      }
    },
    cancelAction () {
      this.$store.commit('CAN_LEAVE_ROUTE', true)
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
        this.processing = false
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
  beforeRouteLeave (to, from, next) {
    if (!this.canLeaveRoute && to.name !== 'PersonnelList') {
      const answer = window.confirm('Do you really want to leave? You might have unsaved changes!')
      if (!answer) return false
      if (answer) {
        this.$store.commit('CAN_LEAVE_ROUTE', true)
        next()
      }
    } else {
      next()
    }
  },
  mounted () {
    this.fillForm()
  }

}
</script>

<style>

</style>
