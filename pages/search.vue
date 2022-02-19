<template>
  <v-row class="justify-center ns-color-black">
    <v-col cols="12" sm="3" md="3">
      <div class="mt-1 d-block border-normal pa-1">
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
          {{ tab.text }} ({{ lengthOfTab(idxTab) }})
        </div>
      </div>
    </v-col>
    <v-col cols="12" sm="9" md="9">
      <!-- Length of Result -->
      <!-- <div
        class="d-flex flex-wrap align-center"
        style="width: 100%; height: 40px"
        :class="$vuetify.breakpoint.smAndDown ? 'justify-center' : ''"
      >
        <span class="ns-color-dark-gray" style="font-style: italic !important">
          Search result: {{ lengthAllDatas }} datas
        </span>
      </div> -->

      <!-- List Data -->
      <div v-if="lengthAllDatas > 0" class="d-block full-width">
        <list-items
          v-if="indexTab == 0"
          :items="allDatas.collection.items"
          :maxRow="$vuetify.breakpoint.mdAndUp ? 4 : 2"
        ></list-items>
      </div>
      <div v-if="indexTab == 1" class="d-block full-width">
        <list-items
          :items="likedList"
          :maxRow="$vuetify.breakpoint.mdAndUp ? 4 : 2"
          :showRemove="false"
          :showEdit="false"
        ></list-items>
      </div>
      <div v-if="indexTab == 2" class="d-block full-width">
        <list-items
          :items="removedList"
          :maxRow="$vuetify.breakpoint.mdAndUp ? 4 : 2"
          :showLike="false"
          :showEdit="false"
        ></list-items>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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
    ...mapGetters({
      allDatas: "getAllDatas",
      likedList: "getLikedList",
      removedList: "getRemovedList",
    }),
    lengthAllDatas() {
      if (
        !this.allDatas ||
        !this.allDatas.collection ||
        !this.allDatas.collection.items
      )
        return 0;
      return this.allDatas.collection.items.length
        ? this.allDatas.collection.items.length
        : 0;
    },
  },
  watch: {
    "$route.query.search": {
      immediate: true,
      handler(val) {
        this.searchByKeyword(val);
      },
    },
  },
  methods: {
    lengthOfTab(idx) {
      switch (idx) {
        case 0:
          return this.lengthAllDatas;
        case 1:
          return this.likedList.length;
        case 2:
          return this.removedList.length;

        default:
          break;
      }
      return 0;
    },
    async searchByKeyword(keyword) {
      let strQuery = `q=${encodeURI(keyword)}`;
      try {
        await this.$store.dispatch("search", strQuery);
      } catch (err) {
        console.log("ERR_SEARCH", err);
      }
    },
  },
};
</script>
