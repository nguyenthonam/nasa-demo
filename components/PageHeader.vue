<template>
  <div>
    <v-app-bar fixed app dense dark>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-toolbar-title class="pointer" v-text="title" @click="$router.push('/')" />
      <v-spacer />
      <search-box></search-box>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
  </div>
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
        }
      ],
      title: "NASA",
    };
  },
};
</script>
