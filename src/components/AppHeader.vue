<script setup lang="ts">
import {useUserStore} from "../pinia/store.ts";
import {onMounted, ref} from "vue";
import {useDark, useToggle} from "@vueuse/core";
import {ArrowDown, Moon, Sunny, Sunrise} from "@element-plus/icons-vue";
import router from "../router";

const userStore = useUserStore()
const user = userStore.user

const theme = ref<boolean>(false)

const isDark = useDark({
  // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
  storageKey: 'useDarkKEY',
  // 暗黑class名字
  valueDark: 'dark',
  // 高亮class名字
  valueLight: 'light',
})

onMounted(() => {
  if(window.localStorage.getItem("useDarkKEY")==='auto'){
    theme.value = true;
  }else{
    theme.value = false
  }
})

const toggle = useToggle(isDark);
const defaultAvatar = ref<string>('../../src/assets/default-avatar.png');


const goManageIndex = () => {
  router.push({path: '/UserCenter/UserIndex'});
}

const logout = () => {
  window.sessionStorage.setItem("token", "");
  router.push({path: '/'});
}
</script>
<template>
<div>
  <el-row :justify="'end'">
    <el-col :span="2" class="center-item">
      <div>
        <el-switch
          inline-prompt
          v-model="theme"
          @click="toggle()"
          :active-action-icon="Sunrise"
          size="large"
          active-color="#606266"
          :inactive-action-icon="Moon"

        >
        </el-switch>
      </div>
    </el-col>
    <el-col :span="1" class="right-item" :offset="2">
      <div >
        <el-avatar :src="user.avatar==null?defaultAvatar:user.avatar" size="default">
        </el-avatar>
      </div>
    </el-col>
    <el-col :span="3" :push="1" class="left-item">
      <span class="el-dropdown-link">
     用户名
    </span>
    </el-col>
    <el-col :span="1" :push="3">
     <div class="setting-item">
       <el-dropdown>
    <span class="el-dropdown-link">
     设置
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
         <template #dropdown>
           <el-dropdown-menu>
             <el-dropdown-item @click="goManageIndex">个人中心</el-dropdown-item>
             <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
           </el-dropdown-menu>
         </template>
       </el-dropdown>
     </div>
    </el-col>
  </el-row>
</div>
</template>

<style scoped>
.left-item{
  padding-top: 15px;
}
.center-item{
  padding-top: 8px;
}
.right-item{
  padding-top: 8px;
}
.setting-item{
  padding-top: 18px;

}
</style>
