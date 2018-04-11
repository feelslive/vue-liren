<template>  
    <div id="succee">
        <div class="title">
            <van-nav-bar
            title="激活成功"
            left-text="返回"
            left-arrow 
            :fixed = true 
            @click-left="onClickLeft" 
          />
        </div>


        <div class="sucbox">
            <div class="succes">
              <van-icon name="checked" />
              <h2>激活成功</h2>
              <p>恭喜您获得了以下产品服务</p>
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
              <span class="attention">注：请务必在产品有效期内使用，否则将视为放弃本产品</span>
              <van-button class="asbtn radius1rem" @click="to_activate">预约使用</van-button>  
            </div>
            
        </div>
        
        
    </div>
</template>
<script>
import axios from "../api/http";
export default {
  data() {
    return {
      result: []
    };
  },
  created() {
    axios
      .get("apis/liren/info/content")
      .then(res => {
        if (res.data.result.ret_code == "200") {
        }
        console.log(res.data.result);
        this.result = res.data.result;
        // console.log(this.result);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        path: "/"
      });
    },
    to_activate() {
      if (this.$store.state.isLogin == "100") {
        this.$router.push({
          path: "/make"
        });
      } else {
        this.$router.push({
          path: "/login"
        });
      }
    }
  }
};
</script>
<style scoped>
.succes {
  text-align: center;
  margin-top: 0.8rem;
}
.succes h2 {
  font-size: 0.28rem;
  color: #333;
  margin: 0.4rem 0 0.3rem 0;
}
.succes p {
  font-size: 0.24rem;
  color: #666;
}
.suc_textbox {
  margin-bottom: 0.2rem;
  margin-top: 0.76rem;
  background: #fff;
  border: #e0e5e5 0.01rem solid;
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
  border-left: solid #b07648 0.1rem;
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
</style>

