<template>
<div class="All">
  
  <!-- 左侧 -->
  <div class="All-left">
    <!-- 推荐歌单 -->
    <div class="Re-playlist" ref="instance_load">
      <!-- 推荐歌单导航栏 -->
      <div class="Songdirector">
        <!-- 左侧 -->
        <div class="SR-left">
          <div class="iconfont icon-tuijianma"></div>
          <span>热门推荐</span>
        </div>
        <!-- 右侧 -->
        <div class="SR-right">
          <span>更多</span>
          <div class="iconfont icon-xiangyou"></div>
        </div>
      </div>

      <!-- 推荐歌单内容 -->
      <div class="PushIn" v-if="Whethe.Play===1?true:false">
        <Recommendedplaylist :Re_songs="item" :img="item.picUrl" :name="item.name" v-for="item in Recommended_songs" :key="item.id"></Recommendedplaylist>
      </div>

      <!-- 加载组件 -->
      <load :Whether="Whethe.Play" @refresh_zho="Refresh" :reload="Re_load.play" :judg="judgment.play" v-if="Re_load.play!==null?true:false"></load>
      
    </div>

    <!-- 新碟上架 -->
    <div class="Newon" ref="instance_Newon">
      <!-- 导航栏 -->
      <div class="Newon-navigation">
        <!-- 左侧 -->
        <div class="Ne-Na-left">
          <div class="iconfont icon-tuijianma"></div>
          <span>新碟上架</span>
        </div>
        <!-- 右侧 -->
        <div class="Ne-Na-right">
          <span>更多</span>
          <div class="iconfont icon-xiangyou"></div>
        </div>
      </div>

      <!-- 内容 -->
      <div class="Ne-Na-content" v-if="Whethe.New_discs===1?true:false">
        <!-- 新碟的轮播框 -->
        <div class="NNC-Carouselbox">
          <!-- 左侧按钮 -->
          <div class="iconfont icon-xiangzuo" @click="NNC_left"></div>
          <!-- 中间内容 -->
          <div class="NNC-C-content" ref="instance_content">
            <ul class="NNCC-ul">
              <li v-for="item in N_D_S" :key="item.id"><Newdiskbody :Newdiscs="item" :img="item.blurPicUrl" :name="item.name" :Authname="item.company"></Newdiskbody></li>
              <li v-for="item in N_D_S" :key="item.id"><Newdiskbody :Newdiscs="item" :img="item.blurPicUrl" :name="item.name" :Authname="item.company"></Newdiskbody></li>
            </ul>
          </div>
          <!-- 右侧按钮 -->
          <div class="iconfont icon-xiangyou1" @click="NNC_right"></div>
        </div>
      </div>

      <!-- 加载组件 -->
      <load :Whether="Whethe.New_discs" @refresh_zho="Refresh" :reload="Re_load.New_discs" :judg="judgment.New_discs" v-if="Re_load.New_discs!==null?true:false"></load>
    </div>

    <!-- 所有榜单 -->
    <div class="List" ref="instance_List">
      <!-- 导航栏 -->
      <div class="List-navigation">
        <!-- 左侧 -->
        <div class="List-Na-left">
          <div class="iconfont icon-tuijianma"></div>
          <span>榜单</span>
        </div>
        <!-- 右侧 -->
        <div class="List-Na-right">
          <span>更多</span>
          <div class="iconfont icon-xiangyou"></div>
        </div>
      </div>

      <!-- 内容 -->
      <div class="List-Na-content" v-if="Whethe.List===1?true:false">
        <!-- 外包壳 -->
        <div class="LNC-Outsourcingshell">
          <List v-for="item in Chart_list" :key="item.name" :List="item" :img="item.coverImgUrl" :Listname="item.name" :Songcontent="item.tracks"></List>
        </div>
      </div>

      <!-- 加载组件 -->
      <load :Whether="Whethe.List" @refresh_zho="Refresh" :reload="Re_load.List" :judg="judgment.List" v-if="Re_load.List!==null?true:false"></load>
    </div>

  </div>

  <!-- 右侧 -->
  <div class="All-Right">

    <!-- 热门歌手 -->
    <div class="Popularsingers" ref="instance_Pos">
      <!-- 导航栏 -->
      <div class="PS-navigation">
        <!-- 左侧 -->
        <div class="PS-N-left">
          <div class="iconfont icon-tuijianma"></div>
          <span>热门歌手</span>
        </div>
        <!-- 右侧 -->
        <div class="PS-N-right">
          <span>查看更多</span>
          <div class="iconfont icon-xiangyou"></div>
        </div>
      </div>

      <!-- 内容 -->
      <div class="PS-content" v-if="Whethe.Pos===1?true:false">
        <Pos v-for="item in Chart_Pos" :key="item.name" :Pos="item"></Pos>
      </div>

      <!-- 加载组件 -->
      <load :Whether="Whethe.Pos" @refresh_zho="Refresh" :reload="Re_load.Pos" :judg="judgment.Pos" v-if="Re_load.Pos!==null?true:false"></load>
    </div>

    <!-- 推荐mv -->
    <div class="mv" ref="instance_mv">
      <!-- 导航栏 -->
      <div class="mv-navigation">
        <!-- 左侧 -->
        <div class="mv-N-left">
          <div class="iconfont icon-tuijianma"></div>
          <span>推荐mv</span>
        </div>
      </div>

      <!-- 内容 -->
      <div class="mv-content" v-if="Whethe.mv===1?true:false">
        <Recommendmv v-for="item in Chart_mv" :mv="item" :img="item.picUrl" :name="item.name"></Recommendmv>
      </div>

      <!-- 加载组件 -->
      <load :Whether="Whethe.mv" @refresh_zho="Refresh" :reload="Re_load.mv" :judg="judgment.mv" v-if="Re_load.mv!==null?true:false"></load>
    </div>

  </div>
    
