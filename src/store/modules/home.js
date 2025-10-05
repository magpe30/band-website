const state = {
  homePageLinks: [
    {
      name: "A post-listing page",
      path: "/post-listing-screen"
    },
    {
      name: "Multiple stages",
      path: "/multiple-stages"
    }
  ]
};

const getters = {
  homePageLinks: (state) => state.homePageLinks,

};

const actions = {

};

const mutations = {
  // addPageLink: (state, value) => {
  //   state.homePageLinks.push(value);
  // },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
