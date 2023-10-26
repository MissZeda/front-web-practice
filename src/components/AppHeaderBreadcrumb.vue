<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const breadcrumbs = ref<Array<any>>([]);
const route = useRoute();

const generateBreadcrumbs = (to) => {
  breadcrumbs.value = [];

  if (to.matched) {
    to.matched.forEach(route => {
      if (route.meta && route.meta.breadcrumb) {
        breadcrumbs.value.push({
          to: route.path,
          text: route.meta.breadcrumb
        });
      }
    });
  }
};

onMounted(() => {
  generateBreadcrumbs(route);
});

watch(route, (to) => {
  generateBreadcrumbs(to);
});
</script>

<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/manage/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="crumb in breadcrumbs" :key="crumb.to">
        <el-breadcrumb-item :to="crumb.to" >{{ crumb.text }}</el-breadcrumb-item>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 其他页面内容 -->
  </div>
</template>

<style scoped>

</style>
