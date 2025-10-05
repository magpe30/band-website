<template>
  <nav class="header-wrapper">
    <div class="header-container" v-show="!isMobile">
      <Logo :width="70"/>
      <Links />
    </div>
    <div class="mobile-header-container" v-show="isMobile">
      <Logo :width="60"/>
      <button @click="toggleMenu" class="hamburger">
        <span :class="{ 'is-open': menuOpen }"></span>
      </button>
      <div v-show="menuOpen" class="mobile-links">
        <Links />
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "@/components/general/styleComponents/Logo.vue";
import Links from "@/components/header/Links.vue";

export default {
  name: 'MainHeader',
  components: { 
    Logo,
    Links 
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  computed: {
    ...mapGetters([
      "window"
    ]),
    isMobile(){
      return this.window.windowWidth <= 860;
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  }
};
</script>

<style scoped>
.header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1500;
  width: 100%;
  max-width: 1600px; /* Updated max-width */
  padding: 12px 60px;
  box-sizing: border-box;
  margin: auto; /* Center the header */
}

.header-container, .mobile-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-links {
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  box-sizing: border-box;
}

.hamburger {
  width: 18px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
}

.hamburger span,
.hamburger span::before,
.hamburger span::after {
  content: '';
  display: block;
  background: var(--gold); /* Use CSS variable for color */
  height: 2px;
  width: 100%;
  position: absolute;
  transition: all 0.3s ease;
}

.hamburger span {
  top: 50%;
  margin-top: -1px;
}

.hamburger span::before,
.hamburger span::after {
  content: '';
  width: 100%;
  position: absolute;
  left: 0;
}

.hamburger span::before {
  top: -8px;
}

.hamburger span::after {
  top: 8px;
}

.hamburger span.is-open {
  background: transparent; /* Hide middle line */
}

.hamburger span.is-open::before {
  transform: translateY(8px) rotate(45deg);
}

.hamburger span.is-open::after {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 860px) {
  .header-wrapper {
    padding: 12px 30px;
    background-color: rgba(0, 0, 0, 0.6);
  }
} 
</style>