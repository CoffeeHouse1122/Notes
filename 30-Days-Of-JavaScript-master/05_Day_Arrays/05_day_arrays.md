<div align="center">
  <h1> 30 天 JavaScript：数组</h1>
  <a class="header-badge" target="_blank" href="https://www.linkedin.com/in/asabeneh/">
  <img src="https://img.shields.io/badge/style--5eba00.svg?label=LinkedIn&logo=linkedin&style=social">
  </a>
  <a class="header-badge" target="_blank" href="https://twitter.com/Asabeneh">
  <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/asabeneh?style=social">
  </a>

  <sub> 作者：
  <a href="https://www.linkedin.com/in/asabeneh/" target="_blank">Asabeneh Yetayeh</a><br>
  <small> 2020 年 1 月</small>
  </sub>
</div>

[<< Day 4](../04_Day_Conditionals/04_day_conditionals.md) | [Day 6 >>](../06_Day_Loops/06_day_loops.md)

![Day 5](../images/banners/day_1_5.png)

- [📔 第 5 天](#-day-5)
	- [数组](#arrays)
		- [如何创建空数组](#how-to-create-an-empty-array)
		- [如何创建包含值的数组](#how-to-create-an-array-with-values)
		- [使用 split 创建数组](#creating-an-array-using-split)
		- [使用索引访问数组项](#accessing-array-items-using-index)
		- [修改数组元素](#modifying-array-element)
		- [数组操作方法](#methods-to-manipulate-array)
			- [数组构造函数](#array-constructor)
			- [创建带有填充的静态值](#creating-static-values-with-fill)
			- [使用 concat 连接数组](#concatenating-array-using-concat)
			- [获取数组长度](#getting-array-length)
			- [获取arr数组中元素的索引](#getting-index-an-element-in-arr-array)
			- [获取数组中元素的最后一个索引](#getting-last-index-of-an-element-in-array)
			- [检查数组](#checking-array)
			- [将数组转换为字符串](#converting-array-to-string)
			- [连接数组元素](#joining-array-elements)
			- [截取数组元素](#slice-array-elements)
			- [数组中的 splice 方法](#splice-method-in-array)
			- [使用 push 向数组添加元素](#adding-item-to-an-array-using-push)
			- [使用 pop 删除末尾元素](#removing-the-end-element-using-pop)
			- [从开头删除一个元素](#removing-an-element-from-the-beginning)
			- [从开头添加一个元素](#add-an-element-from-the-beginning)
			- [反转数组顺序](#reversing-array-order)
			- [对数组中的元素进行排序](#sorting-elements-in-array)
		- [数组的数组](#array-of-arrays)
	- [💻练习](#-exercise)
		- [练习：1 级](#exercise-level-1)
		- [练习：2 级](#exercise-level-2)
		- [练习：3 级](#exercise-level-3)

<a id="-day-5"></a>
# 📔 第 5 天

<a id="arrays"></a>
## 数组

与变量相反，数组可以存储_多个值_。数组中的每个值都有一个_索引_，每个索引都有_内存地址中的引用_。每个值都可以通过使用它们的_indexes_来访问。数组的索引从_zero_开始，最后一个元素的索引比数组的长度减一。

数组是有序且可更改（可修改）的不同数据类型的集合。数组允许存储重复元素和不同的数据类型。数组可以为空，也可以具有不同的数据类型值。

<a id="how-to-create-an-empty-array"></a>
### 如何创建空数组

在 JavaScript 中，我们可以通过不同的方式创建数组。让我们看看创建数组的不同方法。
使用 _const_ 而不是 _let_ 来声明数组变量很常见。如果你使用 const，就意味着不会重新赋值这个变量名。

- 使用数组构造函数

```js
// 语法
const arr = Array()
// or
// let arr = new Array()
console.log(arr) // []
```

- 使用方括号([])

```js
// 语法
// This the most recommended way to create an empty list
const arr = []
console.log(arr)
```

<a id="how-to-create-an-array-with-values"></a>
### 如何创建包含值的数组

具有初始值的数组。我们使用 _length_ 属性来查找数组的长度。

```js
const numbers = [0, 3.14, 9.81, 37, 98.6, 100] // array of numbers
const fruits = ['banana', 'orange', 'mango', 'lemon'] // array of strings, fruits
const vegetables = ['Tomato', 'Potato', 'Cabbage', 'Onion', 'Carrot'] // array of strings, vegetables
const animalProducts = ['milk', 'meat', 'butter', 'yoghurt'] // array of strings, products
const webTechs = ['HTML', 'CSS', 'JS', 'React', 'Redux', 'Node', 'MongDB'] // array of web technologies
const countries = ['Finland', 'Denmark', 'Sweden', 'Norway', 'Iceland'] // array of strings, countries

// Print the array and its length

console.log('Numbers:', numbers)
console.log('Number of numbers:', numbers.length)

console.log('Fruits:', fruits)
console.log('Number of fruits:', fruits.length)

console.log('Vegetables:', vegetables)
console.log('Number of vegetables:', vegetables.length)

console.log('Animal products:', animalProducts)
console.log('Number of animal products:', animalProducts.length)

console.log('Web technologies:', webTechs)
console.log('Number of web technologies:', webTechs.length)

console.log('Countries:', countries)
console.log('Number of countries:', countries.length)
```

```sh
Numbers: [0, 3.14, 9.81, 37, 98.6, 100]
Number of numbers: 6
Fruits: ['banana', 'orange', 'mango', 'lemon']
Number of fruits: 4
Vegetables: ['Tomato', 'Potato', 'Cabbage', 'Onion', 'Carrot']
Number of vegetables: 5
Animal products: ['milk', 'meat', 'butter', 'yoghurt']
Number of animal products: 4
Web technologies: ['HTML', 'CSS', 'JS', 'React', 'Redux', 'Node', 'MongDB']
Number of web technologies: 7
Countries: ['Finland', 'Estonia', 'Denmark', 'Sweden', 'Norway']
Number of countries: 5
```

- 数组可以包含不同数据类型的项

```js
const arr = [
    'Asabeneh',
    250,
    true,
    { country: 'Finland', city: 'Helsinki' },
    { skills: ['HTML', 'CSS', 'JS', 'React', 'Python'] }
] // arr containing different data types
console.log(arr)
```

<a id="creating-an-array-using-split"></a>
### 使用 split 创建数组

正如我们在前面部分所看到的，我们可以在不同的位置拆分字符串，并且可以更改为数组。让我们看看下面的例子。

```js
let js = 'JavaScript'
const charsInJavaScript = js.split('')

console.log(charsInJavaScript) // ["J", "a", "v", "a", "S", "c", "r", "i", "p", "t"]

let companiesString = 'Facebook, Google, Microsoft, Apple, IBM, Oracle, Amazon'
const companies = companiesString.split(',')

console.log(companies) // ["Facebook", " Google", " Microsoft", " Apple", " IBM", " Oracle", " Amazon"]
let txt =
  'I love teaching and empowering people. I teach HTML, CSS, JS, React, Python.'
const words = txt.split(' ')

console.log(words)
// the text has special characters think how you can just get only the words
// ["I", "love", "teaching", "and", "empowering", "people.", "I", "teach", "HTML,", "CSS,", "JS,", "React,", "Python"]
```

<a id="accessing-array-items-using-index"></a>
### 使用索引访问数组项

我们使用索引来访问数组中的每个元素。数组索引从0开始。下图清楚地显示了数组中每个元素的索引。

![arr index](../images/array_index.png)

```js
const fruits = ['banana', 'orange', 'mango', 'lemon']
let firstFruit = fruits[0] // we are accessing the first item using its index

console.log(firstFruit) // banana

secondFruit = fruits[1]
console.log(secondFruit) // orange

let lastFruit = fruits[3]
console.log(lastFruit) // lemon
// Last index can be calculated as follows

let lastIndex = fruits.length - 1
lastFruit = fruits[lastIndex]

console.log(lastFruit)  // lemon
```

```js
const numbers = [0, 3.14, 9.81, 37, 98.6, 100]  // set of numbers

console.log(numbers.length)  // => to know the size of the array, which is 6
console.log(numbers)         // -> [0, 3.14, 9.81, 37, 98.6, 100]
console.log(numbers[0])      //  -> 0
console.log(numbers[5])      //  -> 100

let lastIndex = numbers.length - 1;
console.log(numbers[lastIndex]) // -> 100
```

```js
const webTechs = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Redux',
  'Node',
  'MongoDB'
] // List of web technologies

console.log(webTechs)        // all the array items
console.log(webTechs.length) // => to know the size of the array, which is 7
console.log(webTechs[0])     //  -> HTML
console.log(webTechs[6])     //  -> MongoDB

let lastIndex = webTechs.length - 1
console.log(webTechs[lastIndex]) // -> MongoDB
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
  'Kenya'
] // List of countries

console.log(countries)      // -> all countries in array
console.log(countries[0])   //  -> Albania
console.log(countries[10])  //  -> Kenya

let lastIndex = countries.length - 1;
console.log(countries[lastIndex]) //  -> Kenya
```

```js
const shoppingCart = [
  'Milk',
  'Mango',
  'Tomato',
  'Potato',
  'Avocado',
  'Meat',
  'Eggs',
  'Sugar'
] // List of food products

console.log(shoppingCart) // -> all shoppingCart in array
console.log(shoppingCart[0]) //  -> Milk
console.log(shoppingCart[7]) //  -> Sugar

let lastIndex = shoppingCart.length - 1;
console.log(shoppingCart[lastIndex]) //  -> Sugar
```

<a id="modifying-array-element"></a>
### 修改数组元素

数组是可变的（可修改的）。创建数组后，我们可以修改数组元素的内容。

```js
const numbers = [1, 2, 3, 4, 5]
numbers[0] = 10      // changing 1 at index 0 to 10
numbers[1] = 20      // changing  2 at index 1 to 20

console.log(numbers) // [10, 20, 3, 4, 5]

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
  'Kenya'
]

countries[0] = 'Afghanistan'  // Replacing Albania by Afghanistan
let lastIndex = countries.length - 1
countries[lastIndex] = 'Korea' // Replacing Kenya by Korea

console.log(countries)
```

```sh
["Afghanistan", "Bolivia", "Canada", "Denmark", "Ethiopia", "Finland", "Germany", "Hungary", "Ireland", "Japan", "Korea"]
```

<a id="methods-to-manipulate-array"></a>
### 操作数组的方法

有不同的方法来操作数组。以下是处理数组的一些可用方法：_Array、length、concat、indexOf、slice、splice、join、toString、includes、lastIndexOf、isArray、fill、push、pop、shift、unshift_

<a id="array-constructor"></a>
#### 数组构造函数

数组：创建一个数组。

```js
const arr = Array() // 创建一个空数组
console.log(arr)

const eightEmptyValues = Array(8) // it creates eight empty values
console.log(eightEmptyValues) // [empty x 8]
```

<a id="creating-static-values-with-fill"></a>
#### 使用 fill 创建静态值

fill：用静态值填充所有数组元素

```js
const arr = Array() // 创建一个空数组
console.log(arr)

const eightXvalues = Array(8).fill('X') // it creates eight element values filled with 'X'
console.log(eightXvalues) // ['X', 'X','X','X','X','X','X','X']

const eight0values = Array(8).fill(0) // it creates eight element values filled with '0'
console.log(eight0values) // [0, 0, 0, 0, 0, 0, 0, 0]

const four4values = Array(4).fill(4) // it creates 4 element values filled with '4'
console.log(four4values) // [4, 4, 4, 4]
```

<a id="concatenating-array-using-concat"></a>
#### 使用 concat 连接数组

concat：连接两个数组。

```js
const firstList = [1, 2, 3]
const secondList = [4, 5, 6]
const thirdList = firstList.concat(secondList)

console.log(thirdList) // [1, 2, 3, 4, 5, 6]
```

```js
const fruits = ['banana', 'orange', 'mango', 'lemon']                 // array of fruits
const vegetables = ['Tomato', 'Potato', 'Cabbage', 'Onion', 'Carrot'] // array of vegetables
const fruitsAndVegetables = fruits.concat(vegetables)                 // concatenate the two arrays

console.log(fruitsAndVegetables)
```

```sh
["banana", "orange", "mango", "lemon", "Tomato", "Potato", "Cabbage", "Onion", "Carrot"]
```

<a id="getting-array-length"></a>
#### 获取数组长度

Length：了解数组的大小

```js
const numbers = [1, 2, 3, 4, 5]
console.log(numbers.length) // -> 5 is the size of the array
```

<a id="getting-index-an-element-in-arr-array"></a>
#### 获取 arr 数组中的元素索引

indexOf：检查数组中是否存在某个项目。如果存在则返回索引，否则返回-1。

```js
const numbers = [1, 2, 3, 4, 5]

console.log(numbers.indexOf(5)) // -> 4
console.log(numbers.indexOf(0)) // -> -1
console.log(numbers.indexOf(1)) // -> 0
console.log(numbers.indexOf(6)) // -> -1
```

检查一个元素是否存在于数组中。

- 检查列表中的项目
  
```js
// let us check if a banana exist in the array

const fruits = ['banana', 'orange', 'mango', 'lemon']
let index = fruits.indexOf('banana')  // 0

if(index === -1){
   console.log('This fruit does not exist in the array')  
} else {
    console.log('This fruit does exist in the array')
}
// This fruit does exist in the array

// we can use also ternary here
index === -1 ? console.log('This fruit does not exist in the array'): console.log('This fruit does exist in the array')

// let us check if an avocado exist in the array
let indexOfAvocado = fruits.indexOf('avocado')  // -1, if the element not found index is -1
if(indexOfAvocado === -1){
   console.log('This fruit does not exist in the array')  
} else {
    console.log('This fruit does exist in the array')
}
// This fruit does not exist in the array
```

<a id="getting-last-index-of-an-element-in-array"></a>
#### 获取数组中元素的最后一个索引

lastIndexOf：给出数组中最后一项的位置。如果存在，则返回索引，否则返回-1。

```js
const numbers = [1, 2, 3, 4, 5, 3, 1, 2]

console.log(numbers.lastIndexOf(2)) // 7
console.log(numbers.lastIndexOf(0)) // -1
console.log(numbers.lastIndexOf(1)) //  6
console.log(numbers.lastIndexOf(4)) //  3
console.log(numbers.lastIndexOf(6)) // -1
```

包括：检查数组中是否存在某个项目。如果存在则返回 true，否则返回 false。

```js
const numbers = [1, 2, 3, 4, 5]

console.log(numbers.includes(5)) // true
console.log(numbers.includes(0)) // false
console.log(numbers.includes(1)) // true
console.log(numbers.includes(6)) // false

const webTechs = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Redux',
  'Node',
  'MongoDB'
] // List of web technologies

console.log(webTechs.includes('Node'))  // true
console.log(webTechs.includes('C'))     // false
```

<a id="checking-array"></a>
#### 检查数组

Array.isArray:检查数据类型是否为数组

```js
const numbers = [1, 2, 3, 4, 5]
console.log(Array.isArray(numbers)) // true

const number = 100
console.log(Array.isArray(number)) // false
```

<a id="converting-array-to-string"></a>
#### 将数组转换为字符串

toString：将数组转换为字符串

```js
const numbers = [1, 2, 3, 4, 5]
console.log(numbers.toString()) // 1,2,3,4,5

const names = ['Asabeneh', 'Mathias', 'Elias', 'Brook']
console.log(names.toString()) // Asabeneh,Mathias,Elias,Brook
```

<a id="joining-array-elements"></a>
#### 连接数组元素

join：用于连接数组的元素，我们在 join 方法中传递的参数将被连接到数组中并以字符串形式返回。默认情况下，它用逗号连接，但我们可以传递不同的字符串参数，这些参数可以在项目之间连接。

```js
const numbers = [1, 2, 3, 4, 5]
console.log(numbers.join()) // 1,2,3,4,5

const names = ['Asabeneh', 'Mathias', 'Elias', 'Brook']

console.log(names.join()) // Asabeneh,Mathias,Elias,Brook
console.log(names.join('')) //AsabenehMathiasEliasBrook
console.log(names.join(' ')) //Asabeneh Mathias Elias Brook
console.log(names.join(', ')) //Asabeneh, Mathias, Elias, Brook
console.log(names.join(' # ')) //Asabeneh # Mathias # Elias # Brook

const webTechs = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Redux',
  'Node',
  'MongoDB'
] // List of web technologies

console.log(webTechs.join())       // "HTML,CSS,JavaScript,React,Redux,Node,MongoDB"
console.log(webTechs.join(' # '))  // "HTML # CSS # JavaScript # React # Redux # Node # MongoDB"
```

<a id="slice-array-elements"></a>
#### 截取数组元素

`slice`：截取数组中指定范围内的多个元素。它接收两个参数：起始位置和结束位置，但不包含结束位置对应的元素。

```js
  const numbers = [1,2,3,4,5]

  console.log(numbers.slice()) // -> it copies all  item
  console.log(numbers.slice(0)) // -> it copies all  item
  console.log(numbers.slice(0, numbers.length)) // it copies all  item
  console.log(numbers.slice(1,4)) // -> [2,3,4] // it doesn't include the ending position
```

<a id="splice-method-in-array"></a>
#### 数组中的 splice 方法

`splice`：用于删除、替换或插入数组元素。它通常接收起始位置、删除数量，以及要添加的新元素。

```js
  const numbers = [1, 2, 3, 4, 5]
  numbers.splice()
  console.log(numbers)                // -> remove all items

```

```js
  const numbers = [1, 2, 3, 4, 5]
	numbers.splice(0,1)
  console.log(numbers)            // remove the first item
```

```js
  const numbers = [1, 2, 3, 4, 5, 6]
	numbers.splice(3, 3, 7, 8, 9)
  console.log(numbers.splice(3, 3, 7, 8, 9))  // -> [1, 2, 3, 7, 8, 9] //it removes three item and replace three items
```

<a id="adding-item-to-an-array-using-push"></a>
#### 使用 push 向数组添加元素

`push`：在数组末尾添加元素。要向现有数组的末尾添加元素，可以使用 `push` 方法。

```js
// 语法
const arr  = ['item1', 'item2','item3']
arr.push('new item')
console.log(arr)
// ['item1', 'item2','item3','new item']
```

```js
const numbers = [1, 2, 3, 4, 5]
numbers.push(6)
console.log(numbers) // -> [1,2,3,4,5,6]

numbers.pop() // -> remove one item from the end
console.log(numbers) // -> [1,2,3,4,5]
```

```js
let fruits = ['banana', 'orange', 'mango', 'lemon']
fruits.push('apple')
console.log(fruits)    // ['banana', 'orange', 'mango', 'lemon', 'apple']

fruits.push('lime')
console.log(fruits)   // ['banana', 'orange', 'mango', 'lemon', 'apple', 'lime']
```

<a id="removing-the-end-element-using-pop"></a>
#### 使用 pop 删除末尾元素

`pop`：删除数组末尾的元素。

```js
const numbers = [1, 2, 3, 4, 5]
numbers.pop() // -> remove one item from the end
console.log(numbers) // -> [1,2,3,4]
```

<a id="removing-an-element-from-the-beginning"></a>
#### 从开头删除一个元素

`shift`：删除数组开头的一个元素。

```js
const numbers = [1, 2, 3, 4, 5]
numbers.shift() // -> remove one item from the beginning
console.log(numbers) // -> [2,3,4,5]
```

<a id="add-an-element-from-the-beginning"></a>
#### 从开头添加一个元素

`unshift`：在数组开头添加元素。

```js
const numbers = [1, 2, 3, 4, 5]
numbers.unshift(0) // -> add one item from the beginning
console.log(numbers) // -> [0,1,2,3,4,5]
```

<a id="reversing-array-order"></a>
#### 反转数组顺序

`reverse`：反转数组的顺序。

```js
const numbers = [1, 2, 3, 4, 5]
numbers.reverse() // -> reverse array order
console.log(numbers) // [5, 4, 3, 2, 1]

numbers.reverse()
console.log(numbers) // [1, 2, 3, 4, 5]
```

<a id="sorting-elements-in-array"></a>
#### 对数组中的元素进行排序

`sort`：对数组元素进行排序。排序可以接收一个回调函数，我们会在后续章节看到如何将排序与回调函数一起使用。

```js
const webTechs = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Redux',
  'Node',
  'MongoDB'
]

webTechs.sort()
console.log(webTechs) // ["CSS", "HTML", "JavaScript", "MongoDB", "Node", "React", "Redux"]

webTechs.reverse() // after sorting we can reverse it
console.log(webTechs) // ["Redux", "React", "Node", "MongoDB", "JavaScript", "HTML", "CSS"]
```

<a id="array-of-arrays"></a>
### 数组的数组

数组可以存储不同的数据类型，包括数组本身。让我们创建一个数组的数组

```js
const firstNums = [1, 2, 3]
const secondNums = [1, 4, 9]

const arrayOfArray =  [[1, 2, 3], [1, 2, 3]]
console.log(arrayOfArray[0]) // [1, 2, 3]

 const frontEnd = ['HTML', 'CSS', 'JS', 'React', 'Redux']
 const backEnd = ['Node','Express', 'MongoDB']
 const fullStack = [frontEnd, backEnd]
 console.log(fullStack)   // [["HTML", "CSS", "JS", "React", "Redux"], ["Node", "Express", "MongoDB"]]
 console.log(fullStack.length)  // 2
 console.log(fullStack[0])  // ["HTML", "CSS", "JS", "React", "Redux"]
 console.log(fullStack[1]) // ["Node", "Express", "MongoDB"]
```

🌕 你很勤奋，已经取得了很多成就。你刚刚完成了第 5 天的挑战，并且在通往卓越之路上领先 5 步。现在为你的大脑和肌肉做一些练习。

<a id="-exercise"></a>
## 💻 练习

<a id="exercise-level-1"></a>
### 练习：1 级

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
  'Kenya'
]

const webTechs = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Redux',
  'Node',
  'MongoDB'
]
```

1. 声明一个_空_数组；
2. 声明一个元素数量超过 5 个的数组。
3. 计算数组的长度
4. 获取数组的第一项、中间项和最后一项。
5. 声明一个名为_mixedDataTypes_的数组，将不同的数据类型放入数组中并找到数组的长度。数组大小应大于 5
6. 声明一个数组变量名称 itCompanies 并分配初始值 Facebook、Google、Microsoft、Apple、IBM、Oracle 和 Amazon
7. 使用 _console.log()_ 打印数组
8. 打印数组中的公司数量
9. 打印第一家公司、中间和最后一家公司
10. 打印出每个公司
11. 将每个公司名称转换为大写并打印出来。
12. 将数组打印为一句话：Facebook、Google、Microsoft、Apple、IBM、Oracle 和 Amazon 都是大型 IT 公司。
13. 检查 `itCompanies` 数组中是否存在某个公司。如果存在则返回公司名称，否则返回 _未找到_。
14. 不使用 `filter` 方法，过滤出包含多个 “o” 的公司。
15. 使用 _sort()_ 方法对数组进行排序
16. 使用 _reverse()_ 方法反转数组
17. 从数组中截取前 3 个公司。
18. 从数组中截取最后 3 个公司。
19. 从数组中删除中间的一个或多个 IT 公司。
20. 从数组中删除第一个 IT 公司。
21. 从数组中删除中间的一个或多个 IT 公司。
22. 从数组中删除最后一个 IT 公司。
23. 删除所有 IT 公司。

<a id="exercise-level-2"></a>
### 练习：2 级

1. 创建单独的 `countries.js` 文件，并将 `countries` 数组存储到该文件中。再创建单独的 `web_techs.js` 文件，并将 `webTechs` 数组存储到该文件中。最后在 `main.js` 中引入这两个文件。
2. 首先去掉所有标点符号，将字符串转换为数组，并统计数组中的单词数量。

    ```js
    let text =
    'I love teaching and empowering people. I teach HTML, CSS, JS, React, Python.'
    console.log(words)
    console.log(words.length)
    ```

    ```sh
    ["I", "love", "teaching", "and", "empowering", "people", "I", "teach", "HTML", "CSS", "JS", "React", "Python"]
  
    13
    ```

3. 对下面的购物车数组进行添加、删除和编辑操作。

    ```js
    const shoppingCart = ['Milk', 'Coffee', 'Tea', 'Honey']
    ```

   - 如果还没有 “Meat”，请将它添加到购物车开头。
   - 如果还没有 “Sugar”，请将它添加到购物车末尾。
   - 如果你对 “Honey” 过敏，请删除它。
   - 将 “Tea” 修改为 “Green Tea”。
4. 检查国家数组中是否存在 “Ethiopia”。如果存在，打印 “ETHIOPIA”；如果不存在，则将它添加到国家列表中。
5. 检查 `webTechs` 数组中是否存在 Sass。如果存在，打印 'Sass is a CSS preprocess'；如果不存在，则将 Sass 添加到数组并打印该数组。
6. 连接以下两个变量，并将结果存储在 `fullStack` 变量中。

    ```js
    const frontEnd = ['HTML', 'CSS', 'JS', 'React', 'Redux']
    const backEnd = ['Node','Express', 'MongoDB']
  
    console.log(fullStack)
    ```

    ```sh
    ["HTML", "CSS", "JS", "React", "Redux", "Node", "Express", "MongoDB"]
    ```

<a id="exercise-level-3"></a>
### 练习：3 级

1. 以下是 10 名学生年龄的数组：

    ```js
    const ages = [19, 22, 19, 24, 20, 25, 26, 24, 25, 24]
    ```

    - 对数组进行排序并找到最小年龄和最大年龄。
    - 找出年龄中位数（一个中间值，或两个中间值的平均值）。
    - 计算平均年龄（所有年龄之和除以数量）。
    - 找到年龄范围（最大值减去最小值）。
    - 比较（最小值 - 平均值）和（最大值 - 平均值）的值，使用 _abs()_ 方法
2. 从 [countries array](https://github.com/Asabeneh/30DaysOfJavaScript/tree/master/data/countries.js) 中截取前十个国家。
3. 在 [countries array](https://github.com/Asabeneh/30DaysOfJavaScript/tree/master/data/countries.js) 中找到中间的国家。
4. 如果国家数组长度是偶数，则将其分成两个长度相等的数组；如果长度是奇数，则让前半部分多包含一个国家。
  
🎉 恭喜！ 🎉

[<< Day 4](../04_Day_Conditionals/04_day_Conditionals.md) | [Day 6 >>](../06_Day_Loops/06_day_loops.md)
