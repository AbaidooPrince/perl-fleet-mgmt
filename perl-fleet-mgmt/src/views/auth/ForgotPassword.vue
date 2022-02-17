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
            <h2 class="font-weight-bold">Forgot your password?</h2>
          </v-card-title>
          <v-card-subtitle class="text-center px-md-10">No worries! Enter your email address
            and we will send you instruction on how to reset it.</v-card-subtitle>
          <v-card-text>
            <!-- email or user name -->
            <div>
              <label>Email address</label>
              <v-text-field
              v-model="email"
              dense
              outlined
              >
              </v-text-field>
            </div>

            <div class="text-right mt-n2">
              <router-link class="my-link" to="/">Forgot password?</router-link>
            </div>
          </v-card-text>
          <v-card-actions class="">
            <v-btn
            block
            color="success"
            depressed
            >Send me instructions
            </v-btn>
          </v-card-actions>
          <v-card-text class="text-center pt-0">
          <v-divider></v-divider>
          <div>
            Know your password?
            <span class="text-primary">
              <router-link to="/login">Log in</router-link>
            </span>
          </div>
          </v-card-text>
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
      showPassword: false,
      email: ''
    }
  }

}
</script>

<style>

</style>
