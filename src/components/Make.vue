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

      <div class="product">


      </div>
      <router-link to="./Details">查看详情</router-link>
      <router-link to="./finish" class="actbtnto"> 
            <van-button>确认预约</van-button>
      </router-link>
      
      <div @click="logout">退出</div>

    </div>
</template>
<script>
import * as types from "../store/types";
import axios from "../api/http";
export default {
  data() {
    return {
      title: ""
    };
  },
  created() {
    this.getProduct();
  },
  mounted() {
    this.title = this.$store.state.title;
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
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
        path: "/"
      });
    }
  }
};
</script>
<style scoped>

</style>

