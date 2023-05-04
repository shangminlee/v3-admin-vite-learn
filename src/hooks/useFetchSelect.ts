import { onMounted, ref } from "vue"
type OptionValueType = string | number

/** Select 需要的数据格式 */
interface ISelectOption {
  value: OptionValueType
  label: string
  disabled?: boolean
}

/** 接口响应格式 */
interface IApiData {
  code: number
  data: ISelectOption[]
  message: string
}

/** 入参格式 */
interface IFetchSelectProps {
  api: () => Promise<IApiData>
}

/** select 选择项 */
export function useFetchSelect(props: IFetchSelectProps) {
  const { api } = props
  const loading = ref<boolean>(false)
  const options = ref<ISelectOption[]>([])
  const value = ref<OptionValueType>("")

  /** 调用接口获取数据 */
  const loadData = () => {
    loading.value = true
    options.value = []
    api()
      .then((res: IApiData) => {
        options.value = res.data
      })
      .finally(() => {
        loading.value = false
      })
  }

  onMounted(() => {
    loadData()
  })

  return {
    loading,
    options,
    value
  }
}
