<template>
  <div class="ClickAgain" ref="instance_ClickAgain">
    <p>数据加载失败!</p>
    <button @click="flushed">刷新</button>
  </div>

</template>

<script setup>
  // 导入vue事件
  import {
    onMounted,
    watch,
    ref,
  } from 'vue'
  // 注册自定义事件
  const emit = defineEmits(['flushed_click'])

  // ClickAgain实例
  const instance_ClickAgain = ref(null)

  // 接收父组件传的值
  const props = defineProps(['fontsize'])

  // 监听props.fontsize
  watch(
    ()=>props.fontsize,
    ()=>{
      conversion()
    }
  )

  // 单位换算并赋值
  const conversion = () => {
    instance_ClickAgain.value.style = 'font-size:' + props.fontsize/61.75 + 'px'
  }

  // 触发刷新点击事件
  const flushed = () => {
    emit('flushed_click')
  }

  // 初始触发
  onMounted(()=>{
    conversion()
  })

</script>

<style lang="less" scoped>
.ClickAgain {
  // font-size: 16px;
  width: 15em;
  height: 8em;
  text-align: center;

  p {
    font-size: 2em;
  }

  button {
    display: block;
    font-size: 1.3em;
    width: 4.3em;
    height: 2em;
    margin: 0 auto;
    margin-top: 0.5em;
    border-radius: 0.6em;
    cursor: pointer;
    background-color: rgba(212, 202, 202, 0.463);
    border: 0.06em solid rgb(1, 1, 1);
    
  }
}
</style>