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
这样代码看起来就要简洁多了。需要注意到的是，我们在这里使用了链式调用，拿为什么我们可以使用链式调用呢？

因为`then`和`catch`都是定义在`Promise`原型链上的方法，在每次调用后，这两种方法都会返回一个新的`Promise`对象，因此我们可以使用链式调用。

## Promise.prototype.then()
[Mozilla]('https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then')

`then()` 方法返回一个  `Promise` 。它最多需要有两个参数：`Promise` 的成功和失败情况的回调函数。

```js
/**
 * @param onFulfilled 当Promise变成接受状态（fulfillment）时，该参数作为回调函数被调用。该函数有一个参数，即接受的值（the fulfillment  value）。
 * @param onRejected 当Promise变成拒绝状态（rejection ）时，该参数作为回调函数被调用。该函数有一个参数,，即拒绝的原因（the rejection reason）。
**/
promise.then(onFulfilled, onRejected)
```
>* then方法返回一个Promise，而它的行为与then中的回调函数的返回值有关：
* 如果then中的回调函数返回一个值，那么then返回的Promise将会成为接受状态，并且将返回的值作为接受状态的回调函数的参数值。
* 如果then中的回调函数抛出一个错误，那么then返回的Promise将会成为拒绝状态，并且将抛出的错误作为拒绝状态的回调函数的参数值。
* 如果then中的回调函数返回一个已经是接受状态的Promise，那么then返回的Promise也会成为接受状态，并且将那个Promise的接受状态的回调函数的参数值作为该被返回的Promise的接受状态回调函数的参数值。
* 如果then中的回调函数返回一个已经是拒绝状态的Promise，那么then返回的Promise也会成为拒绝状态，并且将那个Promise的拒绝状态的回调函数的参数值作为该被返回的Promise的拒绝状态回调函数的参数值。
* 如果then中的回调函数返回一个未定状态（pending）的Promise，那么then返回Promise的状态也是未定的，并且它的终态与那个Promise的终态相同；同时，它变为终态时调用的回调函数参数与那个Promise变为终态时的回调函数的参数是相同的。

## Promise.prototype.catch()
[Mozilla]('https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch')

`catch()` 方法返回一个`Promise`，只处理拒绝的情况。它的行为与调用`Promise.prototype.then(undefined, onRejected)` 相同。

```js
promise.catch(onRejected)

// 如果我们在使用 then 的时候，不传入第二个参数，想要捕获错误，我们可以这样做
promise.then(cb).catch(error => console.log(error))
// 这样也能达到我们想要的效果。
```

以上为`Promise`基础内容，接下来将介绍`Promise`的其他方法

## Promise.all()
正如其名，该方法接受一个可迭代对象`iterable`，例如数组或字符串作为参数，只有这个参数里的所有`Promise`都`resolve`后，或任意一个`Promise`对象`reject`后，该方法将返回一个新的`Promise`对象。

应用场景，譬如我们需要渲染一组图片，我们希望所有图片加载后再渲染出来。
```js
const imageUrl = ['1.png', '2.png', '3.png']
const imagePromises = []

imageUrl.forEach(url => {
    const promise = new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = resolve
        image.onerror = reject
        image.src = url
    })
    imagePromises.push(promise)
})

Promise.all(imagePromises).then(image => {
    console.log('Rendering Image')
})
```

## Promise.race()
`Promise.race(iterable)` 方法返回一个 `promise` ，并伴随着 `promise`对象解决的返回值或拒绝的错误原因, 只要 `iterable` 中有一个 `promise` 对象"解决(`resolve`)"或"拒绝​​​​​​(`reject`)"。

它的返回值为：一个待定的 `Promise` 只要给定的迭代中的一个`promise`解决或拒绝，就采用第一个`promise`的值作为它的值，从而异步地解析或拒绝（一旦堆栈为空）。

应用场景?