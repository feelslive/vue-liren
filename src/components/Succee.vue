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
        <van-button @click="to_activate">去预约</van-button>
    </div>
</template>
<script>
export default {
  data() {
    return {};
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

</style>

