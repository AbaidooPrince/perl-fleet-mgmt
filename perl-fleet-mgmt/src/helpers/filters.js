import Vue from 'vue'

import { format, parseISO } from 'date-fns'

// filters
Vue.filter('fullDateTime', (date) => {
  console.log('date', format(parseISO(date), 'EEE do LLL yyy, hh:mm aaa'))
  return format(parseISO(date), 'EEE do LLL yyy, hh:mm aaa') || null
})
// filters
Vue.filter('onlyDateNumbers', (date) => {
  console.log('date', format(parseISO(date), 'EEE do LLL yyy, hh:mm aaa'))
  return format(parseISO(date), 'P') || null
})
