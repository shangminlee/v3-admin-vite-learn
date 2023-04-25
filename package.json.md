## dependencies
### @element-plus/icons-vue
基于 Element Plus 图标的 Vue 组件库。包含了 Element Plus 所有的内置图标。

安装：

```bash
npm i @element-plus/icons-vue
```

使用：

```vue
<template>
  <el-icon name="info" />
</template>

<script>
import '@element-plus/icons-vue'

export default {
  components: {
    'el-icon': '@element-plus/icons-vue'
  }
}
</script>
```

### axios

Axios 是一个基于 promise 的 HTTP 库,可以用在浏览器和 node.js 中

安装：

```bash
npm install axios
```

使用：

```typescript
// 发送 GET 请求
axios.get('/user?ID=10')
  .then(response => {
    console.log(response.data)
  })
  .catch(err => {
    console.log(err)
  })

// 指定参数类型
interface User {
  name: string
  age: number
}

// 发送 POST 请求 
axios.post<User>('/user', {
    name: 'John',
    age: 20
})
.then(response => {
    const user = response.data
    console.log(user.name) // John
    console.log(user.age)  // 20
})
.catch(err => {
    console.log(err) 
})
// 也可以创建一个接口来定义 Axios 请求类型
interface AxiosResponse<T> {
  data: T
}

axios.get<User, AxiosResponse<User>>('/user/1')
  .then(response => {
    const user = response.data
    console.log(user.name)
  })

```

> 在 TypeScript 中使用 Axios,我们需要注意:
> 1. 在 npm 中安装 @types/axios 来获取 Axios 的类型定义。
> 2. 使用接口或类型别名来定义响应数据的类型。
> 3. 在请求方法中通过 Type 参数指定响应数据类型,例如:
>    - axios.get<User>('/user')
>    - axios.post<User>('/user', {...})
> 4. 也可以创建 AxiosResponse 接口来定义响应类型,在请求方法通过两个类型参数来指定,例如:
>    - axios.get<User, AxiosResponse<User>>('/user')
> 5. catch 方法中 err 的类型会根据我们在请求方法中定义的类型来推断。

### dayjs

Day.js 是一个轻量的 JavaScript 日期库,和 Moment.js 的 API 设计相似。

它的主要特点是:

1. Immutable: 不会改变原始日期对象
2. Chainable: 可以链式调用所有 API
3. Lodash 相似的 API 设计
4. 支持 ISO 8601 标准
5. 无依赖
6. 简单轻量(2KB 大小)
7. 跨平台

安装：

```bash
npm install dayjs
```

示例：

```typescript
import dayjs from 'dayjs'

// 默认导出为 any 类型,我们可以添加 @types/dayjs 来获取类型定义
// 或在此处定义接口
interface Dayjs {
  year(): number
  month(): number
  date(): number
  hour(): number
  minute(): number
  second(): number
  add(amount: number, unit: string): Dayjs
  subtract(amount: number, unit: string): Dayjs
  format(template: string): string
  from(date: Dayjs): string
  to(date: Dayjs): string
}

// 当前时间 
let now: Dayjs = dayjs()

// 年-月-日 时:分:秒
let d = dayjs('2019-01-25 12:30:40')

// 获取年月日时分秒
d.year()  
d.month()
d.date()
d.hour()
d.minute()
d.second()

// 运算
d.add(1, 'month')   // 增加一个月
d.subtract(1, 'year') // 减少一年

// 格式化  
d.format('{YYYY} MM-DDTHH:mm:ssZ[Z]') 
// 2019 01-25T12:30:40Z

// 相对时间 
d.from(now) // X 个月前
d.to(now)   // 在 X 个月后
```

> 在 TypeScript 中,我们需要:
>
> 1. 添加 @types/dayjs 以获取 Day.js 的类型定义,或在代码中定义接口。
> 2.  按接口/类型定义中的方法和参数来使用 Day.js。
> 3. TypeScript 会自动根据方法返回值推断出最精确的类型。

### element-plus

Element Plus 是一套基于 Vue.js 的开源UI组件库。

安装：

```bash
npm install element-plus --save
```

示例：

