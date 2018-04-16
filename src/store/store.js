import Vue from "vue";
import Vuex from "vuex";
import * as types from "./types";
import axios from "../api/http";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isLogin: 0, //初始时候给一个 isLogin=0 表示用户未登录
    title: "预约诊疗",
    result: [],
    cellphone: null,
    lonandlet: [], //经纬度
    cityResult: [],
    saveproduct: []
  },
  getters: {},
  mutations: {
    [types.ISLOGIN]: (state, data) => {
      localStorage.isLogin = data;
      state.isLogin = data;
    },
    [types.LOGOUT]: (state, data) => {
      localStorage.removeItem("isLogin");
      state.isLogin = 0;
    },
    // 城市
    cityResult: (state, data) => {
      state.cityResult = data;
      // console.log(state.cityResult);
    },
    // 经纬度
    lonandlet: (state, data) => {
      state.lonandlet = data;
      console.log(state.lonandlet);
    },
    // 手机号
    cellphone: (state, data) => {
      localStorage.cellphone = data;
      state.cellphone = data;
    },
    saveproduct: (state, data) => {
      state.saveproduct = data;
    },
    // 请求产品
    getproduct: state => {
      console.log("请求了");
      axios
        .get("apis/liren/info/content")
        .then(res => {
          console.log(res.data.result);
          state.result = res.data.result;
          console.log(state.result);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
});
