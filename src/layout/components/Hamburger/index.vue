<script lang="ts" setup>
import { Expand, Fold } from "@element-plus/icons-vue"

/** 定义属性 */
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

/** 触发事件 */
const emit = defineEmits<{
  (e: "toggle-click"): void
}>()

/** 切换菜单点击事件 */
const toggleClick = () => {
  emit("toggle-click")
}
</script>

<template>
  <div @click="toggleClick">
    <ElIcon :size="20" class="icon">
      <Fold v-if="props.isActive" />
      <Expand v-else />
    </ElIcon>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  vertical-align: middle;
}
</style>
