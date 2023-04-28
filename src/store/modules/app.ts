import { defineStore } from "pinia"
import { reactive, ref } from "vue"
import { getSidebarStatus, setSidebarStatus } from "@/utils/cache/localStorage"

/** 设备类型 */
export enum DeviceType {
  Mobile,
  Desktop
}

/** 侧边栏属性 */
interface ISidebar {
  opened: boolean
  withoutAnimation: boolean
}

/** 应用状态管理 */
export const useAppStore = defineStore("app", () => {
  // 侧边栏属性
  const sidebar: ISidebar = reactive({
    opened: getSidebarStatus() !== "closed",
    withoutAnimation: false
  })
  // 设备类型
  const device = ref<DeviceType>(DeviceType.Desktop)

  // 切换侧边栏
  const toggleSidebar = (withoutAnimation: boolean) => {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = withoutAnimation
    if (sidebar.opened) {
      setSidebarStatus("opened")
    } else {
      setSidebarStatus("closed")
    }
  }

  // 关闭侧边栏
  const closeSidebar = (withoutAnimation: boolean) => {
    sidebar.opened = false
    sidebar.withoutAnimation = withoutAnimation
    setSidebarStatus("closed")
  }

  // 切换设备
  const toggleDevice = (value: DeviceType) => {
    device.value = value
  }
  return { device, sidebar, toggleSidebar, closeSidebar, toggleDevice }
})
