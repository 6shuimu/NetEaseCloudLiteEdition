<template>
  <!-- 单个歌手总 -->
  <div class="Single_singer">
    <!-- 图片 -->
    <img :src="props.img" :title="props.name + '的音乐'">
    <!-- 下侧栏 -->
    <div class="Bottom_sidebar">
      <!-- 歌手名 -->
      <div class="BS_text" :title="props.name + '的音乐'">{{props.name}}</div>
      <!-- 图标 -->
      <div class="iconfont icon-geren" :title="props.name + '的个人主页'"></div>
    </div>
  </div>
</template>

<script setup>
// 接受父组件的数据
const props = defineProps(['singer','img','name'])
</script>

<style lang="less" scoped>
// 单个歌手总
.Single_singer {
  width: 10vw;
  height: 12vw;
  display: inline-block;

  // 图片
  img {
    float: left;
    width: 10vw;
    height: 10vw;
    cursor: pointer;
  }

  // 下侧栏
  .Bottom_sidebar {
    float: left;
    width: 10vw;
    height: 2vw;
    font-size: 1.2vw;
    display: flex;
    justify-content: center;
    align-items: center;

    // 歌手名
    .BS_text {
      width: 8.8vw;
      height: 2vw;
      line-height: 1.8vw;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    // 图标
    .icon-geren {
      width: 1.2vw;
      height: 1.2vw;
      font-size: 1.2vw;
      margin-right: 0.2vw;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
</style>
