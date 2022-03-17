import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入
import Home from '@/views/Home/Home.vue'
import User from '@/views/User/User.vue'

// 把 VueRouter 安装为插件
Vue.use(VueRouter)

// 路由规则的数组
const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home,
    meta: {
      isRecord: true,
      top: 0
    }
  },
  { path: '/user', component: User }
]

// 创建路由对象
const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    console.log(to.meta.top)
    // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   return { x: 0, y: to.meta.top || 0 }
    // }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition)
        } else {
          resolve({ x: 0, y: to.meta.top || 0 })
        }
      }, 100)
    })
  }
})

export default router
