import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "FirstPage",
    component: () => import("../views/FirstPage/FirstPage.vue"),
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("../views/auth/LoginPage.vue"),
  },
  {
    path: "/Registration",
    name: "Registration",
    component: () => import("../views/auth/RegistrationPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