</div>
</template>

<script setup>
  // 导入自定义axios
  import { General } from '@/axios/index.js'

  // 导入vue
  import {
    nextTick,
    onMounted,
    onUnmounted,
    reactive,
    ref,
    unref,
  } from 'vue'

  // 导入自适应加载函数
  import { Adaptive,Carousel } from '@/encapsulation/Adaptive.js'

  // 导入加载组件
  import load from '@/components/load/load.vue'

  // 导入歌单表面组件
  import Recommendedplaylist from '@/components/Recommendedplaylist/Recommendedplaylist.vue'

  // 导入新碟上架表面组件
  import Newdiskbody from '@/components/Newon/Newdiskbody.vue'

  // 榜单
  import List from '@/components/List/List.vue'

  // 导入热门歌手组件
  import Pos from '@/components/Popularsingers/Pos.vue'

  // 导入mv组件
  import Recommendmv from '@/components/mv/Recommendmv.vue'


  // 接受推荐歌单的数据
  let Recommended_songs = ref(null)

  // 接受新碟上架的数据
  let N_D_S = ref(null)

  // 接受榜单的数据
  let Chart_list = ref(null)

  // 接受热门歌手的数据
  let Chart_Pos = ref(null)

  // 接受推荐mv的数据
  let Chart_mv = ref(null)

  // 接受不到数据时改变状态
  let Whethe = reactive({
    Play:1,
    New_discs:1,
    List:1,
    Pos:1,
    mv:1
  })

  // 储存发送关键词
  let judgment = reactive({
    play:'play',
    New_discs:'New_discs',
    List:'List',
    Pos:'Pos',
    mv:'mv'
  })

  // 所有的请求函数集合
  async function total(name,address,data) {
    // 推荐歌单
    if(name === '推荐歌单') {
      // 显示数据加载中
      Whethe.Play = 2
      const temp = await General(address,data)

      // 失败时
      if(temp.status === 700) {
        Whethe.Play = 0
      // 成功时
      }else if(temp.status === 200) {
        temp.data.result.splice(8)
        // 将播放次数化整
        temp.data.result.forEach((item)=>{
          if(item.playCount>=10000) {
            if(item.playCount>=100000000) {
              item.playCount = (item.playCount/100000000).toFixed(1) + '亿'
              return item.playCount
            }else {
              item.playCount = Math.ceil(item.playCount/10000) + '万'
              return item.playCount
            }
          }else {
            return item.playCount
          }
        })
        Recommended_songs.value = temp.data.result
        Whethe.Play = 1
      }
      return
    }

    // 新碟上架
    if(name === '新碟上架') {
      // 显示数据加载中
      Whethe.New_discs = 2
      const temp = await General(address,data)

      // 失败时
      if(temp.status === 700) {
        Whethe.New_discs = 0
      // 成功时
      }else if(temp.status === 200) {
        temp.data.weekData.splice(5)
        N_D_S.value = temp.data.weekData
        Whethe.New_discs = 1
      }
      return
    }

    // 所有榜单
    if(name === '所有榜单') {
      // 显示数据加载中
      Whethe.List = 2
      const temp = await General(address,data)

      // 失败时
      if(temp.status === 700) {
        Whethe.List = 0
      // 成功时
      }else if(temp.status === 200) {
        temp.data.list.splice(3)
        let temps = []
        for(let key of temp.data.list) {
          let tempp = await General('/playlist/detail',{ id:key.id })
          tempp.data.playlist.tracks.splice(10)
          temps.push(tempp.data.playlist)
        }
        Chart_list.value = temps
        Whethe.List = 1
      }
      return
    }
    
    // 热门歌手
    if(name === '热门歌手') {
      // 显示数据加载中
      Whethe.Pos = 2
      const temp = await General(address,data)

      // 失败时
      if(temp.status === 700) {
        Whethe.Pos = 0
      // 成功时
      }else if(temp.status === 200) {
        Chart_Pos.value = temp.data.artists
        Whethe.Pos = 1
      }
      return
    }

    // 推荐mv
    if(name === '推荐mv') {
      // 显示数据加载中
      Whethe.mv = 2
      const temp = await General(address,data)

      // 失败时
      if(temp.status === 700) {
        Whethe.mv = 0
      // 成功时
      }else if(temp.status === 200) {
        Chart_mv.value = temp.data.result
        Whethe.mv = 1
      }
      return
    }
  }

  // 点击刷新的自定义事件
  async function Refresh(it) {
    if(it === judgment.play) {
      await total('推荐歌单','/personalized',{limit:8})
    }
    if(it === judgment.New_discs) {
      total('新碟上架','/top/album',{})
    }
    if(it === judgment.List) {
      total('所有榜单','/toplist',{})
    }
    if(it === judgment.Pos) {
      total('热门歌手','/top/artists',{offset:0,limit:5})
    }
    if(it === judgment.mv) {
      total('推荐mv','/personalized/mv',{})
    }

  }

  // 获取推荐歌单框的实例
  const instance_load = ref(null)

  // 获取新碟上架框的实例
  const instance_Newon = ref(null)

  // 获取榜单框的实例
  const instance_List = ref(null)

  // 获取热门歌手框的实例
  const instance_Pos = ref(null)

  // 获取推荐mv的实例
  const instance_mv = ref(null)

  // 预创建一个数接受推荐歌单框的宽度
  const Re_load = reactive({
    play:null,
    New_discs:null,
    List:null,
    Pos:null,
    mv:null
  })

  // 为Re_load赋值
  function Re_assignment() {
    Re_load.play = Adaptive(instance_load)
    Re_load.New_discs = Adaptive(instance_Newon)
    Re_load.List = Adaptive(instance_List)
    Re_load.Pos = Adaptive(instance_Pos)
    Re_load.mv = Adaptive(instance_mv)
  }

  // 获得新碟上架内容实例
  const instance_content = ref(null)

  // 轮播节流
  let temp = ref(1)

  // 记录循环的次数
  let num = ref(0)

  // 新碟上架内容左侧按钮点击事件
  async function NNC_left() {
    if(temp.value) {
      temp.value = 0
      if(num.value === 5) {
        instance_content.value.children[0].style.left = 0 + 'px'
        num.value = 0
      }
      num.value++
      await Carousel(unref(instance_content),-Math.trunc(num.value*(instance_content.value.children[0].offsetWidth/10)))
      temp.value = 1
    }
  }

  // 新碟上架内容左侧按钮点击事件
  async function NNC_right() {
    if(temp.value) {
      temp.value = 0
      if(num.value === 0) {
        instance_content.value.children[0].style.left = '-986px'
        num.value = 5
      }
      num.value--
      await Carousel(unref(instance_content),-Math.trunc(num.value*(instance_content.value.children[0].offsetWidth/10)))
      temp.value = 1
    }
  }
  
  total('推荐歌单','/personalized',{limit:8})
  total('新碟上架','/top/album',{})
  total('所有榜单','/toplist',{})
  total('热门歌手','/top/artists',{offset:0,limit:5})
  total('推荐mv','/personalized/mv',{})

  // 全局监听
  onMounted(()=>{
    Re_assignment()
    window.addEventListener('resize',Re_assignment)
  })

  // 全局卸载
  onUnmounted(()=>{
    window.removeEventListener('resize',Re_assignment)
  })

