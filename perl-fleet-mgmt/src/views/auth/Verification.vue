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
        <v-card class="pa-4" elevation="1">
          <v-card-title class="justify-center">
            <h2 class="font-weight-bold">Verify you account</h2>
          </v-card-title>
          <v-card-subtitle class="px-8 text-center">
            You are close loggin into your account. Kindly enter or paste the
            8-digit code that was sent to your mail.
          </v-card-subtitle>
          <v-card-text>
            <v-form ref="login_form">
              <!-- otp  -->
              <div v-if="!processing">
                <label></label>
                <v-otp-input
                  @finish="verifyCode"
                  v-model="verify.code"
                  length="8"
                  type="text"
                ></v-otp-input>
              </div>
              <div v-if="processing" align="center">

                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
                <div class="mt-2">
                <label>Just a moment...</label>
                </div>
              </div>
              <!-- <div class="text-right mt-n2">
              <router-link class="my-link" to="/forgot-password">Forgot password?</router-link>
            </div> -->
            </v-form>
          </v-card-text>
          <!-- <v-card-actions class="mb-3">
            <v-btn
            @click="login"
            block
            color="success"
            depressed
            >{{ processing ? 'Just a moment...' : 'Log in'}}
            </v-btn>
          </v-card-actions> -->
        </v-card>
      </template>
    </auth-layout>
  </div>
</template>

<script>
import validation from '../../services/validation'
import AuthLayout from '../layouts/AuthLayout.vue'
import user from '../../mixins/user'
export default {
  name: 'Verification',
  components: { AuthLayout },
  data () {
    return {
      processing: false,
      showPassword: false,
      loginValid: false,
      ...validation,
      // eslint-disable-next-line no-undef
      verify: new Form({
        code: ''
        // ON7INH5V
      })
    }
  },
  mixins: ['user'],
  methods: {
    async verifyCode () {
      if (!this.$refs.login_form.validate()) return
      this.processing = true
      const response = await this.$store.dispatch(
        'authentication/verifyUser',
        this.verify
      )
      console.log('response', response)
      if (response === 'success') {
        this.processing = false
        this.$router.push({
          name: 'UserDashboard',
          params: { userRouteID: user.computed.userRouteID }
        })
      } else if (response === 'error') {
        this.$store.dispatch('showSnackBar', {
          error: true,
          message: 'Error Loging you in!'
        })
        this.processing = false
        console.log('error', response)
      } else {
        this.$store.dispatch('showSnackBar', {
          error: true,
          message: 'Error Loging you in!'
        })
        this.processing = false
      }
    }
  }
}
</script>

<style></style>
