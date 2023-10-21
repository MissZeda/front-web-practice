import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {path: '/', name: 'Login', component: () => import('../views/Login.vue')},

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
      alert("请登录")
    }
  } else {
    next()
  }
  next()
})
export default router
