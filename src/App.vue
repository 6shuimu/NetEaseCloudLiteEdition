<template>
  <router-view></router-view>

  <!-- 登录与注册页面 -->
  <div class="Login_and_registration_page" v-show="Login.ShowHidelogin">
    <!-- 登录与注册框 -->
    <div class="Login_and_registration_box">
      <!-- 导航栏 -->
      <div class="Navigation_bar">
        <!-- 文字 -->
        <div class="Navigation_bar_text">登录</div>
        <!-- 关闭按钮 -->
        <a class="iconfont icon-guanbi" href="javascript:;" @click="LARClosebutton"></a>
      </div>

      <!-- 中间内容 -->
      <div class="Intermediate_content">
        <!-- 二维码登录 -->
        <div class="IC-QR_code" v-if="Switchlogins">
          <!-- 左侧图片 -->
          <img src="@/assets/手机扫描图片.png">
          <!-- 右侧二维码模块 -->
          <div class="IC-QR_code-right">
            <!-- 文字 -->
            <span>扫码登录</span>
            <!-- 二维码 -->
            <div class="IC-QR_code-right-QR_code" ref="ICQRCRQRC">
              <!-- 加载中 -->
              <div class="IC-QR-R-QR-CircleLoading" v-if="Login.LoadTheDisplay">
                <CircleLoading :CircleLoading="'16px'"></CircleLoading>
                <p>加载中...</p>
              </div>

              <!-- 时间超两分钟之后显示 -->
              <div class="More_than_two_minutes" ref="MT_TM" v-if="Login.ShowHide">
                <p>二维码失效!请重新获取</p>
                <button @click="Refetch">获取</button>
              </div>
            </div>
            <!-- 建议 -->
            <div class="IC-QR_code-right-suggestion">扫描登录<a href="https://music.163.com/api/android/download/latest2">网易云音乐APP</a></div>
          </div>
        </div>

        <!-- 手机登录 -->
        <div class="IC-PhoneLogin" v-if="!Switchlogins" ref="instance_cellphone">
          <!-- 手机号码 -->
          <input type="text" placeholder="请输入手机号码" oninput="value=value.replace(/[^\d]/g,'')" @focus="Error_tishi= false">
          <!-- 验证码 -->
          <div class="IC-PL-Captcha">
            <input type="text" placeholder="请输入验证码" @focus="Error_tishi= false">
            <button @click="Captcha">获取验证码</button>
            <!-- 错误提示 -->
            <div class="IC-PL-Errormessage" ref="instance_Error" v-if="Error_tishi">
              <div class="iconfont icon-cuowu"></div>
              <p>xxx</p>
            </div>
          </div>
          <!-- 登录按钮 -->
          <button @click="login_click">
            <p v-show="Logging_In">登录</p>

            <!-- 加载中 -->
            <div class="IC-PL-button-load" v-show="!Logging_In">
              <CircleLoading :CircleLoading="'5px'"></CircleLoading>
              <p>登录中</p>
            </div>
          </button>
        </div>
      </div>

      <!-- 尾部各种协议之类的 -->
      <div class="Tail_content">
        <!-- 验证码登录 -->
        <button @click="Switchlogins_click('其他登录模式')" v-if="Switchlogins">选择其他登录模式</button>
        <!-- 手机登录 -->
        <div class="Tail_content-PhoneLogin" v-if="!Switchlogins">
          <!-- 左侧 -->
          <div class="TCP-left">
            <input type="checkbox" v-model="instance_checkbox" value="右侧图片">
            <p>同意</p>
            <a href="http://st.music.163.com/official-terms/service" target="_blank">《服务条款》</a>
            <a href="http://st.music.163.com/official-terms/privacy" target="_blank">《隐私政策》</a>
            <a href="https://st.music.163.com/official-terms/children" target="_blank">《儿童隐私政策》</a>
          </div>
          <!-- 右侧图片 -->
          <div class="TCP-rightimg" @click="Switchlogins_click('验证码登录')"></div>
        </div>
      </div>

      <!-- 登录完成 -->
      <div class="Login-LoginComplete" v-if="Login.LoginComplete">
        <div class="iconfont icon-duigou"></div>
        <p>登录成功!</p>
      </div>

      <!-- 提示未勾选 -->
      <div class="The_prompt_is_unchecked" v-if="Prompt_box">请先勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》</div>
    </div>
  </div>
