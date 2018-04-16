<template>  
    <div id="details" class="padding03rem">
     <!-- <div class="title">
        <van-nav-bar
        title="内容详情"
        left-arrow 
        :fixed = true 
        @click-left="onClickLeft" 
      />
     </div> -->
      <div class="center" v-for="(item,index) in result" :key="index">
          <van-panel class="radius02rem" v-for="(lisitem,index) in item.list" :key="index" :title="lisitem.name" :status="lisitem.price">
            <div class="det-text" >{{lisitem.info}}</div>
          </van-panel>
      </div>
      
    </div>
</template>
<script>
import { Button } from "vant";
import axios from "../api/http";
export default {
  data() {
    return {
      result: []
    };
  },
  created() {
    this.result = this.$store.state.saveproduct;
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
#details {
  padding-bottom: 0.6rem;
}
.center {
  /* padding: 0 15px; */
  margin-top: 0.3rem;
  font-size: 0.24rem;
}

.det-text {
  margin: 0 0 0.2rem 0;
  padding: 0 0.3rem 0.4rem;
  line-height: 0.36rem;
}

/* .van-button {
  font-size: 14px;
  height: 40px;
} */
</style>

