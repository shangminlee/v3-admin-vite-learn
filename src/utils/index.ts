import dayjs from "dayjs"

/** 格式化时间 */
export const formatDateTime = (time: string | number | Date) => {
  if (!time) {
    return "N/A"
  }
  const date = new Date(time)
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss")
}

/** 将全局 CSS 变量导入 JS 中使用 */
/** 1. 在 JavaScript 中获取 CSS 变量设置的主题色值等而进行逻辑运算
 *  2. 当 CSS 变量的值影响 JS 中某些计算或状态时获取其最新值
 *  3. 在某些环境下无法通过CSS访问变量时,通过JS来间接获取其值
 */
export const getCssVariableValue = (cssVariableName: string) => {
  let cssVariableValue = ""
  try {
    // 没有拿到值时，会返回空串
    cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
  } catch (error) {
    console.error(error)
  }
  return cssVariableValue
}
