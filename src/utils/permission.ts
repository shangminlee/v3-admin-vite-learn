import { useUserStoreHook } from "@/store/modules/user"

/** 全局权限判断函数， 类似 v-permission 的功能 */
export const checkPermission = (value: string[]): boolean => {
  if (value && value instanceof Array && value.length > 0) {
    const roles = useUserStoreHook().roles
    const permissionRoles = value
    return roles.some((role) => {
      return permissionRoles.includes(role)
    })
  } else {
    console.error("need roles! Like checkPermission(['admin', 'editor'])")
    return false
  }
}
