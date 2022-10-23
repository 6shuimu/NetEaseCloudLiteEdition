<template>
  <!-- 电台总体 -->
  <div class="Radio-overall" ref="instance_RO">
    <!-- 渲染主体 -->
    <div class="Radio-rendering" v-if="Whethe===1?true:false">
      <ul>
        <li v-for="item in storage" :key="item.name"><Rs :Rs="item" :img="item.picUrl" :name="item.name" :Copyname="item.copywriter"></Rs></li>
        <li><a class="iconfont icon-quanbu" href="javascript:;" title="全部">全部</a></li>
      </ul>
    </div>
    
    <!-- 加载中 -->
    <load :Whether="Whethe" @refresh_zho="Refresh" :reload="Re_load" :judg="keyword" v-if="Re_load!==null?true:false"></load>
  </div>
</template>

<script setup>
// 导入加载中组件
import load from '@/components/load/load.vue'

// 导入电台组件
import Rs from '@/components/radiostation/Rs.vue'

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
let keyword = ref('Rs')

// 点击刷新的自定义事件
async function Refresh(name) {
  if(name === 'Rs') {
    await total('/dj/hot',{ limit:11 })
  }
}

// 预创建一个数接受推荐歌单框的宽度
let Re_load = ref(null)

// 为歌手总体创建实例
const instance_RO = ref(null)

// 为Re_load赋值
function Re_assignment() {
  Re_load.value = Adaptive(instance_RO)
}

// 发起数据歌手请求
async function total(address,data) {
  Whethe.value = 2
  let temp = await General(address,data)

  if(temp.status === 700) {
    Whethe.value = 0
  }else {
    storage.value = temp.data.djRadios
    Whethe.value = 1
  }
}

// 存储请求数据
let storage = ref(null)

total('/dj/hot',{ limit:11 })

onMounted(()=>{
  Re_assignment()
})
</script>

<style lang="less" scoped>
// 电台总体
.Radio-overall {
  width: 100%;
  height: 100%;
  overflow: hidden;

  // 渲染主体
  .Radio-rendering {
    width: 100%;
    height: 100%;

    ul {
      width: 100%;
      height: 100%;

      li {
        float: left;
        margin-top: 2.7vw;
        margin-left: 3.2vw;
        transition: all .3s;
        border-radius: 1vw;

        &:last-child {
          width: 26vw;
          height: 10vw;
          border: 0.07vw solid #ccc;
          border-radius: 1vw;
          text-align: center;
          line-height: 10vw;
          background-color: rgba(133, 128, 128, 0.518);

          .icon-quanbu {
            font-size: 7vw;
            color: rgb(178, 176, 176);

            &:hover {
              color: #ccc;
            }
          }
        }

        &:hover {
          background-color: rgba(22, 22, 22, 0.559);
        }
      }
    }
  }
}
</style>
