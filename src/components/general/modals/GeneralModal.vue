<template>
  <div
    class="modal"
    @mousedown="checkIfModalClicked"
    :class="{
      'full-height': settings.fullHeight,
      'blank-modal': settings.blankModal,
      'no-background': settings.noBackground,
    }"
  >
    <div class="modal-mask" ref="mask"></div>
    <div class="modal-wrapper" ref="wrapper">
      <div class="modal-container" :style="`max-width: ${settings.maxWidth}px`">
        <div class="modal-header" v-if="!settings.blankModal">
          <h1>{{ settings.title }}</h1>
          <div
            v-if="settings.icon"
            @click="$store.commit('generalModal', false)"
            class="close-icon"
          >
            <i class="material-icons-round">{{ settings.icon }}</i>
          </div>
          <Tooltip
            v-if="settings.tooltip"
            :content="settings.tooltip"
            :key="generalModal"
          >
            <i class="material-icons-round close-icon help-icon"
              >help_outline</i
            >
          </Tooltip>
        </div>
        <transition
          name="component-fade"
          @beforeLeave="beforeLeave"
          @enter="enter"
          @afterEnter="afterEnter"
          mode="out-in"
        >
          <div
            :key="generalModal"
            class="content-container"
            :style="`padding: ${settings.padding}px`"
          >
            <component :is="generalModal" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// Proper divider color for all modals inside this component: rgb(235, 235, 235)

import { mapGetters, mapActions } from "vuex";
import Tooltip from "@/components/general/styleComponents/Tooltip.vue";


export default {
  name: "GeneralModal",
  components: {
    Tooltip,
    CoolModal,
  },
  computed: {
    ...mapGetters([
      "generalModal",
    ]),
    settings() {
      // Settings for each modal
      return {
        blankModal: true,
        maxWidth: 498,
        padding: 0,
        fullHeight: true,
        tooltip: false,
      };
    },
  },
  methods: {
    ...mapActions(["toggleBodyFixed"]),
    // Turns off modal if background click
    checkIfModalClicked(e) {
      if (!this.settings.notClosable) {
        let closeModal =
          e.target == this.$refs.mask || e.target == this.$refs.wrapper;
        if (closeModal) {
          this.$store.commit("generalModal", false);
        }
      }
    },
    // Height animation methods
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "auto";
    },
  },
  mounted: function () {
    this.toggleBodyFixed(true);
  },
  destroyed: function () {
    this.toggleBodyFixed(false);
  },
};
</script>

<style scoped>
/* MODAL STYLING */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  /* If ever have a mobile height issue, try min or max height with -webkit-fill-available; */
  height: 100%;
  z-index: 989;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 48px 0px;
}

.modal-mask {
  background: rgb(0, 0, 0);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  animation-duration: 400ms !important;
  animation-iteration-count: 1 !important;
  animation-fill-mode: both !important;
  animation-name: maskFade !important;
}
@keyframes maskFade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.5;
  }
}

.modal-wrapper {
  margin: auto;
  display: flex;
  /* flex-direction: column;
  align-items: center; */
  justify-content: center;
  border-radius: 12px;
  box-sizing: border-box;
  width: auto;
  position: relative !important;
  width: 100%;

  /* This one breaks chrome */
  /* animation-delay: 0s !important; */

  /* Some of these are important
  to flickering on mobile, not sure which!
  Most came from airbnb */
  /* Webkit vers */
  -webkit-backface-visibility: hidden;
  -webkit-transform-style: preserve-3d;
  -webkit-box-direction: normal !important;
  -webkit-box-orient: vertical !important;
  -webkit-animation-duration: 400ms !important;
  -webkit-animation-iteration-count: 1 !important;
  -webkit-animation-fill-mode: both !important;
  -webkit-animation-name: fade !important;
  /* Standard */
  backface-visibility: hidden;
  transform-style: preserve-3d;
  box-direction: normal !important;
  box-orient: vertical !important;
  animation-duration: 400ms !important;
  animation-iteration-count: 1 !important;
  animation-fill-mode: both !important;
  animation-name: fade !important;
}
/* Need webkit and non-webkit */
@-webkit-keyframes fade {
  0% {
    -webkit-opacity: 0;
    -webkit-transform: translate(0px, 80%);
  }
  100% {
    -webkit-opacity: 1;
    -webkit-transform: translate(0px, 0px);
  }
}
@keyframes fade {
  0% {
    opacity: 0;
    transform: translate(0px, 80%);
  }
  100% {
    opacity: 1;
    transform: translate(0px, 0px);
  }
}

.modal-container {
  background-color: #fff;
  position: relative;
  border-radius: 12px;
  transition: all 0.3s ease;
  min-height: 100%;
  /* 100vw here and no 100% width on modal wrapper would
  allow clicks to the side to close modals properly, however
  it messes with the responsiveness of the modal, so need to find a
  different fix */
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  max-width: 568px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.modal-header {
  height: 63px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgb(235, 235, 235);
}
.modal-header h1 {
  font-weight: 700;
  font-size: 16px;
  padding: 0px 60px;
  text-align: center;
}
.close-icon {
  padding: 6px;
  position: absolute;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 18px;
  top: 15px;
}
.close-icon i {
  font-size: 21px !important;
}
.close-icon:hover {
  background-color: rgba(246, 246, 246);
  border-radius: 50%;
}
.help-icon {
  right: 18px;
  left: unset;
  font-size: 21px !important;
}

.content-container {
  padding: 24px;
}

.no-background .modal-container {
  /* To have no small white borders at top */
  background: none !important;
}

@media (max-width: 768px) {
  .modal {
    padding: 12px 0px 0px 0px;
    align-items: flex-end;
    overflow-y: unset;
  }

  .modal-wrapper {
    width: 100%;
    border-radius: 12px 12px 0px 0px;
    /* This margin is required for proper scroll */
    margin: auto 0px 0px 0px;
    box-shadow: none;
    max-height: 100%;
    padding: 0px;
  }

  .modal-container {
    max-height: 100%;
    border-radius: 12px 12px 0px 0px;
    box-shadow: none;
    /* Makes sure mobile is edge to edge no matter the width setting */
    max-width: unset !important;
  }

  .content-container {
    max-height: calc(100% - 64px);
    overflow-y: scroll;
    box-sizing: border-box;
  }

  .full-height .modal-wrapper,
  .full-height .modal-container,
  .full-height .content-container {
    height: 100% !important;
  }

  .blank-modal .content-container {
    max-height: 100%;
  }

  /* Need webkit and non-webkit */
  @-webkit-keyframes fade {
    0% {
      -webkit-transform: translate(0px, 100%);
    }
    100% {
      -webkit-transform: translate(0px, 0px);
    }
  }
  @keyframes fade {
    0% {
      transform: translate(0px, 100%);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }
}

/* Transition */
.component-fade-enter-active,
.component-fade-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}

.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
