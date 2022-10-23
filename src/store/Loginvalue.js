// 导入pinia
import { defineStore } from 'pinia'

export const useLogin = defineStore('Login',{
  state:()=>{
    return {
      // 显示或隐藏二维码的重新获取页面
      ShowHide:false,
      // 显示或隐藏登录页面
      ShowHidelogin:false,
      // 二维码加载显示或隐藏
      LoadTheDisplay:false,
      // 是否有登录
      LoginSuccessful:false,
      // 登录成功后显现
      LoginComplete:false,
    }
  }
})