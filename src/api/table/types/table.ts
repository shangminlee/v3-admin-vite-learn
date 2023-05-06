/** 创建表格请求数据 */
export interface ICreateTableRequestData {
  username: string
  password: string
}

/** 更新表格数据 */
export interface IUpdateTableRequestData {
  id: string
  username: string
  password?: string
}

/** 表格分页数据 */
export interface IGetTableRequestData {
  currentPage: number
  size: number
  username?: string
  phone?: string
}

/** 表格数据详情 */
export interface IGetTableData {
  createTime: string
  email: string
  id: string
  phone: string
  roles: string
  status: boolean
  username: string
}

/** 表格数据 */
export type GetTableResponseData = IApiResponseData<{
  list: IGetTableData[]
  total: number
}>
