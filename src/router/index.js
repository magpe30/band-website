import VueRouter from "vue-router";

const routes = [
  // Redirect to home if 404
  { path: "*", redirect: "/" },
  {
    path: "/",
    name: "home",
    meta: {
      title: "Home",
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
  },
  {
    path: "/photo-album",
    name: "photoAlbum",
    meta: {
      title: "Photo Album",
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/PhotoAlbum.vue"),
  },
  {
    path: "/discography",
    name: "music",
    meta: {
      title: "Music",
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/Discography.vue"),
  },
  {
    path: "/about-us",
    name: "band",
    meta: {
      title: "Band",
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/AboutUs.vue"),
  }
]


const router = new VueRouter({
  routes,
  mode: "history",
});

export default router