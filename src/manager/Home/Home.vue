<script lang="ts" setup>

</script>

<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div>
          <el-card >
            <template #header>
              <div class="card-header">
                <span>简介</span>
              </div>
            </template>
            <div>
              <span>
                该项目为简单的通用的后台管理模板,支持 <el-text style="color:purple;">夜间模式</el-text>
                <el-divider content-position="left">所用技术库</el-divider>
                Vue3.2+TypeScript+Vite+pinia
                <el-divider content-position="left">页面构建</el-divider>
                Animate作为Css动画，Element Plus搭建页面
                <el-divider content-position="left">其余技术</el-divider>
                登录验证码采用了谷歌的reCAPTCHA在线验证
              </span>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <el-card>
            <template #header>
              <div class="card-header">
                <span>仓库地址</span>
              </div>
            </template>
            <div>
              <el-link type="primary">https://github.com/MissZeda/front-web-practice.git</el-link>
            </div>
          </el-card>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<style scoped>

</style>
