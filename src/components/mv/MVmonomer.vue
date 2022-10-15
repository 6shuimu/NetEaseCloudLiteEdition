<template>
  <!-- 总体 -->
  <div class="mov_All">
    <!-- 图片 -->
    <img :src="props.img" :title="props.name">
    <!-- 播放按钮 -->
    <div class="iconfont icon-bofang" title="播放"></div>
  </div>
  <!-- 标题 -->
  <div class="mov-text" :title="props.name">{{props.name}}</div>
</template>

<script setup>
// 接收父组件的数据
const props = defineProps(['mov','img','name'])
</script>

<style lang="less" scoped>
// 总体
.mov_All {
  display: inline-block;
  width: 20vw;
  height: 11vw;
  background-color: aliceblue;
  border: 0.05vw solid rgb(160, 157, 157);
  border-radius: 1vw;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  // 图片
  img {
    width: 20vw;
    height: 11vw;
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
    bottom: 3.75vw;
    right: 8vw;
  }

}

// 标题
  .mov-text {
    width: 20vw;
    height: 1.5vw;
    font-size: 1vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }
</style>