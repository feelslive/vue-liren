<template>  
    <div id="activate">
        <div class="title">
            <van-nav-bar
            title="激活绑定"
            left-text="返回"
            left-arrow 
            :fixed = true 
            @click-left="onClickLeft" 
          />
        </div>
        <div class="form">
          <van-cell-group>
             <van-field
              v-model="cardNum"
              icon="clear"
              label="激活卡号" 
              :error = 'errcardNum' 
              placeholder="请输入激活卡号"
              @click-icon="cardNum = ''"
              @blur="blur"
              @focus="focusNum"
            />
            <van-field
              v-model="username"
              label="用户名"
              icon="clear"
              :error = 'errusername' 
              placeholder="请输入用户名"
              @click-icon="username = ''"
            />
            <van-field
              v-model="userphone"
              label="手机号"
              icon="clear"
              :error = 'erruserphone'
              placeholder="请输入手机号"
              @click-icon="userphone = ''"
            />
            <van-field
              center
              v-model="sms"
              label="短信验证码"
              :error = 'errsms'
              placeholder="请输入短信验证码"
              icon="clear"
              @click-icon="sms = ''"
            >
              <van-button v-show="show" slot="button" size="small" type="primary"  @click.native="handleClick()">发送验证码</van-button>
               <van-button v-show="!show" slot="button" disabled size="small">{{count}}s重新获取</van-button>
            </van-field>
           
          </van-cell-group>
           <van-button @click="submit">确认激活</van-button>
        </div>
    </div>
</template>
<script>
import * as types from "../store/types";
import axios from "../api/http";
import { Toast } from "vant";
export default {
  data() {
    return {
      cardNum: "",
      username: "",
      userphone: "",
      sms: "",
      errcardNum: false,
      errusername: false,
      erruserphone: false,
      errsms: false,
      show: true,
      count: "",
      isdisabled: false
    };
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    focusNum() {
      this.errcardNum = false;
    },
    blur() {
      if (this.cardNum == "" || this.cardNum.length < 4) {
        this.errcardNum = true;
        Toast({
          message: "激活卡号不正确",
          duration: 1000
        });
      }
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
        this.errphone = true;
        Toast({
          message: "手机号有误",
          duration: 1000
        });
      }
    },
    submit() {
      if (this.cardNum == "") {
        this.errcardNum = true;
        Toast({
          message: "激活卡号不能为空",
          duration: 1000
        });
        return false;
      } else if (this.username == "") {
        this.errusername = true;
        Toast({
          message: "姓名不能为空",
          duration: 1000
        });
        return false;
      } else if (this.userphone == "") {
        this.erruserphone = true;
        Toast({
          message: "手机号不能为空",
          duration: 1000
        });
      } else if (this.sms == "") {
        this.errsms = true;
        Toast({
          message: "短信验证码不能为空",
          duration: 1000
        });
      }
      // if (
      //   this.cardNum == "" ||
      //   this.username == "" ||
      //   this.userphone == "" ||
      //   this.sms == ""
      // ) {
      //   this.errcardNum = true;
      //   this.errusername = true;
      //   this.erruserphone = true;
      //   this.errsms = true;
      //   Toast({
      //     message: "信息不能为空",
      //     duration: 1000
      //   });
      //   return false;
      // } else {
      //   this.$router.push({
      //     path: "/succee"
      //   });
      // }
    }
  }
};
</script>
<style scoped>

</style>

