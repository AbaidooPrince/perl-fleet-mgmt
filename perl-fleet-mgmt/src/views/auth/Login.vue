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
            <v-form ref="login_form" >
            <!-- email or user name -->
            <div>
              <label>Email address or username</label>
              <v-text-field
              v-model="loginForm.username"
              dense
              outlined
              :rules="[required('Email'), validEmail()]"
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
              :rules="[required('Password'), minLength('Password', 4)]"
              >
              </v-text-field>
            </div>
            <div class="text-right mt-n2">
              <router-link class="my-link" to="/forgot-password">Forgot password?</router-link>
            </div>
            </v-form>
          </v-card-text>
          <v-card-actions class="mb-3">
            <v-btn
            @click="login"
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
import { isLoggedIn } from '../../services/auth'
import validation from '../../services/validation'
import AuthLayout from '../layouts/AuthLayout.vue'
// import user from '../../mixins/user'
export default {
  name: 'Login',
  components: { AuthLayout },
  data () {
    return {
      processing: false,
      showPassword: false,
      loginValid: false,
      ...validation,
      // eslint-disable-next-line no-undef
      loginForm: new Form({
        username: '',
        password: ''
      })
    }
  },
  mixins: ['user'],
  methods: {
    async login () {
      if (!this.$refs.login_form.validate()) return
      this.processing = true
      const response = await this.$store.dispatch('authentication/logUserIn', this.loginForm)
      console.log('response', response)
      if (response && response !== 'success') {
        this.$store.dispatch('showSnackBar', { error: true, message: `${response}` })
        this.processing = false
      } else if (response === 'success') {
        this.processing = false
        // console.log('userRouteID', user)
        this.$router.push({ name: 'UserDashboard', params: { userRouteID: this.userRouteID } })
      } else if (response.error) {
        this.$store.dispatch('showSnackBar', { error: true, message: `${response.error}` })
        this.processing = false
        console.log('error', response)
      } else {
        this.$store.dispatch('showSnackBar', { error: true, message: 'Error Loging you in!' })
        this.processing = false
      }
    }
  },
  computed: {
    isLoggedIn () {
      return isLoggedIn()
    },
    userRouteID: {
      get () {
        return this.$store.state.authentication.userRouteID
      }
    }
  },
  created () {
  }

}
</script>

<style>

</style>
