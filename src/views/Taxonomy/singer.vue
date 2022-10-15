<template>
  <!-- 歌手总体 -->
  <div class="Singer-overall" ref="instance_SO">
    <!-- 渲染主体 -->
    <div class="SO-rendering" v-if="Whethe===1?true:false">
      <ul>
        <li v-for="item in storage" :key="item.id"><Singermaster :singer="item" :img="item.img1v1Url" :name="item.name"></Singermaster></li>
        <li><a href="javascript:;" class="iconfont icon-quanbu"></a></li>
      </ul>
    </div>
    
    <!-- 加载中 -->
    <load :Whether="Whethe" @refresh_zho="Refresh" :reload="Re_load" :judg="keyword" v-if="Re_load!==null?true:false"></load>
  </div>
</template>

<script setup>
// 导入加载中组件
import load from '@/components/load/load.vue'

// 导入歌手组件
import Singermaster from '@/components/Popularsingers/Singermaster.vue'

// 导入vue
import {
  onMounted,
  ref
} from 'vue'

// 导入自定义函数
import { Adaptive } from '@/encapsulation/Adaptive.js'

// 导入发起请求的函数
import { General } from '@/axios/index.js'

// 接受不到数据时改变状态
let Whethe = ref(1)

// 储存发送关键词
let keyword = ref('singer')

// 点击刷新的自定义事件
async function Refresh(name) {
  if(name === 'singer') {
    await total('/artist/list',{ limit:23 })
  }
}

// 预创建一个数接受推荐歌单框的宽度
let Re_load = ref(null)

// 为歌手总体创建实例
const instance_SO = ref(null)

// 为Re_load赋值
function Re_assignment() {
  Re_load.value = Adaptive(instance_SO)
}

// 发起数据歌手请求
async function total(address,data) {
  Whethe.value = 2
  let temp = await General(address,data)

  if(temp.status === 700) {
    Whethe.value = 0
  }else {
    storage.value = temp.data.artists
    Whethe.value = 1
  }
}

// 存储请求数据
let storage = ref(null)

total('/artist/list',{ limit:23 })

onMounted(()=>{
  Re_assignment()
})
</script>

<style lang="less" scoped>
// 歌手总体
.Singer-overall {
  width: 100%;
  height: 100%;
  overflow: hidden;

  // 渲染主体
  .SO-rendering {
    width: 100%;
    height: 100%;
    
    ul {
      position: relative;

      li {
        float: left;
        margin-left: 1.18vw;
        margin-top: 1vw;

        &:last-child {
          width: 10vw;
          height: 10vw;
          border: 0.1vw solid #ccc;
          border-radius: 1vw;

          &:hover .icon-quanbu{
            color: aliceblue;
          }

          .icon-quanbu {
            font-size: 9.8vw;
            color: rgb(207, 207, 207);
            transition: all .2s;
          }
        }
      }

    }
  }
}
</style>
