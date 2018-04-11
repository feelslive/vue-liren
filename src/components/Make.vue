<template>  
    <div id="make">
      <div class="title">
        <van-nav-bar
          :title= this.title
          left-text="返回"
          left-arrow 
          :fixed = true 
           @click-left="onClickLeft" 
        />
      </div>
     
        <div class="product" v-if="result.length">
         <div class="particulars_title">选择您已激活的产品</div>
          <div class="makeprod">
                <!-- 激活列表 -->
                <div class="van-coupon-list">
                  <div class="van-coupon-list__list">
                    <div class="van-coupon-item make_lists_item" :class="{redborder:index==current}" @click="selectone(index)" v-for="(item,index) in result" :key="index">
                      <div class="van-coupon-item__head">
                        <div class="van-coupon-item__lines">
                        </div>
                        <div class="van-coupon-item__gradient">
                          <h2><span>¥</span> 8000</h2>
                        </div>
                      </div>
                      <div class="van-coupon-item__body">
                        <h2>{{item.code}}</h2>
                        <span>{{item.start_time | formatDate}}~{{item.end_time | formatDate}}</span><!---->
                        <router-link to="/details">查看详情</router-link>
                          <div v-show="selectoneshow" class="van-coupon-item__corner">
                            <i class="van-icon van-icon-success"></i>
                          </div>
                      </div> 
                    </div>
                    <p style="color:#ccc;text-align: center;margin-top:.8rem">没有更多了~</p>
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
              <van-cell class="radius02rem" :value="sTime" title="选择时段" icon="sign" is-link @click.native="selectTime"/>
            </van-cell-group>
            <!-- <div class="ctiy_picker">
              <van-picker
                v-show="show"
                show-toolbar
                title="选择城市"
                :columns="columns"
                @cancel="onCancel"
                @confirm="onConfirm" 
                @change="onChange" 
              />
            </div> -->
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

             <!-- 选择时段 -->
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
                 <span @click="showpopup = true;">《投保须知》</span><span @click="showpopup = true;">《保险条例》</span>
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
const citys = {
  北京: ["朝阳", "海淀", "东城", "西城", "丰台"],
  天津: ["福州", "厦门", "莆田", "三明", "泉州"]
};
export default {
  data() {
    return {
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
      result: [
        {
          code: "M0002602C",
          cellphone: "18611115971",
          open_id: "",
          start_time: 1517241600,
          end_time: 1548777599,
          content_id: "1001"
        },
        {
          code: "M0002603C",
          cellphone: "18611115971",
          open_id: "",
          start_time: "1517241600",
          end_time: 1548777599,
          content_id: "1001"
        },
        {
          code: "M0002603C",
          cellphone: "18611115971",
          open_id: "",
          start_time: "1517241600",
          end_time: 1548777599,
          content_id: "1001"
        },
        {
          code: "M0002603C",
          cellphone: "18611115971",
          open_id: "",
          start_time: "1517241600",
          end_time: 1548777599,
          content_id: "1001"
        }
      ],
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
      sitecolumns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      timecolumns: ["上午", "下午"],
      sCity: "",
      sSite: "",
      sDate: "",
      sTime: ""
    };
  },
  components: {
    attens,
    notice
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
    this.getProduct();
    this.setminDate();
    this.setmaxDate();
    // console.log(typeof new Date());
  },
  mounted() {
    this.title = this.$store.state.title;
  },
  computed: {
    parserDate: function(date) {
      var t = Date.parse(date);
      if (!isNaN(t)) {
        return new Date(Date.parse(date.replace(/-/g, "/")));
      } else {
        return new Date();
      }
    }
  },
  methods: {
    selectone(index) {
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
      console.log(value);
      this.sCity = value;
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
      Toast(`当前值：${value}, 当前索引：${index}`);
      console.log(value);
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
      console.log("选择机构");
      this.isSelectSite = !this.isSelectSite;
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
    getProduct() {
      let params = {
        sort: "updated"
      };
      // axios
      //   .get("./user", params)
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    submit() {
      console.log(
        "用户所填的数据" +
          this.sCity +
          this.sSite +
          this.userIdnumber +
          this.sDate +
          this.sTime
      );
      this.$router.push({
        path: "/finish"
      });
      // axios
      //   .get("./user", params)
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
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
#app {
  background-color: #f3f5f5;
}
.redborder {
  border: #fb3131 1px solid;
}
.product {
  padding: 0 0.2rem 0.2rem;
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
  margin-top: 0.1rem;
  border-radius: 0.1rem;
}

.particulars_title {
  color: #333;
  font-weight: bold;
  font-size: 0.28rem;
  text-indent: 0.1rem;
  border-left: solid #b07648 0.1rem;
  margin: 0.4rem 0;
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
  height: 6rem;
  overflow-y: auto;
}
</style>

