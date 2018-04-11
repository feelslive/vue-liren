import Vue from "vue";
import Router from "vue-router";
import login from "@/components/Login";
import make from "@/components/Make";
import home from "@/components/Home";
import finish from "@/components/Finish";
import details from "@/components/Details";
import activate from "@/components/Activate";
import succee from "@/components/Succee";
import notactivate from "@/components/NotActivate";
import NotFound from "@/components/NotFound";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: home
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/make",
      name: "make",
      meta: {
        requireAuth: true
      },
      component: make
    },
    {
      path: "/activate",
      name: "activate",
      component: activate
    },
    {
      path: "/finish",
      name: "finish",
      component: finish
    },
    {
      path: "/details",
      name: "details",
      component: details
    },
    {
      path: "/succee",
      name: "succee",
      component: succee
    },
    {
      path: "/notactivate",
      name: "notactivate",
      component: notactivate
    },
    { path: "*", component: NotFound }
  ]
});
