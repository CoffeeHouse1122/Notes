# TypeScript 知识点最小代码示例（项目实战版）

> 用法：每个示例都可单独复制到 `.ts` 文件中运行或类型检查。

---

## 1. 函数参数与返回值类型

```ts
function formatPrice(price: number, currency: string = 'CNY'): string {
  return `${currency} ${price.toFixed(2)}`;
}

const text = formatPrice(19.9);
```

---

## 2. any vs unknown

```ts
let a: any = '{"id":1}';
let b: unknown = '{"id":1}';

const parsedA = JSON.parse(a); // 不安全但能过

if (typeof b === 'string') {
  const parsedB = JSON.parse(b); // 缩小后再用
  console.log(parsedB.id);
}
```

---

## 3. interface 与 type

```ts
interface UserInfo {
  id: number;
  name: string;
  avatar?: string;
}

type UserStatus = 'active' | 'disabled';

type UserCard = UserInfo & { status: UserStatus };
```

---

## 4. 联合类型 + 类型缩小

```ts
type LoadState =
  | { type: 'loading' }
  | { type: 'success'; data: string[] }
  | { type: 'error'; message: string };

function render(state: LoadState): string {
  switch (state.type) {
    case 'loading':
      return '加载中';
    case 'success':
      return `共 ${state.data.length} 条`;
    case 'error':
      return state.message;
  }
}
```

---

## 5. 泛型请求结果 ApiResponse<T>

```ts
type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

type Banner = { id: number; title: string };

async function getBanners(): Promise<ApiResponse<Banner[]>> {
  return {
    code: 0,
    message: 'ok',
    data: [{ id: 1, title: '活动横幅' }]
  };
}
```

---

## 6. 泛型约束 T extends

```ts
function getId<T extends { id: number }>(item: T): number {
  return item.id;
}

const id = getId({ id: 10, name: 'hero' });
```

---

## 7. keyof + T[K]

```ts
type Config = {
  apiBase: string;
  timeout: number;
};

function getConfigValue<K extends keyof Config>(config: Config, key: K): Config[K] {
  return config[key];
}

const timeout = getConfigValue({ apiBase: '/api', timeout: 5000 }, 'timeout');
```

---

## 8. 工具类型 Partial / Pick / Omit / Record

```ts
type User = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
};

type UserPatch = Partial<User>;                 // 编辑表单

type UserBrief = Pick<User, 'id' | 'name'>;     // 列表简版

type UserWithoutEmail = Omit<User, 'email'>;    // 脱敏

type UserMap = Record<number, UserBrief>;       // 字典映射
```

---

## 9. 条件类型（基础）

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<'abc'>; // true
type B = IsString<123>;   // false
```

---

## 10. 映射类型（基础）

```ts
type ReadonlyVersion<T> = {
  readonly [K in keyof T]: T[K];
};

type Form = { name: string; age: number };
type ReadonlyForm = ReadonlyVersion<Form>;
```

---

## 11. tsconfig 严格模式最小配置

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true,
    "moduleResolution": "Bundler",
    "skipLibCheck": true
  }
}
```

---

## 12. 组件 Props（React 示例）

```tsx
type SubmitButtonProps = {
  loading: boolean;
  text: string;
  onClick: () => void;
};

function SubmitButton(props: SubmitButtonProps) {
  return (
    <button onClick={props.onClick} disabled={props.loading}>
      {props.loading ? '提交中...' : props.text}
    </button>
  );
}
```

---

## 13. DOM 事件类型

```ts
function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  console.log(target.value);
}

document.getElementById('keyword')?.addEventListener('input', handleInput);
```

---

## 14. 分页类型建模

```ts
type PageResult<T> = {
  list: T[];
  page: number;
  pageSize: number;
  total: number;
};

type ActivityItem = { id: number; title: string; status: 'draft' | 'online' };

type ActivityPage = PageResult<ActivityItem>;
```

---

## 15. 错误类型统一

```ts
type BizError = { type: 'biz'; code: number; message: string };
type NetError = { type: 'network'; message: string };

type RequestError = BizError | NetError;

function getErrorText(err: RequestError): string {
  return err.type === 'biz' ? `[${err.code}] ${err.message}` : err.message;
}
```

---

## 16. 旧 JS 迁移：先 checkJs

```js
// @ts-check

/** @param {number} count */
function repeat(count) {
  return 'x'.repeat(count);
}

repeat(3);
// repeat('3'); // TS 会报错
```

---

## 17. 最小 d.ts 声明（第三方无类型时）

```ts
// vendor-lib.d.ts
declare module 'legacy-tracker' {
  export function track(eventName: string, payload?: Record<string, unknown>): void;
}
```

---

## 18. 项目里优先改造的 3 处

1. request 层：统一 `ApiResponse<T>`
2. 活动配置：JSON 类型化（字段名和枚举值）
3. 高复用组件：props 与事件参数补全

做到这三条，TS 会马上在真实项目里产生价值。
