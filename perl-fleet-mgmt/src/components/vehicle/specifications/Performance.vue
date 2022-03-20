<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" md="12" lg="12" class="pt-0">
    <v-card elevation="0" outlined rounded="3">
      <v-card-title class="font-weight-bold">
    Performance
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" class="pb-0">
              <label>Towing Capacity<v-icon v-tippy title="Measurement of the widest part of the vehicle" small class="mb-1">mdi-help-circle-outline</v-icon></label>
              <v-text-field
              v-model="form.towingCapacity"
              dense
              outlined
              >
              <template v-slot:append>
                <span class="text-grey" v-html="units.weight">
                </span>
              </template>
              </v-text-field>
        </v-col>
        <v-col cols="12" md="6" class="pb-0">
              <label>Max Payload<v-icon v-tippy title="" small class="mb-1">mdi-help-circle-outline</v-icon></label>
              <v-text-field
              v-model="form.maxPayload"
              dense
              outlined
              >
              <template v-slot:append>
                <span class="text-grey" v-html="units.weight">
                </span>
              </template>
              </v-text-field>
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
  name: 'Performance',
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
