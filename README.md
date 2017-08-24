# Way-To-FullStack
Learning JavaScript to Be A Full Stack Developer

## Arrow Function
Arrow Function can bind the `this` to enclosing function. ['Arrow Function'](`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions`)

```js
function Person() {
  // The Person() constructor defines `this` as an instance of itself.
  this.age = 0;

  setInterval(function growUp() {
    // In non-strict mode, the growUp() function defines `this` 
    // as the global object, which is different from the `this`
    // defined by the Person() constructor.
    this.age++;
  }, 1000);
}

var p = new Person();

// In ECMAScript 3/5, the this issue was fixable by assigning the value in this to a variable that could be closed over.
function Person() {
  var that = this;
  that.age = 0;

  setInterval(function growUp() {
    // The callback refers to the `that` variable of which
    // the value is the expected object.
    that.age++;
  }, 1000);
}

// Use Arrow Function
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| properly refers to the person object
  }, 1000);
}

var p = new Person();
```

## When Not to Use Arrow Function
['Not-to-Use-Arrow-Function'](ES6+/when-not-to-use-arrow-function.html)