import Vuex from "vuex";
import Vue from "vue";
import home from "./modules/home";
import utilities from "./modules/utilities";

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    home,
    utilities,
  },
});
