<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" md="12" lg="12" class="pt-0">
    <v-card elevation="0" outlined rounded="3">
      <v-card-title class="font-weight-bold">
    Additional Information
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="12" class="pb-0 pt-0">
              <label>Color</label>
              <v-text-field
              v-model="form.color"
              dense
              outlined
              >
              </v-text-field>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0">
              <label>Body Type</label>
              <v-select
              v-model="form.bodyType"
              hint="e.g. Convertible, Coupe, Pickup, Sedan, etc."
              persistent-hint
              :items="bodyType"
              item-text="name"
              item-value="id"
              dense
              outlined
              >
              </v-select>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0">
              <label>Body Subtype</label>
              <v-select
              v-model="form.subBodyType"
              hint="e.g. Extended Cab, Crew Cab, etc."
              persistent-hint
              :items="subBodyType"
              item-text="name"
              item-value="id"
              dense
              outlined
              >
              </v-select>
        </v-col>
        <v-col cols="12" md="12" class="pb-0 pt-0">
              <label>MSRP</label>
              <v-text-field
              v-model="form.licensePlate"
              dense
              prepend-inner-icon="mdi-currency-usd"
              outlined
              hint=""
              persistent-hint
              >
              </v-text-field>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0">
              <label>Linked Vehicles</label>
              <v-select
              multiple
              v-model="form.linkedVehicles"
              :items="vehicles"
              item-text="name"
              item-value="id"
              dense
              outlined
              >
              <template v-slot:selection="{ item }">
                <span>
                    <v-badge :color="item.color" offset-x="-10" inline class="mr-1" dot></v-badge>
                    {{ item.name }}
                </span>
      </template>
              <template v-slot:item="{item, attrs, on}">
                <v-list-item two-line v-on="on" v-bind="attrs">
                  <v-list-item-avatar>
                    <v-img src="../../../assets/profile.svg">
                    </v-img>
                  </v-list-item-avatar>
                  <v-list-item-title>
                    <v-badge :color="item.color" offset-x="-10" inline class="mr-1" dot></v-badge>
                    {{ item.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    status
                  </v-list-item-subtitle>
                </v-list-item>
              </template>
              </v-select>
        </v-col>
      </v-row>
    </v-card-text>
    </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import common from '../../../mixins/common'
import validation from '../../../services/validation'
export default {
  name: 'AdditionalInfo',
  props: ['form'],
  mixins: [common],
  data () {
    return {
      ...validation,
      checkingEmail: false,
      emailExist: null
    }
  },
  methods: {
    addnewItems (name, store, commit) {
      const length = this.$store.state.users[`${store}`].length
      const value = document.querySelector(`input[name=${name}]`).value
      console.log(value)
      const newItem = {
        id: length,
        name: value
      }
      console.log(newItem)
      this.$store.commit(`users/${commit}`, newItem)
      document.querySelector(`input[name=${name}]`).value = newItem.name
      // this.form.makeId = newItem.id
    },
    async checkEmail () {
      if (this.form.email === '') return
      this.checkingEmail = true
      const response = await this.$store.dispatch('users/checkEmail', { email: this.form.email })
      if (response === true) {
        this.checkingEmail = false
        this.emailExist = true
      } else if (response === false) {
        this.checkingEmail = false
        this.emailExist = false
      } else if (response === null) {
        this.checkingEmail = false
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error checking email' })
      }
    },
    triggerUpload () {
      document.getElementById('fileInput').click()
    }

  },
  computed: {
    vehicles: {
      get () {
        return this.$store.state.vehicles.vehicles
      }
    }
  }

}
</script>

<style scoped>
.v-label {
  color: black !important;
}
.v-input--selection-controls  {
  margin-top: 0 !important;
}
.image-area {
  height: 6rem;
  border-radius: 10px;
  width: 6rem;

}
.no-image {
  background-color: #f9f9f9;
  border: grey dashed 2px;
}

</style>
