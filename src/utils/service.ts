import axios, { InternalAxiosRequestConfig } from "axios"
import { ElMessage } from "element-plus"
import { get } from "lodash-es"

/** 创建请求实例 */
function createService() {
  // 创建一个 Axios 实例
  const service = axios.create()
  // 请求拦截
  service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => config,
    (error) => Promise.reject(error)
  )
  // 响应拦截
  service.interceptors.response.use(
    (response) => {
      // API 返回的数据
      const apiData = response.data as any
      // 接口状态码
      const code = apiData.code

      if (code === undefined) {
        ElMessage.error("接口类型错误")
        return Promise.reject(new Error("接口类型错误"))
      }

      switch (code) {
        // 0 代表接口成功
        case 0:
          return apiData
        default:
          ElMessage.error("接口异常")
          return Promise.reject(new Error("Error"))
      }
    },
    (error) => {
      // Http 状态码
      const status = get(error, "response.status")
      switch (status) {
        case 400:
          error.message = "请求错误"
          break
        case 401:
          // Token 过期时，直接退出登录并强制刷新页面（会重定向到登录页）
          useUserStoreHook().logout()
          location.reload()
          break
        case 403:
          error.message = "拒绝访问"
          break
        case 404:
          error.message = "请求地址出错"
          break
        case 408:
          error.message = "请求超时"
          break
        case 500:
          error.message = "服务器内部错误"
          break
        case 501:
          error.message = "服务未实现"
          break
        case 502:
          error.message = "网关错误"
          break
        case 503:
          error.message = "服务不可用"
          break
        case 504:
          error.message = "网关超时"
          break
        case 505:
          error.message = "HTTP 版本不受支持"
          break
        default:
          break
      }
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  )
}
