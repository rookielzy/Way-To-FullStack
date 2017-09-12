# JavaScript Design Patterns

## `Object.create()`
> `Object.create(proto, [ propertiesObject ])`

使用`Object.create`实现类式继承
```js
// Shape - superclass
function Shape() {
    this.x = 0;
    this.y = 0;
}

Shape.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
}

// Rectangle - subclass
function Rectangle() {
    Shape.call(this);   //  call super constructor
}

// subclass extends superclass
Rectangle.prototype = Ojbect.create(Shape.prototype);
Rectangle.prototype.contructor = Rectangle;
```

继承多个对象，使用混入（MIXIN）方式

```js
function MyClass() {
     SuperClass.call(this);
     OtherSuperClass.call(this);
}

// inherit one class
MyClass.prototype = Object.create(SuperClass.prototype);
// mixin another
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// re-assign constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function() {
     // do a thing
};
``` 

## The Constructor Pattern 构造模式

```js
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;

    this.sayName = function() {
        return "My name is " + this.firstName + " " + this.lastName;
    }
}

var johnDoe = new Person("John", "Doe");
var janeDoe = new Person("Jane", "Doe");

var isPerson = johnDoe instanceof Person; // true
var isSamne = jognDoe.johnDoe.sayName === janeDoe.sayName; // false
```


## Code Reuse Patterns
### The Inheritance Pattern

```js
function Beverage(name, temperature) {
    this.name = name;
    this.temperature = temperature;
}

Beverage.prototype.drink = function() {
    console.log("I'm drinking " + this.name);
}

function Coffee(type) {
    Beverage.call(this, "coffee", "hot");
    this.type = type;
}

Coffee.prototype = Object.create(Beverage.prototype);
Coffee.prototype.sip = function() {
    console.log("Sipping some awesome " + this.type + " " + this.name);
};

var water = new Beverage("water", "cold");
var coffee = new Coffee("bold dark roast");
```

### Mixins

```js
function extend(target) {
    if (!arguments[1]) {
        return;
    }

    for (var ii = 1, ll = arguments.length; ii < ll; ii++) {
        var source = arguments[ii];

        for (var prop in source) {
            if (!target[prop] && source.hasOwnProperty[prop]) {
                target[prop] = source[prop];
            }
        }
    }
}

function Person(name) {
    this.name = name;
}

function Dog(name) {
    this.name = name;
}

var speaker = {
    speak: function() {
        return this.name + " is speaking.";
    }
}

var mover = {
    walk: function() {
        return this.name + " is walking.";
    }
    run: function() {
        return this.name + " is running.";
    }
}

function mixin(target, source, methods) {
    for (var ii = 2, ll = arguments.length; ii < ll; ii++) {
        var method = arguments[ii];

        target[method] = source[method].bind(source);
    }
}
```