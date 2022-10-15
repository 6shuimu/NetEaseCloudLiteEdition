<template>
  <!-- 总体 -->
  <div class="Pos-all">
    <!-- 歌手图片 -->
    <img :src="props.Pos.img1v1Url">
    <!-- 右侧 -->
    <div class="Pa-right">
      <!-- 歌手名 -->
      <div class="Pa-R-name">{{props.Pos.name}}</div>
      <!-- 简介 -->
      <div class="Pa-R-introduce">{{introduce_text}}</div>
    </div>
  </div>
</template>

<script setup>
// 导入vue
import {
  ref,
  onMounted,
} from 'vue'

// 导入axios
import { General } from '@/axios/index.js'

// 接收父组件的数据
const props = defineProps(['Pos'])

// 简介
const introduce_text = ref(null)

// 获得简介
const introduce = async () => {
  const temp = await General('/artist/detail',{ id:props.Pos.id})
  introduce_text.value = temp.data.data.artist.briefDesc
}

onMounted(()=>{
  introduce()
})
</script>

<style lang="less" scoped>
// 总体
.Pos-all {
  width: 25vw;
  height: 8vw;
  overflow: hidden;
  background-color: rgba(187, 190, 192, 0.493);
  border: 0.08vw solid rgb(176, 176, 176);
  border-radius: 1vw;
  cursor: pointer;

  // 图片
  >img{
    width: 8vw;
    height: 8vw;
    display: inline-block;
    border-radius: 1vw;
  }

  // 右侧
  .Pa-right {
    width: 16.84vw;
    height: 100%;
    display: inline-block;
    padding-left: 1vw;
    padding-top: 1.2vw;
    vertical-align: top;

    // 歌手名
    .Pa-R-name {
      font-size: 2vw;
      margin-bottom: 0.4vw;
      color: rgb(26, 26, 27);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 700;
    }

    // 简介
    .Pa-R-introduce {
      font-size: 1.5vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgb(190, 192, 193);
    }
  }

  &:hover {
    background-color: rgba(157, 158, 159, 0.568);
  }
}
</style>