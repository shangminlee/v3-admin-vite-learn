<script setup lang="ts">
import { computed } from "vue"

// 属性，用于接受父组件的传递值
const props = defineProps({
  prefix: {
    type: String,
    default: "icon"
  },
  name: {
    type: String,
    required: true
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <!-- aria-hidden  定义一个元素及其子元素是否对屏幕阅读器等辅助设备可见 -->
  <svg class="svg_icon" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<style lang="scss" scoped>
.svg_icon {
  // em 一种相对单位，具体大小会继承父元素的字体大小
  width: 1em;
  height: 1em;
  // currentColor, 一个关键词，意思是继承自父元素的 color 值
  fill: currentColor;
  overflow: hidden;
}
</style>