</script>

<style lang="less" scoped>
// 所有
.All {
  width: 100%;
  height: 100%;

  // 左侧
  .All-left {
    display: inline-block;
    width: 70%;
    height: 100%;

    // 推荐歌单
    .Re-playlist {
      display: inline-block;
      width: 100%;
      height: 94%;
      border: 0.1vw solid rgba(171, 168, 168, 0.721);
      border-radius: 1vw;
      overflow: hidden;

      // 推荐歌单导航栏
      .Songdirector {
        width: 98.4%;
        height: 7%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 0.8%;
        font-size: 1.4vw;
        border-radius: 1vw 1vw 0 0;
        border-bottom: 0.1vw solid rgba(171, 168, 168, 0.721);

        // 左侧
        .SR-left {
          cursor: pointer;
          color: rgb(221, 180, 31);

          // 图标
          .icon-tuijianma {
            display: inline-block;
            vertical-align: middle;
            margin-right: 0.5vw;
            font-size: 2vw;
          }

          // 文字
          span {
            vertical-align: middle;
          }
        }

        // 右侧
        .SR-right {
          cursor: pointer;

          // 文字
          span {
            font-size: 1.3vw;
            color: rgb(221, 180, 31);
            margin-right: 0.4vw;
          }
          // 图标
          .icon-xiangyou {
            display: inline-block;
            font-size: 1.3vw;
            color: rgb(251, 86, 86);
          }
        }
        
      }

      // 推荐歌单内容
      .PushIn {
        width: 100%;
        height: 93%;
        padding: 0.5vw;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-content: space-between;
      }
    }

    // 新碟上架
    .Newon {
      display: inline-block;
      width: 100%;
      height: 60%;
      border: 0.1vw solid rgba(171, 168, 168, 0.721);
      border-radius: 1vw;
      overflow: hidden;

      // 导航栏
      .Newon-navigation {
        width: 98.4%;
        height: 10%;
        font-size: 1.4vw;
        border-radius: 1vw 1vw 0 0;
        margin: 0 0.8%;
        border-bottom: 0.1vw solid rgba(171, 168, 168, 0.721);
        display: flex;
        align-items: center;
        justify-content: space-between;

        // 左侧
        .Ne-Na-left {
          cursor: pointer;
          color: rgb(221, 180, 31);

          // 图标
          .icon-tuijianma {
            display: inline-block;
            vertical-align: middle;
            margin-right: 0.5vw;
            font-size: 2vw;
          }

          // 文字
          span {
            vertical-align: middle;
          }
        }

        // 右侧
        .Ne-Na-right {
          cursor: pointer;

          // 文字
          span {
            font-size: 1.3vw;
            color: rgb(221, 180, 31);
            margin-right: 0.4vw;
          }

          // 图标
          .icon-xiangyou {
            display: inline-block;
            font-size: 1.3vw;
            color: rgb(251, 86, 86);
          }
        }
      }

      // 内容
      .Ne-Na-content {
        width: 100%;
        height: 90%;
        overflow: hidden;
        padding: 4%;

        // 新碟的轮播框
        .NNC-Carouselbox {
          width: 100%;
          height: 100%;
          background-color: rgba(240, 248, 255, 0.228);
          border-radius: 0.6vw;
          display: flex;
          justify-content: center;
          align-items: center;

          // 向左图标
          .icon-xiangzuo {
            width: 5%;
            text-align: center;
            font-size: 2.5vw;
            cursor: pointer;
            color: rgb(48, 48, 46);
            transition: all .1s;
            
            &:hover {
              font-size: 2.7vw;
              color: rgb(199, 199, 193);
            }
          }

          // 中间内容
          .NNC-C-content {
            width: 90%;
            height: 90%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            overflow: hidden;
            position: relative;

            .NNCC-ul {
              position: relative;
              top: 0;
              left: 0;
              display: flex;
              li{
                margin-right: 2vw;
              }
            }
          }

          // 向右图标
          .icon-xiangyou1 {
            width: 5%;
            text-align: center;
            font-size: 2.5vw;
            cursor: pointer;
            color: rgb(48, 48, 46);
            transition: all .1s;
            
            &:hover {
              font-size: 2.7vw;
              color: rgb(199, 199, 193);
            }
          }
        }
      }
    }

    // 所有榜单
    .List {
      display: inline-block;
      width: 100%;
      height: 120%;
      border: 0.1vw solid rgba(171, 168, 168, 0.721);
      border-radius: 1vw;
      overflow: hidden;

      // 导航栏
      .List-navigation {
        width: 98.4%;
        height: 7%;
        font-size: 1.4vw;
        border-radius: 1vw 1vw 0 0;
        margin: 0 0.8%;
        border-bottom: 0.1vw solid rgba(171, 168, 168, 0.721);
        display: flex;
        align-items: center;
        justify-content: space-between;

        // 左侧
        .List-Na-left {
          cursor: pointer;
          color: rgb(221, 180, 31);

          // 图标
          .icon-tuijianma {
            display: inline-block;
            vertical-align: middle;
            margin-right: 0.5vw;
            font-size: 2vw;
          }

          // 文字
          span {
            vertical-align: middle;
          }
        }

        // 右侧
        .List-Na-right {
          cursor: pointer;

          // 文字
          span {
            font-size: 1.3vw;
            color: rgb(221, 180, 31);
            margin-right: 0.4vw;
          }

          // 图标
          .icon-xiangyou {
            display: inline-block;
            font-size: 1.3vw;
            color: rgb(251, 86, 86);
          }
        }
      }

      // 内容
      .List-Na-content {
        width: 100%;
        height: 93%;
        padding: 1vw;
        display: flex;

        // 外包壳
        .LNC-Outsourcingshell {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      }
    }

}

  // 右侧
  .All-Right {
    display: inline-block;
    width: 30%;
    vertical-align: top;
    
    // 热门歌手
    .Popularsingers {
      width: 100%;
      height: 54.35vw;
      border: 0.01vw solid rgba(171, 168, 168, 0.721);
      border-radius: 1vw;
      margin-left: 0.1vw;
      overflow: hidden;

      // 导航栏
      .PS-navigation {
        width: 97.2%;
        height: 2.5vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 1.4%;
        font-size: 1.3vw;
        border-radius: 1vw 1vw 0 0;
        border-bottom: 0.1vw solid rgba(171, 168, 168, 0.721);

        // 左侧
        .PS-N-left {
          cursor: pointer;
          color: rgb(221, 180, 31);

          // 图标
          .icon-tuijianma {
            display: inline-block;
            vertical-align: middle;
            margin-right: 0.5vw;
            font-size: 2vw;
          }

          // 文字
          span {
            vertical-align: middle;
          }
        }

        // 右侧
        .PS-N-right {
          cursor: pointer;

          // 文字
          span {
            font-size: 1.2vw;
            color: rgb(221, 180, 31);
            margin-right: 0.4vw;
          }

          // 图标
          .icon-xiangyou {
            display: inline-block;
            font-size: 1.3vw;
            color: rgb(251, 86, 86);
          }
        }
      }

      // 内容
      .PS-content {
        width: 100%;
        height: 52.35vw;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-content: space-around;
      }
    }

    // 热门主播
    .mv {
      width: 100%;
      height: 59vw;
      border: 0.01vw solid rgba(171, 168, 168, 0.721);
      border-radius: 1vw;
      margin-left: 0.1vw;
      overflow: hidden;
      margin-top: 0.1vw;

      // 导航栏
      .mv-navigation {
        width: 97.2%;
        height: 2.5vw;
        margin: 0 1.4%;
        font-size: 1.3vw;
        border-radius: 1vw 1vw 0 0;
        border-bottom: 0.1vw solid rgba(171, 168, 168, 0.721);

        // 左侧
        .mv-N-left {
          width: 7.5vw;
          height: 100%;
          cursor: pointer;
          color: rgb(221, 180, 31);

          // 图标
          .icon-tuijianma {
            display: inline-block;
            vertical-align: middle;
            margin-right: 0.5vw;
            font-size: 2vw;
          }

          // 文字
          span {
            vertical-align: middle;
          }
        }
      }

      // 内容
      .mv-content {
        width: 100%;
        height: 56.5vw;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-around;
        overflow: hidden;
      }
    }
  }

}
</style>