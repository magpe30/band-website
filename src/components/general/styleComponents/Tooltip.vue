<template>
  <div
    v-tooltip="{
      content: tooltipContent,
      html: true,
      placement: place,
      trigger: actionTypes,
      autoHide: false,
      boundariesElement: 'window',
      offset: '6px',
      popperOptions: {
        onCreate: (data) => {
          this.onTooltipCreateUpdate(data);
        },
        onUpdate: (data) => {
          this.onTooltipCreateUpdate(data);
        },
      },
    }"
    class="t-z-container"
  >
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { VTooltip } from "v-tooltip";

export default {
  name: "TooltipComponent",
  directives: {
    tooltip: VTooltip,
  },
  props: {
    content: String,
    image: {
      type: Boolean,
      default: false,
    },
    inputVal: [Array, Boolean, Object],
    inputString: String,
    src: String,
    place: {
      type: String,
      default: "top",
    },
  },
  computed: {
    ...mapGetters(["bodyFixed"]),
    actionTypes() {
      if (this.$store.getters.window.windowWidth >= 900) {
        return "hover click";
      } else return "click";
    },
    imageCompute() {
      return '<img src="' + this.src + '" class="full-img"></img>';
    },
  },
  data() {
    return {
      tooltipContent: "",
    };
  },
  methods: {
    onTooltipCreateUpdate(data) {
      const tooltip = data.instance.popper;
      this.$nextTick(() => {
        // If the body is frozen with an inset, we need to modify the tooltip's transform style
        // to ensure proper placement of the tooltip relative to the triggering element
        if (this.bodyFixed) {
          // Check if the tooltip exists
          if (tooltip) {
            // Get the tooltip's computed style
            const computedStyle = getComputedStyle(tooltip);
            const transformStyle = computedStyle.transform;

            // Extract the current transform values (translateX and translateY) from the transform style
            const transformMatch = transformStyle.match(
              /matrix\(\s*1,\s*0,\s*0,\s*1,\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)\s*\)/
            );

            // If the transform values were successfully extracted, update the translateY value
            // by adding the bodyFixed value, ensuring the tooltip is properly placed
            if (transformMatch) {
              const translateX = parseFloat(transformMatch[1]);
              const translateY = parseFloat(transformMatch[2]);
              tooltip.style.transform = `translate3d(${translateX}px, ${
                translateY + this.bodyFixed
              }px, 0)`;
            }
          }
        }
      });
    },
  },
  created() {
    if (this.image) {
      this.tooltipContent = this.imageCompute;
    } else {
      this.tooltipContent = this.content;
    }
  },
};
</script>

<style>
/* CANNOT BE SCOPED */
.t-z-container {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

/* This is our general tooltip content styling */
.tooltip-inner {
  padding: 24px !important;
}
.tooltip-inner h1 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
}
.tooltip-inner p {
  font-size: 16px;
  font-weight: 300;
}
.tooltip-check {
  color: var(--rasp);
  font-size: 24px;
  margin-right: 6px;
  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
/* End general tooltip content styling */

.tooltip-container {
  height: 100%;
}
.tooltip {
  display: block !important;
  z-index: 10000;
}
.tooltip .tooltip-inner {
  /* border: 1px solid #efefef; */
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
  background-color: var(--primary);
  color: #fff;
  border-radius: 18px;
  box-sizing: border-box;
  max-width: 80vw;
}
.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: var(--primary);
}
.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}
.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}
.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
.tooltip[x-placement^="right"] {
  margin-left: 5px;
}
.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
.tooltip[x-placement^="left"] {
  margin-right: 5px;
}
.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}
.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}
.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}

.full-img {
  max-width: 100%;
  border-radius: 12px;
}

@media (min-width: 768px) {
  .full-img {
    max-width: 400px;
    max-height: 225px;
  }

  .tooltip .tooltip-inner {
    max-width: 500px;
  }

  .tooltip[x-placement^="top-right"] {
    margin-bottom: 5px;
    left: 75px !important;
  }
}
</style>
