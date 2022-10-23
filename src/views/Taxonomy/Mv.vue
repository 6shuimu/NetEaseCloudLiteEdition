<template>
  <!-- mv总体 -->
  <div class="MV_overall" ref="instance_Mv">
    <!-- 渲染主体 -->
    <div class="MO-rendering" v-if="Whethe===1?true:false">
      <ul>
        <li v-for="item in storage" :key="item.id"><MVmonomer :mov="item" :img="item.cover" :name="item.name"></MVmonomer></li>
        <li><div class="iconfont icon-quanbu" title="全部"></div></li>
      </ul>
    </div>
    
    <!-- 加载中 -->
    <load :Whether="Whethe" @refresh_zho="Refresh" :reload="Re_load" :judg="keyword" v-if="Re_load!==null?true:false"></load>
  </div>
</template>

<script setup>
// 导入加载中组件
import load from '@/components/load/load.vue'

// 导入mv组件
import MVmonomer from '@/components/mv/MVmonomer.vue'

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
let Whethe = ref(0)

// 储存发送关键词
let keyword = ref('Mv')

// 点击刷新的自定义事件
async function Refresh(name) {
  if(name === 'Mv') {
    await total('/mv/all',{ limit:15 })
  }
}

// 预创建一个数接受推荐歌单框的宽度
let Re_load = ref(null)

// 为Mv总体创建实例
const instance_Mv = ref(null)

// 为Re_load赋值
function Re_assignment() {
  Re_load.value = Adaptive(instance_Mv)
}

// 发起数据歌手请求
async function total(address,data) {
  Whethe.value = 2
  let temp = await General(address,data)

  if(temp.status === 700) {
    Whethe.value = 0
  }else {
    storage.value = temp.data.data
    Whethe.value = 1
  }
}

// 存储请求数据
let storage = ref(null)

total('/mv/all',{ limit:15 })

onMounted(()=>{
  Re_assignment()
})
</script>

<style lang="less" scoped>
//  mv总体
.MV_overall {
  width: 100%;
  height: 100%;
  overflow: hidden;

  // 渲染主体
  .MO-rendering {
    width: 100%;
    height: 100%;

    ul {
      width: 100%;
      height: 100%;

      li {
        float: left;
        margin-top: 0.3vw;
        margin-left: 2.2vw;

        &:last-child {
          width: 20vw;
          height: 12.5vw;
          text-align: center;

          .icon-quanbu {
            display: inline-block;
            font-size: 12vw;
            color: rgb(175, 178, 180);
            transition: all .3s;
            cursor: pointer;

            &:hover {
              color: rgb(234, 234, 234);
            }
          }
        }
      }
    }
  }
}
</style>
