<template>
  <div class="map" :style="{height:ch,width:wh}">
      <div id="allmap" :style="{height:ch,width:wh}"></div>
  </div>
</template>
<script>
import BMap from "BMap";
export default {
  data() {
    return {
      ch: "10"
    };
  },
  created() {
    this.ch = window.innerHeight + "px";
    this.wh = window.innerWidth + "px";
    // document.querySelector("#app").style.padding = 0;

    // console.log(this.ch);
  },
  mounted() {
    this.ready();
    // document.querySelector("#app").style.padding = 0;
    // console.log(document.querySelector("#app").style);
    //39.9152478931,116.4038206839
  },
  methods: {
    ready: function() {
      var lat = this.$store.state.lonandlet[1]; //经度
      var log = this.$store.state.lonandlet[0];
      console.log(log);
      console.log(lat);
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(log, lat);
      map.centerAndZoom(point, 10);
      map.addControl(new BMap.MapTypeControl());
      map.enableScrollWheelZoom(true);
      map.enableDoubleClickZoom(true);
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);

      map.centerAndZoom(point, 15);
    }
  }
};
</script>
<style scoped>
.map {
}
#allmap > div {
}
</style>

