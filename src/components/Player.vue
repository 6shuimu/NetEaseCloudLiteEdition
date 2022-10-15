<template>
  <!-- 播放区 -->
  <div class="Playarea">
    <!-- 播放左侧区域 -->
    <div class="Pa-Playleft">
      <!-- 唱壁 -->
      <div class="Pa-Pl-Singthewall">
        <!-- 唱壁根 -->
        <div class="Pa-Pl-S-root"></div>
        <!-- 唱壁身 -->
        <div class="Pa-Pl-S-body">
          <!-- 唱壁身弯 -->
          <div class="Pa-Pl-S-body-Bend">
            <!-- 唱壁头 -->
            <div class="Pa-Pl-S-B-B-head"></div>
          </div>
        </div>
      </div>
      <!-- 音乐盘 -->
      <div class="Pa-Pl-icon">
        <img src="../assets/音乐符号.png">
      </div>
      <!-- 作者名和作品名 -->
      <div class="Pa-Pl-Collections">
        <!-- 作者名 -->
        <div class="Pa-Pl-C-Authorname">某某某</div>
        <!-- 作品名 -->
        <div class="Pa-Pl-C-Thetitleofthework">xxxxxxxxxxxxxx</div>
      </div>
    </div>
    <!-- 播放中间区域 -->
    <div class="Pa-Pl-middle">
      <!-- 进度条 -->
      <div class="Pa-Pl-mi-Progressbar">
        <!-- 进度 -->
        <div class="Pa-Pl-mi-Pb-Progress"></div>
        <!-- 进度时间 -->
        <div class="Pa-Pl-mi-Pb-Time">
          <!-- 正播放时长 -->
          <div class="Pa-Pl-mi-Pb-T-process">00:00</div>
          <div>/</div>
          <!-- 总时长 -->
          <div class="Pa-Pl-mi-Pb-T-total">00:00</div>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="Pa-Pl-mi-button">
        <!-- 循环 -->
        <div class="iconfont icon-shuaxin"></div>
        <!-- 快退 -->
        <div class="iconfont icon-kuaitui"></div>
        <!-- 播放和暂停 -->
        <div class="iconfont icon-24gl-play"></div>
        <!-- 快进 -->
        <div class="iconfont icon-kuaijin"></div>
        <!-- 播放方式 -->
        <div class="iconfont icon-23_shunxubofang"></div>
      </div>
      
    </div>
    <!-- 播放右侧区域 -->
    <div class="Pa-Pl-Right">
      <!-- 音量键 -->
      <div class="iconfont icon-yinliang Pa-Pl-R-volume"></div>
      <!-- 详细内容 -->
      <div class="iconfont icon-neirong Pa-Pl-R-content"></div>
    </div> 
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
// 播放区
.Playarea {
  width: 100%;
  height: 11.603vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(149, 149, 146, 0.543);
  backdrop-filter: blur(0.12vw);
  border-radius: 0.6vw;
  border: 0.1vw solid rgba(100, 95, 95, 0.5);

  // 播放左侧区域
  .Pa-Playleft {
    width: 33.3%;
    height: 11.603vw;
    display: flex;
    position: relative;
    align-items: center;

    // 唱壁
    .Pa-Pl-Singthewall {
      position: absolute;
      top: 0.7vw;
      left: 8vw;
      width: 1.4vw;
      height:5.6vw;
      z-index: 2;
      transform-origin: 0.7vw 0.7vw;
      transform: rotate(325deg);
      transition: transform 1s;

      // 唱壁根
      .Pa-Pl-S-root {
        width: 1.4vw;
        height: 1.4vw;
        background-color: rgb(83, 79, 79);
        border-radius: 50%;
        background-image: radial-gradient(circle at 50% 50%,rgb(47, 46, 46) 26% ,transparent 0);
      }

      // 唱壁身
      .Pa-Pl-S-body {
        width: 0.4vw;
        height: 2.3vw;
        position: absolute;
        top: 1.33vw;
        left: 0.5vw;
        background-color: rgb(71, 65, 65);
        border-radius: 0 0 0.1vw 0;

        // 唱壁身弯
        .Pa-Pl-S-body-Bend {
          position: absolute;
          top: 1.8vw;
          left: -0.02vw;
          width: 0.35vw;
          height: 2vw;
          background-color: rgb(67, 60, 60);
          border-radius: 1vw 1vw 0 0;
          transform-origin: 0 0.35vw;
          transform: rotate(30deg);

          // 唱壁头
          .Pa-Pl-S-B-B-head {
            width: 0.55vw;
            height: 0.6vw;
            position: absolute;
            top: 2vw;
            left: -0.1vw;
            background-color: rgb(49, 46, 46);

            &::after {
              content: '';
              display: block;
              width: 0.75vw;
              height: 0.2vw;
              background-color: rgb(43, 40, 40);
              position: absolute;
              top: 0.5vw;
              left: -0.1vw;
            }
          }
        }
      }
    }

    // 音乐盘
    .Pa-Pl-icon {
      width: 8.339vw;
      height: 8.339vw;
      background-color: rgb(33, 31, 31);
      border-radius: 50%;
      border: 0.01vw solid #c21313;
      overflow: hidden;
      position: relative;
      text-align: center;
      margin-left: 1.39vw;
      transform-origin: 4.1695vw 4.1695vw;
      transform: rotate(0deg);
      transition: transform 6s;

      >img {
        display: inline-block;
        margin-top: 15%;
        width: 70%;
        height: 70%;
        border-radius: 50%;
        background-size: cover;
      }
    }

    // 作者名和作品名
    .Pa-Pl-Collections {
      width: 20.85vw;
      position: relative;
      margin-left: 2.09vw;

      // 作者名
      .Pa-Pl-C-Authorname {
        position: absolute;
        top: -0.7vw;
        left: 0;
        font-size: 0.6vw;
        color: rgb(48, 46, 46);
        
      }

      // 作品名
      .Pa-Pl-C-Thetitleofthework {
        width: 100%;
        font-size: 2.3vw;
        line-height: 2.3vw;
        color: rgb(3, 3, 3);
        overflow: hidden;
        word-break: break-all;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
      }
    }
    
  }

  // 播放中间区域
  .Pa-Pl-middle {
    width: 55%;
    height: 11.605vw;
    text-align: center;
    padding-top: 4.3vw;

    div {
      display: inline-block;
    }

    // 进度条
    .Pa-Pl-mi-Progressbar {
      width: 43vw;
      height: 0.28vw;
      background-color: rgba(197, 194, 191, 0.644);
      border-radius: 1vw;
      float: left;
      margin-left: 0.7vw;
      position: relative;
      border: 0.07vw solid rgba(57, 56, 56, 0.644);
      cursor: pointer;

      // 进度
      .Pa-Pl-mi-Pb-Progress {
        width: 10%;
        height: 100%;
        border-radius: 1vw;
        display: block;
        background-color: #e06752a4;
      }

      // 时间
      .Pa-Pl-mi-Pb-Time {
        width: 7vw;
        position: absolute;
        top: -0.45vw;
        left: 44vw;
        font-size: 0.5vw;
        color: rgb(174, 177, 179);

        div {
          display: inline-block;
        }

        // 正在播放时间
        .Pa-Pl-mi-Pb-T-process {}

        // 总时间
        .Pa-Pl-mi-Pb-T-total {}
      }
    }

    // 按钮
    .Pa-Pl-mi-button {
      margin-top: 1vw;
      width: 100%;

      div {
        margin-right: 2vw;
        cursor: pointer;
      }

      >div:last-child{
        margin-right: 0;
      }

      .iconfont {
        font-size: 2vw;
      }
    }
  }

  // 播放右侧区域
  .Pa-Pl-Right {
    width: 11.7%;
    height: 100%;
    text-align: center;
    padding-top: 4.3vw;

    >div {
      display: inline-block;
    }

    .iconfont {
      font-size: 2vw;
    }

    // 音量键
    .Pa-Pl-R-volume {
      margin-right: 1vw;
    }

    // 详细内容
    .Pa-Pl-R-content {}
  }
  
}
</style>