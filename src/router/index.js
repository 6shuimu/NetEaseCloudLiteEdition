import { createRouter,createWebHashHistory } from 'vue-router'

// 导入主页面
import app from '@/views/app.vue'
// 导入推荐页面
import recommend from '@/views/recommend.vue'
// 热门
import Mymusic from '@/views/Mymusic.vue'
// 分类
import classify from '@/views/classify.vue'
// 分类下的歌手
import singer from '@/views/Taxonomy/singer.vue'
// 分类下的歌单
import Playlist from '@/views/Taxonomy/Playlist.vue'
// 分类下的Mv
import Mv from '@/views/Taxonomy/Mv.vue'
// 分类下的电台
import RadioStation from '@/views/Taxonomy/RadioStation.vue'

const routes = [
  {
    path: '/',
    name: 'app',
    component: app,
    redirect: '/Mymusic',
    children: [
      // 推荐页面
      {
        path: 'recommend',
        component: recommend
      },

      // 分类
      {
        path: 'classify',
        component: classify,
        redirect: 'classify/singer',
        children: [
          // 分类下的歌手
          {
            path: 'singer',
            component: singer
          },
          // 分类下的歌单
          {
            path: 'Playlist',
            component: Playlist
          },
          // 分类下的Mv
          {
            path: 'Mv',
            component: Mv
          },
          // 分类下的电台
          {
            path: 'RadioStation',
            component: RadioStation
          }
        ]
      },
      
      // 我的音乐
      {
        path: 'Mymusic',
        component: Mymusic,
      },
    ]
  },

];

const router = createRouter({
  history:createWebHashHistory(),
  routes
})

export default router