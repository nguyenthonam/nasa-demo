<template>
  <v-row class="ma-0 justify-center ns-color-black">
    <v-col cols="12" sm="2" md="2">
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
    <v-col cols="12" sm="10" md="10">
      <!-- List Data -->
      <div v-if="lengthAllDatas > 0" class="d-block full-width">
        <list-items
          v-if="indexTab == 0"
          :items="allDatas.collection.items"
        ></list-items>
      </div>
      <div v-if="indexTab == 1" class="d-block full-width">
        <list-items
          :items="likedList"
          :showRemove="false"
          :showEdit="false"
        ></list-items>
      </div>
      <div v-if="indexTab == 2" class="d-block full-width">
        <list-items
          :items="removedList"
          :showLike="false"
          :showEdit="false"
        ></list-items>
      </div>

      <!--Pagination -->
      <v-row v-if="totalPagesOfTab(indexTab) > 1" class="ma-2 mt-4 pa-0 justify-center">
        <v-pagination
          v-model="page"
          :length="totalPagesOfTab(indexTab)"
          color="secondary"
        ></v-pagination>
      </v-row>
      <!-- End -->
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
      page: 1,
      itemPerPage: 100,
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
        !this.allDatas.collection.metadata ||
        !this.allDatas.collection.metadata.total_hits
      )
        return 0;
      return this.allDatas.collection.metadata.total_hits;
    },
    
  },
  watch: {
    "$route.query.search": {
      immediate: true,
      handler(val) {
        this.searchByKeyword(val, this.page);
      },
    },
    page() {
      this.searchByKeyword(this.$route.query.search, this.page);
      this.$router.push({
          name: "search",
          query: { search: this.$route.query.search, page: this.page }
        });
    }
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
    totalPagesOfTab(idx) {
      switch (idx) {
        case 0:
          return Math.ceil(this.lengthAllDatas / this.itemPerPage);
        case 1:
          return Math.ceil(this.likedList.length / this.itemPerPage);
        case 2:
          return Math.ceil(this.removedList.length / this.itemPerPage);

        default:
          break;
      }
      return 0;
    },
    async searchByKeyword(keyword, page) {
      let strQuery = `q=${encodeURI(keyword)}&page=${page}`;
      try {
        await this.$store.dispatch("search", strQuery);
      } catch (err) {
        console.log("ERR_SEARCH", err);
      }
    },
  },
  created() {
    this.page = parseInt(this.$route.query.page);
  }
};
</script>
