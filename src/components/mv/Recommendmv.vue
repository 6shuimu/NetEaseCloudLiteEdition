<template>
  <!-- 总体 -->
  <div class="mv-All">
    <!-- 图片 -->
    <img :src="props.img" :title="props.name">
    <!-- 播放按钮 -->
    <div class="iconfont icon-bofang" title="播放"></div>
  </div>
</template>

<script setup>
// 接收父组件的数据
const props = defineProps(['mv','img','name'])
</script>

<style lang="less" scoped>
// 总体
.mv-All {
  display: inline-block;
  width: 23vw;
  height: 13vw;
  background-color: aliceblue;
  border: 0.05vw solid rgb(160, 157, 157);
  border-radius: 1vw;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  // 图片
  img {
    width: 100%;
    height: 100%;
  }

  // 播放按钮
  .icon-bofang {
    position: absolute;
    bottom: 1vw;
    right: 1vw;
    font-size: 3vw;
    color: rgb(188, 188, 188);
    transition: all .4s;

    &:hover {
      color: rgb(255, 255, 255);
    }
  }

  &:hover .icon-bofang {
    bottom: 4.75vw;
    right: 9.85vw;
  }
}
</style>