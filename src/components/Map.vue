<template>
  <div class="map">
      <div id="allmap"></div>
  </div>
</template>
<script>
// import BMap from "BMap";
export default {
  data() {
    return {};
  },
  mounted() {
    this.ready();
  },
  methods: {
    ready: function() {
      //   var map = new BMap.Map("allmap");
      //   var point = new BMap.Point(108.840053, 34.129522);
      //   map.centerAndZoom(point, 10);
      //   map.addControl(new BMap.MapTypeControl());
      //   map.enableScrollWheelZoom(true);
      //   map.enableDoubleClickZoom(true);
      //   var marker = new BMap.Marker(point);
      //   map.addOverlay(marker);

      //   map.centerAndZoom(point, 15);

      var map = new BMap.Map("allmap"); // 创建Map实例
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
      //添加地图类型控件
      map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP]
        })
      );
      map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    }
  }
};
</script>
<style>
.map {
  /* border: 1px solid #000000; */
}
#allmap {
  width: 100%;
  height: 600px;
  position: static !important;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
}
</style>

