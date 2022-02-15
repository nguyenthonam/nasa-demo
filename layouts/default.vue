<template>
  <v-app dark>
    <!-- Header -->
    <page-header></page-header>

    <!-- Main -->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    
    <!-- Footer -->
    <page-footer />
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      title: 'Vuetify.js'
    }
  }
}
</script>