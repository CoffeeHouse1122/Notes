const PI = Math.PI
console.log(PI) // 3.141592653589793
console.log(Math.round(PI)) // 3；四舍五入到最接近的整数
console.log(Math.round(9.81)) // 10
console.log(Math.floor(PI)) // 3；向下取整
console.log(Math.ceil(PI)) // 4；向上取整
console.log(Math.min(-5, 3, 20, 4, 5, 10)) // -5，返回最小值
console.log(Math.max(-5, 3, 20, 4, 5, 10)) // 20，返回最大值

const randNum = Math.random() // 生成 0 到 0.999999 之间的随机数
console.log(randNum)
// 生成 0 到 10 之间的随机数
const num = Math.floor(Math.random() * 11) // 生成 0 到 10 之间的随机数
console.log(num)

// 绝对值
console.log(Math.abs(-10)) //10
// 平方根
console.log(Math.sqrt(100)) // 10
console.log(Math.sqrt(2)) //1.4142135623730951
// 幂
console.log(Math.pow(3, 2)) // 9
console.log(Math.E) // 2.718

// 对数
// 返回以 E 为底的 x 的自然对数：Math.log(x)
console.log(Math.log(2)) // 0.6931471805599453
console.log(Math.log(10)) // 2.302585092994046

// 三角函数
console.log(Math.sin(0))
console.log(Math.sin(60))
console.log(Math.cos(0))
console.log(Math.cos(60))
