import { type RouteRecordRaw } from "vue-router"
import { defineStore } from "pinia"
import { ref } from "vue"
import asyncRouteSettings from "../../config/async-route"
import { asyncRoutes, constantRoutes } from "@/router"
import store from "../index"

/** 是否包含权限 */
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  // 判断路由是否包含 meta roles 信息
  if (route.meta && route.meta.roles) {
    return roles.some((role) => {
      if (route.meta?.roles !== undefined) {
        return route.meta.roles.includes(role)
      }
      return false
    })
  }
  return true
}

/** 过滤异步路由 */
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

/** 权限状态管理 */
export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<RouteRecordRaw[]>([])
  const dynamicRoutes = ref<RouteRecordRaw[]>([])

  const setRoutes = (roles: string[]) => {
    let accessedRoutes
    // 根据配置判断是否开启了动态路由
    if (!asyncRouteSettings.open) {
      accessedRoutes = asyncRoutes
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    routes.value = constantRoutes.concat(accessedRoutes)
    dynamicRoutes.value = accessedRoutes
  }
  return { routes, dynamicRoutes, setRoutes }
})

/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
