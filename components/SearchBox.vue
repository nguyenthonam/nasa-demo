<template>
  <client-only>
    <v-text-field
        v-model="searching"
        height="100%"
        outlined
        dense
        single-line
        hide-details
        clearable
        color="#285C7F"
        placeholder="Search..."
        v-on:keydown.enter="searchAction"
        @focus="searchBoxGetFocus"
        @blur="searchBoxLeave"
        :style="{ padding: $vuetify.breakpoint.smAndDown ? '0 0 0 5px' : '0 11px' }"
      ></v-text-field>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      searching: "",
      topmostSearchKeywords: [],
      focus: false
    };
  },
  methods: {
    searchAction() {
      if (this.searching && this.searching.trim().length > 0) {
        this.$router.push({
          name: "search",
          query: { search: this.searching }
        });
      } else {
        alert("Please enter keyword!");
      }
    },
    searchBoxGetFocus() {
      this.focus = true;
      this.$emit("searchFocus", true);
    },
    searchBoxLeave() {
      this.focus = false;
      this.$emit("searchFocus", false);
    },
  },
  created() {
    this.$nuxt.$on("clear-search", () => {
      this.searching = "";
    });
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.name == "search") {
        this.searching = !this.$route.query.search
          ? ""
          : this.$route.query.search;
        this.searchAction();
      }
    });
  }
}
</script>