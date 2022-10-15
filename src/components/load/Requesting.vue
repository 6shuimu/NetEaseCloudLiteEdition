<template>
  <!-- 数据加载中 -->
  <div class="Loading" ref="instance_Loading">
    <!-- 动画 -->
    <div class="animation_zho">
      <!-- 外圆 -->
      <div class="The_outer_circle"></div>
      <!-- 内圆 -->
      <div class="Inner_circle"></div>
    </div>
    <p class="Data_loading">数据加载中...</p>
  </div>
  
</template>

<script setup>
  // 导入vue
  import {
    onMounted,
    watch,
    ref,
  } from 'vue'
  
  // 接受父组件的值
  const props = defineProps(['fontsize'])

  // Loading实例
  const instance_Loading = ref(null)

  // 监听props.fontsize
  watch(
    ()=>props.fontsize,
    ()=>{
      conversion()
    }
  )

  // 单位换算并赋值
  const conversion = () => {
    instance_Loading.value.style = 'font-size:' + props.fontsize/61.75 + 'px'
  }

  // 初始触发
  onMounted(()=>{
    conversion()
  })
</script>

<style lang="less" scoped>
// 数据加载中
.Loading {

  // 动画
  .animation_zho {
    width: 10em;
    height: 10em;
    margin: 0 auto;
    position: relative;

    // 外圆
    .The_outer_circle {
      width: 10em;
      height: 10em;
      top: 0;
      left: 0;
      animation: load 7s infinite linear;
    }

    // 内圆
    .Inner_circle {
      width: 7em;
      height: 7em;
      top: 1.5em;
      left: 1.5em;
      animation: load 4s infinite linear;

      &::before {
        content: '';
        top: 1em;
        left: 1em;
        bottom: 1em;
        right: 1em;
        animation: load 3s infinite linear;
      }

      &::after {
        content: '';
        top: -1em;
        left: -1em;
        bottom: -1em;
        right: -1em;
        animation: load 5s infinite linear;
      }
    }

    // 共用属性
    .The_outer_circle,
    .Inner_circle,
    .Inner_circle::before,
    .Inner_circle::after {
      position: absolute;
      border-radius: 50%;
      border: 0.1em solid transparent;
      border-top-color: rgb(25, 22, 41);
    }
  }

  // 文字
  .Data_loading {
    width: 7em;
    font-size: 1.8em;
    text-align: center;
  }
}


// 动画
@keyframes load {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>