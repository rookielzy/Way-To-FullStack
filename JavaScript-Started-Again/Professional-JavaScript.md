# Professional JavaScript for Web Developers 3rd Edition

## `<script>`

* `async` 立即下载脚本，异步执行该脚本。
* `defer` 通知浏览器该脚本将在文档完成解析后，触发`DOMContentLoaded`事件前执行。如果缺少`src`属性（即内嵌脚本），该属性不应该被使用。对动态嵌入的脚步使用`async=false`可达到类似效果。

## `textContent` & `innerText` & `innerHTML`

* `textContent`会获取所有元素的内容，包括`<script>`和`<style>`元素，然而`innerText`不会。
* `innerText`意识到样式，并且不会返回隐藏元素的文本，而`textContent`会。
* 由于`innerText`受CSS样式的影响，它会触发重排（reflow)，但`textContent`不会。
* 与 `textContent` 不同的是, 在 Internet Explorer (对于小于等于 IE11 的版本) 中对 `innerText` 进行修改， 不仅会移除当前元素的子节点，而且还会永久性地破坏所有后代文本节点（所以不可能再次将节点再次插入到任何其他元素或同一元素中）。
* `innerHTML` 返回 HTML 文本。通常，为了在元素中检索或写入文本，人们使用`innerHTML`。但是，`textContent`通常具有更好的性能，因为文本不会被解析为HTML。此外，使用`textContent`可以防止  XSS 攻击。

### reflow 重排 repaint 重绘

<b>重绘：</b> 元素在页面显示出来的样式发生改变时，就会触发重绘，但此时元素的布局并未发生改变。样式改变的一些例子:轮廓线（outline），可见性（visibility），背景颜色（background color）。

<b>重排：</b> 重排会重新安排页面的布局, 在一个元素节点中的重排指重新计算该元素的尺寸和位置, 并且会触发该元素子节点, 祖先元素的重排, 以及在出现在该元素之后的DOM元素的重排(下面有示例), 最后进行一次重绘(repaint). 重排是个很容易引起的现象, 但是对性能的影响很大, 在很多情况下相当于对整个页面的布局进行重新安排, 因此要尽量避免重排.

下列情况会触发重排：
* 插入, 移除, 更新DOM中的元素
* 改变页面内容, 如改变输入框中的文本
* 移动DOM元素
* 给DOM元素加动画效果
* 计算元素的样式值, 如offsetHeight或getComputedStyle
* 改变CSS样式
* 改变元素的className
* 添加或移除样式表
* 改变视窗大小
* 滚屏

参考: http://www.stubbornella.org/content/2009/03/27/reflows-repaints-css-performance-making-your-javascript-slow/

## 数值转换

```js
Number("123")     // 123
Number("000011")  // 11
Number("")        // 0
Number("0x11")    // 17
Number("0b11")    // 3
Number("0o11")    // 9
Number("foo")     // NaN
Number("100a")    // NaN
Number("null")    // 0
Number("undefined") // NaN
```

## 检测数组

```js
// ECMAScript 3
if (value instanceof Array) {

}

// ECMAScript 5 Better
if (Array.isArray(value)) {

}
```

## Getter Setter
Getters and Setters can protect data, or provide useful ways to set its value.

The regular way to use `get` and `set`:
```js
var address = {
    street: "No Street",
    city: "No City",
    state: "No Staate",

    // Provides styled data all at once
    get getAddress() {
        return this.street + ", " + this.city + ", " + this.state;
    }

    // Allows the user to set 3 values with 1
    set setAddress(theAddress) {
        var parts = theAddress.toString().split(", ");
        this.street = parts[0] || '';
        this.city = parts[1] || '';
        this.state = parts[2] || '';
    }
}

// Use it
address.getAddress;
address.setAddress = "123 Main St, Pittsburgh, PA";
```

Constructor Getters and Setters:
```js
function Coordinates() {
    this.latitude = 0.0;
    this.longitude = 0.0;
}

// Define the getter with the prototype to assign it to with
// the property name and the getter function
Object.__defineGetter__.call(Coordinates.prototype, "getCoords", function() {
    return "Lat: " + this.latitude + " Long: " + this.longitude;
});

// Define the setter with prototype to assign it to with
// the propertype name and the setter function
Object.__defineSetter__.call(Coordinates.prototype, "setCoords", function(coors) {
    var parts = coors.toString().split(", ");
    this.latitude = parts[0] || '';
    this.longitude = parts[1] || '';
});

var testCoords = new Coordinates();

testCoords.setCoords = "40.71, 74.00";
```

Getters and Setters with `defineProperty`
```js
function Point() {
    this.xPos = 0;
    this.yPos = 0;
}

// Use defineProperty to set getters and setters
// Pass te prototype to attach to along with the property name
// and define the functions to associate with get and set
Object.defineProperty(Point.prototype, "pointPos", {
    get: function() {
        return "X: " + this.xPos + " Y: " + this.yPos;
    },
    set: function(thePoint) {
        var parts = thePoint.toString().split(", ");
        this.xPos = parts[0] || '';
        this.yPos = parts[1] || '';
    },
});

var aPoint = new Point();
aPoint.pointPos = "100, 200";
```

