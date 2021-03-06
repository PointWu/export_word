import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import word from '../components/word.vue'
import DataReport from '../components/user/DataReport'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/DataReport' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/Welcome', component: Welcome },
      { path: '/users', component: Users }
    ]
  },
  { path: '/word', component: word },
  { path: '/DataReport', component: DataReport }
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 代表从哪个路径跳转而来
//   // next 是一个函数，表示放行
//   //  next() 放行 next('/login') 强制跳转

//   if (to.path === '/login') {
//     return next()
//   }
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   // 没有token 强制跳转到登录页
//   if (!tokenStr) {
//     return next('/login')
//   }
//   next()
// })
export default router
