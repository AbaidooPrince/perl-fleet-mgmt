<template>
  <div>
    <new-item-page-layout
    listLink="PersonnelList"
    listPage="Personnel"
    title="New Person"
    >
    <!-- <v-container> -->
    <template #formView>
      <v-container class="">
      <basic-details-form
      :form="basicDetails"
      ></basic-details-form>
      <user-access-form />
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
  components: { NewItemPageLayout, BasicDetailsForm, UserAccessForm },
  data () {
    return {
      // eslint-disable-next-line no-undef
      basicDetails: new Form({
        id: '',
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        profileImage: '',
        groupId: null,
        personnelType: null
      })
    }
  }

}
</script>

<style>

</style>
