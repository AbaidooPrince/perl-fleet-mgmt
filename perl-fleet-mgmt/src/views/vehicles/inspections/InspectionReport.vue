<template>
  <div>
    <v-container id="printMe"  class="">
      <v-row justify="center">
        <v-col cols="12" md="4">
          <v-btn link :to="{ name: 'InspectionList' }" plain color="primary">
            <v-icon left>mdi-chevron-left</v-icon>
            Inspection History
          </v-btn>
        </v-col>
        <v-col cols="12" md="4" class="text-right">
          <v-btn v-print="printObj" depressed color="success">
            <v-icon left>mdi-printer</v-icon>
            Print
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="8" class="small">
          <div class="d-flex justify-content-between">
            <div>
          <div>
            Comapny Name
          </div>
          <div>
            Company City, Company Region
          </div>
          <div>
            Company Country
          </div>
          </div>
          <div>
              Inspection Submition #
            <span>
              Number
            </span>
          </div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="4" lg="4">
          <vehicle-item
          :name="inspectionData.Vehicle.name"
          :photo="inspectionData.Vehicle.photo"
          ></vehicle-item>
        </v-col>
        <v-col class="text-right" cols="12" md="4" lg="4">
          <div>
            <b>Date Submitted:</b>
            <span class="pl-2">{{ inspectionData.createdAt ? inspectionData.createdAt : ''}}</span>
          </div>
          <div class="">
            <b>Submitted By:</b>
            <span  class="pl-2">{{ inspectionData.UserAccount ? (inspectionData.UserAccount.firstName + ' ' + inspectionData.UserAccount.lastName) : '' }}</span>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <div class="title mb-3 font-weight-bold">
            Inspection Items
          </div>

          <table class="mb-3">
  <!-- <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr> -->
  <tr v-for="(checklist, c) in inspectionData.checkList" :key="c+'_check'">
    <td>{{ checklist.name }}</td>
    <td>
      <div class="mb-2" :class="checklist.status === true ? 'text-success' : checklist.status === false ? 'text-danger' : ''">
        {{ checklist.status === true ? 'Pass' : checklist.status === false ? 'Fail' : '' }}
      </div>
      <div class="small">
        {{ checklist.comment ? checklist.comment : '' }}
      </div>
      </td>
  </tr>
</table>
<table class="mt-6">
          <div class="title mb-3 font-weight-bold">
            Sign-Off
          </div>
  <tr>
    <td class="small">
      Reviewer
    </td>
    </tr>
    <tr class="small">
    <td>
      Comment
    </td>
    </tr>
    <tr class="small">
    <td>
      Signature
    </td>
  </tr>
</table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { format } from 'date-fns'
import print from 'vue-print-nb'
import VehicleItem from '../../../components/common/VehicleItem.vue'
export default {
  components: { VehicleItem },
  directives: {
    print
  },
  name: 'InspectionReport',
  props: ['inspectionId'],
  data () {
    return {
      printObj: {
        id: 'printMe',
        standard: 'html5'
      }
    }
  },
  methods: {
    getDate (date) {
      return format(date, 'Mo')
    },
    async getInspectionData () {
      const response = await this.$store.dispatch('inspections/getVehicleInspectionData', this.inspectionId)
      if (response === 'success') {
      }
    }
  },
  computed: {
    inspectionData: {
      get () {
        return this.$store.state.inspections.inspectionData
      }
    }
  },
  mounted () {
    this.getInspectionData()
  }
}
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

</style>
