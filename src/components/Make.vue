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

      <div class="product" v-if="shows">
        <van-button @click.native="selectCity">选择城市</van-button>
        <van-button @click.native="selectDate">选择时间</van-button>
        <router-link to="./Details">查看详情</router-link>
        

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
            title="选择城市"
            :columns="columns"
            @cancel="Cancelcity"
            @confirm="Confirmcity" 
            @change="Changecity" 
          />
        </van-popup>
        <!-- 选择时间 -->
        <van-popup v-model="isSelectDate" position="bottom" :overlay="true">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            @cancel="CancelDate"
            @confirm="ConfirmDate" 
            @change="ChangeDate" 
          />
        </van-popup>
        <router-link to="./finish" class="actbtnto"> 
              <van-button>确认预约</van-button>
        </router-link>
      </div>

      <!-- 没有激活产品 -->
      <div class="centent" v-else>
          <van-icon name="info-o" />
           <h2>您还未激活绑定诊疗项目产品，请先激活后再预约</h2>
           <router-link to="./activate" class="actbtnto"> 
            <van-button>立即激活</van-button>
          </router-link>
      </div>
      
      <div @click="logout">退出</div>

    </div>
</template>
<script>
import * as types from "../store/types";
import axios from "../api/http";
import { Toast } from "vant";
const citys = {
  北京: ["朝阳", "海淀", "东城", "西城", "丰台"],
  天津: ["福州", "厦门", "莆田", "三明", "泉州"]
};
export default {
  data() {
    return {
      title: "",
      isSelectCity: false,
      isSelectDate: false,
      shows: true,
      radio: "1",
      pickerVisible: "",
      currentDate: new Date(),
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
      ]
    };
  },
  created() {
    this.getProduct();
  },
  mounted() {
    this.title = this.$store.state.title;
  },
  methods: {
    Confirmcity(value, index) {
      this.isSelectCity = !this.isSelectCity;
      Toast(`当前值：${value}, 当前索引：${index}`);
      console.log(value);
    },
    Cancelcity() {
      this.isSelectCity = !this.isSelectCity;
      Toast("取消");
    },
    Changecity(picker, values) {
      picker.setColumnValues(1, citys[values[0]]);
    },
    ConfirmDate(value, index) {
      this.isSelectDate = !this.isSelectDate;
      Toast(`当前值：${value}, 当前索引：${index}`);
      console.log(value);
    },
    CancelDate() {
      this.isSelectDate = !this.isSelectDate;
      Toast("取消");
    },
    ChangeDate(picker) {
      console.log(picker.getValues());
    },
    selectCity() {
      console.log("选择城市");
      this.isSelectCity = !this.isSelectCity;
    },
    selectDate() {
      this.isSelectDate = !this.isSelectDate;
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
    logout() {
      this.$store.commit(types.LOGOUT);
      this.$router.push({
        path: "/login"
      });
    }
  },
  components: {}
};
</script>
<style scoped>
.ctiy_picker {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>

