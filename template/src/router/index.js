import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
    name: "home",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
