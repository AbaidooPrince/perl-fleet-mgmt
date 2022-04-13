<template>
  <div>
    <v-row>
      <v-flex md6>
        <v-col cols="12">
        <chart></chart>
        </v-col>
        <v-col cols="12">
          <Details></Details>
        </v-col>
      </v-flex>
      <v-flex md6 >
        <v-col cols="12" md="12" sm="12">
        <issues></issues>
        </v-col>
        <v-col>
        <service-reminder></service-reminder>
        </v-col>
      </v-flex>
    </v-row>
  </div>
</template>

<script>
import Details from '../.././../components/vehicle/overview/Details.vue'
import Chart from '../../../components/vehicle/overview/Chart.vue'
import Issues from '../../../components/vehicle/overview/Issues.vue'
import ServiceReminder from '../../../components/vehicle/overview/ServiceReminder.vue'
export default {
  components: { Chart, Issues, ServiceReminder, Details },
  name: 'OverviewDetails'

}
</script>

<style>

</style>
