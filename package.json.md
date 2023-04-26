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

安装：

```bash
npm install @vue-macros/volar -D
```

使用：

```json
// 在 package.json 中配置 volta 命令:

"volta": {
  "node": {
    "preInstall": ["@vue-macros/volar"]
  }
}
```

### @vue/eslint-config-prettier

@vue/eslint-config-prettier 是一个 ESLint 配置,它可以让 Prettier 与 ESLint 在 Vue 项目中协同工作。它可以让我们同时获得 Prettier 的代码格式化与 ESLint 的代码检查能力。

@vue/eslint-config-prettier 的主要特点是:

1. 在 Vue 项目中使得 Prettier 和 ESLint 兼容 
2. 禁用 ESLint 中与 Prettier 有冲突的规则 
3. 支持 Vue 的最新特性 
4. 与 ESLint 深度集成,简单易用

安装：

```bash
npm install --save-dev @vue/eslint-config-prettier
```

使用：

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    '@vue/eslint-config-prettier'
  ]
}
```

### @vue/eslint-config-typescript

@vue/eslint-config-typescript 是一个 ESLint 配置,它可以让我们在 Vue + TypeScript 项目中获得基础的 lint 规则。它提供了一套出箱即用的 TypeScript Vue 开发 lint 规范。

@vue/eslint-config-typescript 的主要特点是: 

1. 提供 Vue + TypeScript 项目基础的 lint 规则 
2. 支持 TypeScript 语言规范 
3. 支持 Vue 单文件组件规范 
4. 支持 Composition API 规范 
5. 与 ESLint 深度集成,简单易用

安装：

```bash
npm install --save-dev @vue/eslint-config-typescript
```

使用：

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    '@vue/typescript/recommended'
  ]
}
```

### @vue/test-utils

@vue/test-utils 是一个用于测试 Vue 组件的实用程序库。它可以让我们轻松地为 Vue 组件编写单元测试和快照测试。

@vue/test-utils 的主要特点是: 

1. 用于测试 Vue 组件的官方库 
2. 提供丰富的 API 来模拟组件行为 
3. 支持 Jest 和 Mocha 测试框架 
4. 与 Vue 深度集成,支持 Vue 的最新特性 
5. 简单易用,可以快速为 Vue 组件编写测试

安装：

```bash
npm install --save-dev @vue/test-utils
```

使用：

```vue
<template>
  <div>{{ count }}</div>
  <button @click="increment">Increment</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
})
</script>
```

对应的测试代码：

```typescript
import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'

describe('Counter.vue', () => {
  test('renders counter value', () => {
    const wrapper = shallowMount(Counter)
    expect(wrapper.text()).toBe('0')
  })
  
  test('clicking increment button increments counter', () => {
    const wrapper = shallowMount(Counter)
    wrapper.find('button').trigger('click')
    expect(wrapper.text()).toBe('1')
  })
})
```

```typescript
import { shallowMount, Wrapper } from '@vue/test-utils'
import Counter from '@/components/Counter.vue'

describe('Counter.vue', () => {
  let wrapper: Wrapper<Vue>
  
  beforeEach(() => {
    wrapper = shallowMount(Counter)
  })
  
  test('initial value is 0', () => {
    expect(wrapper.text()).toBe('0')
  })
  
  test('clicking increment increments counter', () => {
    wrapper.find('button').trigger('click')
    expect(wrapper.text()).toBe('1')
  })
  
  test('clicking increment 3 times results in 3', () => {
    wrapper.find('button').trigger('click')
    wrapper.find('button').trigger('click')
    wrapper.find('button').trigger('click')
    expect(wrapper.text()).toBe('3')
  })
}
```



### eslint

ESLint 是一个静态代码检查工具,它可以帮助我们 lint 出更加优雅和统一的 JavaScript 代码风格。

ESLint 的主要功能是:

1. 检测 JavaScript 代码质量问题 
2. 统一团队的 JavaScript 代码风格 
3. 支持第三方插件扩展功能 
4. 支持配置文件自定义规则 
5. 支持自动修复一些代码问题

安装：

```bash
npm install eslint --save-dev
```

使用：

```bash
# 初始化一个配置文件
eslint --init
```

```javascript
// 在 .eslintrc.js 中配置规则
module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "extends": ["plugin:vue/essential", "eslint:recommended"],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "rules": {
    "eqeqeq": ["error", "always"],
    "no-console": "off"
  }
} 
```