</template>

<script setup>
// 导入vue
import { nextTick,ref,watch } from 'vue'

// 导入请求函数
import { General } from '@/axios/index.js'

// 导入登录状态数据
import { useLogin } from '@/store/Loginvalue.js'

// 导入圆圈加载
import CircleLoading from '@/components/load/CircleLoading.vue'

// 导入自定义函数
import { WhethertosignIn } from '@/encapsulation/Adaptive.js'

// 创建二维码失效后的遮盖层实例
const MT_TM = ref(null)

// 二维码的实例
const ICQRCRQRC = ref(null)

// 获得登录状态
const Login = useLogin()

// 显示二维码登录还是其他登录
const Switchlogins = ref(true)

// 显示手机登录是否登录中
const Logging_In = ref(true)

// 监听二维码登录的后台情况来确认是否扫描成功的定时器
const scan = ref(null)

// 获取验证码的定时器
const Captcha_set = ref(null)

// 获取手机登录的右侧图片实例
const instance_checkbox = ref([])

// 隐藏或显示提示框
const Prompt_box = ref(false)

// 隐藏或显示错误提示
const Error_tishi = ref(false)

// 手机登录实例
const instance_cellphone = ref(null)

// 错误提示实例
const instance_Error = ref(null)

// 登录时隐藏半二维码
const Hide_half_QR_codes = ref(true)

// 获取二维码的base64
async function QRCode() {
  let timestamp = new Date()
  Login.LoadTheDisplay = true

  let QRkey = await General('/login/qr/key',{ timestamp:timestamp.getTime() })

  // 出错时弹出
  if(QRkey.status === 700) {
    Login.LoadTheDisplay = false
    Login.ShowHide = true
    nextTick(()=>{
      ICQRCRQRC.value.children[0].children[0].innerText = '出现错误!请重试'
      ICQRCRQRC.value.children[0].children[1].innerText = '刷新'
    })
    return 700
  }

  let QRbase = await General('/login/qr/create',{ key:QRkey.data.data.unikey,qrimg:QRkey.data.data.unikey,timestamp:timestamp.getTime()})

  // 出错时弹出
  if(QRbase.status === 700) {
    Login.LoadTheDisplay = false
    Login.ShowHide = true
    nextTick(()=>{
      ICQRCRQRC.value.children[0].children[0].innerText = '出现错误!请重试'
      ICQRCRQRC.value.children[0].children[1].innerText = '刷新'
    })
    return 700
  }

  clearInterval(scan.value)

  // 循环检测二维码状态是否登录
  scan.value = setInterval(async ()=>{
    let timestam = new Date()
    let QRinterface = await General('/login/qr/check',{ key:QRkey.data.data.unikey,timestamp:timestam.getTime() })

    if(QRinterface.data.code === 800) {
      Login.ShowHide = true
      nextTick(()=>{
        ICQRCRQRC.value.children[0].children[0].innerText = '二维码失效!请重新获取'
        ICQRCRQRC.value.children[0].children[1].innerText = '获取'
        clearInterval(scan.value)
      })
    }else if(QRinterface.data.code === 803) {
      Login.LoginComplete = true
      setTimeout(()=>{
        localStorage.removeItem('NetEaseCloudcookie')
        localStorage.setItem('NetEaseCloudcookie',QRinterface.data.cookie)
        Login.LoginComplete = false
        Login.ShowHidelogin = false
        Login.LoginSuccessful = true
        scan.value = null
      },1500)
      clearInterval(scan.value)
    }else if(QRinterface.status === 700) {
      clearInterval(scan.value)
    }
  },1000)

  let temp = null

  clearTimeout(temp)
  
  temp = setTimeout(()=>{
    if(Switchlogins.value) {
      Login.ShowHide = true
      nextTick(()=>{
        ICQRCRQRC.value.children[0].children[0].innerText = '二维码失效!请重新获取'
        ICQRCRQRC.value.children[0].children[1].innerText = '获取'
      })
    }
  },120000)

  Login.LoadTheDisplay = false

  return QRbase.data.data.qrimg
}

