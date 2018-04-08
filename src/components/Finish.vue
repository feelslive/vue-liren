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
         
          <van-icon name="passed" />
           <h2>预约完成</h2>
           <span>您已成功预约，请您在预约日期到选定的机构完成诊疗项目</span>
           <router-link to="./" class="actbtnto"> 
            <van-button>确定</van-button>
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
  margin: 40px 0;
  text-align: center;
}
.van-icon-passed {
  font-size: 60px;
  color: #2fd26e;
}
</style>

