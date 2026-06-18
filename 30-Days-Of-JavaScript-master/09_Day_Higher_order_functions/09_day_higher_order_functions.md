<div align="center">
  <h1> 30 天 JavaScript：高阶函数</h1>
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

[<< Day 8](../08_Day_Objects/08_day_objects.md) | [Day 10 >>](../10_Day_Sets_and_Maps/10_day_Sets_and_Maps.md)

![Day 5](../images/banners/day_1_9.png)

- [第 9 天](#day-9)
	- [高阶函数](#higher-order-function)
		- [回调](#callback)
		- [返回函数](#returning-function)
		- [设定时间](#setting-time)
			- [使用 setInterval 函数设置间隔](#setting-interval-using-a-setinterval-function)
			- [使用 setTimeout 设置时间](#setting-a-time-using-a-settimeout)
	- [函数式编程](#functional-programming)
		- [forEach](#foreach)
		- [map](#map)
		- [filter](#filter)
		- [reduce](#reduce)
		- [every](#every)
		- [查找](#find)
		- [查找索引](#findindex)
		- [一些](#some)
		- [排序](#sort)
			- [对字符串值进行排序](#sorting-string-values)
			- [对数值进行排序](#sorting-numeric-values)
			- [对象数组排序](#sorting-object-arrays)
	- [💻练习](#-exercises)
		- [练习：1 级](#exercises-level-1)
		- [练习：2 级](#exercises-level-2)
		- [练习：3 级](#exercises-level-3)

<a id="day-9"></a>
# 第 9 天

<a id="higher-order-function"></a>
## 高阶函数

高阶函数是将其他函数作为参数或返回函数作为值的函数。作为参数传递的函数称为回调。

<a id="callback"></a>
### 回调

回调是一个可以作为参数传递给其他函数的函数。请参阅下面的示例。

```js
// a callback function, the name of the function could be any name
const callback = (n) => {
  return n ** 2
}
​
// function that takes other function as a callback
function cube(callback, n) {
  return callback(n) * n
}
​
console.log(cube(callback, 3))
```

<a id="returning-function"></a>
### 返回函数

高阶函数将函数作为值返回
​
```js
// Higher order function returning an other function
const higherOrder = n => {
  const doSomething = m => {
    const doWhatEver = t => {
      return 2 * n + 3 * m + t
    }
    return doWhatEver
  }
  return doSomething
}
console.log(higherOrder(2)(3)(10))
```

让我们看看我们是否使用了回调函数。例如 _forEach_ 方法使用回调。

```js
const numbers = [1, 2, 3, 4, 5]
const sumArray = arr => {
  let sum = 0
  const callback = function(element) {
    sum += element
  }
  arr.forEach(callback)
  return sum

}
console.log(sumArray(numbers))
```

```sh
15
```

上面的例子可以简化如下：

```js
const numbers = [1, 2, 3, 4]
​
const sumArray = arr => {
  let sum = 0
  arr.forEach(function(element) {
    sum += element
  })
  return sum

}
console.log(sumArray(numbers))
```

```sh
15
```

<a id="setting-time"></a>
### 设定时间

在 JavaScript 中，我们可以按一定的时间间隔执行某些操作，也可以安排某个操作在等待一段时间后执行。

- 设置间隔
- 设置超时

<a id="setting-interval-using-a-setinterval-function"></a>
#### 使用 setInterval 函数设置间隔

在 JavaScript 中，我们使用 setInterval 高阶函数在某个时间间隔内连续执行某些活动。 setInterval 全局方法采用回调函数和持续时间作为参数。持续时间以毫秒为单位，回调将始终在该时间间隔内被调用。

```js
// 语法
function callback() {
  // 代码写在这里
}
setInterval(callback, duration)
```

```js
function sayHello() {
  console.log('Hello')
}
setInterval(sayHello, 1000) // 每秒打印一次 hello，1000ms 等于 1s
```

<a id="setting-a-time-using-a-settimeout"></a>
#### 使用 setTimeout 设置时间

在 JavaScript 中，我们使用 setTimeout 高阶函数在未来某个时间执行操作。setTimeout 全局方法接收回调函数和延迟时间作为参数。延迟时间以毫秒为单位，回调会在等待该时间后执行。

```js
// 语法
function callback() {
  // 代码写在这里
}
setTimeout(callback, duration) // duration 以毫秒为单位
```

```js
function sayHello() {
  console.log('Hello')
}
setTimeout(sayHello, 2000) // 等待 2 秒后打印 hello
```

<a id="functional-programming"></a>
## 函数式编程

最新版本的 JavaScript 没有编写常规循环，而是引入了许多内置方法，可以帮助我们解决复杂的问题。所有内置方法都采用回调函数。在本节中，我们将看到 _forEach_、_map_、_filter_、_reduce_、_find_、_every_、_some_ 和 _sort_。

<a id="foreach"></a>
### forEach

_forEach_：遍历数组元素。我们通常将 _forEach_ 用于数组。它接收一个回调函数，回调函数可以接收元素、索引和数组本身作为参数，其中索引和数组参数是可选的。

```js
arr.forEach(function (element, index, arr) {
  console.log(index, element, arr)
})
// The above code can be written using arrow function
arr.forEach((element, index, arr) => {
  console.log(index, element, arr)
})
// The above code can be written using arrow function and explicit return
arr.forEach((element, index, arr) => console.log(index, element, arr))
```

```js
let sum = 0;
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(num => console.log(num))
console.log(sum)
```

```sh
1
2
3
4
5
```

```js
let sum = 0;
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(num => sum += num)

console.log(sum)
```

```sh
15
```

```js
const countries = ['Finland', 'Denmark', 'Sweden', 'Norway', 'Iceland']
countries.forEach((element) => console.log(element.toUpperCase()))
```

```sh
FINLAND
DENMARK
SWEDEN
NORWAY
ICELAND
```

<a id="map"></a>
### map

_map_：遍历数组元素，并基于每个元素生成一个新数组。它接收一个回调函数，回调函数可以接收元素、索引和数组本身作为参数。

```js
const modifiedArray = arr.map(function (element, index, arr) {
  return element
})
```

```js
/*Arrow function and explicit return
const modifiedArray = arr.map((element,index) => element);
*/
//Example
const numbers = [1, 2, 3, 4, 5]
const numbersSquare = numbers.map((num) => num * num)

console.log(numbersSquare)
```

```sh
[1, 4, 9, 16, 25]
```

```js
const names = ['Asabeneh', 'Mathias', 'Elias', 'Brook']
const namesToUpperCase = names.map((name) => name.toUpperCase())
console.log(namesToUpperCase)
```

```sh
['ASABENEH', 'MATHIAS', 'ELIAS', 'BROOK']
```

```js
const countries = [
  'Albania',
  'Bolivia',
  'Canada',
  'Denmark',
  'Ethiopia',
  'Finland',
  'Germany',
  'Hungary',
  'Ireland',
  'Japan',
  'Kenya',
]
const countriesToUpperCase = countries.map((country) => country.toUpperCase())
console.log(countriesToUpperCase)

/*
// Arrow function
const countriesToUpperCase = countries.map((country) => {
  return country.toUpperCase();
})
//Explicit return arrow function
const countriesToUpperCase = countries.map(country => country.toUpperCase());
*/
```

```sh
['ALBANIA', 'BOLIVIA', 'CANADA', 'DENMARK', 'ETHIOPIA', 'FINLAND', 'GERMANY', 'HUNGARY', 'IRELAND', 'JAPAN', 'KENYA']
```

```js
const countriesFirstThreeLetters = countries.map((country) =>
  country.toUpperCase().slice(0, 3)
)
```

```sh
 ["ALB", "BOL", "CAN", "DEN", "ETH", "FIN", "GER", "HUN", "IRE", "JAP", "KEN"]
```

<a id="filter"></a>
### filter

_filter_：筛选出满足条件的元素，并返回一个新数组。

```js
//Filter countries containing land
const countriesContainingLand = countries.filter((country) =>
  country.includes('land')
)
console.log(countriesContainingLand)
```

```sh
['Finland', 'Ireland']
```

```js
const countriesEndsByia = countries.filter((country) => country.endsWith('ia'))
console.log(countriesEndsByia)
```

```sh
['Albania', 'Bolivia','Ethiopia']
```

```js
const countriesHaveFiveLetters = countries.filter(
  (country) => country.length === 5
)
console.log(countriesHaveFiveLetters)
```

```sh
['Japan', 'Kenya']
```

```js
const scores = [
  { name: 'Asabeneh', score: 95 },
   { name: 'Lidiya', score: 98 },
  { name: 'Mathias', score: 80 },
  { name: 'Elias', score: 50 },
  { name: 'Martha', score: 85 },
  { name: 'John', score: 100 },
]

const scoresGreaterEighty = scores.filter((score) => score.score > 80)
console.log(scoresGreaterEighty)
```

```sh
[{name: 'Asabeneh', score: 95}, { name: 'Lidiya', score: 98 },{name: 'Martha', score: 85},{name: 'John', score: 100}]
```

<a id="reduce"></a>
### reduce

_reduce_：接收一个回调函数。回调函数通常接收累加器、当前值和可选的初始值，并最终返回单个值。为累加器设置初始值是一个好习惯。如果不指定初始值，累加器默认会取数组的第一个值。如果数组为空，`JavaScript` 会抛出错误。

```js
arr.reduce((acc, cur) => {
  // some operations goes here before returning a value
 return 
}, initialValue)
```

```js
const numbers = [1, 2, 3, 4, 5]
const sum = numbers.reduce((acc, cur) => acc + cur, 0)

console.log(sum)
```

```js
15
```

<a id="every"></a>
### every

_every_：检查所有元素是否都满足某个条件。它返回布尔值。

```js
const names = ['Asabeneh', 'Mathias', 'Elias', 'Brook']
const areAllStr = names.every((name) => typeof name === 'string') // 是否全是字符串？

console.log(areAllStr)
```

```sh
true
```

```js
const bools = [true, true, true, true]
const areAllTrue = bools.every((b) => b === true) // Are all true? 

console.log(areAllTrue) // true
```

```sh
true

```

### find

_find_：返回第一个满足条件的元素。

```js
const ages = [24, 22, 25, 32, 35, 18]
const age = ages.find((age) => age < 20)

console.log(age)
```

```js
18
```

```js
const names = ['Asabeneh', 'Mathias', 'Elias', 'Brook']
const result = names.find((name) => name.length > 7)
console.log(result)
```

```sh
Asabeneh
```

```js
const scores = [
  { name: 'Asabeneh', score: 95 },
  { name: 'Mathias', score: 80 },
  { name: 'Elias', score: 50 },
  { name: 'Martha', score: 85 },
  { name: 'John', score: 100 },
]

const score = scores.find((user) => user.score > 80)
console.log(score)
```

```sh
{ name: "Asabeneh", score: 95 }
```

### findIndex

_findIndex_：返回第一个满足条件的元素的索引。

```js
const names = ['Asabeneh', 'Mathias', 'Elias', 'Brook']
const ages = [24, 22, 25, 32, 35, 18]

const result = names.findIndex((name) => name.length > 7)
console.log(result) // 0

const age = ages.findIndex((age) => age < 20)
console.log(age) // 5
```

### some

_some_：检查是否至少有一个元素满足某个条件。它返回布尔值。

```js
const names = ['Asabeneh', 'Mathias', 'Elias', 'Brook']
const bools = [true, true, true, true]

const areSomeTrue = bools.some((b) =>  b === true)

console.log(areSomeTrue) //true
```

```js
const areAllStr = names.some((name) => typeof name === 'number') // 是否存在数字？
console.log(areAllStr) // false
```

### sort

_sort_：排序方法按升序或降序排列数组元素。默认情况下， **_sort()_** 方法会把值作为字符串进行排序。这对于字符串数组项效果很好，但对于数字则不然。如果数值按字符串排序，就会得到错误结果。`sort` 方法会修改原数组。建议在开始使用 _sort_ 方法之前复制原始数据。

<a id="sorting-string-values"></a>
#### 对字符串值进行排序

```js
const products = ['Milk', 'Coffee', 'Sugar', 'Honey', 'Apple', 'Carrot']
console.log(products.sort()) // ['Apple', 'Carrot', 'Coffee', 'Honey', 'Milk', 'Sugar']
// 现在原始 products 数组也被排序了
```

<a id="sorting-numeric-values"></a>
#### 对数值进行排序

正如你在下面的示例中看到的，按升序排序后，第一个出现的是 100。sort 会先将元素转换为字符串再比较，因此字符串 '100' 开头的 1 会被认为更小。为了避免这种情况，我们需要在 sort 方法中使用比较回调函数，该函数返回负数、零或正数。

```js
const numbers = [9.81, 3.14, 100, 37]
// Using sort method to sort number items provide a wrong result. see below
console.log(numbers.sort()) //[100, 3.14, 37, 9.81]
numbers.sort(function (a, b) {
  return a - b
})

console.log(numbers) // [3.14, 9.81, 37, 100]

numbers.sort(function (a, b) {
  return b - a
})
console.log(numbers) //[100, 37, 9.81, 3.14]
```

<a id="sorting-object-arrays"></a>
#### 对象数组排序

每当我们对数组中的对象进行排序时，我们都会使用对象键进行比较。让我们看下面的例子。

```js
objArr.sort(function (a, b) {
  if (a.key < b.key) return -1
  if (a.key > b.key) return 1
  return 0
})

// or

objArr.sort(function (a, b) {
  if (a['key'] < b['key']) return -1
  if (a['key'] > b['key']) return 1
  return 0
})

const users = [
  { name: 'Asabeneh', age: 150 },
  { name: 'Brook', age: 50 },
  { name: 'Eyob', age: 100 },
  { name: 'Elias', age: 22 },
]
users.sort((a, b) => {
  if (a.age < b.age) return -1
  if (a.age > b.age) return 1
  return 0
})
console.log(users) // sorted ascending
// [{…}, {…}, {…}, {…}]
```

🌕 你做得很好。永远不要放弃，因为伟大的事情需要时间。你刚刚完成了第 9 天的挑战，并且在通往卓越的道路上领先了 9 步。现在为你的大脑和肌肉做一些练习。

<a id="-exercises"></a>
## 💻 练习

<a id="exercises-level-1"></a>
### 练习：1 级

```js
const countries = ['Finland', 'Sweden', 'Denmark', 'Norway', 'IceLand']
const names = ['Asabeneh', 'Mathias', 'Elias', 'Brook']
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const products = [
  { product: 'banana', price: 3 },
  { product: 'mango', price: 6 },
  { product: 'potato', price: ' ' },
  { product: 'avocado', price: 8 },
  { product: 'coffee', price: 10 },
  { product: 'tea', price: '' },
]
```

1.解释**_forEach、map、filter、reduce_**之间的区别。
2. 在 `forEach`、`map`、`filter` 或 `reduce` 中使用回调函数之前先定义它。
3. 使用 **_forEach_** 来 console.log 国家数组中的每个国家。
4. 使用 **_forEach_** 在控制台打印名称数组中的每个名称。
5. 使用 **_forEach_** 来 console.log 数字数组中的每个数字。
6. 使用 **_map_** 创建一个新数组，将国家数组中的每个国家名转换为大写。
7. 使用 **_map_** 从国家数组创建国家长度数组。
8. 使用 **_map_** 通过将数字数组中的每个数字更改为平方来创建一个新数组
9. 使用 **_map_** 将名称数组中的每个名称更改为大写
10. 使用 **_map_** 将产品数组映射到其相应的价格。
11.使用**_filter_**过滤掉包含**_land_**的国家。
12. 使用 **_filter_** 筛选出长度为 6 个字符的国家。
13. 使用 **_filter_** 过滤掉国家数组中包含六个字母及以上的国家。
14. 使用 **_filter_** 过滤掉以 'E' 开头的国家；
15. 使用**_filter_** 仅过滤掉具有价值的价格。
16. 声明一个名为 getStringLists 的函数，该函数接受一个数组作为参数，然后返回一个仅包含字符串项的数组。
17. 使用 **_reduce_** 对 `numbers` 数组中的所有数字求和。
18. 使用**_reduce_**连接所有国家并产生这样的句子：**_爱沙尼亚、芬兰、瑞典、丹麦、挪威和冰岛是北欧国家_**
19. 解释 **_some_** 和 **_every_** 之间的区别
20. 使用 **_some_** 检查名称数组中某些名称的长度是否大于 7
21. 使用 **_every_** 检查是否所有国家都包含 land 一词
22. 解释 **_find_** 和 **_findIndex_** 之间的区别。
23. 使用 **_find_** 查找 `countries` 数组中第一个只包含六个字母的国家
24. 使用 **_findIndex_** 查找 `countries` 数组中第一个只包含 6 个字母的国家的位置
25. 使用 **_findIndex_** 查找 **_Norway_** 的位置，如果数组中不存在，将得到 -1。
26. 使用 **_findIndex_** 查找 **_Russia_** 的位置，如果数组中不存在，将得到 -1。

<a id="exercises-level-2"></a>
### 练习：2 级

1. 通过链接两个或多个数组迭代器来查找产品的总价（例如 arr.map(callback).filter(callback).reduce(callback)）
1. 仅使用 `reduce(callback)` 计算产品价格总和
1. 声明一个名为 **_categorizeCountries_** 的函数，返回包含某些共同模式的国家数组。国家数组可以在本仓库的 `countries.js` 中找到，例如包含 “land”、“ia”、“island”、“stan” 的国家。
1. 创建一个函数，返回一个对象数组，统计每个字母作为国家名称首字母出现的次数。
1. 声明一个 **_getFirstTenCountries_** 函数并返回十个国家的数组。使用不同的函数式编程方式处理 `countries.js` 数组
1. 声明一个 **_getLastTenCountries_** 函数，返回国家数组中的最后十个国家。
1. 从国家数组中找出哪个字母被多次用作国家名称的首字母（例如芬兰、斐济、法国等）

<a id="exercises-level-3"></a>
### 练习：3 级

1. 使用 `data` 文件夹中的国家信息，按名称、首都、人口对国家进行排序。
1. \*\*\* 查找 10 种最常用的语言：

   ````js
   // 输出应如下所示
   console.log(mostSpokenLanguages(countries, 10))
   [
   {country: 'English',count:91},
   {country: 'French',count:45},
   {country: 'Arabic',count:25},
   {country: 'Spanish',count:24},
   {country:'Russian',count:9},
   {country:'Portuguese', count:9},
   {country:'Dutch',count:8},
   {country:'German',count:7},
   {country:'Chinese',count:5},
   {country:'Swahili',count:4}
   ]

   // 输出应如下所示
   console.log(mostSpokenLanguages(countries, 3))
   [
   {country: 'English',count: 91},
   {country: 'French',count: 45},
   {country: 'Arabic',count: 25},
   ]```

   ````

2. \*\*\* 使用 `countries_data.js` 文件创建一个函数，返回人口最多的十个国家

   ````js
   console.log(mostPopulatedCountries(countries, 10))

   [
   {country: 'China', population: 1377422166},
   {country: 'India', population: 1295210000},
   {country: 'United States of America', population: 323947000},
   {country: 'Indonesia', population: 258705000},
   {country: 'Brazil', population: 206135893},
   {country: 'Pakistan', population: 194125062},
   {country: 'Nigeria', population: 186988000},
   {country: 'Bangladesh', population: 161006790},
   {country: 'Russian Federation', population: 146599183},
   {country: 'Japan', population: 126960000}
   ]

   console.log(mostPopulatedCountries(countries, 3))
   [
   {country: 'China', population: 1377422166},
   {country: 'India', population: 1295210000},
   {country: 'United States of America', population: 323947000}
   ]
   ```

   ````

3. \*\*\* 尝试开发一个程序，用于计算样本的集中趋势指标（均值、中位数、众数）和离散程度指标（范围、方差、标准差）。除此之外，还可以计算样本的最小值、最大值、数量、百分位数和频率分布。你可以创建一个名为 statistics 的对象，并将所有统计计算函数作为该对象的方法。参考下面的输出。

   ```js
   const ages = [31, 26, 34, 37, 27, 26, 32, 32, 26, 27, 27, 24, 32, 33, 27, 25, 26, 38, 37, 31, 34, 24, 33, 29, 26]

   console.log('Count:', statistics.count()) // 25
   console.log('Sum: ', statistics.sum()) // 744
   console.log('Min: ', statistics.min()) // 24
   console.log('Max: ', statistics.max()) // 38
   console.log('Range: ', statistics.range() // 14
   console.log('Mean: ', statistics.mean()) // 30
   console.log('Median: ',statistics.median()) // 29
   console.log('Mode: ', statistics.mode()) // {'mode': 26, 'count': 5}
   console.log('Variance: ',statistics.var()) // 17.5
   console.log('Standard Deviation: ', statistics.std()) // 4.2
   console.log('Variance: ',statistics.var()) // 17.5
   console.log('Frequency Distribution: ',statistics.freqDist()) # [(20.0, 26), (16.0, 27), (12.0, 32), (8.0, 37), (8.0, 34), (8.0, 33), (8.0, 31), (8.0, 24), (4.0, 38), (4.0, 29), (4.0, 25)]
   ```

   ```sh
   console.log(statistics.describe())
   Count: 25
   Sum:  744
   Min:  24
   Max:  38
   Range:  14
   Mean:  30
   Median:  29
   Mode:  (26, 5)
   Variance:  17.5
   Standard Deviation:  4.2
   Frequency Distribution: [(20.0, 26), (16.0, 27), (12.0, 32), (8.0, 37), (8.0, 34), (8.0, 33), (8.0, 31), (8.0, 24), (4.0, 38), (4.0, 29), (4.0, 25)]
   ```

🎉 恭喜！ 🎉

[<< Day 8](../08_Day_Objects/08_day_objects.md) | [Day 10 >>](../10_Day_Sets_and_Maps/10_day_Sets_and_Maps.md)
