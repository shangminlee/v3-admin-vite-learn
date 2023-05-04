/** 所有 api 接口的响应数据都应该遵守该格式 */
interface IApiResponseData<T> {
  code: number
  message: string
  data?: T
}
