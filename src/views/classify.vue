<template>
  <!-- 总体 -->
  <div class="total">
    <!-- 左侧导航栏 -->
    <div class="navigation" ref="instance_Na">
      <ul>
        <!-- 歌手分类列表 -->
        <li class="Na-click" @click="ul_li_click">歌手</li>
        <!-- 歌单分类 -->
        <li @click="ul_li_click">歌单</li>
        <!-- 全部mv -->
        <li @click="ul_li_click">mv</li>
        <!-- 热门电台 -->
        <li @click="ul_li_click">电台</li>
      </ul>
    </div>
    <!-- 右侧内容区 -->
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
// 导入vue
import { nextTick, onMounted, ref, unref } from 'vue'

// 导入router
import { useRoute, useRouter } from 'vue-router'

// 导入公共函数
import { Clear_the_style } from '@/encapsulation/Adaptive.js'

// 创建$route和$router
const $route = useRoute();
const $router = useRouter();

// 左侧导航栏的实例
const instance_Na = ref(null)

// 定义改变左侧导航栏的颜色函数
async function ul_li_color(e) {
  for(let key of instance_Na.value.children[0].children) {
    await Clear_the_style(key)
  }

  // 为点击赋予样式
  e.target.className = 'Na-click'
}

// 跳转到各自页面
function Jump_Around(name) {
  $router.push({
    path:name,
  })
}

// 点击左侧导航栏
function ul_li_click(e) {
  ul_li_color(e)
  if(e.target.innerText === '歌手') {
    Jump_Around('/classify/singer')
  }
  if(e.target.innerText === '歌单') {
    Jump_Around('/classify/Playlist')
  }
  if(e.target.innerText === 'mv') {
    Jump_Around('/classify/Mv')
  }
  if(e.target.innerText === '电台') {
    Jump_Around('/classify/RadioStation')
  }
}

// 改变样式
function Change_style(name,stylename) {
  for(let key of instance_Na.value.children[0].children) {
    if(key.innerText === name) {
      key.className = stylename
      break
    }
  }
}

// 刷新时保持原样式
async function Judge_navigation() {
  for(let key of instance_Na.value.children[0].children) {
    await Clear_the_style(key)
  }
  const url = location.hash.replace('#','')
  if(url === '/classify/singer') {
    Change_style('歌手','Na-click')
  }
  if(url === '/classify/Playlist') {
    Change_style('歌单','Na-click')
  }
  if(url === '/classify/Mv') {
    Change_style('mv','Na-click')
  }
  if(url === '/classify/RadioStation') {
    Change_style('电台','Na-click')
  }
}

onMounted(()=>{
  Judge_navigation()
})
</script>

<style lang="less" scoped>
// 总体
.total {
  width: 100%;
  height: 100%;

  // 左侧导航栏
  .navigation {
    width: 8%;
    height: 100%;
    background-color: rgba(125, 126, 127, 0.571);
    border-radius: 0.3vw;
    border: 0.07vw solid #ccc;
    display: inline-block;
    overflow: hidden;

    ul {
      width: 100%;

      li {
        width: 100%;
        height: 3vw;
        font-size: 1.3vw;
        text-align: center;
        line-height: 3vw;
        cursor: pointer;
        color: rgb(61, 38, 7);
        border-bottom: 0.07vw solid rgb(145, 141, 141);
        background-color: rgba(101, 100, 100, 0.29);
        transition: all .2s;

        &:hover {
          color: rgb(165, 167, 44);
          background-color: rgba(131, 124, 124, 0.29);
        }
      }

      // 左侧列表点击样式
      .Na-click {
        color: rgb(165, 167, 44);
        background-color: rgba(131, 124, 124, 0.29);
      }
    }
  }
  // 右侧内容区
  .right-content {
    display: inline-block;
    width: 91.9%;
    height: 100%;
    background-color: rgba(125, 126, 127, 0.571);
    border-radius: 0.3vw;
    border: 0.07vw solid #ccc;
    margin-left: 0.1%;
    vertical-align: top;
  }
}

</style>