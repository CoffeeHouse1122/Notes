## ES6 Class 完全指南

ES6（ECMAScript 2015）引入的 `class` 语法糖，让 JavaScript 的面向对象编程更加清晰和简洁。虽然底层仍是基于原型继承，但 `class` 提供了更接近传统面向对象语言的写法。本文将全面介绍 ES6 class 的所有知识点，帮助你深入理解并能灵活应用。

### 1. 基本语法

定义一个类使用 `class` 关键字，类名通常首字母大写。

```javascript
class Person {
  // 构造函数
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // 实例方法
  sayHello() {
    console.log(`Hello, I'm ${this.name}`);
  }
}

// 使用
const p = new Person('Alice', 30);
p.sayHello(); // Hello, I'm Alice
```

- `constructor` 是特殊方法，用于创建和初始化实例。一个类只能有一个构造函数。
- 方法之间不需要逗号分隔。
- 类内部定义的方法都是挂载在原型上的（`Person.prototype`）。

### 2. 类的本质

ES6 的 `class` 本质上是构造函数的语法糖，但有一些区别：

```javascript
typeof Person // "function"
Person === Person.prototype.constructor // true
```

- 类声明不会被提升（hoisting），这不同于函数声明。必须先定义后使用。
- 类中的所有代码自动运行在严格模式下。

### 3. 实例属性与实例方法

#### 3.1 传统方式（在 constructor 中定义）

```javascript
class Person {
  constructor(name) {
    this.name = name; // 实例属性
  }
  greet() {          // 实例方法（原型方法）
    console.log(`Hi, ${this.name}`);
  }
}
```

#### 3.2 类字段（Class Fields）提案（ES2022 正式纳入）

可以直接在类顶层定义实例属性，无需在 constructor 中赋值：

```javascript
class Person {
  name = 'Unknown';   // 实例属性，默认值
  age = 0;

  constructor(name, age) {
    if (name) this.name = name;
    if (age) this.age = age;
  }
}
```

类字段会被添加到实例上，而不是原型上。对于不需要参数的默认值非常方便。

### 4. 静态方法（Static Methods）和静态属性

使用 `static` 关键字定义静态方法和静态属性，它们属于类本身，而不是实例。

```javascript
class MathUtils {
  static PI = 3.14159;          // 静态属性（ES2022）
  static add(a, b) {            // 静态方法
    return a + b;
  }
}

console.log(MathUtils.PI);       // 3.14159
console.log(MathUtils.add(2, 3)); // 5
const mu = new MathUtils();
console.log(mu.PI);              // undefined（实例访问不到）
```

- 静态方法中的 `this` 指向类本身。
- 静态属性同样在类上定义，ES2022 标准正式支持。

### 5. 私有字段（Private Fields）

ES2022 正式引入了私有字段，使用 `#` 前缀，表示只能在类内部访问。

```javascript
class Person {
  #name;      // 私有字段必须先在顶层声明
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#age = age;
  }

  #privateMethod() {            // 私有方法
    console.log('private');
  }

  getInfo() {
    console.log(`${this.#name} is ${this.#age} years old`);
    this.#privateMethod();
  }
}

const p = new Person('Bob', 25);
p.getInfo();      // Bob is 25 years old \n private
console.log(p.#name); // SyntaxError: Private field '#name' must be declared
```

- 私有字段是真正的强私有，无法从外部访问。
- 私有方法也可以定义（使用 `#` 前缀），同样只能在类内部调用。
- 私有字段不能在构造函数中动态创建，必须预先声明。

### 6. 继承（extends）和 super

使用 `extends` 实现类之间的继承，子类通过 `super` 调用父类的构造函数和方法。

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);        // 调用父类构造函数，必须先调用super才能使用this
    this.breed = breed;
  }

  speak() {            // 重写方法
    super.speak();      // 调用父类方法
    console.log(`${this.name} barks.`);
  }

  static info() {
    console.log('Dogs are animals');
  }
}

const d = new Dog('Rex', 'Labrador');
d.speak();
// Rex makes a noise.
// Rex barks.
```

- 子类必须在 `constructor` 中调用 `super()`，否则会报错。
- `super` 可以作为函数调用（父类构造函数），也可以作为对象访问父类原型方法。
- 静态方法也会被继承，子类可以调用父类静态方法，也可以通过 `super` 在静态方法中访问父类静态方法。

### 7. Getter 和 Setter

使用 `get` 和 `set` 关键字定义访问器属性，可以拦截属性的读写操作。

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(value) {
    [this.firstName, this.lastName] = value.split(' ');
  }
}

const p = new Person('John', 'Doe');
console.log(p.fullName); // John Doe
p.fullName = 'Jane Smith';
console.log(p.firstName); // Jane
```

