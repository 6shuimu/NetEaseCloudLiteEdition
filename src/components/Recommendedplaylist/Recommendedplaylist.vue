<template>
  <!-- 所有 -->
  <div class="zo" ref="instance_zo">
    <!-- 封面总体 -->
    <div class="Coveroverall" title="123">
      <!-- 下边栏 -->
      <div class="CO-Bottomsidebar">
        <!-- 播放次数 -->
        <div class="CO-B-frequency">
          <!-- 图标 -->
          <div class="iconfont icon-erji"></div>
          <!-- 文字 -->
          <span>{{props.Re_songs.playCount}}</span>
        </div>
        <!-- 播放图标 -->
        <div class="iconfont icon-bofang" title="播放"></div>
      </div>
    </div>
    <!-- 封面名字 -->
    <div class="zo-name">某某某</div>
  </div>
</template>

<script setup>
  // 导入vue
  import {
    nextTick,
    ref,
  } from 'vue'

  // 接受父组件的数据
  const props = defineProps(['Re_songs','img','name'])

  // Coveroverall的实例
  const instance_zo = ref(null)

  // 接受初始化的渲染数据
  const initialize = ref(null)
  
  // 将instance_zo转存到initialize
  nextTick(()=>{
    initialize.value = instance_zo.value
    dispose()
  })

  // 处理数据的函数
  const dispose = () => {
    initialize.value.children[0].attributes.title.value = props.name
    initialize.value.children[1].innerText = props.name
    initialize.value.children[0].style.background = 'url(' + props.img + ')'
    initialize.value.children[0].style.backgroundSize = '15vw,15vw'
  }

</script>

<style lang="less" scoped>
// 总
.zo {
  width: 15vw;
  height: 17vw;

  // 封面总体
  .Coveroverall {
    width: 15vw;
    height: 15vw;
    background: url('@/assets/暂时.jpg') no-repeat;
    background-size: 15vw 15vw;
    position: relative;
    cursor: pointer;
    display: inline-block;

    // 下边栏
    .CO-Bottomsidebar {
      width: 100%;
      height: 20%;
      background-color: rgba(42, 42, 42, 0.548);
      border-top: 0.1vw solid rgb(5, 5, 5);
      position: absolute;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.3vw;
      color: rgb(183, 178, 178);

      // 播放次数
      .CO-B-frequency {
        // 图标
        .icon-erji {
          display: inline-block;
          font-size: 1.2vw;
          margin-right: 0.2vw;
        }

        // 文字
        span {
          display: inline-block;
          font-size: 0.6vw;
        }
      }

      // 播放图标
      >.icon-bofang {
        font-size: 1.2vw;
        margin-right: 0.4vw;

        &:hover {
          color: #ccc;
        }
      }
    }
  }

  // 封面名字
  .zo-name {
    width: 100%;
    height: 1.5vw;
    line-height: 1.5vw;
    font-size: 1vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgb(80, 208, 224);
    text-align: center;
  }
}
</style>