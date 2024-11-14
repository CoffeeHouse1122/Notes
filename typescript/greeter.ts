function greeter(person) {
    return "Hello, " + person;
}
var user = "Jane User";
document.body.innerHTML = greeter(user);


let x: number[] = [1, 2, 3];
enum Color { red = 1, green, blue }; // 枚举
let c: Color = Color.red;
console.log(c);

let notSure: any = 4; // 任意值
notSure = "3";
notSure = true;
let list: any[] = [1, 2, "3"];

function a(): void { // 空值
    alert("空值");
}
let unusable: void = undefined;

let u: undefined = undefined; // undefined
let n: null = null; // null

// never类型表示的是那些永不存在的值的类型
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}

let someValue: any = "this is a string";
// let strlength: number = (<string>someValue).length; // 类型断言 <>
let strlength: number = (someValue as string).length; // 类型断言 as jsx可以使用







