import { RouteLocationNormalized } from "vue-router"
import { defineStore } from "pinia"
import { ref } from "vue"

/** 标签视图 */
export type ITagView = Partial<RouteLocationNormalized>

/** 标签状态管理 */
export const useTagViewStore = defineStore("tag-view", () => {
  // 访问过的页面
  const visitedViews = ref<ITagView[]>([])
  // 已缓存的页面
  const cachedViews = ref<string[]>([])

  // #region 新增
  const addVisitedView = (view: ITagView) => {
    // 判断路由是否已添加
    const condition = visitedViews.value.some((v, index) => {
      if (v.path === view.path) {
        if (v.fullPath !== view.fullPath) {
          // 通过全路径，防止 query 参数丢失
          visitedViews.value[index] = Object.assign({}, view)
        }
        return true
      }
      return false
    })
    // 如果未添加则把路由加入
    if (!condition) {
      visitedViews.value.push(Object.assign({}, view))
    }
  }

  const addCachedView = (view: ITagView) => {
    if (typeof view.name !== "string") {
      return
    }
    if (cachedViews.value.includes(view.name)) {
      return
    }
    if (view.meta?.keepAlive) {
      cachedViews.value.push(view.name)
    }
  }
  // #endregion

  // #region del 删除
  const delVisitedView = (view: ITagView) => {
    for (const [i, v] of visitedViews.value.entries()) {
      if (v.path === view.path) {
        visitedViews.value.splice(i, 1)
        break
      }
    }
  }

  const delCachedView = (view: ITagView) => {
    if (typeof view.name !== "string") {
      return
    }
    const index = cachedViews.value.indexOf(view.name)
    index > -1 && cachedViews.value.splice(index, 1)
  }
  // #endregion

  // #region delOthers 删除其他
  const delOthersVisitedViews = (view: ITagView) => {
    visitedViews.value = visitedViews.value.filter((v) => {
      return v.meta?.affix || v.path === view.path
    })
  }
  const delOthersCachedViews = (view: ITagView) => {
    if (typeof view.name !== "string") {
      return
    }
    const index = cachedViews.value.indexOf(view.name)
    if (index > -1) {
      cachedViews.value = cachedViews.value.slice(index, index + 1)
    } else {
      // index = -1 没有缓存
      cachedViews.value = []
    }
  }
  // #endregion

  // #region delAll 删除所有
  const delAllVisitedViews = () => {
    const affixTags = visitedViews.value.filter((tag) => tag.meta?.affix)
    visitedViews.value = affixTags
  }
  const delAllCachedViews = () => {
    cachedViews.value = []
  }
  // #endregion

  return {
    visitedViews,
    cachedViews,
    addVisitedView,
    addCachedView,
    delVisitedView,
    delCachedView,
    delOthersVisitedViews,
    delOthersCachedViews,
    delAllVisitedViews,
    delAllCachedViews
  }
})
