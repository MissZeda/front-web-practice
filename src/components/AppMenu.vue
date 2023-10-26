<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

import manageRouter from '../router/manageRouter'
const props = defineProps(['isCollapse'])
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <div class="logo">
    <div class="emit-box">
      <el-image  src="https://element-plus.org/images/element-plus-logo.svg" :fit="fit" >
      </el-image>
    </div>
  </div>
  <el-menu
    :collapse="props.isCollapse"
    :collapse-transition="false"
    @open="handleOpen"
    @close="handleClose"
    text-color="#606266"
    active-text-color="#2F74FF"
    :unique-opened="true"
    class="menu"
    @select="handleSelect"
    :default-active='selectKey'
    router
  >
    <template v-for="(first, index) in manageRouter.children">
      <template v-if="first.children ">
        <el-sub-menu :index="first.path" :key="index">
          <!-- 二级菜单循遍历 -->
          <el-menu-item-group v-for="(second, sec_index) in first.children" :key="sec_index">
            <el-menu-item :index="first.path + '/' + second.path">
<!--            添加图标-->
              {{second.name}}
            </el-menu-item>
          </el-menu-item-group>
          <template #title>
            <el-icon><component :is="first.meta.icon"/></el-icon>
            <span>{{first.name}}</span>
          </template>
        </el-sub-menu>
      </template>
      <template v-else>
        <!-- 一级菜单项 -->
        <el-menu-item :index="'/manage/home'">
          <el-icon><component :is="first.meta.icon"/></el-icon>
          <span>{{first.name}}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<style scoped lang="scss">
.logo{
  height:50px;
  margin: 0;
  padding-top: 5px;
}
.menu{
  min-height: 100vh;
}
</style>
