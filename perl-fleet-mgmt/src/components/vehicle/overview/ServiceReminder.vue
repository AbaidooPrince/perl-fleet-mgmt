<template>
  <div>
    <v-card elevation="1">
      <v-card-text>
        <div class="d-flex align-center justify-content-between">
        <h6 class="font-weight-bold mb-0">Service Reminders</h6>
        </div>
        <v-divider class="mt-2"></v-divider>
        <div class="d-flex justify-space-around">
          <div class="text-center">
            <h4 class="mb-0 grey--text">3</h4>
            <div class="small">
              Overdue
            </div>
          </div>
          <div class="text-center">
            <h4 class="mb-0 orange--text">3</h4>
            <div class="small">
              Due Soon
            </div>
          </div>
          <div  class="text-center">
            <h4 class="mb-0 grey--text">3</h4>
            <div class="small">
              Snoozed
            </div>

          </div>
        </div>
      </v-card-text>
      <v-divider class="mt-0"></v-divider>
      <v-card-text class="pt-0">
        <v-row>
          <v-col cols="10" md="12" lg="10" sm="12">
            <div>
             <span class="orange--text font-weight-bold mr-1">5. Brake Light</span>
              <span><v-icon color="orange" small>mdi-open-in-new</v-icon> </span>
            </div>
            <div>
              <small class="text-muted">Reported 4 days ago by Jacob Silva</small>
              <label class="orange--text">Driver side brake light is out</label>
            </div>
          </v-col>
          <v-col cols="2" md="12" lg="2" sm="12">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ServiceReminder'

}
</script>

<style>

</style>