```typescript
// main.ts
import ElementPlus from 'element-plus' 
import 'element-plus/dist/index.css'
import { createApp } from 'vue'

const app = createApp({})
app.use(ElementPlus)

app.component('el-button', ElementPlus.ElButton)
app.component('el-input', ElementPlus.ElInput)
app.component('el-table', ElementPlus.ElTable)
app.component('el-table-column', ElementPlus.ElTableColumn)

app.mount('#app')
```

>  TypeScript 中,我们也需要:
>
> 1. 添加 @types/element-plus 获取类型定义。
> 2. 定义类型或接口来约束数据。

### js-cookie

js-cookie 是一个简单的 JavaScript API,用于处理浏览器 cookie。

特点：

1. 轻量级,体积仅为 2KB
2. 支持所有主流浏览器
3. 无依赖
4. 提供简单易用的 API
5. 支持自定义路径、域名、过期时间等选项
6. 支持 AMD/CommonJS 模式
7. 支持 TypeScript

安装：

```bash
npm install js-cookie
```

示例：

```typescript
import Cookies from 'js-cookie'

// 设置 cookie
Cookies.set('name', 'John')

// 获取 cookie
let name = Cookies.get('name') // John

// 删除 cookie
Cookies.remove('name')

// 设置 cookie 选项
Cookies.set('name', 'John', { expires: 7 }) 

// 设置过期时间
let date = new Date()
date.setTime(date.getTime() + 7*24*60*60*1000)
Cookies.set('name', 'John', { expires: date })

interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | 'lax' | 'strict' | 'none'; 
}

// TypeScript 接口定义选项 
let options: CookieOptions = {
  expires: 7,
  path: '' 
} 
Cookies.set('name', 'John', options)
```

> 在 TypeScript 中使用 js-cookie,我们需要:
>
> 1. 添加 @types/js-cookie 来获取 js-cookie 的类型定义,或自己定义接口。
> 2. 根据接口来设置 cookie 选项,TypeScript 会对选项进行校验。
> 3. TypeScript 会自动根据 Cookies.get() 的返回值推断出 cookie 值的类型。
> 4. 需要对 Cookies.set() 第三个参数选项进行类型定义。

### lodash-es

lodash-es 是一个针对 ES6 modules 的 Lodash 构建版本。lodash 是一个非常流行和实用的 JavaScript 工具库,它提供了一整套函数式编程的工具:数组、对象、字符串、函数的操作与处理等。

特点：

1. 完全基于 ES6 modules
2. 最新特性支持更早(在 lodash 中首先发布)
3. 未打包版本更小(不包含 AMD 支持)
4. 完全兼容 lodash API

安装：

```bash
npm install lodash-es
```

示例：

```typescript
import { cloneDeep, concat, drop, find } from 'lodash-es'

interface User {
  name: string
  age: number 
}

let users: User[] = [
  { name: '张三', age: 30 },
  { name: '李四', age: 40 }  
]

let newUsers = cloneDeep(users)    // 深拷贝,新数组类型也为 User[]

users = concat(users, [{ name: '王五', age: 50 }])  // 数组拼接,类型自动推断为 User[]

let dropped = drop(users, 1)     // 舍弃第一个元素,类型为 User[]  

let found = find(users, user => user.name === '李四')   // 查找,类型自动推断为 User | undefined
```

> 1. 从 lodash-es 中导入需要的模块,TypeScript 会自动根据导入内容推断类型。 
> 2. 在方法参数或返回值中定义泛型或接口来约束类型。例如,在 cloneDeep 和 concat 中使用了 User[] 来约束数组元素类型。
> 3. TypeScript 会自动推断一些方法的返回值类型,我们也可以手动指定更加精确的类型。
> 4. 基于类型推断和类型约束,TypeScript 会在编译阶段对代码进行类型检查,提供静态类型安全保障。
> 5. 不需要导入  @types/lodash-es ，原因是 lodash-es 已经原生支持 TypeScript,内置了类型定义文件

### normalize.css

normalize.css 是一个 CSS 重置库,它使得不同浏览器在渲染元素时的默认样式更加一致。

它的主要特点是:

