<script lang="ts" setup>
import { computed } from "vue"
import { useRouter } from "vue-router"
import { useAppStore } from "@/store/modules/app"
import { useSettingsStore } from "@/store/modules/settings"
import { useUserStore } from "@/store/modules/user"
import { UserFilled } from "@element-plus/icons-vue"
import Breadcrumb from "../Breadcrumb/index.vue"
import Hamburger from "../Hamburger/index.vue"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import Screenfull from "@/components/Screenfull/index.vue"
import Notify from "@/components/Notify/index.vue"

/** 路由 */
const router = useRouter()
/** 应用状态管理 */
const appStore = useAppStore()
/** 各种设置的状态管理 */
const settingsStore = useSettingsStore()
/** 用户状态管理 */
const userStore = useUserStore()

/** 侧边栏 */
const sidebar = computed(() => {
  return appStore.sidebar
})
/** 通知 */
const showNotify = computed(() => {
  return settingsStore.showNotify
})
/** 主题 */
const showThemeSwitch = computed(() => {
  return settingsStore.showThemeSwitch
})
/** 全屏 */
const showScreenfull = computed(() => {
  return settingsStore.showScreenfull
})

/** 切换侧边栏事件 */
const toggleSidebar = () => {
  appStore.toggleSidebar(false)
}
/** 登出事件 */
const logout = () => {
  userStore.logout()
  router.push("/login")
}
</script>

<template>
  <div class="navigation-bar">
    <!-- 侧边栏展开/缩放 -->
    <Hamburger :is-active="sidebar.opened" class="hamburger" @toggle-click="toggleSidebar" />
    <!-- 面包屑导航 -->
    <Breadcrumb class="breadcrumb" />
    <!-- 导航栏左侧各种操作 -->
    <div class="right-menu">
      <!-- 全屏按钮 -->
      <Screenfull v-if="showScreenfull" class="right-menu-item" />
      <!-- 主题切换 -->
      <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" />
      <!-- 通知 -->
      <Notify v-if="showNotify" class="right-menu-item" />
      <!-- 账号各种操作 -->
      <ElDropdown class="right-menu-item">
        <!-- 头像和用户姓名 -->
        <div class="right-menu-avatar">
          <ElAvatar :icon="UserFilled" :size="30" />
          <span>{{ userStore.username }}</span>
        </div>
        <!-- 下拉框操作 -->
        <template #dropdown>
          <ElDropdownMenu>
            <a target="_blank" href="https://juejin.cn/post/7089377403717287972">
              <ElDropdownItem>中文文档</ElDropdownItem>
            </a>
            <a target="_blank" href="https://github.com/un-pany/v3-admin-vite">
              <ElDropdownItem>GitHub</ElDropdownItem>
            </a>
            <a target="_blank" href="https://gitee.com/un-pany/v3-admin-vite">
              <ElDropdownItem>Gitee</ElDropdownItem>
            </a>
            <ElDropdownItem divided @click="logout">
              <span style="display: block">退出登录</span>
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation-bar {
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  background: #fff;
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    float: left;
    // 参考 Bootstrap 的响应式设计 WIDTH = 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  .right-menu {
    float: right;
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #606266;
    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
      .right-menu-avatar {
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 10px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