```bash
# 运行 ESLint 检查
eslint yourfile.js
```

```bash
# ESLint 会根据配置的规则对代码进行检查,报告不符合规则的问题。
# 我们也可以使用 --fix 自动修复一些问题

eslint yourfile.js --fix 
```

### eslint-plugin-prettier

eslint-plugin-prettier 是一个将 prettier 规则集成到 ESLint 中的插件。它可以让我们同时使用 ESLint 和 Prettier 两个工具,获得代码质量和格式化双重保障。

安装：

```bash
npm install --save-dev eslint-plugin-prettier
```

使用：

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['prettier'],
  extends: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
}
```

### eslint-plugin-vue

eslint-plugin-vue 是一个将 Vue 规则集成到 ESLint 中的插件。它可以让我们对 .vue 文件进行 ESLint 检查,获得 Vue 组件的代码质量和风格保障。

安装：

```bash
npm install eslint-plugin-vue --save-dev
```

使用：

```javascript
// .eslintrc.js
module.exports = {
  "extends": [
    "plugin:vue/essential"
  ],
  "rules": {
      "vue/max-attributes-per-line": [
        "error", 
        {
          "singleline": 10,
          "multiline": {
            "max": 1,
            "allowFirstLine": true
          }
        }
      ]
    }
}
```

### husky

Husky 是一个可以在 Git hooks 中执行代码的工具。它可以用于实现一些 Git 自动化操作,例如:

1. 在 commit 前自动执行 lint 工具检查代码 
2. 在 push 前自动执行测试脚本 
3. 在 merge 前自动同步主干代码等

安装：

```bash
npm install husky --save-dev
```

使用：

在 package.json 中添加 Git hook 脚本:

```json
"husky": {
  "pre-commit": "lint-staged",
  "pre-push": "npm test",
  "post-merge": "npm run sync-master"
}
```

> 这样会在 commit 前运行 lint-staged,在 push 前运行 npm test,在 merge 后运行 sync-master 脚本。然后我们就可以在这些 Git 生命周期中自动执行相应任务了。例如: 
>
> 1. 在 commit 之前自动 lint 代码 
> 2. 在 push 之前自动运行测试 
> 3. 在 merge 之后自动同步主干更新

### jsdom

jsdom 是一个 JavaScript 实现的 DOM 环境。它可以在 Node.js 中创建浏览器环境来运行前端代码。

jsdom 的主要功能是: 

1. 在 Node.js 中实现浏览器 DOM 环境 
2. 可以在 Node.js 中运行浏览器 JavaScript 代码 
3. 模拟浏览器中 DOM、HTML 等标准 
4. 常用于测试前端 UI 组件等在没有浏览器的环境中

安装：

```bash
npm install jsdom
```

使用：

```typescript
import { defineComponent, reactive, ref } from 'vue'
import { JSDOM } from 'jsdom'

const dom = new JSDOM('<!DOCTYPE html><div id="app"></div>')
const { window } = dom

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const count = ref(0)
    const state = reactive({
      name: '张三'
    })

    function increment() {
      count.value++
    }

    const render = () => {
      window.document.querySelector('#app').innerHTML = `
        <p>You clicked ${count.value} times</p>
        <p>Name: ${state.name}</p>
        <button onClick="increment()">Increment</button>
      ` 
    }

    return {
      count,
      state,
      increment,
      render
    }
  }
})

