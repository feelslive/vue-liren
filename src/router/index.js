import Vue from "vue";
import Router from "vue-router";
import login from "@/components/Login";
import make from "@/components/Make";
import home from "@/components/Home";
import finish from "@/components/Finish";
import details from "@/components/Details";
import activate from "@/components/Activate";
import succee from "@/components/Succee";
import examine from "@/components/Examine";
import notactivate from "@/components/NotActivate";
import NotFound from "@/components/NotFound";
import map from "@/components/Map";
import notice from "@/components/notice";
import attens from "@/components/attens";
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
        requireAuth: true,
        keepAlive: true
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
      meta: {
        requireAuth: true
      },
      component: finish
    },
    {
      path: "/details",
      name: "details",
      meta: {
        requireAuth: true
      },
      component: details
    },
    {
      path: "/succee",
      name: "succee",
      meta: {
        requireAuth: true
      },
      component: succee
    },
    {
      path: "/examine",
      name: "examine",
      meta: {
        requireAuth: true
      },
      component: examine
    },
    {
      path: "/notactivate",
      name: "notactivate",
      meta: {
        requireAuth: true
      },
      component: notactivate
    },
    {
      path: "/map",
      name: "map",
      meta: {
        requireAuth: true,
        keepAlive: false
      },
      component: map
    },
    {
      path: "/attens",
      name: "attens",
      meta: {
        requireAuth: true
      },
      component: attens
    },
    {
      path: "/notice",
      name: "notice",
      meta: {
        requireAuth: true
      },
      component: notice
    },
    { path: "*", component: NotFound }
  ]
});
