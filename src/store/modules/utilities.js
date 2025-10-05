
const state = {
  bodyFixed: null,
  openModalsCount: 0,
  showHeaderNavMenu: false,
  showFooterNavMenu: false,
  generalModal: false,
  topNotificationModal: {
    content: "",
    error: false,
  },
  fullScreenLoader: false,
  fullScreenLoaderPercentage: false,
  window: {
    windowWidth: 0,
    windowOrientationIsPortrait: true,
  },
};

const getters = {
  bodyFixed: (state) => state.bodyFixed,
  showHeaderNavMenu: (state) => state.showHeaderNavMenu,
  showFooterNavMenu: (state) => state.showFooterNavMenu,
  window: (state) => state.window,
  generalModal: (state) => state.generalModal,
  topNotificationModal: (state) => state.topNotificationModal,
  fullScreenLoader: (state) => state.fullScreenLoader,
  fullScreenLoaderPercentage: (state) => state.fullScreenLoaderPercentage,
};

const actions = {
  toggleBodyFixed({ commit }, value) {
    commit("mutateBodyFixed", value);
  },
};

const mutations = {
  // Toggle body fixed for modals
  mutateBodyFixed: (state, bool) => {
    if (bool) {
      state.openModalsCount++;

      if (state.openModalsCount === 1) {
        // This is the first modal opened
        state.bodyFixed = window.pageYOffset;
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.inset = `${state.bodyFixed * -1}px 0px 0px`;

        document.documentElement.style.height = "100vh";
        document.body.style.height = "100vh";
      }
    } else {
      state.openModalsCount--;

      if (state.openModalsCount === 0) {
        // All modals are closed
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("position");
        document.body.style.removeProperty("inset");
        document.documentElement.style.removeProperty("height");
        document.body.style.removeProperty("height");

        window.scrollTo(0, state.bodyFixed);
        state.bodyFixed = null;
      }
    }
  },
  // Toggle header nav menu (dropdown on desktop)
  toggleHeaderNavMenu: (state, value) => {
    // if false, set both types to false
    if (value == false) {
      state.showHeaderNavMenu = value;
      state.showFooterNavMenu = value;
    } else state.showHeaderNavMenu = value;
  },
  // Toggle footer nav menu (from mobile nav bar)
  toggleFooterNavMenu: (state, value) => {
    if (value == false) {
      state.showHeaderNavMenu = value;
      state.showFooterNavMenu = value;
    } else state.showFooterNavMenu = value;
  },
  updateWindow: (state, newWindowWidth) => {
    state.window.windowWidth = newWindowWidth;
  },
  updateWindowOrientationIsPortrait: (state, value) => {
    state.window.windowOrientationIsPortrait = value;
  },
  generalModal: (state, value) => {
    state.generalModal = value;
  },
  topNotificationModal: (state, { content, error }) => {
    state.topNotificationModal.content = content;
    state.topNotificationModal.error = error;
  },
  sideModal: (state, value) => {
    state.sideModal = value;
  },
  photoViewer: (state, { urls, current }) => {
    state.photoViewer.urls = urls;

    // Cannot do "if (current)" because we need to allow 0 as a real value here
    if (current >= 0) {
      state.photoViewer.current = current;
    }
  },
  fullScreenLoader: (state, value) => {
    state.fullScreenLoader = value;
  },
  fullScreenLoaderPercentage: (state, value) => {
    state.fullScreenLoaderPercentage = value;
  },
  updateCurrentTime: (state) => {
    state.currentTime = new Date();
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
