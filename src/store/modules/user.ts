import { defineStore } from "pinia"
import { getToken } from "@/utils/cache/cookies"
import { ref } from "vue"
import { usePermissionStore } from "./permission"
import { useTagViewStore } from "./tags-view"

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "")
  const roles = ref<string[]>([])
  const username = ref<string>("")

  const permissionStore = usePermissionStore()
  const tagViewStore = useTagViewStore()

  /** 设置角色数组 */
  const setRoles = (value: string[]) => {
    roles.value = value
  }
})
