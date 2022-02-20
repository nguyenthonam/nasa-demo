<template>
  <v-row class="pa-0 ma-0">
    <v-col
      cols="12"
      v-if="!items || items.length <= 0"
      class="text-center font-italic"
    >
      # No Data #
    </v-col>
    <v-col v-else cols="12" class="pa-0 ma-0">
      <!-- List Products -->
      <v-row
        class="ma-0 pa-0 justify-left algin-center"
        style="margin-bottom: 10px !important"
      >
        <template v-for="(item, index) in items">
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
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    items: { type: Array, default: [] },
    mobileColumn: { type: Number, default: 6 },
    laptopColumn: { type: Number, default: 3 },
    showLike: { type: Boolean, default: true },
    showRemove: { type: Boolean, default: true },
    showEdit: { type: Boolean, default: true },
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
