<template>
  <v-card light class="ns-color-black">
    <v-img :aspect-ratio="8 / 6" :src="renderImage(item)"></v-img>

    <!-- Title -->
    <div class="px-2 item-title text-bold ns-only-two-line">
      {{ item.data[0].title }}
    </div>
    <!-- End -->

    <v-divider class="mx-2"></v-divider>

    <v-card-actions>
      <v-btn icon @click="actionLike" :color="!item.liked ? 'gray' : 'red'">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="actionRemove"
        :color="!item.removed ? 'gray' : 'teel'"
      >
        <v-icon>{{ !item.removed ? "mdi-delete" : "mdi-undo" }}</v-icon>
      </v-btn>
      <v-btn icon @click="actionEdit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    renderImage(item) {
      if (item && item.links && item.links.length > 0 && item.links[0].href) {
        return item.links[0].href;
      }
      return "/imgs/placeholder.png";
    },
    actionLike() {
      if (!this.item.liked) {
        this.item.liked = true;
        alert("Liked");
      } else {
        this.item.liked = false;
        alert("Unliked");
      }
      this.$forceUpdate();
    },
    actionRemove() {
      if (!this.item.removed) {
        this.item.removed = true;
        alert("Removed");
      } else {
        this.item.removed = false;
        alert("Undo");
      }
      this.$forceUpdate();
    },
    actionEdit() {
      alert(`Action edit ${this.item.data[0].title}`);
    },
  },
  mounted() {
    console.log("Item:", this.item);
  },
};
</script>

<style>
.item-title {
  overflow-y: hidden;
  margin-top: 6px;
  min-height: 3em;
}
</style>