// 定义设置二维码
async function QR_code_canvas() {
  let temp = await QRCode()
  if(temp === 700) return
  if(ICQRCRQRC.value === null) return
  ICQRCRQRC.value.style.background = 'url(' + temp + ')'
  ICQRCRQRC.value.style.backgroundSize = '11.636vw,11.636vw'
}

// 点击二维码失败后的刷新
function Refetch() {
  Login.ShowHide = false
  QR_code_canvas()
}

// 点击关闭按钮
function LARClosebutton() {
  Login.ShowHidelogin = false
  clearInterval(scan.value)
  scan.value = null
  Switchlogins.value = true
}

// 切换登录模式
function Switchlogins_click(name) {
  if(name === '验证码登录') {
    if(instance_checkbox.value[0] === '右侧图片') {
      if(Hide_half_QR_codes.value) {
        Switchlogins.value = true
        Login.ShowHide = false
        instance_checkbox.value.splice(0,1)
        QR_code_canvas()
        clearInterval(Captcha_set.value)
        instance_cellphone.value.children[1].children[1].innerText = '获取验证码'
        Error_tishi.value = false
      }
    }else {
      Prompt_box.value = true
      setTimeout(()=>{
        Prompt_box.value = false
      },1500)
    }
  } if(name === '其他登录模式') {
    clearInterval(scan.value)
    Switchlogins.value = false
  }
}

// 点击获取验证码按钮
async function Captcha() {
  if(instance_cellphone.value.children[0].value === '') {
    Error_tishi.value = true
    nextTick(()=>{
      instance_Error.value.children[1].innerText = '请输入手机号!'
    })
  }else if(instance_cellphone.value.children[1].children[1].innerText === '获取验证码') {
    Error_tishi.value = false
    let temp = await General('/captcha/sent',{ phone:instance_cellphone.value.children[0].value })
    let temp_shu = ref(60)
    clearInterval(Captcha_set.value)
    Captcha_set.value = setInterval(()=>{
      if(temp_shu.value === 0) {
        instance_cellphone.value.children[1].children[1].innerText = '获取验证码'
        clearInterval(Captcha_set.value)
        return
      }
      instance_cellphone.value.children[1].children[1].innerText = temp_shu.value + 's'
      temp_shu.value--
    },1000)
    if(temp.status ===700 ) {
      Error_tishi.value = true
      nextTick(()=>{
        instance_Error.value.children[1].innerText = '获取验证码失败!请稍后重试'
      })
      return
    }
  }
}

// 点击手机登录按钮
async function login_click() {
  if(Hide_half_QR_codes.value) {
    Hide_half_QR_codes.value = false
    if(instance_checkbox.value[0] === '右侧图片') {
      if(instance_cellphone.value.children[0].value === '') {
        Error_tishi.value = true
        nextTick(()=>{
          instance_Error.value.children[1].innerText = '请输入手机号!'
        })
      }else if(instance_cellphone.value.children[0].value.split('').length < 11) {
        Error_tishi.value = true
        nextTick(()=>{
          instance_Error.value.children[1].innerText = '请输入正确的手机号!'
        })
      }else if(instance_cellphone.value.children[1].children[0].value === '') {
        Error_tishi.value = true
        nextTick(()=>{
          instance_Error.value.children[1].innerText = '请输入验证码!'
        })
      }else {
        Error_tishi.value = false
        Logging_In.value = false
        let temp = await General('/captcha/verify',{ phone:instance_cellphone.value.children[0].value,captcha:instance_cellphone.value.children[1].children[0].value })
        if(temp.status === 700) {
          Hide_half_QR_codes.value = true
          Logging_In.value = true
          Error_tishi.value = true
          nextTick(()=>{
            instance_Error.value.children[1].innerText = '验证码错误!'
          })
          return
        }
        let tem = await General('/login/cellphone',{ phone:instance_cellphone.value.children[0].value,captcha:instance_cellphone.value.children[1].children[0].value})
        if(tem.status === 700) {
          Hide_half_QR_codes.value = true
          Logging_In.value = true
          Error_tishi.value = true
          nextTick(()=>{
            instance_Error.value.children[1].innerText = '出现错误!'
          })
          return
        }
        Login.LoginComplete = true
        Logging_In.value = true
        setTimeout(()=>{
          localStorage.removeItem('NetEaseCloudcookie')
          localStorage.setItem('NetEaseCloudcookie',tem.data.cookie)
          Login.LoginComplete = false
          Login.ShowHidelogin = false
          Login.LoginSuccessful = true
        },1500)
      }
    } else {
      Prompt_box.value = true
      setTimeout(()=>{
        Prompt_box.value = false
      },1500)
    }
    Hide_half_QR_codes.value = true
  }
}

