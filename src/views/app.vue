<template>

  <!-- 导航栏 -->
  <div class="NavBar">
    <!-- 导航栏具体内容 -->
    <ul ref="instance_ul">
      <li>
        <a href="javascript:;" class="Navigation_bar" @click="recommend_click">推荐</a>
      </li>
      <li><a href="javascript:;" @click="classify_click">分类</a></li>
      <li><a href="javascript:;" @click="Mymusic_click">我的音乐</a></li>
    </ul>
    <!-- 登录 -->
    <div class="login">登录</div>
  </div>

  <!-- 左侧栏 -->
  <div class="Leftcolumn" ref="Leftcolumn">
    <!-- 左侧内容 -->
    <div class="LCL-Leftcontent">
      <!-- 上半部分按钮 -->
      <div class="LCL-Lc-buttom" ref="instance_Lc_buttom">
        <!-- 收藏 -->
        <div class="iconfont icon-shoucang Bookmarkclicks" @click="collection_click" title="收藏"></div>
        <!-- 正在播放 -->
        <div class="iconfont icon-bofang" @click="Play_click" title="正在播放"></div>
        <!-- 历史记录 -->
        <div class="iconfont icon-bofangjilu" @click="History_click" title="历史记录"></div>
      </div>
      <!-- 点击了按钮之后的内容 -->
      <div class="LCL-Lc-content" ref="instance_content">
        <div class="LCL-Lc-C-collection">收藏</div>
        <div class="LCL-Lc-C-Play">播放</div>
        <div class="LCL-Lc-C-Recording">记录</div>
      </div>
    </div>
    <!-- 右侧按钮 -->
    <div class="LCL-Rightbutton">
      <div :class="shosuo" @click="LCL_RB_buttonsj" ref="LCL_RB_button"></div>
    </div>
  </div>

  <!-- 内容区 -->
  <div class="Contentarea">
    <router-view></router-view>
  </div>

  <!-- 播放器 -->
  <player></player>

</template>

