<script setup lang="ts">
import { computed, ref } from "vue"
import { type IListItem, messageData, notifyData, todoData } from "./data"
import NotifyList from "./NotifyList.vue"
import { Bell } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"

/** 标签模型 */
type TabNameType = "通知" | "消息" | "待办"

/** 通知消息 默认数据模型 */
interface IDataItem {
  name: TabNameType
  type: "primary" | "success" | "warning" | "danger" | "info"
  list: IListItem[]
}

/** 所有数据 */
const data = ref<IDataItem[]>([
  // 通知数据
  {
    name: "通知",
    type: "primary",
    list: notifyData
  },
  // 消息数据
  {
    name: "消息",
    type: "danger",
    list: messageData
  },
  // 待办数据
  {
    name: "待办",
    type: "warning",
    list: todoData
  }
])

/** 角标当前值 */
const badgeValue = computed(() => {
  let value = 0
  for (let i = 0; i < data.value.length; i++) {
    value += data.value[i].list.length
  }
  return value
})
/** 角标（徽章）最大值 */
const badgeMax = 99
/** 面板宽度 */
const popoverWidth = 350
/** 当前 Tab */
const activeName = ref<TabNameType>("通知")

/** 跳转到更多页面 */
const handleHistory = () => {
  /** 示例为弹出提示消息 */
  ElMessage.success(`跳转到${activeName.value}历史页面`)
}
</script>

<template>
  <div class="notify">
    <!-- 气泡卡片 -->
    <ElPopover placement="bottom" :width="popoverWidth" trigger="click">
      <!-- 气泡卡片插槽 触发 popover 显示的 HTML 元素-->
      <template #reference>
        <!-- 徽章 数据为模拟数据，应该改成动态获取 -->
        <ElBadge :value="badgeValue" :max="badgeMax" :hidden="badgeValue === 0">
          <!-- 文字提示 effect：主题 -->
          <ElTooltip effect="dark" content="消息通知" placement="bottom">
            <!-- 图标 -->
            <ElIcon :size="20">
              <Bell />
            </ElIcon>
          </ElTooltip>
        </ElBadge>
      </template>
      <!-- 气泡卡片->默认插槽 -->
      <template #default>
        <!-- 标签页 -->
        <ElTabs v-model="activeName" stretch>
          <!-- 标签容器 -->
          <ElTabPane v-for="(item, index) in data" :name="item.name" :key="index">
            <template #label>
              <ElBadge :value="item.list.length" :max="badgeMax" :type="item.type">
                {{ item.name }}
              </ElBadge>
            </template>
            <template #default>
              <ElScrollbar height="400px">
                <NotifyList :list="item.list" />
              </ElScrollbar>
            </template>
          </ElTabPane>
        </ElTabs>
        <div class="notify-history">
          <ElButton link @click="handleHistory">查看{{ activeName }}历史</ElButton>
        </div>
      </template>
    </ElPopover>
  </div>
</template>

<style lang="scss" scoped>
.notify {
  margin-right: 10px;
  // 引用自定义属性
  color: var(--el-text-color-regular);
}
.notify-history {
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid var(--el-border-color);
}
</style>
