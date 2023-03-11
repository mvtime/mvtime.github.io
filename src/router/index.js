import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        page_title: "Home",
        theme_color: {
          light: "#ffffff",
          dark: "#000000",
        },
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: NotFound,
      meta: {
        page_title: "404",
        theme_color: {
          light: "#ffffff",
          dark: "#000000",
        },
      },
    },
  ],
});

export default router;
