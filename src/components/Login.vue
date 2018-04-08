<template>  
    <div id="login">
      <div class="title">
        <van-nav-bar
          title="登录"
          left-text="返回"
          left-arrow 
          :fixed = true 
           @click-left="onClickLeft" 
        />
      </div>
        <van-cell-group>
          <van-field
            v-model="userphone"
            label="预留手机号"
            icon="clear"
            placeholder="请输入手机号"
            @click-icon="userphone = ''"
          />
           <van-field
              center
              v-model="sms"
              label="短信验证码"
              placeholder="请输入短信验证码"
              icon="clear"
              @click-icon="sms = ''"
            >
              <van-button v-show="show" slot="button" size="small" type="primary"  @click.native="handleClick()">发送验证码</van-button>
              <van-button v-show="!show" slot="button" disabled size="small" type="primary">{{count}}s重新获取</van-button>
            </van-field>
        </van-cell-group>
          <van-button size="large" @click.native="submit">确定</van-button>
    </div>
</template>
<script>
import * as types from "../store/types";
import axios from "../api/http";
export default {
  data() {
    return {
      userphone: "",
      sms: "",
      isLogin: 100,
      show: true,
      count: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "./" });
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
      } else {
        alert("请输入手机号");
      }
    },
    submit() {
      let _this = this;

      if (_this.userphone == "" || _this.sms == "") {
        alert("不能为空");
        return false;
      }
      // let formdata = new FormData();
      // formdata.append({
      //   username: this.username,
      //   sms: this.sms
      // });
      var formdata = new FormData();
      formdata.append("userphone", _this.userphone);
      formdata.append("sms", _this.sms);
      console.log(_this.userphone);

      if (this.isLogin) {
        this.$store.commit(types.ISLOGIN, this.isLogin);
        //登录后改变登录状态 isLogin = 100 ；
        let redirect = decodeURIComponent(
          this.$route.query.redirect || "/make"
        );
        this.$router.push({
          path: redirect
        });
      }
      // axios
      //   .post("./user", formdata, {
      //     headers: {
      //       "Content-Type": "multipart/form-data"
      //     }
      //   })
      //   .then(res => {
      //     console.log(res);

      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    }
  }
};
</script>
<style scoped>

</style>

