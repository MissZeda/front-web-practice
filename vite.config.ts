import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  server:{
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8088/',  //你要跨域访问的网址
        changeOrigin: true,   // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径把路径变成空字符
      },
      '/siteverify':{
        target: 'https://recaptcha.net/recaptcha/api/siteverify',  //你要跨域访问的网址
        changeOrigin: true,   // 允许跨域
        rewrite: (path) => path.replace(/^\/siteverify/, '') // 重写路径把路径变成空字符
      }
    }
  }
})
