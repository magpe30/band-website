<template>
  <div
    class="wrapper"
    :style="
      reserveAspectRatio
        ? `height: 0; padding-top: calc(${reverseAspectRatio} * 70%;`
        : ''
    "
    ref="image"
    :key="source"
  >
    <div
      class="grey-pulser"
      :class="{ priority: pulserOnNewLoad && notInitialLoad }"
      v-show="pulser && !stopPulser && showPulser"
    >
      <div class="pulser"></div>
    </div>
    <transition class="wrapper" mode="in-out" appear>
      <div
        :style="`transition: all 10000ms ease-out;`"
        style="border-radius: inherit; overflow: hidden"
        :key="source"
      >
        <transition name="img-fade" class="wrapper" mode="in-out" appear>
          <img
            class="image"
            ref="picture"
            v-if="show && source !== ''"
            :class="configImage ? 'config-image' : ''"
            :style="checkFitContainer()"
            :key="source"
            :src="
              activeType == 'local' ? require(`@/assets/img/${source}`) : source
            "
            v-on:load="imageLoaded(source)"
            v-on:error="error"
            v-show="loaded"
          />
        </transition>
        <transition name="img-fade" appear>
          <div
            v-show="!loaded && stopPulser && showLoader"
            :key="loaded"
            class="image-loader"
          >
            <pulse-loader></pulse-loader>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import PulseLoader from "@/components/general/spinners/PulseLoader.vue";

export default {
  name: "ImageContainer",
  components: {
    PulseLoader,
  },
  props: {
    source: String,
    // Lazy loading is not useful most of the time, it's only used on the home page so that images below the fold don't load during idle time and take up
    // compute time that could be used to async load other components - plus saves on data for users. Default to false.
    isLazy: {
      type: Boolean,
      default: false,
    },
    h: Number,
    w: Number,
    type: String,
    configImage: {
      type: Boolean,
      default: false,
    },
    pulser: {
      type: Boolean,
      default: false,
    },
    showLoader: {
      // Shows our pulseLoader, not the grey pulser
      type: Boolean,
      default: false,
    },
    // Ensures the image will conform to BOTH height and width of the parent container
    // E.g., a portrait mode picture will not be full width inside a 1:1 aspect ratio parent container
    fitContainer: {
      type: Boolean,
      default: false,
    },
    alignFitToContainerToTop: {
      // Will appear at top of container, can be super helpful
      type: Boolean,
      default: false,
    },
    fallback: {
      type: String,
      default: "",
    },
    suppressErrorMessage: {
      type: Boolean,
      default: false,
    },
    pulserOnNewLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loaded: false,
      show: true,
      activeType: "",
      stopPulser: false,
      showPulser: true,
      notInitialLoad: false,
    };
  },
  computed: {
    // If we got a w and h param, reserve the aspect ratio with
    // The wrapper padding
    reserveAspectRatio() {
      return this.h && this.w;
    },
    reverseAspectRatio() {
      return this.h / this.w;
    },
  },
  methods: {
    imageLoaded(source) {
      if (source == this.source) {
        // Calculate aspect ratio of the loaded image
        const aspectRatio =
          this.$refs.picture.naturalWidth / this.$refs.picture.naturalHeight;
        // Emit the aspect ratio to the parent component
        this.$emit("aspectRatio", aspectRatio);

        this.loaded = true;
        this.$emit("loaded");
        setTimeout(() => {
          // Small delay to keep pulser moving as new image fades in
          if (this.source == source) {
            this.stopPulser = true;
            this.notInitialLoad = true;
          }
        }, 200);
      }
    },
    error(event) {
      if (this.fallback.length > 0) {
        event.target.src = this.fallback;
      } else {
        this.activeType = "local";
        event.target.src = require('@/assets/img/media/image_unavailable.png');
        this.$emit("error");
      }
    },
    lazyLoad() {
      if (this.$refs.image) {
        let top = this.$refs.image.getBoundingClientRect().top;
        if (top - 250 < window.innerHeight) {
          this.show = true;
        }
      }
    },
    handleScroll() {
      if (!this.running && !this.show) {
        this.running = true;
        this.lazyLoad();
        this.running = false;
      }
    },
    checkFitContainer() {
      if (this.fitContainer) {
        if (this.alignFitToContainerToTop) {
          return "object-fit: container; margin-top: 0px;";
        } else {
          return "object-fit: container";
        }
      } else return "width: 100%; max-height: unset;";
    },
  },
  mounted() {
    if (this.isLazy) {
      this.handleScroll();
      setInterval(this.handleScroll, 3000);
    }
    this.activeType = this.type;
  },
  watch: {
    source: {
      handler() {
        this.loaded = false;

        // This bit of code makes it so that if you enabled 'pulserOnNewLoad',
        // An image change that loads from cache/disk will have a smooth fade,
        // But a new image load will bring the pulser back again
        if (this.pulserOnNewLoad && this.notInitialLoad) {
          this.stopPulser = false;
          this.showPulser = false;
          setTimeout(() => {
            if (!this.loaded) {
              // enable grey pulser and REMOVE the previous image
              this.showPulser = true;
            }
          }, 5);
        }
        // Now, if it takes more than 5ms to load (non-instant), then enable the pulser
      },
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  height: 0;
  width: 100%;
  border-radius: inherit;
  box-shadow: none !important;
  overflow: hidden;

  /* Base styling if no aspect ratio is reserved, 100% container height and width */
  height: 100%;
  width: 100%;
}

.image-loader {
  position: absolute;
  width: 100%;
  bottom: 0px;
  top: 0px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
/* Image */
.image {
  /* Positions to be in the center of the wrapper container */
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  border-radius: inherit;
  user-select: none;
  pointer-events: none;
  transition: all 300ms ease-out;

  /* Max-width so that if fitContainer, we fit the object into the parent, needs to 
  be max not base so that actual image is only as wide and tall as contained result, 
  so that border radius shows */
  max-width: 100%;
  max-height: 100%;
}
.img-fade-enter-to {
  opacity: 1;
}
.img-fade-enter {
  opacity: 0;
}
.config-image {
  background-color: #fff;
}

/* Pulser */
.grey-pulser {
  background: rgb(240, 240, 240);
  box-shadow: 0px 0px 0px 1px rgb(240, 240, 240);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  border-radius: inherit;
  overflow: hidden;
  transition: all 200ms ease;
}
.priority {
  z-index: 1;
}
.pulser {
  height: 100%;
  width: 40%;
  background: linear-gradient(
    90deg,
    rgb(240, 240, 240) 0%,
    rgb(251, 251, 251) 50%,
    rgb(240, 240, 240) 100%
  );
  border-radius: 12px;
  transform: translateX(-100%);
  transition: all 200ms ease;
  animation: pulse 1s cubic-bezier(0.65, 0, 0.45, 1) infinite;
}
@keyframes pulse {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

.img-fade-enter-to,
.img-fade-leave {
  opacity: 1;
}

.img-fade-enter,
.img-fade-leave-to {
  opacity: 0;
}
</style>
