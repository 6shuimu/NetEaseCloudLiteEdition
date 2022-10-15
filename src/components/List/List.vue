<template>
  <!-- 榜单主体 -->
  <div class="Chartowner">
    <!-- 头部 -->
    <div class="Ch-head" ref="instance_Ch_head">
      <!-- 左侧 -->
      <div class="Ch-head-left">
        <!-- 封面图 -->
        <img src="@/assets/暂时.jpg">
        <!-- 图片 -->
        <div class="Ch-H-left-image" title="xx"></div>
      </div>
      <!-- 右侧 -->
      <div class="Ch-head-right">
        <!-- 榜单名 -->
        <div class="ChHR-Chart_name" title="榜单名">榜单名</div>
        <!-- 播放和收藏按钮 -->
        <div class="ChHR-Totalbutton">
          <!-- 播放 -->
          <div class="iconfont icon-bofang" title="播放"></div>
          <!-- 收藏 -->
          <div class="iconfont icon-24gl-folderPlus" title="收藏"></div>
        </div>
      </div>
    </div>
    <!-- 中间 -->
    <div class="Ch-middle" ref="instance_Ch_middle">
      <ol>
        <li  v-for="(item,index) in props.Songcontent" :key="item.name">
          <!-- 序号 -->
          <span>{{index+1}}</span>
          <!-- 列表内容 -->
          <div class="Ch-m-ol-li-Songname">
            <!-- 歌名内容 -->
            <span class="CS-content" :title="item.name">{{item.name}}</span>
            <!-- 要显示的按钮 -->
            <div class="Ch-m-ol-li-buttom">
              <!-- 播放 -->
              <div class="iconfont icon-bofang" title="播放"></div>
              <!-- 添加入播放列表 -->
              <div class="iconfont icon-jia" title="添加到播放列表"></div>
              <!-- 收藏 -->
              <div class="iconfont icon-24gl-folderPlus" title="收藏"></div>
            </div>
          </div>
        </li>
      </ol>
    </div>
    <!-- 尾部 -->
    <div class="Ch-Tail">
        查看全部
        <div class="iconfont icon-xiangyou1"></div>
    </div>
  </div>
</template>

<script setup>
// 导入vue
import {
  onMounted,
  ref,
} from 'vue'

// 接收父组件的数据
const props = defineProps(['List','img','Listname','Songcontent'])

// 头部实例
const instance_Ch_head = ref(null)

// 中间实例
const instance_Ch_middle = ref(null)

// 初始化
const initial = () => {
  instance_Ch_head.value.children[0].children[0].src = props.img
  instance_Ch_head.value.children[0].children[1].attributes.title.value = props.Listname
  instance_Ch_head.value.children[1].children[0].innerText = props.Listname
  instance_Ch_head.value.children[1].children[0].attributes.title.value = props.Listname
}

onMounted(()=>{
  initial()
})
</script>

<style lang="less" scoped>
// 榜单主体
.Chartowner {
  display: inline-block;
  width: 20vw;
  height: 43vw;
  background-color: rgba(183, 186, 186, 0.47);
  border-radius: 1vw;
  overflow: hidden;

  // 头部
  .Ch-head {
    width: 100%;
    height: 23%;
    display: flex;
    justify-content: center;
    align-items: center;

    // 左侧
    .Ch-head-left {
      width: 7vw;
      height: 7vw;
      margin-right: 1vw;
      position: relative;

      // 封面图
      img {
        width: 100%;
        height: 100%;
      }

      &::before {
        content: '';
        width: 8vw;
        height: 0.4vw;
        position: absolute;
        bottom: -0.17vw;
        left: -0.5vw;
        border-radius: 40%;
        background-image: radial-gradient(rgba(0, 0, 0, 0.443),transparent);
        box-shadow: 0 0 0.5vw 0vw rgba(0, 0, 0, 0.304);
      }

      &::after {
        content: '';
        width: 100%;
        height: 0.7vw;
        position: absolute;
        bottom: -0.7vw;
        left: 0;
        background-image: linear-gradient(rgba(0, 0, 0, 0.226),transparent);
      }

      // 图片
      .Ch-H-left-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('@/assets/coverall.png') no-repeat;
        background-position: 0vw 0vw;
        background-size: 19.12vw;
        cursor: pointer;
      }
    }

    // 右侧
    .Ch-head-right {
      width: 9vw;
      height: 6vw;
      padding-top: 0.5vw;

      // 榜单名
      .ChHR-Chart_name {
        font-size: 1.3vw;
        font-weight: 700;
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }

      // 播放和收藏按钮
      .ChHR-Totalbutton {
        width: 100%;
        margin-top: 0.5vw;
        display: flex;
        align-items: center;

        // 播放
        .icon-bofang {
          font-size: 2vw;
          margin-right: 0.4vw;
          color: rgba(156, 157, 158, 0.74);
          font-weight: 700;
          cursor: pointer;

          &:hover {
            color: rgb(125, 125, 125);
          }
        }
        
        // 收藏
        .icon-24gl-folderPlus {
          font-size: 1.8vw;
          color: rgba(156, 157, 158, 0.74);
          font-weight: 700;
          cursor: pointer;

          &:hover {
            color: rgb(125, 125, 125);
          }
        }
      }
    }
  }

  // 中间
  .Ch-middle {
    width: 100%;
    height: 30vw;

    ol {
      width: 100%;

      li {
        width: 100%;
        height: 3vw;
        display: flex;
        align-items: center;
        font-size: 1vw;
        padding-left: 2vw;
        position: relative;
        background-color: rgba(140, 159, 179, 0.413);

        // 序号
        >span {
          display: inline-block;
          width: 10%;
        }

        // 列表内容
        .Ch-m-ol-li-Songname {
          width: 90%;
          height: 100%;
          line-height: 3vw;
          cursor: pointer;
          display: flex;

          // 显示按钮
          &:hover .Ch-m-ol-li-buttom{
            display: flex;
          }

          // 歌名内容
          .CS-content {
            display: inline-block;
            height: 100%;
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            &:hover{
              text-decoration: underline;
            }
          }

          // 要显示的按钮
          .Ch-m-ol-li-buttom {
            display: none;
            align-items: center;
            margin-right: 0.4vw;

            // 播放
            .icon-bofang {
              font-size: 1.6vw;
              margin-right: 0.4vw;

              &:hover {
                color: rgb(234, 223, 21);
              }
            }

            // 添加列表
            .icon-jia {
              font-size: 1.3vw;
              margin-right: 0.4vw;

              &:hover {
                color: rgb(234, 223, 21);
              }
            }

            // 收藏
            .icon-24gl-folderPlus {
              font-size: 1.5vw;

              &:hover {
                color: rgb(234, 223, 21);
              }
            }
          }
        }

        &:nth-child(1) >span {
          color: red;
        }
        
        &:nth-child(2) >span {
          color: red;
        }

        &:nth-child(3) >span {
          color: red;
        }

        &:nth-child(2n) {
          background-color: rgba(128, 129, 129, 0.47);
        }
        
      }
    }
  }

  // 尾部
  .Ch-Tail {
    float: right;
    line-height: 1.5vw;
    margin-top: 0.9vw;
    margin-right: 1vw;
    width: 5.3vw;
    font-size: 1vw;
    cursor: pointer;

    // 图标
    .icon-xiangyou1 {
      display: inline-block;
      font-size: 1vw;
    }

    &:hover .icon-xiangyou1,
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>