<script setup>
  import { ref,reactive,onMounted } from 'vue'
  import { useRouter,useRoute } from 'vue-router';

  // 导入播放器组件
  import Player from '../components/Player.vue'
  
  // 创建$route和$router
  const $route = useRoute();
  const $router = useRouter();

  // 储存收缩类名的响应式数据对象
  let shosuo = reactive({
    'iconfont icon-zuocedakai':true,
    'iconfont icon-xiangzuoshouqi':false
  })

  // 创建一个空的ref储存左侧内容的实例
  const Leftcolumn = ref(null)

  // 创建一个空的ref储存右侧按钮的实例
  const LCL_RB_button = ref(null)

  // 点击左侧栏按钮展开
  function LCL_RB_buttonsj() {
    if(Leftcolumn.value.style.left !== '0vw') {
      // 更改left的距离
      Leftcolumn.value.style.left = '0vw'
      // 更改按钮的反向
      shosuo['iconfont icon-zuocedakai'] = false
      shosuo['iconfont icon-xiangzuoshouqi'] = true
    }else {
      // 更改left的距离
      Leftcolumn.value.style.left = '-21.515vw'
      // 更改按钮的反向
      shosuo['iconfont icon-zuocedakai'] = true
      shosuo['iconfont icon-xiangzuoshouqi'] = false
    }
  }

  // 获取ul的实例
  const instance_ul = ref(null)

  // 定义改变导航栏的颜色函数
  function Navigation_color(name) {
    for(let key of instance_ul.value.children) {
      key.children[0].className = ''
      if(name === key.children[0].innerText) {
        key.children[0].className = 'Navigation_bar'
      }
    }
  }

  // 点击推荐跳转
  function recommend_click () {
    // 跳转推荐
    $router.push({
      path: '/recommend',
    })
    Navigation_color('推荐')
  }

  // 点击分类跳转
  function classify_click() {
    if(location.hash.replace('#','').split('/').splice(0,2).join('/') === '/classify') return
    // 跳转分类
    $router.push({
      path: '/classify'
    })
    Navigation_color('分类')
  }

  // 点击我的音乐跳转
  function Mymusic_click() {
    // 跳转热门
    $router.push({
      path: '/Mymusic'
    })
    Navigation_color('我的音乐')
  }

  // 创建一个空的ref储存左侧按钮的实例
  const instance_Lc_buttom = ref(null)

  // 创建一个空的ref储存左侧按钮内容的实例
  const instance_content = ref(null)

  // 定义改变左侧栏里的上侧按钮的颜色函数
  function Top_button_color(e) {
    // 去除掉所有Bookmarkclicks
    for(let key of instance_Lc_buttom.value.children) {
      let temp = key.className.split(' ')
      const does_not_exist = temp.indexOf('Bookmarkclicks')
      if(does_not_exist !== -1) {
        temp.splice(Number(does_not_exist),1)
        key.className = temp.join(' ')
      }
    }
    // 为点击的按钮添加Bookmarkclicks
    for(const key of instance_Lc_buttom.value.children) {
      if(e.target.classList[1] === key.classList[1]) {
        let temp = key.className.split(' ')
        temp.push('Bookmarkclicks')
        key.className = temp.join(' ')
        break
      }
    }
  }

  // 定义改变左侧栏里的上侧按钮的显示内容函数
  function Top_button_content(e) {
    
    // 隐藏所有按钮的内容
    for(let key of instance_content.value.children) {
      key.style.display = 'none'
    }

    // 显示点击按钮所在的内容
    for(let key of instance_content.value.children) {
      // 判断收藏
      if(e.target.classList[1] === 'icon-shoucang') {
        // 判断是否为收藏所在的内容class:LCL-Lc-C-collection
        if(key.classList[0] === 'LCL-Lc-C-collection') {
          key.style.display = 'block'
          break  
        }
      }

      // 判断播放
      if(e.target.classList[1] === 'icon-bofang') {
        // 判断是否为播放所在的内容class:LCL-Lc-C-Play
        if(key.classList[0] === 'LCL-Lc-C-Play') {
          key.style.display = 'block'
          break  
        }
      }

      // 判断历史记录
      if(e.target.classList[1] === 'icon-bofangjilu') {
        // 判断是否为历史记录所在的内容class:LCL-Lc-C-Recording
        if(key.classList[0] === 'LCL-Lc-C-Recording') {
          key.style.display = 'block'
          break  
        }
      }
    }
  }

  // 点击收藏按钮
  function collection_click(e) {
    // 调用改变颜色的函数
    Top_button_color(e)
    // 调用改变显示内容的函数
    Top_button_content(e)
  }

  // 点击播放按钮
  function Play_click(e) {
    // 调用改变颜色的函数
    Top_button_color(e)
    // 调用改变显示内容的函数
    Top_button_content(e)
  }

  // 点击历史记录按钮
  function History_click(e) {
    // 调用改变颜色的函数
    Top_button_color(e)
    // 调用改变显示内容的函数
    Top_button_content(e)
  }

  // 判断是在那个导航里
  function Judge_navigation() {
    const url = location.hash.replace('#','').split('/').splice(0,2).join('/')
    if(url === '/recommend') {
      Navigation_color('推荐')
    }else if(url === '/classify') {
      Navigation_color('分类')
    }else if(url === '/Mymusic') {
      Navigation_color('我的音乐')
    }
  }

onMounted(()=>{
  Judge_navigation()
})

</script>

<style lang="less" scoped>
// 导航栏
.NavBar {
  width: 100%;
  height: 3vw;
  line-height: 3vw;
  text-align: center;
  box-shadow: 0 0.1vw 0.7vw rgba(255, 255, 255, .3);
  background-color: rgba(63, 62, 62, 0.543);
  backdrop-filter: blur(0.12vw);
  border-radius: 0.6vw;
  border: 0.1vw solid rgba(72, 69, 69, 0.5);
  font-size: 1.2vw;

  // 导航栏具体内容
  ul {
    width: 20.9vw;
    height: 100%;
    display: inline-block;

    li {
      float: left;
      width: 33.3%;
      height: 100%;

      a {
        display: block;
        width: 100%;
        height: 100%;

        &:hover {
          border-bottom: 0.1vw solid rgba(219, 236, 240, 0.71);
          color: rgba(235, 152, 117, 0.71);
        }
      }
    }
  }

  // 登录
  .login {
    float: right;
  }

}

 // 左侧栏
