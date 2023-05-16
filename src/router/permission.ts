import NProgress from "nprogress"
import "nprogress/nprogress.css"
import router from "@/router"
import { useUserStore } from "@/store/modules/user"
import { usePermissionStore } from "@/store/modules/permission"
import asyncRouteSettings from "@/config/async-route"

// 进度条配置
NProgress.configure({ showSpinner: false })

// 路由守卫 转发路由“之前”
router.beforeEach(async (to, _form, next) => {
  NProgress.start()

  /** 用户信息 */
  const userStroe = useUserStore()

  /** 权限管理 */
  const permissionStore = usePermissionStore()

  userStroe.setRoles(asyncRouteSettings.defaultRoles)
  permissionStore.setRoutes(asyncRouteSettings.defaultRoles)

  next()
})

// 路由守卫 转发路由“之后”
router.afterEach(() => {
  NProgress.done()
})
