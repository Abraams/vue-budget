<template>
  <div id="app">
    <component :is="layoutType"> </component>
  </div>
</template>

<script>
import Empty from "@/layouts/EmptyLayout.vue";
import Main from "@/layouts/MainLayout.vue";

export default {
  name: "app",
  components: {
    Empty,
    Main
  },
  computed: {
    layoutType() {
      return this.$route.meta.layout;
    }
  }
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
