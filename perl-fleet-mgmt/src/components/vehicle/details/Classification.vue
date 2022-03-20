<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" md="12" lg="12" class="">
    <v-card elevation="0" outlined rounded="3">
      <v-card-title class="font-weight-bold">
    Classification
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" class="pb-0">
              <label>Status<strong class="text--error">*</strong></label>
              <v-select
              v-model="form.vehicleStatusId"
              hint="Vehicle's Status."
              persistent-hint
              :items="vehicleStatus"
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
                <v-list-item v-on="on" v-bind="attrs">
                  <v-list-item-title>
                    <v-badge :color="item.color" offset-x="-10" inline class="mr-1" dot></v-badge>
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item>
              </template>
              </v-select>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0">
              <label>Group</label>
              <v-select
              v-model="form.groupId"
              hint="Categorize this vehicle"
              persistent-hint
              :items="groups"
              item-text="name"
              item-value="id"
              dense
              outlined
              >
              </v-select>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0">
              <label>Operator</label>
              <v-select
              v-model="form.operatorAccountId"
              hint="Categorize this vehicle"
              persistent-hint
              :items="allOperators"
              item-text="name"
              item-value="id"
              dense
              outlined
              >
              <template v-slot:selection="{ item }">
                <span>
                    <!-- <v-badge :color="item.color" offset-x="-10" inline class="mr-1" dot></v-badge> -->
                    {{ item.firstName }}
                </span>
      </template>
              <template  v-slot:item="{item, attrs, on}">
                <v-list-item two-line dense v-on="on" v-bind="attrs">
                  <v-list-item-avatar>
                    <v-img :src="item.profileImage ? item.profileImage : defaultProfile">
                    </v-img>
                  </v-list-item-avatar>
                  <v-list-item-content class="pt-0 pb-0">
                    <v-list-item-title>
                    <div class="">
                      <div>
                    {{ item.firstName ? item.firstName : '' }}
                    {{ item.middleName ? item.middleName : '' }}
                    {{ item.lastName ? item.lastName : '' }}
                      </div>
                    </div>
                  </v-list-item-title>
                  <v-list-item-subtitle class="pt-2">
                      <v-badge class="small" offset-x="-2"  color="grey ligten-2" :value="item.employee" content="Employee"></v-badge>
                      <v-badge class="small" offset-x="-80"  color="grey ligten-2" :value="item.operator" content="Operator"></v-badge>
                  </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
              </v-select>
        </v-col>
        <v-col cols="12" class="pb-0 pt-0">
              <label>Ownership</label>
              <v-select
              v-model="form.ownership"
              hint="Categorize this vehicle"
              persistent-hint
              :items="ownerships"
              item-text="name"
              item-value="id"
              dense
              outlined
              >
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
  name: 'Classification',
  props: ['form'],
  mixins: [common],
  data () {
    return {
      ...validation,
      checkingEmail: false,
      emailExist: null
    }
  },
  computed: {
    allOperators: {
      get () {
        return this.$store.state.users.allOperators
      }
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
