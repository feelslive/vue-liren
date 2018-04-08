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
         <van-icon name="passed" />
        <router-link to="./make" class="actbtnto"> 
            <van-button>去预约</van-button>
          </router-link>
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

