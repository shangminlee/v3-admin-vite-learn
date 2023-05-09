import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router"

/** 页面布局 */
const Layout = () => import("@/layout/index.vue")

/** 重定向页面 */
const RedirectPage: RouteRecordRaw = {
  path: "/redirect",
  component: Layout,
  meta: {
    hidden: true
  },
  children: [
    {
      path: "/redirect/:path(.*)",
      component: () => import("@/views/redirect/index.vue")
    }
  ]
}
/** 403页面 */
const ForbiddenPage = {
  path: "/403",
  component: () => import("@/views/error-page/403.vue"),
  meta: {
    hidden: true
  }
}

/** 404页面 */
const NotFoundPage = {
  path: "/404",
  component: () => import("@/views/error-page/404.vue"),
  meta: {
    hidden: true
  },
  alias: "/:pathMatch(.*)*"
}

/** 登录页面 */
const LoginPage = {
  path: "/login",
  component: () => import("@/views/login/index.vue"),
  meta: {
    hidden: true
  }
}

/** 首页 */
const DashboardPage = {
  path: "/",
  component: Layout,
  redirect: "/dashboard",
  children: [
    {
      path: "dashboard",
      component: () => import("@/views/dashboard/index.vue"),
      name: "Dashboard",
      meta: {
        title: "首页",
        svgIcon: "dashboard",
        affix: true
      }
    }
  ]
}

/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [RedirectPage, ForbiddenPage, NotFoundPage, LoginPage, DashboardPage]

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
