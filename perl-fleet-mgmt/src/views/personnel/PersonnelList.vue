<template>
  <div>
    <v-container fluid>
      <list-page-layout
      title="Personnel"
      addButtonLabel="Add Person"
      :addRoute="{name: 'NewPersonnel'}"
      ></list-page-layout>
    </v-container>
  </div>
</template>

<script>
import ListPageLayout from '../layouts/ListPageLayout.vue'
export default {
  components: { ListPageLayout },
  name: 'PersonnelList'

}
</script>

<style>

</style>
