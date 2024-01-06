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
          dark: "#16130e",
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
              dark: "#16130e",
            },
            requiresAuth: false,
          },
          children: [
            // view task
            {
              // specify param "ref" in the route
              path: "/view/:ref([^~]+~[^~]+~[^~]+)",
              name: "publicviewtask",
              component: () => import("@/views/Portal/ViewTask.vue"),
              meta: {
                page_title: "View Task",
                theme_color: {
                  light: "#bfbfbf",
                  dark: "#0d0d0d",
                },
                requiresAuth: false,
              },
            },
            // view class
            {
              // specify param "ref" in the route
              path: "/view/:ref([^~]+~[^~]+)",
              name: "publicviewclass",
              component: () => import("@/views/Portal/ViewClass.vue"),
              meta: {
                page_title: "View Class",
                theme_color: {
                  light: "#bfbfbf",
                  dark: "#0d0d0d",
                },
                requiresAuth: false,
              },
            },
            // redirect page
            {
              path: "to/:path?",
              name: "redirect",
              component: () => import("../views/Home/Redirect.vue"),
              meta: {
                page_title: "Confirm Redirect",
                theme_color: {
                  light: "#bfbfbf",
                  dark: "#0d0d0d",
                },
                requiresAuth: false,
              },
            },
            // join form
            {
              path: "join",
              name: "join",
              component: () => import("@/views/Home/JoinModal.vue"),
              meta: {
                page_title: "Join the MVTT Beta",
                theme_color: {
                  light: "#bfbfbf",
                  dark: "#0d0d0d",
                },
                requiresAuth: false,
                // change later to instead have custom action
                // block_close: true,
                close_path: "/",
                blockStandardRedirect: true,
              },
            },
            {
              path: "link/:code?",
              name: "link",
              component: () => import("@/views/Home/LinkModal.vue"),
              props: true,
              meta: {
                page_title: "Link Personal Account",
                theme_color: {
                  light: "#bfbfbf",
                  dark: "#0d0d0d",
                },
                close_path: "/",
                blockStandardRedirect: true,
              },
            },
          ],
        },
        {
          path: "about",
          name: "about",
          component: () => import("../views/Home/AboutView.vue"),
          meta: {
            page_title: "About",
            theme_color: {
              light: "#ffffff",
              dark: "#16130e",
            },
            requiresAuth: false,
          },
        },
        {
          path: "legal/privacy",
          name: "privacy",
          component: () => import("../views/Home/Legal/PrivacyView.vue"),
          meta: {
            page_title: "Legal - Privacy Policy",
            theme_color: {
              light: "#ffffff",
              dark: "#16130e",
            },
            requiresAuth: false,
          },
        },
        {
          path: "legal/tos",
          name: "tos",
          component: () => import("../views/Home/Legal/TermsView.vue"),
          meta: {
            page_title: "Legal - Terms of Service",
            theme_color: {
              light: "#ffffff",
              dark: "#16130e",
            },
            requiresAuth: false,
          },
        },
        {
          path: "download",
          name: "download",
          component: () => import("../views/Home/DownloadView.vue"),
          meta: {
            page_title: "Download [BETA]",
            theme_color: {
              light: "#ffffff",
              dark: "#16130e",
            },
            requiresAuth: false,
          },
        },
        {
          path: "roadmap",
          name: "roadmap",
          component: () => import("../views/Home/TodoView.vue"),
          meta: {
            page_title: "Development Roadmap",
            theme_color: {
              light: "#ffffff",
              dark: "#16130e",
            },
            requiresAuth: false,
          },
        },
        {
          path: "contact",
          name: "contact",
          component: () => import("../views/Home/ContactView.vue"),
          meta: {
            page_title: "Contact",
            theme_color: {
              light: "#ffffff",
              dark: "#16130e",
            },
            requiresAuth: false,
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
              dark: "#16130e",
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
          light: "#f2f2f2",
          dark: "#121212",
        },
        requiresAuth: true,
      },
      children: [
        {
          path: "/portal/tutorial/:tab?",
          name: "tutorial",
          component: () => import("../components/Tutorial/TutorialModal.vue"),
          meta: {
            page_title: "Tutorial Videos",
            theme_color: {
              light: "#f2f2f2",
              dark: "#121212",
            },
            requiresAuth: true,
          },
        },
        {
          path: "/portal/tutorial/add",
          name: "onboarding",
          component: () => import("../views/Portal/Onboarding.vue"),
          meta: {
            page_title: "Onboarding",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
            block_close: true,
            noSurvey: true,
          },
        },
        {
          path: "/portal/study",
          name: "study",
          component: () => import("../views/Portal/Portal.vue"),
          meta: {
            page_title: "Study Portal",
            theme_color: {
              light: "#f2f2f2",
              dark: "#121212",
            },
            requiresAuth: true,
          },
        },
        {
          path: "/portal/statistics",
          name: "stats",
          component: () => import("../views/Portal/StatsModal.vue"),
          meta: {
            page_title: "View Statistics",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
          },
        },
        {
          path: "/portal/survey/daily",
          name: "daily",
          component: () => import("../views/Portal/DailySurvey.vue"),
          meta: {
            page_title: "Daily Check-In",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
            block_close: true,
            blockStandardRedirect: true,
            noSurvey: true,
          },
        },
        {
          path: "/portal/settings",
          name: "settings",
          component: () => import("../views/Portal/SettingsModal.vue"),
          meta: {
            page_title: "Settings",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
            noSurvey: true,
          },
        },
        {
          path: "/portal/add",
          name: "addclass",
          component: () => import("../views/Portal/AddClass.vue"),
          meta: {
            page_title: "Join a Class",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
          },
        },
        {
          path: "/portal/add/ref/:ref?",
          name: "refclass",
          component: () => import("../views/Portal/AddClass.vue"),
          meta: {
            page_title: "Join from Reference",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
          },
        },
        {
          path: "/portal/add/code/:code",
          name: "codeclass",
          component: () => import("../views/Portal/AddClass.vue"),
          meta: {
            page_title: "Join from Code",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
          },
        },
        {
          path: "/portal/add/code",
          name: "codeenterclass",
          component: () => import("../views/Portal/AddCode.vue"),
          meta: {
            page_title: "Enter Class Code",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
          },
        },
        {
          path: "/portal/create",
          name: "createclass",
          component: () => import("../views/Portal/CreateClass.vue"),
          meta: {
            page_title: "Teacher | Create Class",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
            requiresTeacher: true,
          },
        },
        {
          path: "/portal/new/:tasktype?",
          name: "newtask",
          component: () => import("../views/Portal/CreateTask.vue"),
          meta: {
            page_title: "Teacher | Add Task",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
            requiresTeacher: true,
          },
        },
        {
          // specify param "ref" in the route
          path: "/portal/notes/:ref?",
          name: "notes",
          component: () => import("../views/Portal/NotesTask.vue"),
          meta: {
            page_title: "Your Task Notes",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
          },
        },
        {
          // specify param "ref" in the route
          path: "/portal/view/:ref?",
          name: "viewtask",
          component: () => import("../views/Portal/ViewTask.vue"),
          meta: {
            page_title: "View Task",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
          },
        },
        {
          // specify param "ref" in the route
          path: "/portal/view/:ref([^~]+~[^~]+)",
          name: "viewclass",
          component: () => import("../views/Portal/ViewClass.vue"),
          meta: {
            page_title: "View Class",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
          },
        },
        {
          // specify param "ref" in the route
          path: "/portal/edit/t/:ref?",
          name: "edit",
          component: () => import("../views/Portal/EditTask.vue"),
          meta: {
            page_title: "Edit Task",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
            requiresTeacher: true,
          },
        },
        {
          // specify param "ref" in the route
          path: "/portal/edit/c/:ref?",
          name: "editclass",
          component: () => import("../views/Portal/EditClass.vue"),
          meta: {
            page_title: "Edit Class",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
            requiresTeacher: true,
          },
        },
        {
          // specify param "ref" in the route
          path: "/portal/archive/:type?/:ref?",
          name: "archive",
          component: () => import("../views/Portal/ArchiveTask.vue"),
          meta: {
            page_title: "Confirm Task Archive",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
            requiresTeacher: true,
          },
        },
        {
          // specify param "ref" in the route
          path: "/portal/leave/:ref?",
          name: "leave",
          component: () => import("../views/Portal/LeaveClass.vue"),
          meta: {
            page_title: "Confirm Class Leave",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "/portal/calendar",
      name: "calendar",

      redirect: "/portal?calendar=true",
      meta: {
        page_title: "Calendar",
        theme_color: {
          light: "#f2f2f2",
          dark: "#121212",
        },
        requiresAuth: true,
      },
    },
    // redirect any /app routes to /portal
    {
      path: "/app",
      redirect: "/portal",
      meta: {
        requiresAuth: true,
      },
    },
    // redirect any /study routes to /portal/study
    {
      path: "/study",
      redirect: "/portal/study",
      meta: {
        requiresAuth: true,
      },
    },
    // redirect any /settings routes to /portal/settings
    {
      path: "/settings",
      redirect: "/portal/settings",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/survey/daily",
      redirect: "/portal/survey/daily",
      meta: {
        requiresAuth: true,
      },
    },
  ],
  parseQuery: (query) => require("qs").parse(query),
});

export default router;
