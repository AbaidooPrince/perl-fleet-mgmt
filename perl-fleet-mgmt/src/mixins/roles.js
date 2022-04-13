export default {
  data () {
    return {
      permissions: [
        {
          name: 'Vehicle Entries',
          read: true,
          update: true,
          delete: true,
          create: true
        },
        {
          name: 'Vehicle Assignment Entries',
          read: true,
          update: true,
          delete: true,
          create: true
        },
        {
          name: 'Inspection Submissions',
          read: true,
          update: false,
          delete: true,
          create: true
        },
        {
          name: 'Personnel Entries',
          read: true,
          update: true,
          delete: true,
          create: true
        },
        {
          name: 'Fuel Entries',
          read: true,
          update: true,
          delete: true,
          create: true
        }
      ]
    }
  }
}
