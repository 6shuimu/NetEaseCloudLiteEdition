<template>
  <!-- 歌单总体 -->
  <div class="Playlist_overall" ref="instance_PO">
    <!-- 渲染主体 -->
    <div class="PO-rendering" v-if="Whethe===1?true:false">
      <ul>
        <li v-for="item in storage" :key="item.name"><a href="javascript:;">{{item.name}}</a></li>
        <li><a class="iconfont icon-quanbu" href="javascript:;">全部</a></li>
      </ul>
    </div>

    <!-- 加载中 -->
    <load :Whether="Whethe" @refresh_zho="Refresh" :reload="Re_load" :judg="pllist" v-if="Re_load!==null?true:false"></load>
  </div>
</template>

<script setup>
// 导入vue
import { ref,onMounted } from 'vue'

// 导入加载中组件
import load from '@/components/load/load.vue'

// 导入自定义函数
import { Adaptive } from '@/encapsulation/Adaptive.js'

// 导入发起请求的函数
import { General } from '@/axios/index.js'

// 导入歌单表面组件
import Recommendedplaylist from '@/components/Recommendedplaylist/Recommendedplaylist.vue'

// 获得歌单总体实例
const instance_PO = ref(null)

// 接受不到数据时改变状态
const Whethe = ref(1)

// 预创建一个数接受推荐歌单框的宽度
let Re_load = ref(null)

// 储存发送关键词
let pllist = ref('PL')

// 存储请求数据
let storage = ref(null)

// 点击刷新的自定义事件
async function Refresh(name) {
  if(name === 'PL') {
    await total('/playlist/catlist',{})
  }
}

// 发起数据歌手请求
async function total(address,data) {
  Whethe.value = 2
  let temp = await General(address,data)

  if(temp.status === 700) {
    Whethe.value = 0
  }else {
    storage.value = temp.data.sub
    Whethe.value = 1
  }
}

// 为Re_load赋值
function Re_assignment() {
  Re_load.value = Adaptive(instance_PO)
}

total('/playlist/catlist',{})

onMounted(()=>{
  Re_assignment()
})
</script>

<style lang="less" scoped>
// 歌单总体
.Playlist_overall {
  width: 100%;
  height: 100%;
  overflow: hidden;

  // 渲染主体
  .PO-rendering {
    width: 100%;
    height: 100%;

    ul {
      width: 100%;
      height: 100%;

      li {
        width: 16%;
        height: 3vw;
        float: left;
        background-color: rgba(198, 199, 201, 0.475);
        border: 0.07vw solid #ccc;
        margin-top: 1.3vw;
        border-radius: 0.5vw;
        margin-left: 0.5vw;
        transition: all .2s;
        
        &:hover {
          background-color: rgb(71, 70, 70);
        }

        &:last-child {
          
          &:hover .icon-quanbu {
            color: rgb(254, 254, 254);
          }

          &:hover {
            background-color: rgb(71, 70, 70);
          }

          .icon-quanbu {
            font-size: 1.5vw;
            color: rgb(198, 195, 195);
          }
        }
        
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
          line-height: 3vw;
          text-align: center;
          color: rgb(47, 46, 46);

          &:hover {
            color: rgb(254, 254, 254);
          }
        }
      }
    }
  }
}
</style>
