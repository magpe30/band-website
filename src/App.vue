<template>
  <div id="app">
    <MainHeader />
    <router-view />
  </div>
</template>

<script>
import MainHeader from "@/components/header/MainHeader.vue";

export default {
  name: "MainApp",
  components: {
    MainHeader,
  },
  methods: {
    onResize() {
      this.$store.commit("updateWindow", window.innerWidth);
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
};
</script>

<style>
@import "./assets/styles/general.css";
</style>
