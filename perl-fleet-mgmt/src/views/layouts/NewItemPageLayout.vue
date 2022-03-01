<template>
  <div>
    <v-toolbar absolute height="90" flat class="new-item-app-bar">
      <div class="">
        <div class="mb-4">
          <small>
            <router-link :to="{name: listLink}">
              <v-icon size="20" left> mdi-chevron-left
              </v-icon> {{ listPage }}
            </router-link>
          </small>
        </div>
        <div>
       <h4 class="font-weight-bold"> {{ title ? title  : 'Page Title'}} </h4>
        </div>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex justify-space-around">
        <div class="px-3">
          <v-btn @click="cancelAction" plain small color="primary">Cancel</v-btn>
        </div>
        <div class="px-3">
          <v-btn depressed small
          :disabled="processing"
          @click="addAction"
          color="primary"
          >Save {{ listPage ? listPage : 'Item'}}</v-btn>
        </div>
      </div>
    </v-toolbar>
    <v-divider class="my-0"></v-divider>
    <div class="mt-4">
    <slot name="formView"/>
    </div>
    <div>
      <slot name="actions">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewItemPageLayout',
  props: ['listPage', 'listLink', 'title', 'processing'],
  methods: {
    cancelAction () {
      this.$emit('cancel-action')
    },
    addAction () {
      this.$emit('add-action')
    }
  }
}
</script>

<style scoped>
.new-item-app-bar {
  position: sticky;
  position: -webkit-sticky;
}

</style>
