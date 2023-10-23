<script setup lang="ts">
import userApi from '../../api/user/index.ts'

async function getUserInfo(){
  const res = await userApi.getUserInfo();
  console.log(res)
}

getUserInfo()


</script>

<template>
<div>
  主页面测试
</div>
</template>

<style scoped>

</style>
