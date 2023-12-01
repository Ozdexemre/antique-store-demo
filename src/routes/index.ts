import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { name: "home", path: "/", component: () => import("../pages/Home.vue") },

  {
    name: "store",
    path: "/store",
    component: () => import("../pages/AntiqueStore.vue"),
  },
  { name: "sellpopup", path: "/sellpopup", component: () => import("../pages/Test.vue") },
  { name: "shop", path: "/shop", component: () => import("../pages/Shop.vue") },
  { name: "shop", path: "/shop", component: () => import("../pages/Shop.vue") },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
