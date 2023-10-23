import { createRouter, createWebHistory } from 'vue-router'
import {ElMessage} from "element-plus";

const routes = [
  {path: '/', name: 'Login', component: () => import('../views/Login.vue')},
  {path: "/Index", name: "Index", component: () => import('../views/admin/Index.vue')},
  {path: "/TestPage", name: "TestPage", component: () => import('../views/user/TestPage.vue')},

]


const router = createRouter({
  history: createWebHistory(),
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
