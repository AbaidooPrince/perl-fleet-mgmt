<template>
  <div>
    <v-app-bar class="transparent">
      <v-app-bar-title>Fleetgh
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn color="success" link to="/login">Login
      </v-btn>
    </v-app-bar>
    <v-carousel cycle :show-arrows="false">
      <v-carousel-item v-for="(item, i) in items" :key="i">
        <v-img aspect-ratio="2"  position="cover" class="shrink" :src="item.src">
          <!-- <v-row align="center" justify="center" class="pa-8" style="height: 80vh;">
      <v-col cols="12" md="4" lg="6" sm="12" class="banner-text">
        <div align="center">
        <div class="ma-lg-4 text-h3">
         {{ item.text }}
        </div>
        <div>
          <v-btn width="150" rounded>
            Enroll
          </v-btn>
        </div>
        </div>
      </v-col>
    </v-row> -->
        </v-img>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    logo: require('../assets/brand/fleetgh-logo-horizontal.svg'),
    items: [
      {
        src: require('../assets/fleet2.jpeg'),
        text: 'Practical sessions to speed your expertise on how things work'
      },
      {
        src: require('../assets/fleet3.jpeg'),
        text:
            'Experience real-world agile software development with your team'
      },
      {
        src: require('../assets/fleet1.jpg'),
        text:
            'Experience real-world agile software development with your team'
      }
    ],
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader'
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify'
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
        content: 'Juop'
      }
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com',
        content: 'Hello'
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
        content: 'Hi'
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify'
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
        content: 'lowe'
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify'
      }
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer'
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/getting-started/pre-made-layouts'
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions'
      }
    ]
  })
}
</script>