ES5.1 Getters and Setters
```js
var Circle = function(radius) {
    this._radius = radius;
};

Circle.prototype = {
    set radius(radius) { this._radius = radius; },
    get radius() { return this__radius; },
    get area() { return Matn.PI * (this._radius * this._radius); },
}

var circ = new Circle(10);

circ.radius = 15;
```

## Inheritance
When we ask for a property if it isn't found in the main object
then it is searched for in the prototype object. We are able
to inherit methods and variables from any object in a
chain of objects.

```js
function Animal() {
    this.name = "Animal";

    // toString is a function in the main Object that every
    // object inherits from
    this.toString = function() {
        return "My name is : " + this.name;
    };
}

function Canine() {
    this.name = "Canine";
}

function Wolf() {
    this.name = "Wolf";
}

// Overwrite the prototype for Canine and Wolf
Canine.prototype = new Animal();
Wolf.prototype = new Canine();

// After you overwrite prototype its constructor points to the
// main object object so you have to reset the constructor after
Canine.prototype.constructor = Canine;
Wolf.prototype.constructor = Wolf;

var arcticWolf = new Wolf();

// Wolf inherits toString from Animal
arcticWolf.toString();
arcticWolf instanceof Animal;   // true

// Properties added to any object in the chain is inherited
Animal.prototype.sound = "Grrrr";

Animal.prototype.getSound = function() {
    return this.name + " says " + this.sound;
}

Canine.prototype.sound = "Woof";
Wolf.prototype.sound = "Grrrr Wooof";

// More often then not it makes more sense to just inherit the
// prototype to speed up the lookup process

function Rodent() {
    this.name = "Rodent";
}

function Rat() {
    this.name = "Rat";
}

Rodent.prototype = new Animal();
Rat.prototype = Rodent.prototype;
Rodent.prototype.constructor = Rodent;
Rad.prototype.constructor = Rad;

var caneRat = new Rat();

// Wolf inherits toString from Animal
caneRat.toString();
```

Intermediate Function Inheritance
```js
function extend(Child, Parent) {
    var Temp = function() {};

    Temp.prototype = Parent.prototype;

    Child.prototype = new Temp();

    Child.prototype.constuctor = Child;
}

function Deer() {
    this.name = "Deer";
    this.sound = "Snort";
}

var elk = new Deer();

elk.getSound();
```

Call Parent Methods
```js
function Vehicle(name) {
    this.name = "Vehicle";
}

// Functions fro the parent object
Vehicle.prototype = {
    drive: function() {
        return this.name + " drives forward";
    },
    stop: function() {
        return this.name + " stops";
    }
}

function Truck(name) {
    this.name = name;
}

// Inherit from Vehicle
Truck.prototype = new Vehicle();
Truck.prototype.constructor = Truck;

// Overwrite drive parent method
Truck.prototype.drive = function() {
    
    // Call the parent method with apply so that the parent
    // method can access the Trucks name value
    var driveMsg = Vehicle.prototype.drive.apply(this);
    return driveMsg += " through a field";
}

var jeep = new Truck("Jeep");
jeep.drive();
jeep.stop();
```

## ES6 OOP with JavaScript
Method Notation in Object Property Definitions

```js
//ES5 Way
var addStuff = {
    sum: function(num1, num2) {
        return num1 + num2;
    }
};

// ES6 Way
var addStuff = {
    sum(num1, num2) {
        return num1 + num2;
    }
}
```

### Classes In JavaScript

```js
// ES5
var Point = function(xPos, yPos){
  this.xPos = xPos;
  this.yPos = yPos;
};
 
Point.prototype.getPos = function(){
  return "X: " + this.xPos + " Y: " + this.yPos;
};
 
var point = new Point(100, 200);

// ES6 Way
class Point {
    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
    }

    getPos() {
        return "X: " + this.xPos + " Y: " + this.yPos;
    }
}

var point = new Point(100, 200);

// More OOP In JavaScript
class Animal {
    constructor(name) {
        this.name = name;
    }

    toString() {
        return "Animal is named " + this.name;
    }

    // We create static functions as well
    static getAnimal() {
        return new Animal("No Name");
    }
}

class Dog extends Animal {
    constructor(name, owner) {
        // We can all the super class now
        super(name);
        this.owner = owner;
    }

    toString() {
        // You can call super class methods as well
        return super.toString() + this.name;
    }
}

var rover = new Dog("Rover", "Paul");

// Call the static Function
var bowser = Animal.getAnimal();
```


## Deep Copy and Shallow Copy
[how-to-deep-clone]('https://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript')

Deep Copy
```js

// WAY ONE
// var cloned = JSON.parse(JSON.stringify(objectToClone));
var a = {
    one: 1
}
var b = {
    arr: [1,2,3]
}
var cloned1 = JSON.parse(JSON.stringify(a));
console.log(cloned1.one === a.one)  // true
cloned1.one = 2;
console.log(a.one); // 1

var cloned2 = JSON.parse(JSON.stringify(b));
console.log(cloned2.arr === b.arr)  // false
cloned2.arr.push(4);
console.log(cloned2.arr);   // [1,2,3,4]
console.log(b.arr); // [1,2,3]

// WAY TWO
function copy(o) {
  var _out, v, _key;
  _out = Array.isArray(o) ? [] : {};
  for (_key in o) {
    v = o[_key];
    _out[_key] = (typeof v === "object") ? copy(v) : v;
  }
  return _out;
}
```