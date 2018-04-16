<template>  
    <div id="activate" class="padding03rem">
        <!-- <div class="title">
            <van-nav-bar
            title="激活绑定"
            left-text="返回"
            left-arrow 
            :fixed = true 
            @click-left="onClickLeft" 
          />
        </div> -->
        <div class="form radius02rem">
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
              class="radius02rem "
            />
            <van-field
              v-model="username"
              label="姓名"
              icon="clear"
              :error = 'errusername' 
              placeholder="请输入您的姓名"
              @click-icon="username = ''"
              class="radius02rem "
            />
            <van-field
              v-model="userphone"
              label="手机号"
              icon="clear"
              :error = 'erruserphone'
              placeholder="请输入手机号"
              @click-icon="userphone = ''"
              class="radius02rem "
            />
            <van-field
              center
              v-model="sms"
              label="短信验证码"
              :error = 'errsms'
              placeholder="请输入验证码"
              icon="clear"
              @click-icon="sms = ''"
              class="radius02rem "
            >
              <van-button v-show="show" slot="button" size="small" type="primary"  @click.native="handleClick()">发送验证码</van-button>
               <van-button v-show="!show" slot="button" disabled size="small">{{count}}s重新获取</van-button>
            </van-field>
          </van-cell-group>
          <van-button class="asbtn radius1rem" @click="submit">确认激活</van-button>
          
        </div>

        <div class="description radius02rem">
              <div class="des_title">产品激活说明</div>
              <div class="des_text radius02rem">
                <p  v-for="(item,index) in descentent" :key="index">{{item.text}}</p>
              </div>
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
      isLogin: 100,
      isdisabled: false,
      descentent: [
        {
          text: "1、本产品由里仁(北京)人力资源有限公司提供"
        },
        {
          text: "2、本卡有效期1年，请尽快激活并预约使用"
        },
        {
          text: "3、诊疗项目须在预约时的指定诊疗医院中进行"
        },
        {
          text: "4、激活过程中若遇到问题可拨打客服电话：400-612-6886"
        }
      ]
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
      } else {
        console.log(
          "手机号==" +
            this.userphone +
            "验证码==" +
            this.sms +
            "姓名==" +
            this.username +
            "激活码==" +
            this.cardNum
        );
        axios
          .post("apis/liren/card/active", {
            cellphone: this.userphone,
            captcha: this.sms,
            name: this.username,
            code: this.cardNum
          })
          .then(res => {
            console.log(res.data);
            // this.$store.commit(types.ISLOGIN, this.isLogin);
            // this.$router.push({
            //   path: "/succee"
            // });
          })
          .catch(function(error) {
            console.log(error);
            _this.$router.push({
              path: "/login"
            });
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
.form {
  overflow: hidden;
  background-color: #fff;
  margin-top: 0.6rem;
}

.description {
  margin-top: 0.2rem;
  background-color: #fff;
  padding: 0.3rem;
}
.description .des_title {
  text-align: center;
  margin-bottom: 0.3rem;
  font-size: 0.3rem;
  font-weight: bold;
}
.description .des_text {
  background-color: #f3f5f4;
  padding: 0.3rem;
  font-size: 0.24rem;
  line-height: 0.4rem;
}
</style>