1. 针对 HTML5 元素和多浏览器提供基本样式
2. 修复浏览器 bug 和常见差异
3. 优化 CSS 可用性
4. 可定制项目需要
5. 无冗余

安装：

```bash
npm install normalize.css
```

使用：

```typescript
import 'normalize.css'
```

### nprogress

nprogress 是一个简单的进度条库,可以在网站加载时显示进度条,创建良好的用户体验。

它的主要特点是:

1. 轻量级,总体积小于 2KB
2. CSS3 动画和 HTML5 WebSocket 实时更新进度
3. 无依赖
4. 支持多种定制配置
5. 可定制样式
6. 支持服务端渲染

安装：

```bash
npm install nprogress
```

示例：

```typescript
import NProgress from 'nprogress'   

// 开始进度条  
NProgress.start()   

// 完成进度条
NProgress.done()

// 配置进度条选项
NProgress.configure({
  trickleSpeed: 200,
  showSpinner: false 
})

// 读取进度条状态
let progress = NProgress.status() 

// TypeScript 类型定义
interface NProgressOptions {
  trickleSpeed?: number
  showSpinner?: boolean 
  template?: string
  parent?: string | HTMLElement 
  minimum?: number
}

let options: NProgressOptions = {
  trickleSpeed: 200,
  showSpinner: false 
}
NProgress.configure(options)
```

> 1. 为 NProgressOptions 接口定义配置选项类型。
> 2.  根据接口类型设置配置选项,以获得类型检查。
> 3. TypeScript 会自动推断 NProgress.start()、NProgress.done() 和 NProgress.status() 的类型。
> 4. 需要为 NProgress.configure() 指定泛型或接口类型来约束选项。

### path-browserify

path-browserify 是一个将 Node.js 中的路径 API 带到浏览器的模块。

在 Node.js 中,我们可以使用 path 模块方便地操作路径:

```
js
const path = require('path')

path.join('/a', 'b', 'c')     // '/a/b/c'
path.extname('index.html')   // '.html'
path.dirname('/a/b/c')      // '/a/b'
path.basename('/a/b/c')     // 'c'
```

但是在浏览器中,并不存在这样的 path 模块。path-browserify 就是将 Node.js 中的路径 API 重新实现了一遍,使我们可以在浏览器中也使用这些 API。

安装：

```bash
npm install path-browserify
```

示例：

```typescript
import * as path from 'path-browserify'

let p = path.join('/a', 'b', 'c')     // '/a/b/c'

let ext = path.extname('index.html')  // '.html'  

let dir = path.dirname('/a/b/c')      // '/a/b'

let base = path.basename('/a/b/c')    // 'c'

interface Options {
  sep?: string; 
  delimiter?: string; 
  basename?: string; 
  extname?: string;
}

let options: Options = {
  sep: '/'
}
path.posix.join('a', 'b', 'c')        // 使用 / 分隔符拼接

path.win32.join('a', 'b', 'c') 
```

> 1. 从 path-browserify 导入模块,TypeScript 会自动根据路径 API 推断出类型。
> 2. 需要为 path.posix.join() 和 path.win32.join() 等方法指定选项接口类型。
> 3. TypeScript 会推断出绝大多数路径 API 的返回值类型。我们也可以手动指定更加精确的类型。
> 4.  基于类型推断和类型注解,TypeScript 会对代码进行静态类型检查,增强类型安全



### path-to-regexp

path-to-regexp 是一个将路径字符串转换为正则表达式的库

安装：

```bash
npm install path-to-regexp
```

示例：

```typescript
import pathToRegexp from 'path-to-regexp'

let reg = pathToRegexp('/user/:id/post/:post_id')  
// reg: RegExp

let match = reg.exec('/user/123/post/456')
// match: ['/user/123/post/456', '123', '456'] 

interface PathParams {
  [key: string]: string  
} 

let keys: any[] = []         
let re = pathToRegexp('/user/:id/post/:post_id', keys)
// keys: [{ name: 'id', prefix: '/', suffix: '', pattern: '[^/]+' }, ...] 

let params: PathParams = re.exec('/user/123/post/456')! as any
// params: { id: '123', post_id: '456' }
```

