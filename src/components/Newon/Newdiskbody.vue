<template>
  <!-- 总体 -->
  <div class="collectivity" ref="CLL">
    <!-- 封面体 -->
    <div class="C-Coverbody" @mouseover="Movein('显示')" @mouseout="Movein('隐藏')" title="文字">
      <!-- 图片 -->
      <div class="CC-Image"></div>
      <!-- 播放按钮 -->
      <div class="iconfont icon-bofang CC-buttom" title="播放"></div>
    </div>

    <!-- 文字 -->
    <p class="C-word">文字</p>

    <!-- 作者名 -->
    <p class="C-Author_name">作者名</p>
  </div>
</template>

<script setup>
// 导入vue
import{
  ref,
  onMounted,
} from 'vue'

// 获得总体实例
const CLL = ref(null)

// 鼠标移入显示播放按钮
function Movein(it) {
  if(it === '显示') {
    CLL.value.children[0].children[1].style.display = 'block'
  }else if(it === '隐藏') {
    CLL.value.children[0].children[1].style.display = 'none'
  }
}

// 接受父组件的数据
const props = defineProps(['Newdiscs','img','name','Authname'])

 // 处理数据的函数
const dispose = () => {
  CLL.value.children[1].innerText = props.name
  CLL.value.children[2].innerText = props.Authname
  CLL.value.children[0].attributes.title.value = props.name
  CLL.value.children[0].style.background = 'url(' + props.img + ')'
  CLL.value.children[0].style.backgroundSize = '10vw,10vw'
}

onMounted(()=>{
  dispose()
})

</script>

<style lang="less" scoped>
  // 总体
  .collectivity {
    width: 10.7vw;
    height: 12.7vw;
    display: inline-block;
    margin-right: 1vw;
    cursor: pointer;

    // 封面体
    .C-Coverbody {
      width: 10vw;
      height: 10vw;
      background: url('@/assets/暂时.jpg') no-repeat;
      background-size: 10vw,10vw;
      position: relative;

      // 图片
      .CC-Image {
        width: 11.7vw;
        height: 10vw;
        background: url('../../assets/coverall.png') no-repeat;
        background-position: -0.07vw -65.24vw;
        background-size: 29.31vw;
        position: absolute;
        top: 0;
        left: 0;
      }

      // 播放按钮
      .CC-buttom {
        position: absolute;
        bottom: 0.5vw;
        right: 0.5vw;
        color: #ccc;
        font-size: 2vw;
        cursor: pointer;
        display: none;
      }
    }

    // 文字
    .C-word {
      width: 100%;
      height: 1.5vw;
      line-height: 1.5vw;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      &:hover {
        text-decoration: underline;
      }
    }

    // 作者名
    .C-Author_name {
      width: 100%;
      height: 1.2vw;
      font-size: 1vw;
      line-height: 1.2vw;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>