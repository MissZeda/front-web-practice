import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import {ElMessage} from "element-plus";
import clientRouter from './clientRouter'
import manageRouter from './manageRouter'

const routes: RouteRecordRaw[] = [
  // 公共的登录界面
  {path: '/', name: 'Login', component: () => import('../views/Login.vue')},
  // 管理端
  manageRouter,
  // 客户端
  clientRouter,

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 创建全局的路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/Index') {
    if(!window.sessionStorage.getItem("token")){
      router.push("/");
      ElMessage.error("请先登录")
    }
  } else {
    next()
  }
  next()
})


export default router
