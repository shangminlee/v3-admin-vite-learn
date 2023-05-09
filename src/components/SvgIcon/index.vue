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
const symbolId = computed(() => `${props.prefix}-${props.name}`)
</script>

<template>
  <svg class="svg_icon" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<style lang="scss" scoped>
.svg_icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
