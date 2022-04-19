export default {
  methods: {
    observe (id) {
      const newId = '#' + id
      console.log(newId)
      const el = document.querySelector(newId)
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            console.log('ENTER')
            return
          }
          console.log('LEAVE')
        },
        {
          root: null,
          threshold: 0.1 // set offset 0.1 means trigger if atleast 10% of element in viewport
        }
      )
      observer.observe(el)
    }
  }
}
