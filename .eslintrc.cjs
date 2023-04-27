// Lint（Linter） 是一种静态代码分析工具，用于标记代码中某些编码错误、
// 风格问题和不具结构性（易导致 bug）的代码。简单理解就是一个代码检查器，
// 检查目标代码是否符合语法和规定的风格习惯。
// ESLint 是基于 ECMAScript/JavaScript 语法的 Lint。
//
// ESLint 默认没有规则，需要手动配置 .eslintrc.* 中添加规则
// .eslintrc.js 文件是 EsLint 的配置文件，用于自定义 Eslint 规则或扩展共享配置
//
// 配置规则：
// 1. "off"   或 0   -- 关闭规则
// 2. "warn"  或 1   -- 将该规则作为警告打开 （不影响退出代码）
// 3. "error" 或 2   -- 将该规则作为错误打开 （触发时退出代码为 1）
//
// 如果同一目录中有多个配置文件，则 ESLint 将仅适用一个。优先顺序为：

const { trailingComma } = require("./prettier.config.cjs");

// .eslintrc.js > .*.cjs > .*.yaml > .*.yml > .*.json > .eslintrc > package.json
module.exports = {
  // 默认情况下，ESLint 会在所有父级目录中寻找配置文件，一直到根目录。如果想要所有的项目
  // 都遵循一个特定的约定时，在项目的根目录下的 package.json 文件或者 .eslintrc.* 文件
  // 里的 eslint config 字段下设置 "root": true. ESLint 一旦发现配置文件中有 root：true
  // 它就会停止在父级目录中寻找
  root: true,

  // 在 .eslintrc.js 文件中，env 字段是用来定义代码的运行环境
  //
  // EsLint 有很多内置的环境定义，可以根据项目需要制定对应的环境，例如：
  // 1. browser: 浏览器环境
  // 2. node:    Node.js环境
  // 3. es6:     启用 ES6 环境
  // 4. jquery:  jquery 环境
  // 更多的环境配置可以参考官方文档
  env: {
    browser: true, // 可以试用 window、document 等全局变量
    node: true,    // 可以使用 require、module 等 Node.js 全局变量
    es6: true,     // 启用 ES6 语法支持
  },

  // 用于指定全局变量，每个模块和外部依赖都有可能注入自己的全局变量，为了避免这被识别成错误，
  // 需要在配置中指出代码中用到的外部全局变量。
  //
  // ESLint 支持以下几种全局变量类型：
  // 1. writable - 可读可写
  // 2. readonly - 只读
  // 3. off      - 关闭该全局变量的检查
  //
  // 在代码中使用到这些全局变量时，ESLint 就不会报未定义的变量错误，而是会将他们标记为定义过
  // 的全局变量。
  // readonly 类型的全局变量如果在代码中被重新赋值，ESLint 仍然会报错。
  globals: {
    // script setup
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
    // unplugin-vue-define-options
    defineOptions: "readonly"
  },

  // 用来扩展共享配置
  // ESLint 自带了一些共享配置：
  // 1. eslint:recommended - ESLint 基本推荐规则
  // 2. airbnb             - 很流行的 JS 规范
  // 3. standard           - 轻量级的 JS 规范
  // 4. vue                - Vue.js 项目推荐规则
  // 5. react              - React 项目推荐规则
  // 也可以扩展第三方共享配置,例如:
  // 1. @vue/airbnb        - Vue 项目的 Airbnb 规范
  // 2. @typescript-eslint - TypeScript 项目规则
  extends: [
    // vue-eslint-plugin 中的 vue3-essential 配置
    "plugin:vue/vue3-essential",
    // ESLint 自带的一个共享配置，包含了 ESLint 的基本推荐规则
    "eslint:recommended",
    // Vue 官方维护的一个 ESLint 共享配置,专门针对 Vue + TypeScript 项目
    "@vue/typescript/recommended",
    // 使 ESLint 能够识别 Prettier 的格式化规则,避免冲突
    "@vue/prettier",
    // 进一步加强 Vue 和 TS 项目的规范性
    "@vue/eslint-config-typescript"
  ],

  // Vue 项目中使用 ESLint 时,我们需要将 parser 配置成 vue-eslint-parser。
  // 这可以让 ESLint 支持解析 .vue 文件中的 Vue 语法
  parser: 'vue-eslint-parser',
  // 用于定义 TypeScript ESLint 解析器 @typescript-eslint/parser 的选项
  parserOptions: {
    // 解析 .ts 和 .tsx 文件
    parser: "@typescript-eslint/parser",
    // 设置 JS 版本为 ES2020
    ecmaVersion: 2020,
    // 指定源代码类型为 ES Module
    sourceType: "module",
    // 设置 JSX 语法中使用的函数名为 React
    jsxPragma: "React",
    // 启用 JSX 和 TSX 支持
    ecmaFeatures: {
      jsx: true,
      tsx: true
    }
  },
  // 配置规则：
  // 1. "off"   或 0   -- 关闭规则
  // 2. "warn"  或 1   -- 将该规则作为警告打开 （不影响退出代码）
  // 3. "error" 或 2   -- 将该规则作为错误打开 （触发时退出代码为 1）
  rules: {
    // TS 规则配置
    // TypeScript ESLint 推荐规则，它会禁止在代码中使用 any 类型。
    "@typescript-eslint/no-explicit-any": "off",
    // ESLint 核心规则,它会禁止在代码中使用 debugger 语句。
    "no-debugger": "off",
    // TypeScript ESLint 推荐规则，它要求在模块边界(function, class, interface, type alias)上声明类型
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // 在 TypeScript 中使用原始类型(number, string, boolean)和 object, unknown 等类型,
    // 而不是 JavaScript 中的包装类型( Number, String, Boolean)
    "@typescript-eslint/ban-types": "off",
    // 禁止在代码中使用 TypeScript 特有的单行注释 // @ts-
    "@typescript-eslint/ban-ts-comment": "off",
    // TypeScript ESLint 推荐规则，它禁止空函数
    "@typescript-eslint/no-empty-function": "off",
    // 禁止在代码中使用非空断言运算符 !,
    "@typescript-eslint/no-non-null-assertion": "off",
    // TypeScript ESLint 中的规则， 检查未使用的变量(包括function 参数)和导入
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        // 忽略以_开头的参数
        argsIgnorePattern: "^_",
        // 忽略以_开头的变量
        varsIgnorePattern: "^_"
      }
    ],
    // ESLint 中的通用规则，检查未使用的变量(包括function 参数)和导入， 可能和上面产生冲突！！
    "no-unused-vars": [
      "error",
      {
        // 忽略以_开头的参数
        argsIgnorePattern: "^_",
        // 忽略以_开头的变量
        varsIgnorePattern: "^_"
      }
    ],

    // Vue 配置规则
    // 禁止使用 v-html 指令， 鼓励在模板中使用 v-text 而不是 v-html，因为可能导致 XSS 攻击
    "vue/no-v-html": "off",
    // 检查 props 是否有默认值，鼓励为 props 指定默认值
    "vue/require-default-prop": "off",
    // 检查组件选项中是否有 emits 字段，鼓励在组件中声明它需要抛出的所有事件
    "vue/require-explicit-emits": "off",
    // 检查组件名称是否采用多单词方式命令，多单词组件名称更具描述性，一眼可以理解其作用和内容。
    "vue/multi-word-component-names": "off",
    // 一个 Vue ESLint 推荐规则。它会检查模板中的 HTML 标签是否采用自闭合写法,
    // 并提供不同标签类型的检测选项
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always"
        },
        svg: "always",
        math: "always"
      }
    ],

    // Prettier 规则配置
    // ESLint 检测过程中,自动对代码进行 Prettier 格式化
    "prettier/prettier": [
      "error",
      {
        // 覆盖 Eslint 的默认选项
        endOfLine: "auto",
        trailingComma: "none"
      }
    ]
  }
}