render()
expect(window.document.querySelector('p').textContent).toBe('You clicked 0 times')
increment()
render() 
expect(window.document.querySelector('p').textContent).toBe('You clicked 1 times')
```

### lint-staged

lint-staged 是一个在 git 暂存文件上运行 linters(代码检查工具)的工具。它可以让我们在 commit 前只检查暂存的文件,而不是整个项目,从而提高 lint 工具的执行效率。

安装：

```bash
npm install --save-dev lint-staged
```

使用：

在 package.json 中添加 lint-staged 配置:

```json
"lint-staged": {
  "*.js": ["eslint --fix", "git add"]
}
```

```bash
npm run lint-staged
```

### prettier

它可以重新格式化我们的代码,使之符合一致的风格。我们只需要在每次保存代码时,让 Prettier 重新格式化代码,就可以很容易地实现整个项目的代码风格统一。

安装：

```bash
npm install --save-dev prettier
```

使用：

在 package.json 中添加 prettier 配置:

```json
"prettier": {
  "printWidth": 100,         // 一行最多 100 字符
  "tabWidth": 2,             // 使用 2 个空格缩进
  "useTabs": false,          // 使用空格代替 tab
  "semi": true,              // 在语句末尾使用分号
  "singleQuote": true,       // 使用单引号
  "trailingComma": "es5",    // 在对象和数组最后一个元素后面加逗号
  "bracketSpacing": true     // 在对象的左大括号之前使用空格
}
```

### Sass

Sass 是一种 CSS 预处理器,它扩展了 CSS 的功能,使 CSS 的使用变得更加强大和简洁。

Sass 具有以下主要特性: 

1. 变量 - 可以将重复的值定义为变量

2. 嵌套 - 可以以嵌套的方式编写 CSS 规则

3. 混入(Mixin) - 可以定义可重用的样式规则

4. 函数 - 可以利用函数简化一些计算

5. 继承 - 可以通过继承来提取重复的属性

6. 运算 - 可以直接在 CSS 中进行算数运算

7. 注释 - 支持 CSS 注释以及单行注释 //

8. 导入 - 可以将一个 Sass 文件导入到另一个 Sass 文件


Sass 有两种语法: 

1. SCSS(Sassy CSS) - 扩展 CSS 语法,文件名以 .scss 结尾 
1. Sass - 使用缩进表示层级关系,文件名以 .sass 结尾SCSS 语法更容易学习,更接近 CSS,所以我们这里主要介绍 SCSS 语法

安装：

```bash
npm install sass
```

使用：

```scss
scss
// 定义变量
$primary-color: blue;

// 嵌套使用
.page-header {
  color: $primary-color;
  
  .title {
    font-size: 2em;
  }
}

// 混入(Mixin)
@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner {
  @include center;
}

// 继承
.message {
  color: red;
}

.success {
  @extend .message;
  border: 1px solid green; 
}
```

执行编译：

```bash
sass input.scss output.css
```

### terser

Terser 是一个 JavaScript 压缩工具。

它可以压缩、美化和混淆我们的 JavaScript 代码。通过缩小代码体积和隐藏代码细节,Terser 可以帮助我们提高 JavaScript 的加载性能和加强代码安全性。

安装：

```bash
npm install terser
```

使用：

```bash
# 压缩代码
terser input.js -o output.js
```

```bash
# 美化代码
terser --beautify input.js -o output.js
```

```bash
# 混淆代码
terser --mangle --input input.js -o output.js
```

```bash
# 同时执行多个操作
terser --compress --mangle --beautify input.js -o output.js
```

### unocss

UnoCSS 是一款基于原子类的 CSS 框架。它可以让我们使用 Utility 样式和 Tailwind CSS 类似的原子类来快速构建 UI,而无需编写自定义 CSS。

主要特性:

1. 原子类 - 提供大量可复用的 Utility 样式,基于这些样式快速构建 UI 
2. purgecss - 添加 purgecss 优化,移除未使用的 CSS 
3. 主题定制 - 支持自定义颜色主题 
4. 响应式 - 内置响应式设计,组件会根据屏幕宽度自动调整
5. 预处理器 - 支持 Sass、PostCSS 等 CSS 预处理器 

安装：

```bash
npm install unocss
```

使用：

```typescript
import 'unocss';
```

```html
<div class="p-4 rounded bg-blue-500 text-white">Hello World</div>
```



### unplugin-vue-define-options

unplugin-vue-define-options 是一个 Vue 插件,它可以让我们在组件中定义 type: Object 类型的 prop,并在使用该组件时提供默认选项。

它主要解决的问题是:当我们定义 type: Object 的 prop 时,如果不提供默认值,则该 prop 的默认值会是 undefined。这会导致在模板中使用该 prop 时报错。

unplugin-vue-define-options 可以通过为 type: Object 的 prop 提供默认选项来解决这个问题。

安装：

```bash
npm install unplugin-vue-define-options
```

使用：

在 Vue 文件中定义组件,并为 type: Object 的 prop 指定默认选项:

```vue
<script>
import { defineOptions } from 'unplugin-vue-define-options'

export default defineOptions({
  props: {
    options: {
      type: Object,
      default: () => ({
        foo: true
      })
    }
  }
})
</script>
```

```vue
<my-component />

