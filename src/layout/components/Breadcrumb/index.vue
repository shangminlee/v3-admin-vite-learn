<script setup lang="ts">
import { ref, watch } from "vue"
import { RouteLocationMatched, useRoute, useRouter } from "vue-router"
import { compile } from "path-to-regexp"

/** 当前路由 */
const route = useRoute()
/** 路由 */
const router = useRouter()

/** 面包屑 */
const breadcrumbs = ref<RouteLocationMatched[]>([])

/** 获取面包屑 */
const getBreadcrumb = () => {
  breadcrumbs.value = route.matched.filter((item) => {
    return item.meta && item.meta.title && item.meta.breadcrumb !== false
  })
}

/** 编译路径 */
const pathCompile = (path: string) => {
  const { params } = route
  const toPath = compile(path)
  return toPath(params)
}

/** 处理跳转链接 */
const handleLink = (item: RouteLocationMatched) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect as string)
    return
  }
  router.push(pathCompile(path))
}

/** 监控路径变化 */
watch(
  () => route.path,
  (path) => {
    if (path.startsWith("/redirect/")) {
      return
    }
    getBreadcrumb()
  }
)
getBreadcrumb()
</script>

<template>
  <ElBreadcrumb class="app-breadcrumb">
    <ElBreadcrumbItem v-for="(item, index) in breadcrumbs" :key="item.path">
      <span v-if="item.redirect === 'noRedirect' || index === breadcrumbs.length - 1" class="no-redirect">
        {{ item.meta.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">
        {{ item.meta.title }}
      </a>
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

// 匹配 “同时” 具有 app-breadcrumb el-breadcrumb 两类的元素
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: var(--v3-navigationbar-height);
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
