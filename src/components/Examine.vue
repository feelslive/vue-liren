<template>
<div class="ex_box padding03rem">
  <!-- <div class="title">
        <van-nav-bar
          title="预约详情"
          left-text="返回"
          left-arrow 
          :fixed = true 
           @click-left="onClickLeft" 
        />
    </div> -->
   <div class="examine" v-if="result">
    <div class="examineTitle">
      <div class="exa_tit">
          <div class="examine_title">产品详情</div>
      </div>
    </div>
    <!-- 产品详情 -->
    <div class="suc_textbox radius02rem" v-for="(item,index) in result" :key="index">
        <div class="succes_text">
            <div class="succes_text_title">{{item.name}}</div>
            <div class="succes_text_num">{{item.price}}</div>
        </div>
        <div class="suc_centent">
            
            <van-row class="suc_centent_list" v-for="(listitem,index) in item.list" :key="index">
              <van-col class="suc_centent_left" span="12">{{listitem.name}}</van-col>
              <van-col class="suc_centent_right" span="12">{{listitem.price}}</van-col>
            </van-row>
        </div>
        <div class="suc_date">
          <p>有效期：{{item.period}}</p>
        </div>
    </div>
     <div class="examineTitle">
      <div class="exa_tit">
          <div class="examine_title">预约信息</div>
      </div>
    </div>

    <!-- 预约信息 -->

     <div class="suc_textbox radius02rem">
       <van-cell-group class="ex_details">
        <van-cell class="radius02rem" title="诊疗机构：" value="北京市嘉瑞雅医疗美容门诊" />
        <van-cell class="radius02rem" title="机构地址：" value="北京市海淀区海淀大街18号佳美国际B坐2306室" />
        <van-cell class="radius02rem" title="预约时间：" value="2018-04-25 上午" />
      </van-cell-group>
     </div>
     <div class="examineTitle">
      <div class="exa_tit">
          <div class="examine_title">投保信息</div>
      </div>
    </div>
    <!-- 投保信息 -->
     <div class="suc_textbox radius02rem">
       <van-cell-group class="ex_details">
        <van-cell class="radius02rem" title="被保人：" value="王超" />
        <van-cell class="radius02rem" title="保障期限：" value="2018-05-25至2019-05-24" />
        <div style="text-align: center;height:.5rem;line-height:.6rem;font-size:.28rem"><router-link to="./" class="blue" >查看保单详情</router-link></div>
      </van-cell-group>
     </div>
  </div>


  <div class="no_examine centent" v-else>

     <van-icon name="warn" />
      <h3 class="make_title_alert">您还未预约诊疗项目</h3>
      <router-link to="./make" class="actbtnto"> 
      <van-button class="asbtn makeBtn radius1rem">立即预约</van-button>
    </router-link>
  </div>
</div>
 
</template>
<script>
//liren/card/appointlist?cellphone=15510525668
import { mapMutations, mapState } from "vuex";
import * as types from "../store/types";
import axios from "../api/http";
export default {
  data() {
    return {
      userphone: 15510525668
    };
  },
  created() {
    this.getproduct();
    axios
      .get("apis/liren/card/appointlist", {
        params: {
          cellphone: this.userphone
        }
      })
      .then(res => {
        // console.log(res);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  computed: mapState({
    result(state) {
      return state.result;
    }
  }),
  methods: {
    ...mapMutations({
      getproduct: "getproduct"
    }),
    onClickLeft() {
      this.$router.push({ path: "./" });
    }
  }
};
</script>
<style socped>
.examine {
  padding-bottom: 0.3rem;
}
.examineTitle {
  margin-top: 0.1rem;
  overflow: hidden;
}
.exa_tit {
  height: 0.58rem;
  padding-top: 0.3rem;
}
.examine_title {
  color: #333;
  font-weight: bold;
  font-size: 0.28rem;
  text-indent: 0.1rem;
  border-left: solid #b07648 0.1rem;
  /* margin-bottom: 0.3rem; */
  padding-top: 0.04rem;
}
.suc_textbox {
  background: #fff;
  border: #f3f5f5 0.2rem solid;
}
.succes_text {
  overflow: hidden;
  border-bottom: #e0e5e5 0.01rem solid;
  padding: 0.3rem 0.4rem;
}

.succes_text_title {
  color: #333;
  text-align: left;
  font-weight: bold;
  font-size: 0.28rem;
  text-indent: 0.1rem;
  float: left;
}
.succes_text_num {
  font-size: 0.28rem;
  color: #fb3131;
  float: right;
}
.suc_date {
  text-align: center;
  font-size: 0.24rem;
  border-top: #e0e5e5 0.01rem solid;
  height: 0.8rem;
  line-height: 0.8rem;
}
.suc_centent {
  padding: 0.15rem 0.4rem;
}
.suc_centent_list {
  margin: 0.15rem 0;
}
.suc_centent_left {
  text-align: left;
}
.suc_centent_right {
  text-align: right;
}

.ex_details {
  padding: 0.3rem;
}

.no_examine {
  font-family: "微软雅黑";
  margin: 1.8rem 0;
  text-align: center;
}

.no_examine h3 {
  font-size: 0.28rem;
  color: #333;
  margin-top: 0.2rem;
}
.no_examine h3.make_title_alert {
  margin-top: 0.5rem;
}

.makeBtn {
  margin-top: 2.8rem;
}
</style>

