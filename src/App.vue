<script setup lang="ts">
import { h } from "vue"
import { useTheme } from "./hooks/useTheme"
import zhCN from "element-plus/lib/locale/lang/zh-cn"
import { ElNotification } from "element-plus"

const { initTheme } = useTheme()
/** 初始化主题 */
initTheme()
/** 将 Element Plus 的语言设置为中文 */
const locale = zhCN

ElNotification({
  title: "Hello",
  message: h("a", { style: "color: teal" }, "初始化通知"),
  duration: 0,
  position: "bottom-right"
})
</script>

<template>
  <ElConfigProvider :locale="locale">
    <RouterView />
  </ElConfigProvider>
</template>
