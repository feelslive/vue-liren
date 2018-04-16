<template>  
    <div id="make" class="padding03rem">
      <!-- <div class="title">
        <van-nav-bar
          :title= this.title
          left-text="返回"
          left-arrow 
          :fixed = true 
           @click-left="onClickLeft" 
           style="z-index:100000"
        />
      </div> -->
     
        <div class="product" v-if="resultshow">
         <div class="particulars_title">选择您已激活的产品</div>
          <div class="makeprod">
                <!-- 激活列表 -->
               
                <div class="van-coupon-list">
                  <div class="van-coupon-list__list">
                    <van-loading v-if="loading" color="black" style="margin:0 auto"/>
                    <div class="van-coupon-item make_lists_item" :class="{redborder:index==current}" @click="selectone(item,index)" v-for="(item,index) in result" :key="index">
                      <div class="van-coupon-item__head">
                        <!-- <div class="van-coupon-item__lines">
                        </div> -->
                        <div class="van-coupon-item__gradient">
                          <h2>8000<span>元</span></h2>
                        </div>
                      </div>
                      <div class="van-coupon-item__body">
                        <h2>{{item.code}}</h2>
                        <span class="van-coupon-item__body_dates">有效期:{{item.start_time | formatDate}}~{{item.end_time | formatDate}}</span><!---->
                        <router-link to="/details">查看详情</router-link>
                          <div v-show="selectoneshow" class="van-coupon-item__corner">
                            <i class="van-icon van-icon-success"></i>
                          </div>
                      </div> 
                    </div>
                    <p style="color:#ccc;text-align: center;margin-top:.6rem">没有更多了~</p>
                  </div>
                </div>
               
          </div>
          <span class="attention" style="display:block;margin-top:.2rem">注：到院诊疗时，若机构无法提供套餐中的某些诊疗项，可使用同等价值的其他产品进行替换</span>
          <div class="particulars_title">预约信息</div>
          <div class="makeform">
            <van-cell-group class="vancellgroup">
              <van-cell class="radius02rem" value="" icon="location" title="选择城市" is-link  @click.native="selectCity">
                <!-- <template slot="title"> -->
                  <span class="van-cell-text" v-for="(item,index) in sCity" :key="index">{{item}}</span>
                <!-- </template> -->
              </van-cell>
              <van-cell class="radius02rem" :value="sSite" title="选择机构" icon="shop" is-link @click.native="selectSite"/>
              <div class="map_text" v-if="mapshow"><span>{{address}}</span>
              <router-link to="/map" class="blue">查看地图</router-link>
              <!-- <a class="blue"  @click="show5 = true" >查看地图</a> -->
              </div>
              <div class="userIdinput">
                <i class="userIdnum_icon"></i>
                <van-field
                  v-model="userIdnumber"
                  label="身份证号"
                  icon="clear"
                  :error = 'errIdnumber' 
                  placeholder="请输入身份证号"
                  @click-icon="userIdnumber = ''"
                ></van-field>
              </div>
              
              <van-cell class="radius02rem" :value="sDate" title="选择时间" icon="clock" is-link @click.native="selectDate"/>
              <van-cell class="radius02rem" :value="sTime" title="选择时辰" icon="sign" is-link @click.native="selectTime"/>
            </van-cell-group>
              <!-- 选择城市 -->
            <van-popup v-model="isSelectCity" position="bottom" :overlay="true">
              <van-picker
                show-toolbar
                :columns="columns"
                @cancel="Cancelcity"
                @confirm="Confirmcity" 
                @change="Changecity" 
              />
            </van-popup>
            <!-- 选择地址 -->
            <van-popup v-model="isSelectSite" position="bottom" :overlay="true">
              <van-picker
                show-toolbar
                :columns="sitecolumns"
                @cancel="CancelSite"
                @confirm="ConfirmSite"
                @change="ChangeSite"
              />
            </van-popup>
            
            <!-- 选择时间 -->
            <van-popup v-model="isSelectDate" position="bottom" :overlay="true">
              <van-datetime-picker
                v-model="currentDate"
                type="date"
                :min-date="minDate" 
                :max-date="maxDate"
                @cancel="CancelDate"
                @confirm="ConfirmDate" 
                @change="ChangeDate" 
              />
            </van-popup>

             <!-- 选择时辰 -->
            <van-popup v-model="isSelectTime" position="bottom" :overlay="true">
              <van-picker
                show-toolbar
                :columns="timecolumns"
                @cancel="CancelTime"
                @confirm="ConfirmTime"
                @change="ChangeTime"
              />
            </van-popup>
            <span class="attention">注：预约完成后，客服人员与您联系告知具体诊疗时间</span>
            <div class="reads">
                 <van-checkbox class="vcheckbox" v-model="checked">我已阅读并同意 </van-checkbox>
                 <!-- <span @click="showpopup = true;">《投保须知》</span><span @click="showpopup = true;">《保险条例》</span> -->
                 <router-link to="/notice">《投保须知》</router-link><router-link to="/attens">《保险条例》</router-link>
            </div>
            <van-button class="asbtn radius1rem" @click.native="submit">确认预约</van-button>
          </div>
          <van-popup v-model="showpopup" class="notice" position="bottom">
            <van-tabs>
              <van-tab title="《投保须知》">
               <notice></notice>
              </van-tab>
              <van-tab title="《保险条例》">
                <attens></attens>
              </van-tab>
            </van-tabs>
          </van-popup>
          <!-- 弹出地图 -->
          <!-- <van-popup v-model="show5" position="right" class="map_alert">
            <van-button @click="show5 = false" style="z-index:2;position:fixed">关闭</van-button>
            <div class="baidu">
                <my-map></my-map>
            </div>
            
          </van-popup> -->
        </div>
      

      <!-- 没有激活产品 -->
      <div class="centent" v-else>
          <van-icon name="warn" />
           <h3 class="make_title_alert">您还未激活绑定诊疗项目产品</h3>
           <h3>请先激活后再预约</h3>
           <router-link to="./activate" class="actbtnto"> 
            <van-button class="asbtn makeBtn radius1rem">立即激活</van-button>
          </router-link>
      </div>
      
      <div @click="logout">退出</div>

    </div>
