import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../config/firebase";

const isAuthenticated = (to, from, next) => {
  auth.onAuthStateChanged(() => {
    if (auth.currentUser) {
      next();
    } else {
      next({ name: "home" });
    }
  });
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignUp.vue"),
    },
    {
      path: "/chatroom",
      name: "chatroom",
      component: () => import("../views/Chatroom.vue"),
      beforeEnter: isAuthenticated,
    },
  ],
});

export default router;
