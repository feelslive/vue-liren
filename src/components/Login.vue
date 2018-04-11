<template>  
    <div id="login">
      <div class="title">
        <van-nav-bar
          title="验证手机号"
          left-text="返回"
          left-arrow 
          :fixed = true 
           @click-left="onClickLeft" 
        />
      </div>
        <van-cell-group class="logininput">
          <van-field
            v-model="userphone"
            label="预留手机号"
            icon="clear"
            placeholder="请输入手机号"
            :error = 'errphone' 
            @click-icon="userphone = ''"
            @focus = "focusphone"
          />
           <van-field
              center
              v-model="sms"
              label="短信验证码"
              placeholder="请输入验证码"
              icon="clear"
              :error = 'errsms' 
              @click-icon="sms = ''"
              @focus = "focussms"
            >
              <van-button v-show="show" slot="button" size="small" type="primary"  @click.native="handleClick()">发送验证码</van-button>
              <van-button v-show="!show" slot="button" disabled size="small">{{count}}s重新获取</van-button>
            </van-field>
        </van-cell-group>
          <van-button size="large" @click.native="submit">确定</van-button>
    </div>
</template>
<script>
import * as types from "../store/types";
import axios from "../api/http";
import { Toast } from "vant";
export default {
  data() {
    return {
      userphone: "",
      sms: "",
      isLogin: 100,
      show: true,
      count: "",
      errphone: false,
      errsms: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "./" });
    },
    focusphone() {
      this.errphone = false;
    },
    focussms() {
      this.errsms = false;
    },
    // 发送验证码
    handleClick() {
      console.log(/^1\d{10}$/.test(this.userphone));
      if (/^1\d{10}$/.test(this.userphone)) {
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 1 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        this.sendsms();
      } else {
        this.errphone = true;
        Toast({
          message: "手机号有误",
          duration: 1000
        });
      }
    },

    sendsms() {
      axios
        .get("apis/user/login/sendcode", {
          params: {
            cellphone: this.userphone
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submit() {
      let _this = this;
      if (_this.userphone != "" || _this.sms != "") {
        // axios
        //   .post("apis/user/login/checkcode", {
        //     cellphone: this.userphone,
        //     captcha: this.sms
        //   })
        //   .then(res => {
        //     console.log(res);
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //   });
      }

      // headers: {
      //             "Content-Type": "multipart/form-data"
      //           }

      if (_this.userphone != "" || _this.sms != "") {
        if (_this.sms == "000000") {
          if (this.isLogin) {
            var formdata = new FormData();
            formdata.append("userphone", _this.userphone);
            formdata.append("sms", _this.sms);
            console.log(_this.userphone);

            axios
              .get("apis/user/login/checkcode", {
                params: {
                  cellphone: this.userphone,
                  captcha: this.sms
                }
              })
              .then(res => {
                console.log(res);
              })
              .catch(function(error) {
                console.log(error);
              });
          }

          this.$store.commit(types.ISLOGIN, this.isLogin);
          //登录后改变登录状态 isLogin = 100 ；
          let redirect = decodeURIComponent(
            this.$route.query.redirect || "/make"
          );
          this.$router.push({
            path: redirect
          });
        } else {
          this.errsms = true;
          Toast({
            message: "验证码错误",
            duration: 1000
          });
          return false;
        }
      } else {
        this.errphone = true;
        this.errsms = true;
        Toast({
          message: "不能为空",
          duration: 1000
        });
        return false;
      }

      // let formdata = new FormData();
      // formdata.append({
      //   username: this.username,
      //   sms: this.sms
      // });
    }
  }
};
</script>
<style scoped>
.logininput {
  margin-top: 0.5rem;
}
</style>

