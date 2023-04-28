import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router"

/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = []

/**
 * 动态路由
 * 用来放置有权限(Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = []

const routerHistory = import.meta.env.VITE_ROUTER_HISTORY
const publicPath = import.meta.env.VITE_PUBLIC_PATH

/** 创建路由 */
const router = createRouter({
  history: routerHistory === "hash" ? createWebHashHistory(publicPath) : createWebHistory(publicPath),
  routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意： 所有动态路由都必须带有 name 属性，否则可能清理不干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    window.location.reload()
  }
}

export default router
