import { createRouter, createWebHistory } from "vue-router";

import AdminApp from "./views/AdminApp.vue";
import UserApp from "./views/UserApp.vue";
import LoginApp from "./views/LoginApp.vue";
import SecurityUser from "./views/SecurityUser.vue";
import UserApp_local from "./views/UserApp_local.vue";

export default createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "user",
      component: UserApp,
    },
    {
      path: "/local",
      name: "user_local",
      component: UserApp_local,
    },
    {
      path: "/security",
      name: "security",
      component: SecurityUser
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminApp,
      beforeEnter: async (to, from, next) => {
        const isAuthorized = from.name;
        if (isAuthorized !== "login") {
          next({ path: "/login" });
        } else {
          next();
        }
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginApp,
      beforeEnter: async (to, from, next) => {
        const isAuthorized = from.name;
        if (isAuthorized === "login") {
          next({ path: "/admin" });
        } else {
          next();
        }
      },
    },
  ],
});
