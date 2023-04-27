// TS 中的模块声明，它的作用域时声明以 .vue 结尾的文件是 Vue 组件模块
// 主要作用是提供 .vue 文件中导出内容的类型信息,
// 让 TypeScript 能够正确地推导 .vue 文件模块的类型
declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 声明以 .scss 结尾的文件是一个记录对象(Record)类型的模块
declare module "*.scss" {
  const scss: Record<string, string>
  export default scss
}
