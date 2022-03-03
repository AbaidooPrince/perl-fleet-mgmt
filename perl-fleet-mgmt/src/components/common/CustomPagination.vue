<template>
  <div>
        <div class="d-flex justify-space-around">
          <div>
            <label class="caption px-1">1 - 1 of 1</label>
          </div>
          <div>
        <v-btn-toggle v-model="pagination" mandatory>
          <v-btn small class="">
            <v-icon>mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn small>
            <v-icon>mdi-chevron-right
            </v-icon>
          </v-btn>
        </v-btn-toggle>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'CustomPagination',
  data () {
    return {
      pagination: 1
    }
  }
}
</script>

<style>

</style>
