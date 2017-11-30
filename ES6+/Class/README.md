# Class

JavaScript作为一种弱类型语言，其并没有真正意义上的类的概念，但是我们却可以模拟出类似类的一些行为。

在ES6之前，我们可以借助函数的形式来模拟类。

```js
function Dog(name) {
    this.name = name;
}

Dog.prototype.bark = function() {
    console.log('Bark Bark! My name is ' + this.name);
}

const jet = new Dog('Jet');
jet.bark();
```

ES6中，JavaScript为我们带来了类似JAVA，C++等强类型语言的类的概念-----`Class`
用`Class`重写上述的代码：
```js
class Dog {
    constructor(name) {
        this.name = name;
    }

    bark() {
        console.log(`Bark Bark! My name is ${this.name}`);
    }
}
```

实际上`constructor`起到了构造函数的作用，而在Class里的函数，譬如`bark()`也就作为公用函数而被使用。
因此上述两种写法都符合一些特征：
```js
typeof Dog  // function
Dog === Dog.prototype.constructor   // true
```

我们可以看到其实`Dog`类的方法都是定义在`prototype`对象上，因此我们可以很方便地直接在`prototype`上添加新的方法。

当然，`Class`也有相应地取值函数`getter`和存值函数`setter`
```js
class Dog {
    constructor(name) {
        this.name = name;
    }

    bark() {
        console.log(`Bark Bark! My name is ${this.name}`);
    }

    get description() {
        return `${this.name} is a good dog`;
    }

    set nickName(nick) {
        this.name = nick;
        return this.name;
    }
}
```

我们如果想让类中一些方法不被实例继承，我们可以使用`static`静态函数。这个方法经常用于一些工具类的函数编写。
```js
class Dog {
    constructor(name) {
        this.name = name;
    }

    bark() {
        console.log(`Bark Bark! My name is ${this.name}`);
    }

    get description() {
        return `${this.name} is a good dog`;
    }

    set nickName(nick) {
        this.name = nick;
        return this.name;
    }

    static info() {
        console.log('All Dogs Are Real Good God');
    }
}

Dog.info(); // All Dogs Are Real Good God
const dog = new Dog('Jet');
dog.info(); // Uncaught TypeError: dog.info is not a function
```

既然说到了类，就离不开继承这个概念了。在`Class`中，我们可以通过`extends`关键字来实现继承。

```js
class Entity {
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;
    }

    sayHi() {
        console.log(`Hi, I am ${this.name}`);
    }
}

class Player extends Entity {
    constructor(name, hp, type) {
        super(name, hp);    // 调用父类的constructor
        this.type = type;
    }

    attack() {
        console.log('Attck Emeny');
    }
}

class Emeny extends Entity {
    constructor(name, hp, damage) {
        super(name, hp);
        this.damage = damage;
    }

    fire() {
        console.log('Using Fire Magic');
    }
}

class Wrong extends Entity {
    constructor(wrong) {
        this.wrong = wrong; // 报错，必须调用父类的constructor
        super();
        this.wrong = wrong; // OK
    }
}

const player1 = new Player("p1", 10, "warrior");
const boss = new Emeny("boss", 100, 5);
```

我们可以注意到，继承中，我们必须通过`super`函数来调用父类的`constructor`。