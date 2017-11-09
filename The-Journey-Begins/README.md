# The Journey Begins

## AJAX

1. Create A XMLHttpRequest Object
2. Open A Request
3. Send Request
4. Create A Callback Function

[同源策略]('https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy')
[跨域]('https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS')

## Understanding CSRF
[CSRF]('https://github.com/pillarjs/understanding-csrf')

## `map` `forEach`
Both the map() and forEach() function execute a provided function once per each element

in an iterable (either an object or array)

```js
[1,2,3].forEach(function(n) {
    console.log('The number is: ' + n);
    return n;
});

[1,2,3].map(function(n) {
    console.log('The number is: ' + n);
    return n;
});
```

The difference between map() and forEach() is that the return value of map() is a an array

of the result of the callback function, whereas forEach() does not collect results.

So in this case, while both map() and forEach() will print the console.log statements,

map() will return the array [1, 2, 3] whereas forEach() will not.

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