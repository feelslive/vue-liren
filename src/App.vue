<template>
  <div id="app">

      <!-- <router-view/> -->
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* padding: 0 0.3rem; */
  max-width: 7.5rem;
  margin: 0 auto;
}
.title {
  height: 0.92rem;
  overflow: hidden;
  max-width: 7.5rem;
}
</style>
