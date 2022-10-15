import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 导入图标
import './assets/iconfont/iconfont.css'
// 导入Pinia
import { createPinia } from 'pinia'
// 导入router
import router from './router'
// 导入vue-axios插件
import VueAxios from 'vue-axios'
// 导入axios
import axios from 'axios'

const app = createApp(App);

const Pinia = createPinia();

app.use(router).use(Pinia).use(VueAxios,axios).mount('#app')