// 监听登录面板的开关
watch(
  ()=>Login.ShowHidelogin,
  (newL)=>{
    if(newL) {
      if(!Login.LoginSuccessful) {
        Login.ShowHide = false
        QR_code_canvas()
      }
    }
  }
)

// 判断是否有登录
function initial() {
  const temp = WhethertosignIn()
  if(!temp) {
    // 没有登录
    Login.LoginSuccessful = false
  } else {
    // 已经登录了
    Login.LoginSuccessful = true
  }
}

// 初始化登录状态
initial()
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  box-sizing: border-box;
  list-style: none;
}

html {
  width: 100%;
  height: 100%;

  body {
    width: 100%;
    height: 100%;
    background: url('./assets/背景.jpg') no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
}

// 登录与注册页面
.Login_and_registration_page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.224);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  // 登录与注册框
  .Login_and_registration_box {
    width: 36vw;
    height: 25vw;
    background-color: #fff;
    border-radius: 0.5vw;
    position: relative;

    // 导航栏
    .Navigation_bar {
      width: 100%;
      height: 10%;
      background-color: #2d2d2d;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 0.5vw 0.5vw 0 0;

      // 文字
      .Navigation_bar_text {
        font-size: 1.3vw;
        margin-left: 0.6vw;
        color: #fff;
        font-weight: 700;
      }

      // 关闭按钮
      >.icon-guanbi {
        font-size: 1.2vw;
        margin-right: 0.4vw;
        color: #fff;
        opacity: 0.3;
        cursor: pointer;

        &:hover {
          opacity: 1;
        }
      }
    }

    // 中间内容 
    .Intermediate_content {
      width: 100%;
      height: 70%;

      // 二维码登录
      .IC-QR_code {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        
        // 左侧图片 
        >img {
          margin-top: 1.5vw;
          width: 25%;
          margin-right: 1vw;
        }

        // 右侧二维码模块
        .IC-QR_code-right {
          width: 45%;
          height: 100%;
          text-align: center;
          padding-top: 1.3vw;

          // 文字
          >span {
            font-size: 1.4vw;
          }

          // 二维码
          .IC-QR_code-right-QR_code {
            display: inline-block;
            width: 11.636vw;
            height: 11.636vw;
            margin-top: 0.3vw;
            background: url('@/assets/逗你的.png') no-repeat;
            background-size: 11.636vw,11.636vw;
            position: relative;

            // 加载中
            .IC-QR-R-QR-CircleLoading {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(255, 255, 255, 0.733);
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              >p {
                font-size: 1.3vw;
              }
            }

            // 时间超两分钟之后显示
            .More_than_two_minutes {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(255, 255, 255, 0.733);
              backdrop-filter: blur(0.2vw);
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              
              >p {
                width: 6vw;
                font-size: 1vw;
              }

              >button {
                margin-top: 0.4vw;
                width: 5vw;
                height: 2vw;
                background-color: aquamarine;
                border: 0.07vw solid rgb(190, 189, 189);
                cursor: pointer;
              }
            }

          }
          
          // 建议
          .IC-QR_code-right-suggestion {
            font-size: 1vw;
          }
        }

      }

      // 手机登录
      .IC-PhoneLogin {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        // 手机号码
        >input {
          width: 19vw;
          height: 2vw;
          margin-bottom: 0.6vw;
          border: 0.07vw solid rgb(171, 171, 171);
          outline: none;
          padding-left: 0.5vw;
          font-size: 0.9vw;
        }

        // 验证码
        .IC-PL-Captcha {
          width: 19vw;
          margin-bottom: 0.8vw;
          display: flex;
          flex-wrap: wrap;
          
          >input {
            width: 13vw;
            height: 2vw;
            border: 0.07vw solid rgb(171, 171, 171);
            outline: none;
            padding-left: 0.5vw;
            font-size: 0.9vw;
          }

          >button {
            margin-left: 0.4vw;
            width: 5.6vw;
            height: 2vw;
            font-size: 0.9vw;
            cursor: pointer;
          }

          // 错误提示
          .IC-PL-Errormessage {
            font-size: 1vw;
            color: red;
            display: flex;
            height: 1.2vw;
            align-items: center;

            >p {
              display: inline-block;
            }

            .icon-cuowu{
              font-size: 1.1vw;
              vertical-align: middle;
            }
          }
        }

        // 登录
        >button {
          width: 19vw;
          height: 2vw;
          background-color: rgb(77, 132, 214);
          border-radius: 0.3vw;
          border: 0.07vw solid rgb(47, 47, 47);
          color: #fff;
          font-size: 1vw;
          cursor: pointer;

          >p {
            display: inline-block;
          }

          // 加载中
          .IC-PL-button-load {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }

    // 尾部各种协议之类的
    .Tail_content {
      width: 100%;
      height: 20%;
      text-align: center;

      // 二维码下的按钮
      >button {
        margin-top: 1.6vw;
        width: 9vw;
        height: 2vw;
        border-radius: 1.3vw;
        border: 0.07vw solid rgb(0, 0, 0);
        font-size: 0.6vw;
        cursor: pointer;
      }

      // 手机登录
      .Tail_content-PhoneLogin {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        // 左侧
        .TCP-left {
          margin-left: 3vw;
          height: 1.3vw;
          display: flex;
          font-size: 0.8vw;
          align-items: center;

          >input {
            width: 1vw;
            height: 1vw;
            cursor: pointer;
          }

          >p {
            margin-left: 0.2vw;
          }

          >a {
            color: darkblue;
          }
        }

        // 右侧图片
        .TCP-rightimg {
          width: 5vw;
          height: 100%;
          background: url('@/assets/半二维码.png') no-repeat;
          background-size: 3.5vw;
          background-position: 100% 100%;
          -webkit-clip-path: polygon(100% 30%, 30% 100%, 100% 100%);
          clip-path: polygon(100% 30%, 30% 100%, 100% 100%);
          cursor: pointer;
        }
      }
    }

    // 登录完成
    .Login-LoginComplete {
      position: absolute;
      top: 10%;
      left: 0;
      width: 100%;
      height: 90%;
      background-color: rgba(255, 255, 255, 0.733);
      display: flex;
      justify-content: center;
      align-items: center;

      // 图标
      .icon-duigou {
        display: inline-block;
        font-size: 3vw;
        margin-right: 1.1vw;
        color: green;
      }

      >p {
        display: inline-block;
        font-size: 2.3vw;
      }
    }

    // 提示未勾选
    .The_prompt_is_unchecked {
      width: 28vw;
      height: 6vw;
      position: absolute;
      bottom: 35%;
      left: 10%;
      text-align: center;
      background-color: #2d2d2dd4;
      color: rgb(255, 255, 255);
      padding: 1vw;
      font-size: 1.5vw;
      border-radius: 0.5vw;
      border: 0.1vw solid #2d2d2d;
      animation: Prompt 1.5s linear;
    }

    @keyframes Prompt {
      0% {
        opacity: 1;
      }

      100% {
        opacity: 0;
      }
    }
  }
}
</style>