> 1. 将 pathToRegexp 导入,TypeScript 会推断出其返回值为 RegExp。
> 2. 手动为 keys 接口指定类型,它包含了路径参数信息。
> 3. 对 exec() 的返回值进行类型断言,指定为 PathParams 接口类型。
> 4. TypeScript 会自动推断出 match 的类型。我们也可以手动指定更加精确的类型。
> 5. 基于类型推断和类型注解,TypeScript 会对代码进行静态类型检查。



### pinia

Pinia 是一个 Vue 的状态管理库。它是一个新的状态管理方案,可以替代 Vuex。

Pinia 的主要特点是: 

1. 基于 Composition API
2. 支持 TypeScript
3. 轻量级,总体积小于 1KB
4. 支持 Devtools 扩展
5. 不孤立状态
6. 灵活和可扩展

安装：

```bash
npm install pinia
```

示例：

```typescript
// counter.ts
import { defineStore } from 'pinia'

interface CounterState {
  count: number
}

export const useCounterStore = defineStore({
  id: 'counter',
  state: (): CounterState  => ({ 
    count: 0 
  }),
  actions: {
    increment() {
      this.count++ 
    }
  }
})
```

```vue
<!-- Counter.vue -->
<script lang="ts">
import { useCounterStore } from '@/stores/counter'

export default {
  setup() {
    const counter = useCounterStore()
    
    counter.increment()
    console.log(counter.count) // 1
  }  
}
</script>
```

```typescript
// main.ts  
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia() 

const app = createApp(App)
app.use(pinia)
app.mount('#app'
```

> 1. 使用 defineStore() 定义状态存储,并为 state 返回值指定类型。
> 2. 需要在 setup() 函数中使用 useCounterStore() 获取状态存储的类型。TypeScript 会根据返回值类型推断出状态存储的类型。
> 3. 在 main.ts 中为 createPinia 指定类型, TypeScript 可对 Pinia 相关 API 进行类型检查。 
> 4. 基于类型推断和类型注解,TypeScript 会对代码进行静态类型检查和验证。

### screenfull

screenfull 是一个轻量级的 JavaScript 库,用于操作浏览器全屏 API。

它的主要特点是: 

1. 支持所有主流浏览器的全屏 API
2. 轻量级,总体积小于 1KB
3. 无依赖
4. 简单易用的 API
5. 支持多种事件侦听

安装：

```bash
npm install screenfull
```

使用：

```typescript
import screenfull from 'screenfull'

// 请求全屏
screenfull.request()  

// 退出全屏
screenfull.exit()  

// 检查是否全屏
let isFullscreen = screenfull.isFullscreen  

// 监听全屏事件
screenfull.on('change', () => {
  let isFullscreen = screenfull.isFullscreen  
})

// 获取全屏元素
let elem = screenfull.element 

// 原生全屏 API
let elem = document.fullscreenElement

// TypeScript 类型定义
declare global {
  interface Document {
    fullscreenElement: Element
  }
  interface Screenfull {
    isFullscreen: boolean
    element: Element | null
    request(element?: Element): Promise<void>
    exit(): Promise<void>
    on(event: string, callback: () => any): void 
    off(event: string, callback: () => any): void
  } 
}

// 声明 screenfull 模块
declare const screenfull: Screenfull

// 设置选项
interface ScreenfullOptions {
  // ...
}

let options: ScreenfullOptions = { /* ... */ }
screenfull.request(null, options)
```

> 1. 声明全局 Document 接口,扩展全屏相关属性。
> 2. 为 Screenfull 接口定义类型,包含 screenfull 的所有 API。
> 3. 声明 screenfull 变量类型为 Screenfull 接口类型。
> 4. 需要为 screenfull.request()等方法指定选项接口类型。 
> 5. TypeScript 会根据上述类型声明对全屏 API 及 screenfull 的用法进行静态类型检查。

### vue-router

vue-router 是一个 Vue.js 官方的路由管理器。它可以让我们在 Vue 应用中实现路由和导航功能。

vue-router 的主要特点是:

1. 官方支持,与 Vue 深度集成
2. 支持 HTML5 history 模式
3. 嵌套路由
4. 动态路由
5. 导航拦截等

安装：

