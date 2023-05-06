import { type App } from "vue"
import ElementPlus from "element-plus"

/** 载入 ElementPlus 组件 */
export function loadElementPlus(app: App) {
  /** Element Plus 组件完整引入 */
  app.use(ElementPlus)
}
