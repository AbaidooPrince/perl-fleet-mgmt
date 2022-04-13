import { format, parseISO } from 'date-fns'

export default {
  filters: {
    fullDateTime: function (date) {
      console.log(date)
      // console.log('date', format(parseISO(date), 'EEE do LLL yyy, hh:mm aaa'))
      return format(parseISO(date), 'EEE do LLL yyy, hh:mm aaa') || null
    }
  }
}