```bash
npm install vue-router
```

示例：

```typescript
// router.ts
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router

// app.ts
import Vue from 'vue'
import router from './router'

const app = new Vue({
  router,
  render: h => h(App) 
})

<!-- Home.vue -->
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  // ...
}
</script>
```

> 1. 为 routes 指定类型 RouteRecordRaw,TypeScript 会根据此类型检查路由格式是否正确。
> 2.  需要声明 VueRouter 类型,以对 router 变量进行类型注解。
> 3. 需要在组件中使用 Vue 声明组件基类,并指定 lang="ts"。
> 4. 可以使用 vue-property-decorator 装饰器语法定义组件。
> 5.  TypeScript 会自动推断出 router 的类型,并根据 VueRouter 的类型定义检查 router 的 API 用法。
> 6.  同样 TypeScript 会检查组件选项、data、computed 等的类型。

### vxe-table

vxe-table 是一个 Vue 的表格组件库。它具有强大的功能和高性能,可以满足绝大多数表格场景的需求。

vxe-table 的主要特点是:功能强大:

1. 过滤、排序、分页、编辑等 
2. 高性能:虚拟滚动、大数据渲染
3. 灵活:支持自定义列、表头、表尾等
4. 易用:简单的 API,易上手
5. 支持 TypeScript

安装：

```bash
npm install vxe-table
```

示例：

```vue
<template>
  <vxe-table 
    v-bind="tableProps"
    :data="tableData">
    <!-- ... -->
  </vxe-table>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VxeTable, VxeTableColumn, VxeTablePropTypes } from 'vxe-table'

export default defineComponent({
  components: {
    VxeTable, 
    VxeTableColumn 
  },
  setup() {
    const tableData = ref<any[]>([/* ... */])
    const tableProps = VxeTablePropTypes()
    
    return {
      tableData,
      tableProps
    }
  }
})
</script>
```

> 在 Vue 3 + TypeScript 中,我们需要:
>
> 1. 使用 defineComponent() 定义组件,并指定 lang="ts"。
> 2. 使用 ref() 定义响应式数据 tableData,并指定类型为 any[]。
> 3. TypeScript 会自动推断出 VxeTablePropTypes 的类型,我们可以对其进行类型扩展。
> 4. 基于接口与类型注解,TypeScript 会对 vxe-table 的 API 及属性进行静态类型检查。
> 5. TypeScript 会自动推断出 vxe-table 及子组件的属性类型,提供类型提示。

### vxe-table-plugin-element

vxe-table-plugin-element 是一个 vxe-table 的 Element UI 样式插件。它可以让 vxe-table 拥有与 Element UI 相同的视觉风格,提供一致的用户体验。

vxe-table-plugin-element 的主要特点是: 

1. 原生支持 vxe-table 
2. 与 Element UI 样式一致
3. 简单易用

安装：

```bash
npm install vxe-table-plugin-element
```

示例：

```typescript
import VxeTable from 'vxe-table'
import 'vxe-table-plugin-element'

// 声明 vxe-table 类型
declare module 'vxe-table' {
  interface VxeTable {
    // vxe-table 类型定义
  }
}

VxeTable.use(require('vxe-table-plugin-element'))
```

```vue
<template>
  <vxe-table>
    <!-- ... -->
  </vxe-table> 
</template>

<script lang="ts">
import { VxeTable } from 'vxe-table'

export default {
  components: {
    VxeTable
  }  
}
</script>
```

> 1. 声明 vxe-table 的类型,扩展 VxeTable 接口。TypeScript 会根据此类型检查 vxe-table 的 API 用法。
> 2.  需要在组件中指定 lang="ts",并正确导入 VxeTable 类型。
> 3. TypeScript 会自动推断出 VxeTable 的类型,并根据上述类型定义检查 vxe-table 的用法。
> 4. TypeScript 同样会检查组件选项等的类型。

### xe-utils

xe-utils 是一个 Vue 项目常用工具函数库。它提供了常用的数组、对象、字符串、日期等操作工具,可以提高我们的开发效率。

xe-utils 的主要特点是: 

1. 原生支持 Vue
2. 常用工具函数
3. 简单易用
4. 类型定义完整

