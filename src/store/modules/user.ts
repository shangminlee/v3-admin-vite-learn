import { defineStore } from "pinia"
import { getToken, setToken } from "@/utils/cache/cookies"
import { ref } from "vue"
import { usePermissionStore } from "./permission"
import { useTagViewStore } from "./tags-view"
import { ILoginRequestData } from "@/api/login/types/login"
import { getUserInfoApi, loginApi } from "@/api/login"
import { LoginResponseData, UserInfoResponseData } from "../../api/login/types/login"
import asyncRouteSettings from "@/config/async-route"
import { resetRouter } from "../../router/index"
import { RouteRecordRaw } from "vue-router"
import router from "../../router/index"
import { removeToken } from "../../utils/cache/cookies"
import store from "@/store"

export const useUserStore = defineStore("user", () => {
  // 令牌
  const token = ref<string>(getToken() || "")
  // 角色列表
  const roles = ref<string[]>([])
  // 用户名
  const username = ref<string>("")
  // 权限状态管理
  const permissionStore = usePermissionStore()
  // 标签状态管理
  const tagViewStore = useTagViewStore()

  /** 设置角色数组 */
  const setRoles = (value: string[]) => {
    roles.value = value
  }

  /** 登录 */
  const login = (loginData: ILoginRequestData) => {
    return new Promise((resolve, reject) => {
      loginApi({
        username: loginData.username,
        password: loginData.password,
        code: loginData.code
      })
        .then((res: LoginResponseData) => {
          setToken(res.data!.token)
          token.value = res.data!.token
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /** 获取用户信息 */
  const getInfo = () => {
    return new Promise((resolve, reject) => {
      getUserInfoApi()
        .then((res: UserInfoResponseData) => {
          const data = res.data!
          username.value = data.username
          // 验证返回的 roles 是否是一个非空数组
          if (data.roles && data.roles.length > 0) {
            roles.value = data.roles
          } else {
            roles.value = asyncRouteSettings.defaultRoles
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /** 切换角色 */
  const changeRoles = async (role: string) => {
    const newToken = "token-" + role
    token.value = newToken
    setToken(newToken)
    await getInfo()
    permissionStore.setRoutes(roles.value)
    resetRouter()
    permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
    _resetTagsView()
  }

  /** 登出 */
  const logout = () => {
    removeToken()
    token.value = ""
    roles.value = []
    resetRouter()
    _resetTagsView()
  }

  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }

  /** 重置 visited views 和 cached views */
  const _resetTagsView = () => {
    tagViewStore.delAllVisitedViews()
    tagViewStore.delAllCachedViews()
  }

  return {
    token,
    roles,
    username,
    setRoles,
    login,
    getInfo,
    changeRoles,
    logout,
    resetToken
  }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
