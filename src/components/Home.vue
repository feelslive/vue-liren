<template>  
    <div id="home">
      <div class="img radius02rem">
        <img class="radius02rem" src="../../static/img/banner@2x.png" alt="">
      </div>
      <div class="actbtn">
        <van-row gutter="20">
          <van-col span="12">
            <div class="toactivation radius02rem">
             <router-link to="./activate">激活绑定<i class="activ_icon"></i> </router-link>
          </div>
          </van-col>
          <van-col span="12">
            <div class="toactivation radius02rem"> 
            <router-link to="./make">立即预约<i class="subsc_icon"></i></router-link>
          </div>
          </van-col>
        </van-row>
      </div>
      <div class="particulars">
        <div class="particulars_title">内容详情</div>
        <div class="center">
          <van-panel class="radius02rem" v-for="(item,index) in dets" :key="index" :title="item.title">
            <div class="det-text">{{item.details}}</div>
          </van-panel>
        </div>
      </div>
       
    </div>
</template>
<script>
import axios from "../api/http";
export default {
  data() {
    return {
      dets: [
        {
          title: "韩国大气泡",
          status: "380/1次",
          details:
            "韩国大气泡毛孔是角质吸进管内，从螺旋形突出物内流出乳液的形式。不仅采用真空负压还将大气泡和独家配方营养液综合作用，完全不伤肌肤深层清洁+补充营养的同时还能提升肌肤，其高频率雾化震动，能使水分子迅速分解，为肌肤注入充足氧气并渗透至基底层补水。"
        },
        {
          title: "韩国无针水光",
          status: "1680/1次",
          details:
            "水光进入能让皮肤变得水润，光亮而得名，利用独有针头将营养液注入皮肤真皮层，深度补充肌肤所需养分，改善肤色、收缩毛孔、驱除皱纹，白皙Q弹，终结暗沉、色斑、细纹等问题。"
        },
        {
          title: "光子嫩肤",
          status: "3800/1次",
          details:
            "光子嫩肤是价值100多万的辉煌360仪器，采用不同波长的激光和光子脉冲强光对皮肤进行一种美容性质的治疗，它可以消除/减淡皮肤各种色素斑、增强皮肤弹性，消除细小皱纹等一系列问题。"
        },
        {
          title: "冰点脱毛（腋下+唇部）",
          status: "1760/1次",
          details:
            "冰点脱毛是由以色列飞顿公司独家专利推出，目前最先进的一种激光脱毛方法，依据选择性光热作用，利用半导体激光穿透皮肤表层使毛囊保持一定温度，温和地使毛囊失去活性，达到永久脱毛的目的。"
        },
        {
          title: "皮肤检测",
          status: "380/1次",
          details:
            "通过拍摄一张面部肌肤图片，瞬间分析出油份、水分、色素、毛孔、弹性、及皮肤胶原蛋白纤维的准确数据，且自动弹出对话框，推荐出相关的平衡油脂的产品，所有项目分析完之后，会生成皮肤检测报告，以便于针对性皮肤管理计划。"
        },
        {
          title: "意外身故或麻醉意外身故",
          status: " 6万",
          details:
            "手术意外身故指实施手术过程中发生的由于患者的病情或患者体质的特殊性而发生难以预料和防范的不良后果；麻醉意外是指正常施行医疗手术麻醉时出现的由于该麻醉造成的意外反应。"
        }
      ]
    };
  },
  created() {
    axios
      .get("apis/liren/info/content")
      .then(res => {
        console.log(res.data.result);
        // this.result = res.data.result;
        // console.log(this.result);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.img {
  margin-top: 0.2rem;
  height: 3.2rem;
  width: 100%;
}
.img img {
  width: 100%;
  height: 100%;
}
.toactivation {
  height: 1.5rem;
  border: 0.01rem solid #b07648;
}
.toactivation a {
  display: inline-block;
  width: 100%;
  height: 100%;
  color: #b07648;
  font-size: 0.24rem;
  font-weight: bold;
  line-height: 1.5rem;
}
.toactivation a i {
  display: inline-block;
  width: 0.88rem;
  height: 0.66rem;
  background-size: 100%;
  vertical-align: middle;
  margin-left: 0.3rem;
}
.activ_icon {
  background: url("../../static/img/activation@2x.png") center;
}
.subsc_icon {
  background: url("../../static/img/subscribe@2x.png") center;
}
.actbtn {
  text-align: center;
  margin: 0.4rem 0;
}

.particulars_title {
  color: #333;
  font-weight: bold;
  font-size: 0.28rem;
  text-indent: 0.1rem;
  border-left: solid #b07648 0.1rem;
  margin-bottom: 0.3rem;
}

.center {
  /* padding: 0 15px; */
  margin-top: 0.2rem;
  font-size: 0.24rem;
  padding-bottom: 0.6rem;
}

.center .van-panel__header {
  padding: 0.2rem 0 !important;
}
.van-hairline--bottom::after {
  border-bottom-width: 0;
}
.van-hairline--top-bottom::after {
  border-width: 0 0;
}
.det-text {
  font-size: 0.24rem;
  color: #666;
  margin: 0 0 0.2rem 0;
  padding: 0.2rem 0.3rem 0.4rem 0.3rem;
  line-height: 0.36rem;
}
</style>

