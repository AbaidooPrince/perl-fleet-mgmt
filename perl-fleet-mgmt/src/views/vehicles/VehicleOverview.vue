<template>
  <div>
    <div class="">
    <ul class="line">
      <li @click="switchComponent(tab.component)" :class="isActiveTab === tab.component ? 'activeLink' : 'text-muted'" class="list mr-5 defaultLink" v-for="(tab, t) in tabs" :key="t+'ttab'"> {{ tab.name }}
      </li>
    </ul>
    <!-- <v-divider class="mt-0"></v-divider> -->
    </div>
    <div>
      <v-container>
      <component :is="isActiveTab" />
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VehicleOverview',
  components: {
    OverviewDetails: () => import('../../views/vehicles/overview/OverviewDetails.vue'),
    Specs: () => import('../../views/vehicles/overview/ViewSpecs.vue'),
    ViewFluids: () => import('../../views/vehicles/overview/ViewFluids.vue'),
    ViewWheelsTires: () => import('../../views/vehicles/overview/ViewWheelsTires.vue'),
    ViewEngineTransmission: () => import('../../views/vehicles/overview/ViewEngineTransmission.vue')
  },
  data () {
    return {
      activeStyle: {
        borderBottom: `solid ${2}px blue`,
        fontWeight: 'bold'
      },
      isActiveTab: 'OverviewDetails',
      tabs: [
        { name: 'Details', component: 'OverviewDetails' },
        { name: 'Specs', component: 'Specs' },
        { name: 'Engine & Transmission', component: 'ViewEngineTransmission' },
        { name: 'Wheels & Tires', component: 'ViewWheelsTires' },
        { name: 'Fluids', component: 'ViewFluids' }
      ]
    }
  },
  methods: {
    switchComponent (comp) {
      this.isActiveTab = comp
    }
  }

}
</script>

<style scoped>
/* .activeLink {
  border-bottom: solid 3px rgb(12, 12, 117);
  width: 100%;
  font-weight: bold;
  color: black;
}
.list {
  display: inline;
  padding-left: 4px;
}
.line {
  border-bottom: solid 1px grey;
}
.defaultLink {
  cursor: pointer;
}
.defaultLink:hover {
  border-bottom: solid 1px grey;
} */

</style>
