<template>
  <router-link
    class="main-logo-wrapper"
    :style="`min-width: ${width}px; max-width: ${width}px;`"
    :to="link"
    :target="target"
  >
    <img
      v-if="white"
      class="main-logo"
      :style="`max-width: ${width}px;`"
      src="@/assets/img/media/logo-white.png"
      alt="Undead Phoenix"
    />
    <img
      v-else-if="black"
      class="main-logo"
      :style="`max-width: ${width}px;`"
      src="@/assets/img/media/logo-black.png"
      alt="Undead Phoenix"
    />
    <img
      v-else
      class="main-logo"
      :style="`max-width: ${width}px;`"
      src="@/assets/img/media/logo.png"
      alt="Undead Phoenix"
    />
  </router-link>
</template>

<script>
export default {
  name: "Logo",
  props: {
    width: {
      type: Number,
      default: 90,
    },
    white: {
      type: Boolean,
      default: false,
    },
    black: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      default: "/",
    },
    target: {
      type: String,
      default: "_self",
    },
  },
  methods: {
    newLogoRoute() {
      window.open(process.env.VUE_APP_URL, "_blank");
    },
  },
};
</script>

<style scoped>
.main-logo-wrapper {
  position: relative;
  cursor: pointer !important;
  transition: all 200ms ease;
}
.main-logo-wrapper:active {
  transform: scale(0.95);
}
.main-logo {
  width: 100%;
  height: auto;
}
</style>
