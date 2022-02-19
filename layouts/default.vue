<template>
  <v-app dark>
    <!-- Header -->
    <page-header></page-header>

    <!-- Main -->
    <v-main class="ns-bg-color-light-gray">
      <v-container class="mt-2 ns-bg-color-white full-height">
        <Nuxt />
        <!-- GO TOP -->
        <v-btn
          color="#DD0011"
          dark
          class="ma-0 pa-0"
          style="
            position: fixed;
            bottom: 100px;
            right: 20px;
            z-index: 1000;
            opacity: 0.8;
          "
          @click.stop="goTop"
          fab
          small
        >
          <v-icon> mdi-arrow-up </v-icon>
        </v-btn>
      </v-container>
    </v-main>

    <!-- Footer -->
    <page-footer />
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      title: "Vuetify.js",
    };
  },
  methods: {
    goTop() {
      window.scrollTo(0, 0);
    },
  }
};
</script>
