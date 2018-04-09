<template>  
    <div id="NotActivate">
        <div class="title">
            <van-nav-bar
            title="预约诊疗"
            left-text="返回"
            left-arrow 
            :fixed = true 
            @click-left="onClickLeft" 
          />
        </div>
        <div class="centent">
          <van-icon name="info-o" />
           <h2>您还未激活绑定诊疗项目产品，请先激活后再预约</h2>
           <router-link to="./activate" class="actbtnto"> 
            <van-button>立即激活</van-button>
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

</style>

