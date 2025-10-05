<template>
  <div class="home-container">
    <HomeHero />
    <NewsContainer />
    <MainFooter />
  </div>
</template>

<script>
import HomeHero from '@/components/home/hero/HomeHero.vue';
import NewsContainer from '@/components/home/hero/NewsContainer.vue';
import MainFooter from "@/components/header/MainFooter.vue";

export default {
  name: "HomeVIew",
  components: {
    HomeHero,
    NewsContainer,
    MainFooter
  },
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  background: #000;
}
</style>
