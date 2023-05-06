/** 登录数据模型 */
export interface ILoginRequestData {
  username: "admin" | "editor"
  password: string
  code: string
}

/** 验证码 */
export type LoginCodeResponseData = IApiResponseData<string>

/** Token */
export type LoginResponseData = IApiResponseData<{ token: string }>

/** 用户信息 */
export type UserInfoResponseData = IApiResponseData<{ username: string; roles: string[] }>
