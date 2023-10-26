<script lang="ts" setup>
import AppMenu from "../components/AppMenu.vue";
import {ref} from 'vue'
import {Fold} from '@element-plus/icons-vue';
import AppHeader from "../components/AppHeader.vue";
import AppHeaderBreadcrumb from "../components/AppHeaderBreadcrumb.vue";

let isCollapse= ref(false)
const toggle = ():void=>{
  isCollapse.value = !isCollapse.value
}

</script>

<template>
  <div class="common-layout">
    <el-container class="container">
      <el-aside class="aside" :style="{'width':(isCollapse?'63px':'230px')}">
        <AppMenu :isCollapse="isCollapse"/>
      </el-aside>
      <el-container>
        <el-header class="header">
          <el-row>
            <el-col :span="1">
              <div style="padding-top: 10px">
                <el-button type="text" @click="toggle"><el-icon  :size="25"><fold /></el-icon></el-button>
              </div>
              <!-- el-icon size:number -->
            </el-col>
            <el-col :span="4" :push="0">
              <div style="padding-top: 18px">
                <AppHeaderBreadcrumb></AppHeaderBreadcrumb>
              </div>
            </el-col>
            <el-col :span="12" :offset="5">
              <app-header>
            </app-header>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="main">

            <router-view class="card-box"></router-view>
         </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.container{
  height: 100vh;
  .aside{
    overflow: hidden;
  }
  .header{
    height:55px;

  }
  .main{
    .card-box{
      height: 98%;
      animation-name:lightSpeedInRight ;
      animation-duration: 1s;
    }
  }
}
</style>
