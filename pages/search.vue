<template>
  <v-row class="justify-center ns-color-black">
    <v-col cols="12" sm="3" md="3">
      <div style="height: 45px"></div>
      <div class="d-block border-normal pa-1">
        <div
          v-for="(tab, idxTab) in tabs"
          :key="'tab' + idxTab"
          class="pa-1 border-bottom-normal pointer"
          :class="
            indexTab == idxTab
              ? 'text-bold ns-color-secondary'
              : 'ns-color-dark-gray'
          "
          @click="indexTab = idxTab"
        >
          {{ tab.text }}
        </div>
      </div>
    </v-col>
    <v-col cols="12" sm="9" md="9">
      <!-- Length of Result -->
      <div
        class="d-flex flex-wrap align-center"
        style="width: 100%; height: 40px"
        :class="$vuetify.breakpoint.smAndDown ? 'justify-center' : ''"
      >
        <span class="ns-color-dark-gray" style="font-style: italic !important">
          Search result: {{ lengthSearch }} datas
        </span>
      </div>

      <!-- List Data -->
      <div v-if="allDatas.collection.items.length > 0" class="d-block">
        <list-items
          :items="allDatas.collection.items"
          :maxRow="$vuetify.breakpoint.mdAndUp ? 4 : 2"
        ></list-items>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  async asyncData({ $axios, query }) {
    let search = !query.search ? "" : query.search;
    console.log("Search Keyword:", search, encodeURI(search));
    let payload = {
      path: `https://images-api.nasa.gov/search?q=${encodeURI(search)}`,
    };
    let allDatas = await $axios.$get(payload.path);
    console.log("All Data:", allDatas);
    return { allDatas };
  },
  head() {
    return {
      title: "Search Page",
      meta: [],
    };
  },
  data() {
    return {
      indexTab: 0,
      tabs: [
        {
          text: "All data",
        },
        {
          text: "Liked data",
        },
        {
          text: "Removed data",
        },
      ],
    };
  },
  computed: {
    lengthSearch() {
      return this.allDatas.collection.items.length
        ? this.allDatas.collection.items.length
        : 0;
    },
  },
};
</script>
