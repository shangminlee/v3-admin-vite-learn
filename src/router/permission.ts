import NProgress from "nprogress"
import "nprogress/nprogress.css"
import router from "@/router"

// 进度条配置
NProgress.configure({ showSpinner: false })

// 路由守卫
router.beforeEach(async (to, _form, next) => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})
