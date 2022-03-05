<template>
  <div class="my-auto">
    <auth-layout class="">
      <template #header>
        <v-img
        v-if="!isResetPassword"
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
            <h2 class="font-weight-bold">Password Setting</h2>
          </v-card-title>
          <v-card-text>
            <v-form ref="password_set_form" >
            <!-- old password  -->
            <div v-if="isResetPassword">
              <div class="d-flex justify-space-between">
              <label>Old Password</label>
              <!-- <small class="" @click="showPassword = !showPassword">{{ showPassword ? 'Hide' : 'Show' }} Password</small> -->
              </div>
              <v-text-field
              v-model="passwordSetForm.oldPassword"
              type="text"
              dense
              outlined
              :rules="isResetPassword ? [required('Password'), minLength('Password', 8)] : ''"
              >
              </v-text-field>
            </div>
            <!-- password  -->
            <div>
              <div class="d-flex justify-space-between">
              <label>New Password</label>
              <small class="" @click="showPassword = !showPassword">{{ showPassword ? 'Hide' : 'Show' }} Password</small>
              </div>
              <v-text-field
              v-model="passwordSetForm.password"
              :type="showPassword ? 'text' : 'password'"
              dense
              outlined
              :rules="[required('Password'), minLength('Password', 8)]"
              >
              </v-text-field>
            </div>

            <!-- confirm password  -->
            <div>
              <div class="d-flex justify-space-between">
              <label>Confirm Password</label>
              <small class="" @click="showPassword = !showPassword">{{ showPassword ? 'Hide' : 'Show' }} Password</small>
              </div>
              <v-text-field
              v-model="passwordSetForm.confirm"
              :type="showPassword ? 'text' : 'password'"
              dense
              outlined
              :rules="[required('Password'), passwordMatch(passwordSetForm.password)]"
              >
              </v-text-field>
            </div>
            <!-- <div class="text-right mt-n2">
              <router-link class="my-link" to="/forgot-password">Forgot password?</router-link>
            </div> -->
            </v-form>
          </v-card-text>
          <v-card-actions class="mb-3">
            <v-btn
            @click="resetPassword"
            block
            color="success"
            depressed
            >{{ processing ? 'Just a moment...' : 'Reset'}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </auth-layout>
  </div>
</template>

<script>
import { logout } from '../../services/auth'
import validation from '../../services/validation'
import AuthLayout from '../layouts/AuthLayout.vue'
// import user from '../../mixins/user'
export default {
  name: 'PasswordSetting',
  components: { AuthLayout },
  data () {
    return {
      processing: false,
      showPassword: false,
      loginValid: false,
      ...validation,
      // eslint-disable-next-line no-undef
      passwordSetForm: new Form({
        id: '',
        oldPassword: '',
        password: ''
      })
    }
  },
  mixins: ['user'],
  methods: {
    async resetPassword () {
      if (!this.$refs.password_set_form.validate()) return
      this.processing = true
      this.passwordSetForm.id = this.verifiedUserID
      const response = await this.$store.dispatch('authentication/resetPassword', this.passwordSetForm)
      console.log('response', response)
      if (response === 'success') {
        this.processing = false
        // console.log('userRouteID', user)
        logout()
        this.$router.push({ name: 'Login' })
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
    isResetPassword: {
      get () {
        return this.$route.name === 'ChangePassword'
      }
    },
    verifiedUserID: {
      get () {
        return this.$store.state.authentication.verifiedUserID
      }
    },
    userRouteID: {
      get () {
        return this.$store.state.authentication.userRouteID
      }
    }
  }

}
</script>

<style>

</style>
