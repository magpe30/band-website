<template>
  <div
    ref="button"
    class="main-button"
    :class="[{ disabled: disabled, 'custom-disabled': customDisabled }, type]"
    @mousemove="onMouseMove"
    @click="!disabled && !loading ? $emit('submit') : null"
  >
    <span
      class="hover-container"
      v-if="type == 'brand' && !disabled && !customDisabled"
    >
      <span class="hover" :style="hoverBackgroundPosition"></span>
    </span>
    <pulse-loader
      v-if="loading"
      class="loading-box"
      :color="pulseLoaderColor"
    ></pulse-loader>
    <span v-else-if="content" class="text">{{ content }}</span>
    <span
      v-else-if="rawHtml"
      style="position: relative"
      v-html="rawHtml"
    ></span>
    <i v-show="chevron" class="material-icons-round chevron"
      >arrow_forward_ios</i
    >
  </div>
</template>

<script>
// Can't make this an <router-link>, it cannot be fully disabled so middle click will just reopen page
// Would need to make this two divs, one as the link one as the button, but that could effect parent styling
// might need to wait for vue3 integration so we can have two outer divs

import PulseLoader from "@/components/general/spinners/PulseLoader.vue";

export default {
  name: "MainButton",
  components: {
    PulseLoader,
  },
  props: {
    content: {
      type: String,
      default: "",
    },
    rawHtml: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loaderColor: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "brand",
      // Available: brand, white, black, border, thin-border, white-border, seafoam, custom (which makes no hover)
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    customDisabled: {
      type: Boolean,
      default: false,
    },
    chevron: {
      type: Boolean,
      default: false,
    },
    submitOnEnter: {
      // Watches enter key for submit
      type: Boolean,
      default: false,
    },
    // // We pass through links such as '/cars' that fill in the href, so that we can middle click
    // link: {
    //   type: String,
    //   default: null
    // }
  },
  data() {
    return {
      x: 0,
      y: 0,
    };
  },
  computed: {
    hoverBackgroundPosition() {
      return `background-position: calc((100 - max(${this.x}, 0)) * 1%) calc((100 - max(${this.y}, 0)) * 1%) !important`;
    },
    pulseLoaderColor() {
      if (this.loaderColor) {
        return this.loaderColor;
      } else {
        if (this.type == "white" || this.type == "thin-border") {
          return "var(--rasp)";
        } else {
          return "#fff";
        }
      }
    },
  },
  methods: {
    onMouseMove(e) {
      if (this.$refs.button) {
        this.x = (e.layerX / this.$refs.button.clientWidth) * 100;
        this.y = (e.layerY / this.$refs.button.clientHeight) * 100;
      }
    },
    submitFromEnter(e) {
      if (e.keyCode == 13) {
        this.$emit("submit");
      }
    },
  },
  mounted() {
    if (this.submitOnEnter) {
      document.addEventListener("keydown", (e) => {
        this.submitFromEnter(e);
      });
    }
  },
  destroyed() {
    if (this.submitOnEnter) {
      document.removeEventListener("keydown", (e) => {
        this.submitFromEnter(e);
      });
    }
  },
};
</script>

<style scoped>
.main-button {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  /* display: inline-block; */
  height: 48px;
  padding: 0px 24px;
  font-size: 16px;
  font-weight: 500;
  background: var(--brand-gradient);
  color: white;
  text-align: center;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  transition: all 200ms ease;
}
.main-button:active {
  transform: scale(0.95);
}
.text {
  /* display: block !important; */
  position: relative;
  line-height: 1;
  height: 100%;
  pointer-events: none !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.white {
  background: #fff;
  color: var(--primary);
}
.white:hover {
  background: #f3f3f3;
}

.black {
  color: #fff;
  background: var(--primary);
}
.black:hover {
  background: black;
}

.border {
  color: var(--primary);
  border: 2px solid var(--primary);
  background: none;
}
.border:hover {
  opacity: 0.8;
}

.thin-border {
  color: var(--primary);
  border: 1px solid var(--primary);
  background: none;
}
.thin-border:hover {
  opacity: 0.8;
}

.white-border {
  color: #fff;
  box-shadow: inset 0px 0px 0px 2px #fff;
  background: none;
}
.white-border:hover {
  opacity: 0.8;
}

.seafoam {
  color: #fff;
  background: var(--alt-green);
}
.seafoam:hover {
  opacity: 0.8;
}

/* For brand type only */
.hover-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  overflow: hidden;
  border-radius: inherit;
  transition: background-color 200ms ease;
}
.main-button:active .hover-container {
  background-color: rgb(255, 56, 92);
}
.hover {
  border-radius: inherit !important;
  background-image: radial-gradient(
    circle at center center,
    rgb(255, 56, 92) 0%,
    rgb(230, 30, 77) 27.5%,
    rgb(227, 28, 95) 40%,
    rgb(215, 4, 102) 57.5%,
    rgb(189, 30, 89) 75%,
    rgb(189, 30, 89) 100%
  );
  background-size: 200% 200% !important;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1.25s ease 0s !important;
}
.main-button:hover .hover {
  opacity: 1;
}
.main-button:active .hover {
  opacity: 0 !important;
}

.loading-box {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  top: 0px;
  left: 0px;
}

.disabled {
  cursor: not-allowed !important;
  background: #d3d3d3 !important;
  color: #fff !important;
}
.disabled:active {
  transform: none !important;
}
.disabled:hover {
  background: rgba(34, 34, 34, 0.2) !important;
}

.custom-disabled {
  cursor: not-allowed !important;
  background: #d3d3d3 !important;
  color: #fff !important;
}
.custom-disabled:active {
  transform: none !important;
}

.chevron {
  position: absolute;
  font-size: 18px;
  right: 12px;
  top: 0px;
  height: 100%;
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .chevron {
    font-size: 16px;
  }
}
</style>
