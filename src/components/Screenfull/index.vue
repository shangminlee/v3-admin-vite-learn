<script setup lang="ts">
import { onUnmounted, ref } from "vue"
import screenfull from "screenfull"
import { ElMessage } from "element-plus"

const props = defineProps({
  /** 全屏的元素，默认是 html */
  element: {
    type: String,
    default: "html"
  },
  /** 打开全屏提示语 */
  openTips: {
    type: String,
    default: "全屏"
  },
  /** 关闭全屏提示语 */
  exitTips: {
    type: String,
    default: "退出全屏"
  }
})
// 提示
const tips = ref<string>(props.openTips)
// 是否开启了全屏
const isFullscreen = ref<boolean>(false)

// 触发全屏
const click = () => {
  // 需要全屏的元素，默认为整个Html
  const dom = document.querySelector(props.element) || undefined
  // 判断浏览器是否支持全屏
  if (!screenfull.isEnabled) {
    ElMessage.warning("您的浏览器不支持全屏")
    return
  }
  // 调用全屏“切换”接口
  screenfull.toggle(dom)
}

const change = () => {
  isFullscreen.value = screenfull.isFullscreen
  tips.value = screenfull.isFullscreen ? props.exitTips : props.openTips
}

// 全屏状态发生改变时（进入或者退出），执行的回调方法
screenfull.on("change", change)

onUnmounted(() => {
  if (screenfull.isEnabled) {
    screenfull.off("change", change)
  }
})
</script>

<template>
  <div @click="click">
    <!-- 文字提示 -->
    <ElTooltip effect="dark" :content="tips" placement="bottom">
      <SvgIcon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
    </ElTooltip>
  </div>
</template>