<my-component :options="{ foo: true }" />
```



### vite-plugin-svg-icons

vite-plugin-svg-icons 是一个 Vite 插件,它可以让我们轻松地将 SVG 图标作为组件导入并使用。

主要功能: 

1. 自动导入 SVG 文件并生成对应组件 
2. 支持给组件设置默认导出名称 
3. 支持给每个图标设置 id、类名等 
4. 支持定制每个图标的样式  
5. 内置 tree shaking,移除未使用的图标 

安装：

```bash
npm install vite-plugin-svg-icons
```

使用：

1. 在 vite.config.js 中添加插件:

   ```js
   import vitePluginSvgIcons from 'vite-plugin-svg-icons'
   
   export default {
     plugins: [
       vitePluginSvgIcons({
         // 指定需要处理的 svg 文件夹
         iconDirs: [path.resolve(dir, 'src/assets/icons')],
         // 生成的 svg 组件默认导出名称
         symbolId: 'icon-[name]', 
       })
     ]
   }
   ```

2. 然后在代码中按如下方式使用 SVG 图标:

   ```vue
   <template>
     <icon-home />
   </template>
   
   <script>
   import IconHome from '@/assets/icons/home.svg?component'
   
   export default {
     components: {
       IconHome
     }
   }
   </script>
   ```

3. ```vue
   <svg><use xlink:href="@/assets/icons/home.svg?inline"></use></svg> 
   ```

   

### vite-svg-loader

vite-svg-loader 是一个 Vite 插件,它可以让我们轻松地将 SVG 文件导入为 Vue 组件或 SVG XML 片段。

主要功能:

1. 将 SVG 文件导入为 Vue 组件 
2. 将 SVG 文件导入为 SVG XML 片段 
3. 支持给 SVG 组件设置 id、class 等 
4. 支持定制 SVG 组件或 XML 片段的样式 
5. 移除未使用的 SVG 文件 

安装：

```bash
npm install vite-svg-loader
```

使用：

1. 在 vite.config.js 中添加插件:

   ```javascript
   import viteSvgLoader from 'vite-svg-loader'
   
   export default {
     plugins: [
       viteSvgLoader({
         // 指定 svg 文件目录
         svgo: {
           input: './src/assets/icons'
         }
       })
     ]
   }
   ```

2. 然后我们可以按如下方式导入和使用 SVG

   ```vue
   <template>
     <svg-home />
   </template>
   
   <script>
   import SvgHome from '@/assets/icons/home.svg?vue&ref' 
   export default {
     components: {
       SvgHome
     }
   }
   </script>
   ```

3. 作为 SVG XML 片段

   ```vue
   <template>
     <svg>
       <use :href="require('@/assets/icons/home.svg?url')"></use>
     </svg>
   </template>
   
   <template>
     <svg v-html="require('@/assets/icons/home.svg?html')"></svg>
   </template>
   ```

### vitest

Vitest 是一个 Vite 的测试工具。它可以让我们轻松地为 Vite 项目添加单元测试和端到端测试。

主要特征:

1. 为 Vite 项目添加测试 
2. 支持 Jest 风格的单元测试 
3. 支持 Cypress 风格的 E2E 测试
4. 内置代码覆盖率报告 
5. 和 Vite 无缝集成,使用 Vite 解析模块 
6. 支持 TS/JS 和 Vue/React 项目

安装：

```bash
npm install -D vitest
```

使用：

1. 在 package.json 中添加测试脚本

   ```json
   "scripts": {
     "test": "vitest"
   }
   ```

2. 编写 Jest 风格的单元测试

   ```javascript
   import { expect, it, vi } from 'vitest'
   
   it('adds 1 + 2 to equal 3', () => {
     expect(1 + 2).toEqual(3)
   })
   ```

3. 编写 Cypress 风格的 E2E 测试

   ```javascript
   it('navigates to todo app', () => {
     cy.visit('http://localhost:3000/')
     cy.contains('Todo')
   })
   ```

4. 运行测试

   ```bash
   npm run test
   ```

### vue-eslint-parser

vue-eslint-parser 是一个包,它包含了解析 .vue 文件所需的器件,并提供给 ESLint 使用。

它可以让 ESLint 理解并校验 .vue 文件中的代码,包括:

1. <template> 中的 Vue 模板语法 
2. <script> 中的 JavaScript / TypeScript 代码 
3. <style> 中的 CSS / LESS / SCSS 等样式 

安装：

```bash
npm install -D eslint vue-eslint-parser
```

使用：

在 .eslintrc.js 中配置 parser: 'vue-eslint-parser':

```javascript
module.exports = {
  parser: 'vue-eslint-parser',
  // ...
}
```