</template>
<script>
import * as types from "../store/types";
import axios from "../api/http";
import { Toast } from "vant";
import { Dialog } from "vant";
import attens from "../components/attens";
import notice from "../components/notice";
import map from "../components/Map";
let citys = {
  北京: ["朝阳", "海淀", "东城", "西城", "丰台"],
  天津: ["河西", "南开"]
};
export default {
  data() {
    return {
      mapshow: false,
      resultshow: true,
      loading: true,
      show5: false,
      showpopup: false,
      current: 0,
      userIdnumber: "",
      errIdnumber: false,
      selectoneshow: false,
      checked: false,
      title: "",
      datetitle: "选择预约时间",
      isSelectCity: false,
      isSelectSite: false,
      isSelectTime: false,
      isSelectDate: false,
      shows: true,
      pickerVisible: "",
      minDate: new Date(),
      maxDate: new Date(),
      currentDate: new Date(),
      chosenCoupon: 0,
      result: [],
      coupons: [
        {
          id: "1",
          start_at: 1489104000,
          end_at: 1514592000
        },
        {
          id: "2",
          start_at: 1489104000,
          end_at: 1514592000
        },
        {
          id: "3",
          start_at: 1489104000,
          end_at: 1514592000
        },
        {
          id: "4",
          start_at: 1489104000,
          end_at: 1514592000
        }
      ],
      columns: [
        {
          values: Object.keys(citys),
          className: "column1"
        },
        {
          values: citys["北京"],
          className: "column2",
          defaultIndex: 0
        }
      ],
      sitecolumns: [],
      timecolumns: [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00"
      ],
      sCity: "",
      sSite: "",
      sDate: "",
      sTime: "",
      code: "",
      city: "", //城市
      district: "", //地区
      appoint_time: null, //预约时间
      hospital: "", //医院名称
      address: "",
      lonandlet: ["39.9152478931", "116.4038206839"] //经纬度
    };
  },
  components: {
    attens,
    notice,
    myMap: map
  },
  beforeCreate() {
    let _this = this;
    this.$nextTick(function() {
      axios
        .get("apis/liren/card/codelist", {
          params: {
            // cellphone: window.localStorage.getItem("cellphone")
          }
        })
        .then(res => {
          this.code = res.data.result[0].code;
          this.loading = false;
          this.result = res.data.result;
          // console.log(this.result);
          if (this.result.length > 0) {
            this.resultshow = true;
          } else {
            this.resultshow = false;
          }
        })
        .catch(function(error) {
          console.log(error);
          Dialog.alert({
            message: "网络超时，请稍后再试~"
          }).then(() => {
            // _this.$router.replace("/");
          });
          // _this.$router.push({
          //   path: "/"
          // });
        });
    });
  },
  filters: {
    formatDate(time) {
      var date = new Date(time * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D;
    }
  },
  created() {
    // 获取城市列表
    this.getCityinfo();
    this.setminDate();
    this.setmaxDate();
  },
  mounted() {
    this.title = this.$store.state.title;
  },
  computed: {},
  methods: {
    parserDate(date) {
      var t = Date.parse(date);
      if (!isNaN(t)) {
        return new Date(Date.parse(date.replace(/-/g, "/")));
      } else {
        return new Date();
      }
    },
    selectone(item, index) {
      console.log(item.code);
      this.code = item.code;
      // this.selectoneshow = !this.selectoneshow;
      this.current = index;
      console.log(this.current);
    },
    onChange(index) {
      this.showList = true;
      this.chosenCoupon = index;
      console.log(index);
    },
    onExchange(code) {
      console.log(code);
      this.coupons.push(coupon);
    },
    alert() {
      Dialog.alert({
        title: "温馨提示",
        message: "注：预约完成后，若预约时间不可用，客服人员将与您联系"
      }).then(() => {
        // on close
      });
    },
    // 选择城市
    Confirmcity(value, index) {
      this.isSelectCity = !this.isSelectCity;
      Toast(`当前值：${value}, 当前索引：${index}`);
      // console.log(value);
      for (let i = 0; i < value.length; i++) {
        this.city = value[0];
        this.district = value[1];
      }
      this.sCity = value;
      this.sSite = "";
      axios
        .get("apis/liren/info/hoslist", {
          params: {
            city: this.city,
            district: this.district
          }
        })
        .then(res => {
          console.log(res.data.result);
          this.$store.commit("cityResult", res.data.result);
          var rest = res.data.result;
          this.sitecolumns = [];
          this.mapshow = false;
          for (let keys in rest) {
            this.sitecolumns.push(rest[keys].name);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    Cancelcity() {
      this.isSelectCity = !this.isSelectCity;
      Toast("取消");
    },
    Changecity(picker, values) {
      picker.setColumnValues(1, citys[values[0]]);
    },

    // 选择机构
    ConfirmSite(value, index) {
      this.isSelectSite = !this.isSelectSite;
      console.log(this.$store.state.cityResult[index].coord);
      this.address = this.$store.state.cityResult[index].address;
      this.$store.commit(
        "lonandlet",
        this.$store.state.cityResult[index].coord.split(",")
      );
      this.mapshow = true;
      this.sSite = value;
    },
    CancelSite() {
      this.isSelectSite = !this.isSelectSite;
      Toast("取消");
    },
    ChangeSite(picker, values) {
      picker.setColumnValues(1, citys[values[0]]);
    },

    // 选择时间
    ConfirmDate(value, index) {
      this.isSelectDate = !this.isSelectDate;
      Toast(`当前值：${value}, 当前索引：${index}`);
      console.log(value);
      var y = value.getFullYear();
      var m = value.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = value.getDate();
      d = d < 10 ? "0" + d : d;
      var newdate = y + "-" + m + "-" + d;
      this.sDate = newdate;
    },
    CancelDate() {
      this.isSelectDate = !this.isSelectDate;
      Toast("取消");
    },
    ChangeDate(picker) {
      console.log(picker.getValues());
    },

    setminDate() {
      var curDate = new Date();
      var DateNum = parseInt(curDate.getTime()) + 172800 * 1000;
      var date = new Date(DateNum);
      var Y = date.getFullYear();
      var M = date.getMonth();
      var D = date.getDate();
      this.minDate = new Date(Y, M, D);
    },
    setmaxDate() {
      var curDate = new Date();
      var DateNum = parseInt(curDate.getTime()) + 777600 * 1000;
      var date = new Date(DateNum);
      var Y = date.getFullYear();
      var M = date.getMonth();
      var D = date.getDate();
      this.maxDate = new Date(Y, M, D);
    },

    // 选择时段
    ConfirmTime(value, index) {
      this.isSelectTime = !this.isSelectTime;
      Toast(`当前值：${value}, 当前索引：${index}`);
      console.log(value);
      this.sTime = value;
      this.alert();
    },
    CancelTime() {
      this.isSelectTime = !this.isSelectTime;
      Toast("取消");
    },
    ChangeTime(picker, values) {
      picker.setColumnValues(1, citys[values[0]]);
    },

    selectCity() {
      console.log("选择城市");
      this.isSelectCity = !this.isSelectCity;
    },
    selectSite() {
      if (this.sitecolumns.length < 1) {
        Toast("请先选择城市");
      } else {
        this.isSelectSite = !this.isSelectSite;
      }
      console.log("选择机构");
    },
    selectDate() {
      this.isSelectDate = !this.isSelectDate;
    },
    selectTime() {
      this.isSelectTime = !this.isSelectTime;
    },
    onClickLeft() {
      if (this.$store.state.isLogin == "100") {
        this.$router.push({
          path: "/"
        });
      } else {
        this.$router.back(-1);
      }
    },
    getCityinfo() {
      axios
        .get("apis/liren/info/cityinfo")
        .then(res => {
          // console.log(res.data.result);
          // console.log(citys);
          const citys = res.data.result;
          // console.log(citys);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submit() {
      console.log(
        "用户所填的数据"
        // this.sCity +
        // this.sSite +
        // this.userIdnumber +
        // this.sDate +
        // " " +
        // this.sTime
      );
      let makeDate = this.sDate + " " + this.sTime;
      console.log(makeDate);
      let newMakeDate = this.parserDate(makeDate);
      console.log(newMakeDate.getTime());
      this.appoint_time = newMakeDate.getTime();
      if (
        this.sCity != "" &&
        this.sSite != "" &&
        this.userIdnumber != "" &&
        this.sDate != "" &&
        this.sTime != "" &&
        this.checked != false
      ) {
        if (this.userIdnumber.length != 18) {
          Toast("请填写正确的身份证号码");
        } else {
          // 提交预约信息
          axios
            .post("apis/liren/card/appoint", {
              code: this.code,
              city: this.city,
              district: this.district,
              hospital: this.sSite,
              address: this.address,
              appoint_time: this.appoint_time
            })
            .then(res => {
              console.log(res);
              window.location.reload();
              this.$router.push({
                path: "/finish"
              });
            })
            .catch(function(error) {
              Toast("提交失败！请重试");
              console.log(error);
            });
        }
      } else {
        Toast("请将预约信息填写完整");
      }
    },
    logout() {
      this.$store.commit(types.LOGOUT);
      this.$router.push({
        path: "/login"
      });
    }
  }
};
</script>
<style scoped>
.map_alert {
  width: 100%;
  height: 100%;
}
#app {
  background-color: #f3f5f5;
}
.redborder {
  border: #fb3131 1px solid;
}
.product {
  padding: 0 0.025rem 0.2rem;
}
.makeprod {
  height: 5rem;
  background-color: #fff;
  overflow-y: auto;
}
.reads {
  margin: 1rem 0 0 0;
}
.vcheckbox {
  margin: -0.05rem;
  display: inline-block;
  vertical-align: sub;
}
.reads span {
  color: #2b8cfa;
}

.ctiy_picker {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.attenshowbg {
  overflow-y: auto;
}
.make_lists_item a {
  display: inline-block;
  color: #2b8cfa;
  margin-top: 0.2rem;
  border-radius: 0.1rem;
}

.particulars_title {
  color: #333;
  font-weight: bold;
  font-size: 0.28rem;
  text-indent: 0.1rem;
  border-left: solid #b07648 0.1rem;
  margin: 0.3rem 0;
  padding-top: 0.04rem;
}
.centent {
  font-family: "微软雅黑";
  margin: 1.8rem 0;
  text-align: center;
}

.centent h3 {
  font-size: 0.28rem;
  color: #333;
  margin-top: 0.2rem;
}
.centent h3.make_title_alert {
  margin-top: 0.5rem;
}

.makeBtn {
  margin-top: 2.8rem;
}
.userIdinput {
  position: relative;
}
.userIdnum_icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  position: absolute;
  top: 50%;
  left: 16px;
  margin-top: -8px;
  z-index: 2000;
  background: url("../../static/img/userId@2x.png") center;
  background-size: 100%;
}
.notice {
  height: 80%;
  overflow-y: auto;
}
.van-coupon-item__body h2 {
  font-size: 0.24rem;
}

.van-coupon-item__body_dates {
  font-size: 0.2rem;
  color: #666;
  margin-top: 0.2rem;
}
.map_text {
  font-size: 0.2rem;
  margin: 0.1rem 0 0.3rem 0;
  overflow: hidden;
}
.map_text span {
  float: left;
  width: 80%;
  line-height: 0.25rem;
  display: inline-block;
  text-align: left;
}
.map_text a {
  display: inline-block;
  float: right;
  line-height: 0.3rem;
}
</style>

