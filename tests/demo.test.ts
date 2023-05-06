import { describe, expect, it } from "vitest"
/**
 * @description vitest 的基本用法
 * @link https://cn.vitest.dev/api
 * @api describe: 形成一个作用域
 * @api test/it: 定义一组关于测试期望的方法。它接收测试名称和一个含有测试期望的函数
 * @api expect: 创建断言
 * @api toBe: 用于断言基础对象是否相等，或者对象是否共享相同的引用
 * @api toEqual: 断言检查是否等于接收值，或者是同样的结构，如果是对象类型
 */

const author_1 = {
  name: "jack",
  email: "1234@qq.com"
}
const author_2 = {
  name: "jack",
  email: "1234@qq.com"
}

describe("作用域名称", () => {
  it("测试基础数据", () => {
    expect(1 + 1).toBe(2)
  })
  it("测试引用类型", () => {
    expect(author_1).toEqual(author_2)
  })
})
