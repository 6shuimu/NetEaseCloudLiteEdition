<template>
  <!-- 动画 -->
  <div class="animation">
    <!-- 请求中时显示 -->
    <div class="Requesting_zho" v-show="props.Whether===2?true:false">
      <Requesting :fontsize="props.reload"></Requesting>
    </div>
    <!-- 请求失败时显示 -->
    <div class="ClickAgain_zho" v-show="props.Whether===0?true:false">
      <ClickAgain @flushed_click="Refresh_click" :fontsize="props.reload"></ClickAgain>
    </div>
  </div>
  
</template>

<script setup>

  // 导入数据显示加载组件
  import Requesting from '@/components/load/Requesting.vue'

  // 导入请求失败重新刷新组件
  import ClickAgain from '@/components/load/ClickAgain.vue'

  // 导入自适应加载函数
  import { Adaptive } from '@/encapsulation/Adaptive.js'

  // 接受显示数据
  let props = defineProps(['Whether','reload','judg'])

  // 创建自定义事件
  const emit = defineEmits(['refresh_zho'])

  // 触发自定义事件
  const Refresh_click = () => {
    emit('refresh_zho',props.judg)
  }

</script>

<style lang="less" scoped>
// 动画
.animation {
  width: 100%;
  height: 93%;
  display: flex;
  justify-content: center;
  align-items: center;

  // 请求中时显示
  .Requesting_zho {
  }

  // 请求失败时显示
  .ClickAgain_zho {
  }
}


</style>