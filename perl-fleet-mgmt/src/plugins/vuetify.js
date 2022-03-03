import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#004C84',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
        success: '#0fb860',
        navy: '#003872',
        lime: '#01ff70',
        fuchsia: '#f012be'

      }
    }
  }
})
