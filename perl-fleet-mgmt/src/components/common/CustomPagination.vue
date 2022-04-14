<template>
  <div>
        <div class="d-flex justify-space-around">
          <div>
            <label class="caption px-1">1 - 1 of 1</label>
          </div>
          <div>
        <v-btn-toggle v-model="pagination" mandatory>
          <v-btn @click="getPreviousPageData" :disabled="!hasPrevious" small class="">
            <v-icon>mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn @click="getNextPageData" :disabled="!hasNext" small>
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
  props: ['module', 'state'],
  data () {
    return {
      pagination: null
    }
  },
  methods: {
    getPreviousPageData () {
      this.$emit('get-prev-page-data')
    },
    getNextPageData () {
      this.$emit('get-next-page-data')
    }
  },
  computed: {
    paginations: {
      get () {
        return this.$store.state[`${this.module}`][`${this.state}`] || null
      }
    },
    noPagination () {
      return !this.hasNext && !this.hasPrevious
    },
    hasNext () {
      return this.paginations.currentPage !== this.paginations.lastPage
    },
    hasPrevious () {
      return this.paginations.currentPage > this.paginations.firstPage
    }
  }
}
</script>

<style>

</style>
