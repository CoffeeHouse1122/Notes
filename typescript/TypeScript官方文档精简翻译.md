# TypeScript 官方文档精简翻译（实战向）

> 说明：这是基于官方文档的“意译 + 提炼”，重点是你在真实项目里最常用的部分。

---

## 1. TypeScript 是什么

TypeScript 是 JavaScript 的超集：
- 你写的代码最终会编译成 JavaScript
- 主要价值是“在开发阶段提前发现错误”
- 编辑器会有更好的自动补全和重构支持

一句话理解：**把很多运行期错误，前移到编码期**。

---

## 2. 每日最常用类型（Everyday Types）

核心类型：
- `string` / `number` / `boolean`
- `Array<T>` 或 `T[]`
- 对象类型 `{ name: string; age: number }`
- 联合类型 `A | B`

建议：
- 参数、返回值优先写清楚
- 不要把 `any` 当默认方案

---

## 3. any、unknown、never（最容易混）

- `any`：关闭类型检查，能用但危险
- `unknown`：未知类型，使用前必须先判断
- `never`：不可能出现的类型（比如总是抛错的函数）

实战建议：
- 接口原始数据先用 `unknown`，再做类型缩小
- 只在过渡期少量使用 `any`

---

## 4. 类型缩小（Narrowing）

TypeScript 会根据运行时判断自动“缩小类型”：
- `typeof`
- `in`
- `instanceof`
- 判别字段（可辨识联合）

典型场景：
- 请求状态：`loading | success | error`
- 处理不同业务分支时，保证每个分支访问的字段正确

---

## 5. 函数与对象建模

函数：
- 给参数和返回值写类型
- 可选参数 `?`、默认参数、函数重载（按需）

对象：
- `interface` 常用于对象结构和可扩展契约
- `type` 适合联合、交叉、类型组合

简单选择：
- 纯对象结构优先 `interface`
- 需要组合/联合优先 `type`

---

## 6. 泛型（Generics）

泛型是“类型参数化”：让函数/类型可复用且保持准确。

典型实战：
- `ApiResponse<T>`
- `PageResult<T>`
- 通用表格、通用列表、通用缓存函数

关键点：
- 会写 `T extends ...` 约束
- 泛型不是越复杂越好，够用就好

---

## 7. 从类型再造类型（Type Manipulation）

高频能力：
- `keyof`：拿到对象键名联合
- `typeof`：拿到变量类型
- `T[K]`：按键访问类型
- 条件类型：`T extends U ? X : Y`
- 映射类型：`[K in keyof T]`

你在项目里最常见用途：
- 让配置项键名和模型保持一致
- 从已有类型推导新类型，减少重复手写

---

## 8. 工具类型（Utility Types）

最常用五个：
- `Partial<T>`：全部可选
- `Required<T>`：全部必填
- `Pick<T, K>`：挑选字段
- `Omit<T, K>`：排除字段
- `Record<K, V>`：键值映射

实战落地：
- 编辑表单、列表项模型、缓存字典、权限映射

---

## 9. tsconfig 必看（项目配置）

优先关注：
- `strict`
- `noImplicitAny`
- `strictNullChecks`
- `noUncheckedIndexedAccess`
- `module` / `target` / `moduleResolution`
- `baseUrl` / `paths`

建议：
- 新项目默认 `strict: true`
- 老项目分阶段收紧，避免一次性改崩

---

## 10. 声明文件 d.ts（第三方库）

当库没有类型定义时：
- 先找 `@types/*`
- 没有就写最小可用 `d.ts`

目标不是一次写完美，而是先让项目获得基本类型保护。

---

## 11. JS 迁移到 TS（官方实践要点）

推荐渐进迁移：
1. 开启 `allowJs` + `checkJs`
2. 先迁移稳定、边界清晰的模块
3. 统一请求层返回类型
4. 逐步减少 `any`

不要一次性全改；每次改一条业务链路更稳。

---

## 12. 你当前最该先掌握的 8 点

1. 函数参数和返回值类型
2. 对象建模（`interface` / `type`）
3. 联合类型 + 类型缩小
4. 泛型与 `ApiResponse<T>`
5. 工具类型五件套
6. `keyof` / `typeof` / `T[K]`
7. `strict` 配置
8. 渐进迁移策略

---

## 13. 最小实战示例（接口层）

```ts
type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

type Activity = { id: number; title: string; status: 'draft' | 'online' };

async function getActivityList(): Promise<ApiResponse<Activity[]>> {
  return {
    code: 0,
    message: 'ok',
    data: [{ id: 1, title: '春季活动', status: 'online' }]
  };
}
```

这个模式一旦固定下来，页面、组件、状态管理都会更稳。

---

## 14. 一句话复盘

TypeScript 学习的核心不是“记住多少语法”，而是：
- 用类型把业务约束写进代码
- 在编译期发现错误
- 让多人协作和后续重构更安全
