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
      <v-spacer></v-spacer>
      <v-btn
        v-if="showLike"
        icon
        @click=" !item.liked ? actionLike(true) : actionLike(false)"
        :color="!item.liked ? 'gray' : 'red'"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn
        v-if="showRemove"
        icon
        @click="!item.removed ? actionRemove(true) : actionRemove(false)"
        :color="!item.removed ? 'gray' : 'teel'"
      >
        <v-icon>{{ !item.removed ? "mdi-delete" : "mdi-undo" }}</v-icon>
      </v-btn>
      <v-btn v-if="showEdit" icon @click="actionEdit">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    item: null,
    showLike: { type: Boolean, default: true },
    showRemove: { type: Boolean, default: true },
    showEdit: { type: Boolean, default: true }
  },
  methods: {
    renderImage(item) {
      if (item && item.links && item.links.length > 0 && item.links[0].href) {
        return item.links[0].href;
      }
      return "/imgs/placeholder.png";
    },
    actionLike(isLiked) {
      if (isLiked) {
        this.$store.commit("setItemToLikedList", this.item);
        alert("Liked");
      } else {
        this.$store.commit("removeItemInLikedList", this.item);
        alert("Unliked");
      }
      this.$forceUpdate()
    },
    actionRemove(isRemoved) {
      if (isRemoved) {
        this.$store.commit("setItemToRemovedList", this.item);
        alert("Removed");
      } else {
        this.$store.commit("removeItemInRemovedList", this.item);
        alert("Undo");
      }
      this.$forceUpdate()
    },
    actionEdit() {
      alert(`Action edit ${this.item.data[0].title}`);
    },
  }
};
</script>

<style>
.item-title {
  overflow-y: hidden;
  margin-top: 6px;
  min-height: 3em;
}
</style>
