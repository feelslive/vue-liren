// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "./api/http";
import store from "./store/store";
import * as types from "./store/types";
import Vant from "vant";
import "vant/lib/vant-css/index.css";
import "../static/css/my-Vant.css";

Vue.use(Vant);

Vue.config.productionTip = false;

//页面刷新时,重新赋值isLogin
if (window.localStorage.getItem("isLogin")) {
  console.log(window.localStorage.getItem("isLogin"));
  store.commit(types.ISLOGIN, window.localStorage.getItem("isLogin"));
}
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.requireAuth)) {
    // 对路由进行验证
    if (store.state.isLogin == "100") {
      // 已经登陆
      next(); // 正常跳转到你设置好的页面
    } else {
      // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
      console.log("路径" + to.fullPath);
      next({ path: "/login", query: { Rurl: to.fullPath } });
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
