import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isLogin: 0, //初始时候给一个 isLogin=0 表示用户未登录
    title: "预约诊疗"
  },
  mutations: {
    [types.ISLOGIN]: (state, data) => {
      localStorage.isLogin = data;
      state.isLogin = data;
    },
    [types.LOGOUT]: (state, data) => {
      localStorage.removeItem("isLogin");
      state.isLogin = 0;
    }
  }
});
