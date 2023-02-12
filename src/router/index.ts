import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFoundView,
      meta: {
        title: "Not found"
      }
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/city/:cityname",
      name: "city",
      component: CityView,
      meta: {
        title: "City weather",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.query.fullName ?? to.meta.title} | Fine Weather`;
  next();
});

export default router;
