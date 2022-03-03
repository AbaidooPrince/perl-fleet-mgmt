<template>
  <div>
    <v-container>
      <v-row justify="center" align="center" class="mt-4">
        <v-col cols="12" md="4">
          <h3 class="mb-0 font-weight-bold">{{ title ? title : '' }}</h3>
        </v-col>
        <v-col cols="12" md="4" class="justify-end text-right">
          <v-btn @click="addAction" depressed color="success">
            <v-icon left>mdi-plus</v-icon>
            Add {{ title ? title : '' }}
          </v-btn>
        </v-col>
      </v-row>
      <div>
        <slot name="body"/>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'SingleCRUDPageLayout',
  props: ['title'],
  methods: {
    addAction () {
      this.$emit('add-action')
    }
  }
}
</script>

<style>

</style>
