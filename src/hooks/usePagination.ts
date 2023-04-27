import { reactive } from "vue"

interface IDefaultPaginationData {
  total: number
  currentPage: number
  pageSizes: number[]
  pageSize: number
  layout: string
}

type IPaginationData = Partial<IDefaultPaginationData>

/** 默认的分页参数 */
const defaultPaginationData: IDefaultPaginationData = {
  total: 0,
  currentPage: 1,
  pageSizes: [10, 20, 50],
  pageSize: 10,
  layout: "total, sizes, prev, pager, next, jumper"
}

export function usePagination(_paginationData: IPaginationData = {}) {
  /** 合并分页参数 */
  const paginationData = reactive(Object.assign({ ...defaultPaginationData }, _paginationData))

  /** 改变当前页码 */
  const handlerCurrentChange = (value: number) => {
    paginationData.currentPage = value
  }

  /** 改变页面数据量大小 */
  const handlerSizeChange = (value: number) => {
    paginationData.pageSize = value
  }

  return { paginationData, handlerCurrentChange, handlerSizeChange }
}
