# toMerged

将源对象的属性合并到目标对象中。

此函数执行深度合并，意味着嵌套的对象和数组会递归地合并。

- 如果源对象中的属性是数组或对象，而目标对象中的相应属性也是数组或对象，它们将被合并。
- 如果源对象中的属性是未定义的，它不会覆盖目标对象中已定义的属性。

与 [merge](./merge.md) 不同，这个函数不会修改目标对象。

## 签名

```typescript
function toMerged<T extends Record<PropertyKey, any>, S extends Record<PropertyKey, any>>(target: T, source: S): T & S;
```

### 参数

- `target` (`T`): 目标对象，源对象的属性将被合并到这个对象中。
- `source` (`S`): 源对象，其属性将被合并到目标对象中。

### 返回值

(`T & S`): 更新后的目标对象，其中包含了源对象的合并属性。

## 示例

```typescript
const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = toMerged(target, source);
console.log(result);
// 输出: { a: 1, b: { x: 1, y: 3, z: 4 }, c: 5 }

const target = { a: [1, 2], b: { x: 1 } };
const source = { a: [3], b: { y: 2 } };
const result = toMerged(target, source);
console.log(result);
// 输出: { a: [3, 2], b: { x: 1, y: 2 } }

const target = { a: null };
const source = { a: [1, 2, 3] };
const result = toMerged(target, source);
console.log(result);
// 输出: { a: [1, 2, 3] }
```

## 演示

::: sandpack

```ts index.ts
import { toMerged } from 'es-toolkit';

const target = { a: 1, b: { x: 1, y: 2 } };
const source = { b: { y: 3, z: 4 }, c: 5 };
const result = toMerged(target, source);
console.log(result);
```

:::