.Leftcolumn {
  width: 22.93vw;
  height: 42.39vw;
  position: absolute;
  top: 3vw;
  left: -21.515vw;
  display: flex;
  align-items: center;
  transition: left .5s;
  z-index: 1;

  // 左侧内容
  .LCL-Leftcontent {
    width: 94%;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-size: 1.2vw;

    // 上半部分按钮
    .LCL-Lc-buttom {
      display: flex;
      width: 100%;
      height: 2.8vw;
      color: blueviolet;
      background-color: rgba(34, 34, 33, 0.843);
      backdrop-filter: blur(0.12vw);
      border-radius: 0.6vw;
      border: 0.1vw solid rgba(72, 69, 69, 0.5);

      >div {
        width: 3.5vw;
        height: 2.8vw;
        display: inline;
        text-align: center;
        line-height: 2.8vw;
        font-size: 2vw;
        cursor: pointer;
        position: relative;

        &:hover {
          color: rgba(235, 152, 117, 0.71);
        }
      }
      // 图标
      .iconfont {
        font-size: 1.6vw;
      }
    }

    // 按钮内容
    .LCL-Lc-content {
      width: 100%;
      height: 39.59vw;
      background-color: rgba(34, 34, 33, 0.843);
      backdrop-filter: blur(0.12vw);
      border-radius: 0.6vw;
      border: 0.1vw solid rgba(72, 69, 69, 0.5);

      >div{
        &:first-child {
          display: block;
        }
      }

      // 收藏
      .LCL-Lc-C-collection {
        display: none;
      }

      // 播放
      .LCL-Lc-C-Play {
        display: none;
      }

      // 记录
      .LCL-Lc-C-Recording {
        display: none;
      }
    }
  }

  // 右侧按钮
  .LCL-Rightbutton {
    width: 6%;
    height: 2.8vw;
    background-color: rgba(105, 102, 102, 0.377);
    text-align: center;
    line-height: 2.8vw;
    border-radius: 0 3vw 3vw 0;
    position: relative;

    // 图标
    .iconfont {
      font-size: 1vw;
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: -1.4vw;
      width: 1.4vw;
      height: 1.4vw;
      background-color: transparent;
      background-image: radial-gradient(circle at 100% 0%,transparent 1.8vw,rgba(105, 102, 102, 0.377) 0);
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 2.8vw;
      width: 1.4vw;
      height: 1.4vw;
      background-color: transparent;
      background-image: radial-gradient(circle at 100% 100%,transparent 1.8vw,rgba(105, 102, 102, 0.377) 0);
    }
  }

}

// 内容区
.Contentarea {
  width: 100%;
  height: 42vw;
  background-color: rgba(63, 63, 60, 0.543);
  backdrop-filter: blur(0.12vw);
  border-radius: 0.6vw;
  border: 0.1vw solid rgba(72, 69, 69, 0.5);
  padding: 0.3vw;
  overflow: auto;

  // 滚动条样式
  &::-webkit-scrollbar {
    width: 0.3vw;
    height: 100%;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10vw;
    background: rgba(34, 33, 33, 0.502);
    border: 0.1vw solid rgba(34, 33, 33, 0.3);

    &:hover{
      background: rgba(0, 0, 0, 0.811);
    }
  }
}

// ----------------------------------------------------------------
// 导航栏点击样式
.Navigation_bar {
  border-bottom: 0.1vw solid rgba(219, 236, 240, 0.71);
  color: rgba(235, 152, 117, 0.71);
}

// 收藏栏等的点击样式
.Bookmarkclicks {
  color: rgba(235, 152, 117, 0.71);
}
</style>