安装：

```bash
npm install xe-utils
```

示例：

```typescript
import { isArray } from 'xe-utils'

isArray([1, 2, 3]) // true

```

```vue
// vue 组件
<script lang="ts">
import { isArray } from 'xe-utils'

export default {
  data() {
    return {
      list: [1, 2, 3]
    }
  },
  computed: {
    isListArray() {
      return isArray(this.list)
    }
  }
}  
</script>
```

> 1. 从 xe-utils 导入具体的工具函数,如 isArray。
> 2. TypeScript 会自动根据 xe-utils 的类型定义检查各工具函数的用法。
> 3. 可以在 Vue 组件中通过 lang="ts" 及 <script setup> 使用,TypeScript 会检查 data、computed 等的类型。
> 4. TypeScript 同样会根据 this 对象检查各工具函数的参数类型是否正确。





## devDependencies

### @typescript-eslint/eslint-plugin

@typescript-eslint/eslint-plugin 是一个 ESLint 插件,它为 TypeScript 提供了额外的规则和语法支持。它可以让我们在 TypeScript 项目中获得更优雅的 linting 体验。

@typescript-eslint/eslint-plugin 的主要特点是: 

1. 原生支持 TypeScript
2. 提供 TypeScript 特有的 linting 规则
3. 支持最新 ECMAScript 及 TypeScript 特性
4. 与 ESLint 深度集成

安装：

```bash
npm install @typescript-eslint/eslint-plugin --save-dev
```

示例：

```js
// .eslintrc.js
module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended'
  ]
}
```



### @typescript-eslint/parser

@typescript-eslint/parser 是一个 ESLint 解析器,它可以让 ESLint 解析 TypeScript 源码。配合 @typescript-eslint/eslint-plugin,它可以提供完整的 TypeScript linting 支持。

@typescript-eslint/parser 的主要特点是: 

1. 原生支持 TypeScript 
2. 提供 ESLint 解析 TypeScript 的能力
3. 支持 ECMAScript 和 TypeScript 的最新特性
4. 与 ESLint 和 @typescript-eslint/eslint-plugin 深度集成
5. 简单易用



安装：

```bash
npm install @typescript-eslint/parser --save-dev
```

示例：

```javascript
// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended'
  ]
}
```



### @vitejs/plugin-vue

@vitejs/plugin-vue 是一个 Vite 插件,它可以在 Vite 项目中支持 .vue 文件。它让我们可以在 Vite 中轻松创建 Vue 项目。

@vitejs/plugin-vue 的主要特点是: 

1. 原生支持 Vue 单文件组件
2. 在 Vite 项目中提供 .vue 文件解析
3. 支持 Vue 的最新特性
4. 与 Vite 深度集成,简单易用



安装：

```bash
npm install @vitejs/plugin-vue
```

示例：

```javascript
// vite.config.js
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue()
  ]
}
```

### @vitejs/plugin-vue-jsx

@vitejs/plugin-vue-jsx 是一个 Vite 插件,它可以在 Vite 项目中支持 .vue 文件中的 JSX 语法。它让我们可以在 Vue 单文件组件中直接使用 JSX,无需额外配置。

@vitejs/plugin-vue-jsx 的主要特点是: 

1. 原生支持 Vue 单文件组件中的 JSX 语法
2. 无需额外配置即可在 .vue 文件中使用 JSX
3. 支持 Vue 的最新特性与 JSX
4. 与 Vite 和 @vitejs/plugin-vue 深度集成,简单易用

安装：

```bash
npm install @vitejs/plugin-vue-jsx -D
```

示例：

```js
// vite.config.js
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue(),
    vueJsx()
  ]
}
```

### @vue-macros/volar



@vue-macros/volar 是一个 Volta 宏包,它可以让我们在 Vue 项目中使用 Volar 提供的 TypeScript 支持。

@vue-macros/volar 的主要特点是: 

1. 提供 Vue + TypeScript 的增强体验
2. 支持 Vue 模板的类型检查
3. 支持 Vue 的 Composition API 类型检查
4. 支持 Vue Router v4 的类型检查
5. 与 Volar 深度集成,简单易用