- 访问器属性定义在原型上，但每个实例的访问器属性行为相同。
- 可以只定义 getter 不定义 setter，此时属性只读。

### 8. 计算属性名（Computed Property Names）

类的方法名和属性名可以使用表达式，用方括号 `[]` 包裹。

```javascript
const methodName = 'sayHello';
class Person {
  [methodName]() {
    console.log('Hello');
  }
  
  static ['static' + 'Method']() {
    console.log('static method');
  }
}

const p = new Person();
p.sayHello(); // Hello
Person.staticMethod(); // static method
```

### 9. 静态初始化块（Static Initialization Blocks）

ES2022 引入了静态初始化块，用于在类加载时执行复杂的静态属性初始化逻辑。

```javascript
class Database {
  static connection;
  static {
    // 复杂的初始化代码，可以访问私有字段（但需注意作用域）
    try {
      this.connection = createConnection();
    } catch (err) {
      console.error('Failed to connect');
    }
  }
}
```

- 可以有多个静态块，它们按顺序执行。
- 静态块内可以访问类的私有静态字段，用于共享信息。

### 10. 类表达式（Class Expressions）

类也可以像函数一样定义成表达式，可以匿名或有名。

```javascript
const MyClass = class {
  constructor(x) {
    this.x = x;
  }
};

const NamedClass = class MyNamedClass {
  // 类名 MyNamedClass 只在类内部可见
  static identify() {
    console.log(MyNamedClass.name);
  }
};
NamedClass.identify(); // MyNamedClass
```

### 11. 其他重要细节

#### 11.1 类不存在变量提升

```javascript
new MyClass(); // ReferenceError: Cannot access 'MyClass' before initialization
class MyClass {}
```

#### 11.2 类内部的 this 指向

类方法中的 `this` 默认指向实例，但若方法作为回调函数传递，可能会丢失 this。可以使用箭头函数或 bind 解决。

```javascript
class Button {
  constructor(text) {
    this.text = text;
  }
  handleClick = () => {   // 类字段+箭头函数，确保 this 指向实例
    console.log(this.text);
  }
}
```

#### 11.3 类的方法不可枚举

类原型上的方法默认不可枚举，这与传统构造函数不同。

```javascript
class MyClass {
  method() {}
}
Object.keys(MyClass.prototype); // [] （method 不可枚举）
```

#### 11.4 类的 name 属性

类有一个内置的 `name` 属性，返回类名。

```javascript
class Foo {}
console.log(Foo.name); // Foo
```

### 12. 综合示例

综合运用以上知识，构建一个稍微复杂的例子：

```javascript
class Shape {
  static description = 'This is a shape';
  #id;
  constructor(id) {
    this.#id = id;
  }
  get id() {
    return this.#id;
  }
  area() {
    throw new Error('Must implement area method');
  }
  static compareArea(shape1, shape2) {
    return shape1.area() - shape2.area();
  }
}

class Circle extends Shape {
  #radius;
  static PI = 3.1416;
  constructor(id, radius) {
    super(id);
    this.#radius = radius;
  }
  area() {
    return Circle.PI * this.#radius ** 2;
  }
  static {
    console.log('Circle class initialized');
  }
}

class Rectangle extends Shape {
  #width;
  #height;
  constructor(id, width, height) {
    super(id);
    this.#width = width;
    this.#height = height;
  }
  area() {
    return this.#width * this.#height;
  }
}

const shapes = [new Circle('c1', 10), new Rectangle('r1', 5, 8)];
shapes.forEach(s => console.log(s.area()));
console.log(Shape.description); // This is a shape
console.log(Shape.compareArea(shapes[0], shapes[1])); // 差值
```

### 总结

ES6 的 class 提供了一套更清晰、更强大的面向对象编程语法，结合后续新增的类字段、私有成员、静态块等特性，让 JavaScript 的类设计能力与其他语言相当。掌握这些知识点，你可以更好地组织代码、实现继承、封装细节，写出更易维护的程序。

建议在实际开发中，根据项目环境选择合适的特性（如私有字段需 ES2022 支持或使用 Babel 转译）。多动手练习，才能熟练应用。