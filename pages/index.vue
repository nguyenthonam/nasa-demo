<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline"> Welcome to NASA </v-card-title>
        <v-card-text>
          <a href="https://www.nasa.gov/" target="_blank">
            <v-img :src="logo" :aspect-ratio="10 / 6" contain
          /></a>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      logo: "/imgs/nasa_seal.png",
    };
  },
};
</script>
