import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/Home.vue";
import NotFound from "../views/Home/NotFound.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        page_title: "Home",
        theme_color: {
          light: "#ffffff",
          dark: "#000000",
        },
        requiresAuth: false,
      },
      children: [
        // about and contact pages
        {
          path: "",
          name: "home",
          component: () => import("../views/Home/HomeView.vue"),
          meta: {
            page_title: "Home",
            theme_color: {
              light: "#ffffff",
              dark: "#000000",
            },
            requiresAuth: false,
          },
        },
        // {
        //   path: "about",
        //   name: "about",
        //   component: () => import("../views/Home/AboutView.vue"),
        //   meta: {
        //     page_title: "About",
        //     theme_color: {
        //       light: "#ffffff",
        //       dark: "#000000",
        //     },
        //     requiresAuth: false,
        //   },
        // },
        // {
        //   path: "contact",
        //   name: "contact",
        //   component: () => import("../views/Home/ContactView.vue"),
        //   meta: {
        //     page_title: "Contact",
        //     theme_color: {
        //       light: "#ffffff",
        //       dark: "#000000",
        //     },
        //     requiresAuth: false,
        //   },
        // },
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
    },
    {
      path: "/portal",
      name: "portal",
      component: () => import("../views/Portal/Portal.vue"),
      meta: {
        page_title: "Portal",
        theme_color: {
          light: "#ffffff",
          dark: "#000000",
        },
        requiresAuth: true,
      },
    },
    // redirect any /app routes to /portal
    {
      path: "/app",
      redirect: "/portal",
    },
  ],
});

export default router;
