<template>
  <div class="my-auto">
    <auth-layout class="">
      <template #header>
        <v-img
        position="center center"
        src="../../assets/brand/fleetgh-logo-horizontal.svg"
        >
        </v-img>
      </template>
      <template #card>
        <v-card
        class="pa-4"
        elevation="1"
        >
          <v-card-title class="justify-center">
            <h2 class="font-weight-bold">Login to Fleetgh</h2>
          </v-card-title>
          <v-card-text>
            <!-- email or user name -->
            <div>
              <label>Email address or username</label>
              <v-text-field
              v-model="loginForm.email"
              dense
              outlined
              >
              </v-text-field>
            </div>

            <!-- password  -->
            <div>
              <div class="d-flex justify-space-between">
              <label>Password</label>
              <small class="" @click="showPassword = !showPassword">{{ showPassword ? 'Hide' : 'Show' }} Password</small>
              </div>
              <v-text-field
              v-model="loginForm.password"
              :type="showPassword ? 'text' : 'password'"
              dense
              outlined
              >
              </v-text-field>
            </div>
            <div class="text-right mt-n2">
              <router-link class="my-link" to="/forgot-password">Forgot password?</router-link>
            </div>
          </v-card-text>
          <v-card-actions class="mb-3">
            <v-btn
            block
            color="success"
            depressed
            >{{ processing ? 'Just a moment...' : 'Log in'}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </auth-layout>
  </div>
</template>

<script>
import AuthLayout from '../layouts/AuthLayout.vue'
export default {
  name: 'Login',
  components: { AuthLayout },
  data () {
    return {
      processing: false,
      showPassword: false,
      // eslint-disable-next-line no-undef
      loginForm: new Form({
        email: '',
        password: ''
      })
    }
  }

}
</script>

<style>

</style>
