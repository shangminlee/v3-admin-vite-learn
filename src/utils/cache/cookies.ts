import CacheKey from "@/constants/cacheKey"
import Cookies from "js-cookie"

/** 获取Token */
export const getToken = () => {
  return Cookies.get(CacheKey.TOKEN)
}

/** 设置Token */
export const setToken = (token: string) => {
  Cookies.set(CacheKey.TOKEN, token)
}

/** 删除token */
export const removeToken = () => {
  Cookies.remove(CacheKey.TOKEN)
}
