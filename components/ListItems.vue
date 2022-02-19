<template>
  <v-row class="pa-0 ma-0">
    <v-col
      cols="12"
      v-if="!displayItems || displayItems.length <= 0"
      class="text-center font-italic"
    >
      # Chưa có dữ liệu #
    </v-col>
    <v-col v-else cols="12" class="pa-0 ma-0">
      <!-- List Products -->
      <v-row
        class="ma-0 pa-0 justify-left algin-center"
        style="margin-bottom: 10px !important"
      >
        <template v-for="(item, index) in displayItems">
          <v-col class="mb-1 pa-1" :key="index" :cols="numOfCols">
            <item
              :item="item"
              :showLike="showLike"
              :showRemove="showRemove"
              :showEdit="showEdit"
            ></item>
          </v-col>
        </template>
      </v-row>
      <!-- End -->

      <!--Pagination -->
      <v-row v-if="totalPages > 1" class="ma-2 mt-4 pa-0 justify-center">
        <v-pagination
          v-model="page"
          :length="totalPages"
          color="secondary"
        ></v-pagination>
      </v-row>
      <!-- End -->
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    items: { type: Array, default: [] },
    maxRow: { type: Number, default: 2 },
    mobileColumn: { type: Number, default: 2 },
    laptopColumn: { type: Number, default: 4 },
    showLike: { type: Boolean, default: true },
    showRemove: { type: Boolean, default: true },
    showEdit: { type: Boolean, default: true },
  },
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    numOfCols() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return this.mobileColumn;
      }
      if (this.$vuetify.breakpoint.mdAndUp) {
        return this.laptopColumn;
      }
      return 3;
    },
    itemPerPage() {
      if (this.maxRow <= 0) return 100;
      return this.maxRow * (12 / this.numOfCols);
    },
    displayItems: function () {
      if (!this.items) return [];
      let from = (this.page - 1) * this.itemPerPage;
      let to = (this.page - 1) * this.itemPerPage + this.itemPerPage;
      return this.items.slice(from, to);
    },
    totalPages() {
      if (!this.items || this.items.length <= 0) return 0;
      let result = Math.ceil(this.items.length / this.itemPerPage);
      return result;
    },
  },
};
</script>

<style>
.product-list-items-title {
  width: 100%;
  text-align: center;
  position: relative;
  margin-bottom: 10px !important;
}
.product-list-items-title h2 {
  position: relative;
  z-index: 1;
  background-color: white;
}
</style>
