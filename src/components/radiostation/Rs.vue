<template>
  <!-- 电台单个总体 -->
  <div class="Radio_single">
    <!-- 图片 -->
    <img :src="props.img">
    <!-- 右侧介绍 -->
    <div class="Rs-text">
      <!-- 电台名字 -->
      <div class="Rs-text-name" :title="props.name">{{props.name}}</div>
      <!-- 电台文案 -->
      <div class="Rs-text-copywriter">{{props.Copyname}}</div>
    </div>
  </div>
</template>

<script setup>
// 接受父组件的数据
const props = defineProps(['Rs','img','name','Copyname'])
</script>

<style lang="less" scoped>
// 电台单个总体
.Radio_single {
  width: 26vw;
  height: 10vw;
  background-color: rgba(143, 143, 143, 0.514);
  border-radius: 1vw;
  border: 0.07vw solid #ccc;
  display: flex;
  align-items: center;

  // 图片
  img {
    display: inline-block;
    width: 9.86vw;
    height: 9.86vw;
    border-radius: 1vw;
    cursor: pointer;
  }

  // 右侧介绍
  .Rs-text {
    display: inline-block;
    padding-left: 0.5vw;
    width: 15.5vw;
    
    // 电台名字
    .Rs-text-name {
      width: 100%;
      font-size: 1.6vw;
      color: rgb(18, 17, 17);
      font-weight: 700;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    // 电台文案
    .Rs-text-copywriter {
      width: 100%;
      margin-top: 0.6vw;
      font-size: 1.2vw;
      color: rgb(172, 172, 172);
    }

    .Rs-text-name,
    .Rs-text-copywriter {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>