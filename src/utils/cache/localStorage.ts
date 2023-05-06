import CacheKey from "@/constants/cacheKey"
import { type ThemeName } from "@/hooks/useTheme"

/** 获取侧边栏状态 */
export const getSidebarStatus = () => {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS)
}

/** 设置侧边栏状态 */
export const setSidebarStatus = (sidebarStatus: "opened" | "closed") => {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus)
}

/** 获取当前主题名称 */
export const getActiveThemeName = () => {
  return localStorage.getItem(CacheKey.ACTIVE_THEME_NAME) as ThemeName
}
/** 设置当前主题名称 */
export const setActiveThemeName = (themeName: ThemeName) => {
  localStorage.setItem(CacheKey.ACTIVE_THEME_NAME, themeName)
}
