<div align="center">
  <h1> 30 天 JavaScript：Set 和 Map</h1>
  <a class="header-badge" target="_blank" href="https://www.linkedin.com/in/asabeneh/">
  <img src="https://img.shields.io/badge/style--5eba00.svg?label=LinkedIn&logo=linkedin&style=social">
  </a>
  <a class="header-badge" target="_blank" href="https://twitter.com/Asabeneh">
  <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/asabeneh?style=social">
  </a>

<sub>作者：
<a href="https://www.linkedin.com/in/asabeneh/" target="_blank">Asabeneh Yetayeh</a><br>
<small> 2020 年 1 月</small>
</sub>

</div>

[<< Day 9](../09_Day_Higher_order_functions/09_day_higher_order_functions.md) | [Day 11 >>](../11_Day_Destructuring_and_spreading/11_day_destructuring_and_spreading.md)

![Day 10](../images/banners/day_1_10.png)

- [第 10 天](#第-10-天)
  - [Set](#set)
    - [创建空 Set](#创建空-set)
    - [从数组创建 Set](#从数组创建-set)
    - [向 Set 中添加元素](#向-set-中添加元素)
    - [从 Set 中删除元素](#从-set-中删除元素)
    - [检查 Set 中是否存在元素](#检查-set-中是否存在元素)
    - [清空 Set](#清空-set)
    - [Set 的并集](#set-的并集)
    - [Set 的交集](#set-的交集)
    - [Set 的差集](#set-的差集)
  - [Map](#map)
    - [创建空 Map](#创建空-map)
    - [从数组创建 Map](#从数组创建-map)
    - [向 Map 添加值](#向-map-添加值)
    - [从 Map 获取值](#从-map-获取值)
    - [检查 Map 中是否存在键](#检查-map-中是否存在键)
  - [练习](#练习)
    - [练习：1 级](#练习1-级)
    - [练习：2 级](#练习2-级)
    - [练习：3 级](#练习3-级)

<a id="第-10-天"></a>
# 第 10 天

<a id="set"></a>
## Set

Set 是一组元素的集合，并且每个元素只能出现一次。
下面我们看看如何创建和使用 Set。

<a id="创建空-set"></a>
### 创建空 Set

```js
const companies = new Set()
console.log(companies)
```

```sh
Set(0) {}
```

<a id="从数组创建-set"></a>
### 从数组创建 Set

```js
const languages = [
  'English',
  'Finnish',
  'English',
  'French',
  'Spanish',
  'English',
  'French',
]

const setOfLanguages = new Set(languages)
console.log(setOfLanguages)
```

```sh
Set(4) {"English", "Finnish", "French", "Spanish"}
```

Set 是一个可迭代对象，我们可以迭代每个元素。

```js
const languages = [
  'English',
  'Finnish',
  'English',
  'French',
  'Spanish',
  'English',
  'French',
]

const setOfLanguages = new Set(languages)

for (const language of setOfLanguages) {
  console.log(language)
}
```

```sh
  English
  Finnish
  French
  Spanish
```

<a id="向-set-中添加元素"></a>
### 向 Set 中添加元素

```js
const companies = new Set() // 创建空 Set
console.log(companies.size) // 0

companies.add('Google') // 向 Set 添加元素
companies.add('Facebook')
companies.add('Amazon')
companies.add('Oracle')
companies.add('Microsoft')
console.log(companies.size) // Set 中有 5 个元素
console.log(companies)
```

```sh
Set(5) {"Google", "Facebook", "Amazon", "Oracle", "Microsoft"}
```

我们还可以使用循环将元素添加到 Set 中。

```js
const companies = ['Google', 'Facebook', 'Amazon', 'Oracle', 'Microsoft']
setOfCompanies = new Set()
for (const company of companies) {
  setOfCompanies.add(company)
}
```

```sh
Set(5) {"Google", "Facebook", "Amazon", "Oracle", "Microsoft"}

```

<a id="从-set-中删除元素"></a>
### 从 Set 中删除元素

可以使用 `delete` 方法从 Set 中删除元素。

```js
console.log(companies.delete('Google'))
console.log(companies.size) // Set 中还剩 4 个元素
```

<a id="检查-set-中是否存在元素"></a>
### 检查 Set 中是否存在元素

`has` 方法可以检查 Set 中是否存在某个元素。

```js
console.log(companies.has('Apple')) // false
console.log(companies.has('Facebook')) // true
```

<a id="清空-set"></a>
### 清空 Set

`clear` 方法会删除 Set 中的所有元素。

```js
companies.clear()
console.log(companies)
```

```sh
Set(0) {}
```

下面的示例展示了 Set 的一个常见用法：统计数组中每个值出现的次数。

```js
const languages = [
  'English',
  'Finnish',
  'English',
  'French',
  'Spanish',
  'English',
  'French',
]
const langSet = new Set(languages)
console.log(langSet) // Set(4) {"English", "Finnish", "French", "Spanish"}
console.log(langSet.size) // 4

const counts = []
const count = {}

for (const l of langSet) {
  const filteredLang = languages.filter((lng) => lng === l)
  console.log(filteredLang) // ["English", "English", "English"]
  counts.push({ lang: l, count: filteredLang.length })
}
console.log(counts)
```

```js
[
  { lang: 'English', count: 3 },
  { lang: 'Finnish', count: 1 },
  { lang: 'French', count: 2 },
  { lang: 'Spanish', count: 1 },
]
```

Set 的另一个常见用法是从数组中获取唯一值。

```js
const numbers = [5, 3, 2, 5, 5, 9, 4, 5]
const setOfNumbers = new Set(numbers)

console.log(setOfNumbers)
```

```sh
Set(5) {5, 3, 2, 9, 4}
```

<a id="set-的并集"></a>
### Set 的并集

可以使用展开运算符求两个 Set 的并集。下面求 Set A 和 Set B 的并集 `(A U B)`。

```js
let a = [1, 2, 3, 4, 5]
let b = [3, 4, 5, 6]
let c = [...a, ...b]

let A = new Set(a)
let B = new Set(b)
let C = new Set(c)

console.log(C)
```

```sh
Set(6) {1, 2, 3, 4, 5,6}
```

<a id="set-的交集"></a>
### Set 的交集

可以使用 `filter` 方法求两个 Set 的交集。下面求 Set A 和 Set B 的交集 `(A ∩ B)`。

```js
let a = [1, 2, 3, 4, 5]
let b = [3, 4, 5, 6]

let A = new Set(a)
let B = new Set(b)

let c = a.filter((num) => B.has(num))
let C = new Set(c)

console.log(C)
```

```sh
Set(3) {3, 4, 5}
```

<a id="set-的差集"></a>
### Set 的差集

可以使用 `filter` 方法求两个 Set 的差集。下面求 Set A 相对于 Set B 的差集 `(A \ B)`。

```js
let a = [1, 2, 3, 4, 5]
let b = [3, 4, 5, 6]

let A = new Set(a)
let B = new Set(b)

let c = a.filter((num) => !B.has(num))
let C = new Set(c)

console.log(C)
```

```sh
Set(2) {1, 2}
```

<a id="map"></a>
## Map

<a id="创建空-map"></a>
### 创建空 Map

```js
const map = new Map()
console.log(map)
```

```sh
Map(0) {}
```

<a id="从数组创建-map"></a>
### 从数组创建 Map

```js
countries = [
  ['Finland', 'Helsinki'],
  ['Sweden', 'Stockholm'],
  ['Norway', 'Oslo'],
]
const map = new Map(countries)
console.log(map)
console.log(map.size)
```

```sh
Map(3) {"Finland" => "Helsinki", "Sweden" => "Stockholm", "Norway" => "Oslo"}
3
```

<a id="向-map-添加值"></a>
### 向 Map 添加值

```js
const countriesMap = new Map()
console.log(countriesMap.size) // 0
countriesMap.set('Finland', 'Helsinki')
countriesMap.set('Sweden', 'Stockholm')
countriesMap.set('Norway', 'Oslo')
console.log(countriesMap)
console.log(countriesMap.size)
```

```sh
Map(3) {"Finland" => "Helsinki", "Sweden" => "Stockholm", "Norway" => "Oslo"}
3
```

<a id="从-map-获取值"></a>
### 从 Map 获取值

```js
console.log(countriesMap.get('Finland'))
```

```sh
Helsinki
```

<a id="检查-map-中是否存在键"></a>
### 检查 Map 中是否存在键

使用 `has` 方法检查 Map 中是否存在某个键。它会返回 `true` 或 `false`。

```js
console.log(countriesMap.has('Finland'))
```

```sh
true
```

使用循环可以遍历 Map 中的所有键值对。

```js
for (const country of countriesMap) {
  console.log(country)
}
```

```sh
(2) ["Finland", "Helsinki"]
(2) ["Sweden", "Stockholm"]
(2) ["Norway", "Oslo"]
```

```js
for (const [country, city] of countriesMap){
 console.log(country, city)
}
```

```sh
Finland Helsinki
Sweden Stockholm
Norway Oslo
```

🌕 你又完成了一个重要里程碑。继续前进！你已经完成第 10 天挑战，离目标又近了 10 步。现在来做一些练习巩固一下。

<a id="练习"></a>
## 练习

<a id="练习1-级"></a>
### 练习：1 级

```js
const a = [4, 5, 8, 9]
const b = [3, 4, 5, 7]
const countries = ['Finland', 'Sweden', 'Norway']
```

1. 创建一个空 Set。
2. 使用循环创建一个包含 0 到 10 的 Set。
3. 从集合中删除一个元素
4. 清空 Set。
5. 从数组创建一个包含 5 个字符串元素的 Set。
6. 创建一个 Map，键为国家名，值为国家名的字符数。

<a id="练习2-级"></a>
### 练习：2 级

1. 求 `a` 和 `b` 的并集。
2. 求 `a` 和 `b` 的交集。
3. 求 `a` 相对于 `b` 的差集。

<a id="练习3-级"></a>
### 练习：3 级

1. 统计国家数据文件中一共有多少种语言。

2. 使用国家数据找出使用人数最多的 10 种语言。

```js
   // 输出应如下所示
   console.log(mostSpokenLanguages(countries, 10))
   [
     { English: 91 },
     { French: 45 },
     { Arabic: 25 },
     { Spanish: 24 },
     { Russian: 9 },
     { Portuguese: 9 },
     { Dutch: 8 },
     { German: 7 },
     { Chinese: 5 },
     { Swahili: 4 },
     { Serbian: 4 }
   ]

  // 输出应如下所示
  console.log(mostSpokenLanguages(countries, 3))
  [
  {English:91},
  {French:45},
  {Arabic:25}
  ]
```

🎉 恭喜！ 🎉

[<< Day 9](../09_Day_Higher_order_functions/09_day_higher_order_functions.md) | [Day 11 >>](../11_Day_Destructuring_and_spreading/11_day_destructuring_and_spreading.md)
