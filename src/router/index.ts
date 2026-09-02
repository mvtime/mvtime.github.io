import { createRouter, createWebHistory } from "vue-router";
import { redirectToShortViewIfNeeded } from "@/router/viewRef";

const viewClassMeta = {
  page_title: "View Class",
  theme_color: {
    light: "#bfbfbf",
    dark: "#0d0d0d",
  },
  requiresAuth: false,
};

const viewTaskMeta = {
  page_title: "View Task",
  theme_color: {
    light: "#bfbfbf",
    dark: "#0d0d0d",
  },
  requiresAuth: false,
};

const portalViewClassMeta = {
  page_title: "View Class",
  theme_color: {
    light: "#b5b5b5",
    dark: "#0d0d0d",
  },
  requiresAuth: true,
};

const portalViewTaskMeta = {
  page_title: "View Task",
  theme_color: {
    light: "#b5b5b5",
    dark: "#0d0d0d",
  },
  requiresAuth: true,
};

async function publicViewBeforeEnter(to) {
  return redirectToShortViewIfNeeded(to, "publicviewclass", "publicviewtask");
}

async function portalViewBeforeEnter(to) {
  return redirectToShortViewIfNeeded(to, "viewclass", "viewtask");
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homemain",
      component: () => import("../views/Home/Home.vue"),
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
            // Old 3-segment task: local~classId~taskId (redirects to classId~taskId)
            {
              path: "/view/:ref([^~]+~[^~]+~[^~]+)",
              name: "publicviewtask_legacy",
              component: () => import("@/views/Portal/ViewTask.vue"),
              beforeEnter: publicViewBeforeEnter,
              meta: viewTaskMeta,
            },
            // 2-segment entry: local~classId → redirect to short class; classId~taskId → ViewTask
            {
              path: "/view/:ref([^~]+~[^~]+)",
              name: "publicview_twoseg",
              component: () => import("@/views/Portal/ViewClass.vue"),
              beforeEnter: publicViewBeforeEnter,
              meta: viewClassMeta,
            },
            // Short classId-only
            {
              path: "/view/:ref([^~/]+)",
              name: "publicviewclass",
              component: () => import("@/views/Portal/ViewClass.vue"),
              beforeEnter: publicViewBeforeEnter,
              meta: viewClassMeta,
            },
            // Named target for short task (classId~taskId) after normalize — same path pattern,
            // reached via named replace from beforeEnter (not by path rank).
            {
              path: "/view/:ref([^~]+~[^~]+)",
              name: "publicviewtask",
              component: () => import("@/views/Portal/ViewTask.vue"),
              meta: viewTaskMeta,
            },
            // redirect page
            {
              path: "/to/:path?",
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
              path: "/join",
              name: "join",
              component: () => import("@/views/Home/JoinModal.vue"),
              meta: {
                page_title: `Join the ${process.env.VUE_APP_BRAND_NAME_SHORT} Beta`,
                theme_color: {
                  light: "#bfbfbf",
                  dark: "#0d0d0d",
                },
                requiresAuth: false,
                close_path: "/",
                blockStandardRedirect: true,
              },
            },
            {
              path: "/link/:code?",
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
          path: "/about",
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
          path: "/legal/privacy",
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
          path: "/legal/tos",
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
          path: "/download",
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
          path: "/roadmap",
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
          path: "/contact",
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
          component: () => import("../views/Home/NotFound.vue"),
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
      path: "/portal/admin",
      name: "admin",
      component: () => import("../views/Admin/Admin.vue"),
      redirect: "/portal/admin/logs",
      meta: {
        page_title: "Administrator Panel",
        theme_color: {
          light: "#f2f2f2",
          dark: "#121212",
        },
        requiresAuth: true,
        requiresAdmin: true,
      },
      children: [
        // logs
        {
          path: "/portal/admin/logs",
          name: "admin_logs",
          component: () => import("../views/Admin/pages/LogDebug.vue"),
          meta: {
            page_title: "Admin Panel | Logs",
            theme_color: {
              light: "#f2f2f2",
              dark: "#121212",
            },
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        // opts
        {
          path: "/portal/admin/opts",
          name: "admin_opts",
          component: () => import("../views/Admin/pages/DistrictEnv.vue"),
          meta: {
            page_title: "Admin Panel | District Options",
            theme_color: {
              light: "#f2f2f2",
              dark: "#121212",
            },
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        // usrs
        {
          path: "/portal/admin/usrs",
          name: "admin_usrs",
          component: () => import("../views/Admin/pages/UserTeacher.vue"),
          meta: {
            page_title: "Admin Panel | Users and Teachers",
            theme_color: {
              light: "#f2f2f2",
              dark: "#121212",
            },
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        // msgs
        {
          path: "/portal/admin/msgs",
          name: "admin_msgs",
          component: () => import("../views/Admin/pages/MessagesAlerts.vue"),
          meta: {
            page_title: "Admin Panel | Messages and Alerts",
            theme_color: {
              light: "#f2f2f2",
              dark: "#121212",
            },
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        // usge
        {
          path: "/portal/admin/usge",
          name: "admin_usge",
          component: () => import("../views/Admin/pages/UsageAnalytics.vue"),
          meta: {
            page_title: "Admin Panel | Usage Analytics",
            theme_color: {
              light: "#f2f2f2",
              dark: "#121212",
            },
            requiresAuth: true,
            requiresAdmin: true,
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
          path: "/portal/study/session/:page?",
          name: "studysession",
          component: () => import("../views/Portal/StudySession.vue"),
          meta: {
            page_title: "Study Session",
            theme_color: {
              light: "#f2f2f2",
              dark: "#121212",
            },
            requiresAuth: true,
            block_close: true,
          },
          children: [
            {
              path: "/portal/study/session/:page?/view/:ref?",
              name: "sessionview",
              component: () => import("../views/Portal/ViewTask.vue"),
              meta: {
                page_title: "Session Session | View Task",
                theme_color: {
                  light: "#f2f2f2",
                  dark: "#121212",
                },
                requiresAuth: true,
              },
            },
            {
              path: "/portal/study/session/:page?/notes/:ref?",
              name: "sessionnotes",
              component: () => import("../views/Portal/NotesTask.vue"),
              meta: {
                page_title: "Session Session | Task Notes",
                theme_color: {
                  light: "#f2f2f2",
                  dark: "#121212",
                },
                requiresAuth: true,
              },
            },
          ],
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
          path: "/portal/teacher-statistics",
          name: "teacher-stats",
          component: () => import("../views/Portal/TeacherStatsModal.vue"),
          meta: {
            page_title: "Stats",
            theme_color: {
              light: "#b5b5b5",
              dark: "#0d0d0d",
            },
            requiresAuth: true,
            requiresTeacher: true,
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
          // Old/any task ref; beforeEnter normalizes email-prefixed → short classId~taskId
          path: "/portal/view/:ref([^~]+~[^~]+~[^~]+)",
          name: "viewtask_legacy",
          component: () => import("../views/Portal/ViewTask.vue"),
          beforeEnter: portalViewBeforeEnter,
          meta: portalViewTaskMeta,
        },
        {
          // 2-seg: local~classId → short class; classId~taskId → task
          path: "/portal/view/:ref([^~]+~[^~]+)",
          name: "view_twoseg",
          component: () => import("../views/Portal/ViewClass.vue"),
          beforeEnter: portalViewBeforeEnter,
          meta: portalViewClassMeta,
        },
        {
          // Short classId-only
          path: "/portal/view/:ref([^~/]+)",
          name: "viewclass",
          component: () => import("../views/Portal/ViewClass.vue"),
          beforeEnter: portalViewBeforeEnter,
          meta: portalViewClassMeta,
        },
        {
          // Named short-task target (classId~taskId)
          path: "/portal/view/:ref([^~]+~[^~]+)",
          name: "viewtask",
          component: () => import("../views/Portal/ViewTask.vue"),
          meta: portalViewTaskMeta,
        },
        {
          // Optional ref catch-all kept for empty /portal/view
          path: "/portal/view/:ref?",
          name: "viewtask_optional",
          component: () => import("../views/Portal/ViewTask.vue"),
          beforeEnter: portalViewBeforeEnter,
          meta: portalViewTaskMeta,
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
          path: "/portal/unarchive/:type?/:ref?",
          name: "unarchive",
          component: () => import("../views/Portal/UnarchiveTask.vue"),
          meta: {
            page_title: "Confirm Task Unarchive",
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
