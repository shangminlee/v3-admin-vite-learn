import { type App } from "vue"
import { loadElementPlus } from "./element-plus/index"
import { loadElementPlusIcon } from "./element-plus-icon/index"
import { loadVxeTable } from "./vxe-table/index"

/** 注册所有的插件 */
export function loadPlugins(app: App) {
  loadElementPlus(app)
  loadElementPlusIcon(app)
  loadVxeTable(app)
}
