<template>
  <div>
    <page-under-construction></page-under-construction>
  </div>
</template>

<script>
import data from '../mixins/data'
import PageUnderConstruction from './PageUnderConstruction.vue'
export default {
  components: { PageUnderConstruction },
  name: 'Dashboard',
  mixins: [data],
  created () {
  }

}
</script>

<style>

</style>
