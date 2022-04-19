import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { Form } from 'vform'
import axios from 'axios'
import VueTippy, { TippyComponent } from 'vue-tippy'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import 'tippy.js/themes/google.css'
import './style.scss'
import VehicleItem from './components/common/VehicleItem.vue'
import UploaderVue from './components/common/Uploader.vue'
import UserItem from './components/common/UserItem.vue'
import auth from './services/auth'
import '@/helpers/filters'

Vue.use(VueTippy, {
  directive: 'tippy', // => v-tippy
  flipDuration: 0,
  animation: 'fade',
  arrow: true,
  arrowType: 'round',
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: false
      }
    }
  }
})
Vue.component('uploader', UploaderVue)
Vue.component('vehicle-item', VehicleItem)
Vue.component('user-item', UserItem)

window.Fire = new Vue()
window.Form = Form
window.axios = axios

Vue.component('tippy', TippyComponent)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  auth,
  render: h => h(App)
}).$mount('#app')
