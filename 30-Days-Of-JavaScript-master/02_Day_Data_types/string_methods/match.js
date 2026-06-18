// match：它接收子字符串或正则表达式模式作为参数；如果匹配成功则返回数组，否则返回 null。让我们看看正则表达式模式是什么样子的。它以 / 开始，也以 / 结束。
let string = 'love'
let patternOne = /love/ // 不带任何标志
let patternTwo = /love/gi // g 表示在全文搜索，i 表示忽略大小写
string.match(substring)
let string = 'I love JavaScript. If you do not love JavaScript what else can you love.'
console.log(string.match('love')) //
/*
output

["love", index: 2, input: "I love JavaScript. If you do not love JavaScript what else can you love.", groups: undefined]
*/
let pattern = /love/gi
console.log(string.match(pattern)) // ["love", "love", "love"]
// 让我们使用正则表达式从文本中提取数字。这里还不是正则表达式章节，不用担心。

let txt = 'In 2019, I run 30 Days of Python. Now, in 2020 I super exited to start this challenge'
let regEx = /\d/g // 带转义字符的 d 表示数字，而不是普通字母 d
// + 表示一个或多个数字
// 后面的 g 表示全局搜索，也就是在所有位置搜索
console.log(txt.match(regEx)) // ["2", "0", "1", "9", "3", "0", "2", "0", "2", "0"]
console.log(txt.match(/\d+/g)) // ["2019", "30", "2020"]
