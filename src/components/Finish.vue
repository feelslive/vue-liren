<template>  
    <div id="finish">
        <div class="title">
            <van-nav-bar
            title="预约完成"
            left-text="返回"
            left-arrow 
            :fixed = true 
            @click-left="onClickLeft" 
          />
        </div>
        <div class="centent">
         
          <van-icon name="checked" />
           <h2>您已成功预约</h2>
           <p>请在预约日期到选定的机构完成诊疗项目</p>
           <router-link to="./" class="actbtnto"> 
            <van-button class="asbtn finishBtn radius1rem">确定</van-button>
          </router-link>
        </div>
        
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    }
  }
};
</script>
<style scoped>
.centent {
  margin: 2rem 0;
  text-align: center;
}
.centent h2 {
  font-size: 0.28rem;
  color: #333;
  margin: 0.4rem 0 0.3rem 0;
}
.centent p {
  font-size: 0.24rem;
  color: #666;
}
.finishBtn {
  margin-top: 3rem;
}
</style>

