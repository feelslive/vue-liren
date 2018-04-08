<template>  
    <div id="home">
      <div class="img">
        <img src="../../static/img/u341.png" alt="">
      </div>
      <div class="actbtn">
          <router-link to="./activate" class="actbtnto"> 
            <van-button>激活绑定</van-button>
          </router-link>
          <div class="tomake">
            <span>我已激活</span>
            <router-link to="./make">立即预约</router-link>
          </div>
      </div>
       
    </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.img {
  height: 200px;
  width: 100%;
}
.img img {
  width: 100%;
  height: 100%;
}
.actbtn {
  text-align: center;
  margin: 20px 0;
}
.van-button {
  width: 140px;
  height: 40px;
}
.actbtnto {
  display: inline-block;
}
.tomake {
  font-size: 14px;
  margin: 10px 0;
}
.tomake a {
  color: #169bd5;
}
</style>

