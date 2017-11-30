# Promise

在`Promise`出现之前，我们做异步操作的时候经常这样做：
```js
$.ajax({
    url: '/test',
    success() {
        $.ajax({
            url: '/test',
            success() {
                $.ajax({

                })
            }
        })
    }
})
```
一旦，异步操作多的时候，代码看起来就会很不优雅，也难以维护。

`Promise`的出现，很大的程度上解决了上述问题。
我们先来声明一个`Promise`对象
```js
const promise = new Promise((resolve, reject) => {
    if (AsyncSuccess) {
        resolve(value)
    } else {
        reject(error)
    }
})
```
其中我们可以看到`Promise`对象里有`resolve`和`reject`两个函数。

首先`Promise`对象代表一个异步操作，有三种状态，分别为`pending`进行中，`fulfilled`已成功，`rejected`已失败。`pending`可以转换为`fulfilled`或`rejected`的其中一种，但这两者之间不能互相转换，即`pending`转换是单程票。

而`resolve`函数作用为将`Promise`对象的状态从“未完成”转换为“成功”，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从`pending`变为 `rejected`），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

`Promise`实例生成后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。

```js
promise.then(value => console.log('success'), error => console.log('fail'))
```

一般，我们只提供第一个参数给`then`方法。错误的获取我们更多地是使用`catch`来获取失败状态。

```js
promise.then().then().catch(error => return error)
```

只要运行任意`then`中发生了错误，都会马上被`catch`获取到。

有了上述的基础后，传统的异步操作就可以改造为：
```js
promise.then()
       .then()
       .then()
       .catch()
```
这样代码看起来就要简洁多了。