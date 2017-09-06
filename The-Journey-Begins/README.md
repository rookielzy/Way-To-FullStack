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