# Voting App

> First, using `create-react-app` to initialize this project, than install [Semantic-ui]('https://semantic-ui.com/introduction/getting-started.html'). Follow the docments to install it.

> Second, in the project, we use the static data not fetching data from Internet.So we should create a data file call `seed.js`.

> Third, the Voting App just like the regular forum,we can up the product votes. So we need a container to contain the products, we call it `ProductList`.

> Last, when we finish the logic part. We can run `npm start` in the command line and check the project.

## Updating state and immutability
First we should treat the `this.state` object as immutable.

If we treat an array or object as immubale we never make modifications to it.For example, let's say we have an array of numbers in state:

```js
this.setState({ nums: [1, 2, 3] })
```

If we want to update the state's nums array to include a 4, we might be tempted to user `push()` like this:

```js
this.setState({ nums: this.state.nums.push(4) })
```

On the surface, it might appear as though we've treated `this.state` as immutable. However, the push() method modifies the original array:

```js
console.log(this.state.nums)    // [1, 2, 3]
this.state.nums.push(4)
console.log(this.state.nums)    // [1, 2, 3, 4]
```

Althoug we invoe `this.setState()` immediately after we push 4 onto the array, we're still modifying `this.state` outside of `setState()` and this is bad practice.

> Part of the reason this is bad practice is because `setState()` is actually asynchronous.

So, while we eventually called `this.setState()`, we unintentionally modified the state before that.
This next approach doesn’t work either:

```js
const nextNums = this.state.nums;
nextNums.push(4);
console.log(nextNums);
// [ 1, 2, 3, 4]
console.log(this.state.nums);
// [ 1, 2, 3, 4] 
```

Our new variable nextNums references the same array as this.state.nums in memory:

![share-_same_memory](../images/share-_same_memory.png)

So when we modify the array with `push()`, we’re modifying the same array that `this.state.nums`
is pointing to.

Instead, we can use Array’s `concat()`. `concat()` creates a new array that contains the elements of
the array it was called on followed by the elements passed in as arguments.

With `concat()`, we can avoid mutating state:

```js
console.log(this.state.nums);
// [ 1, 2, 3 ]
const nextNums = this.state.nums.concat(4);
console.log(nextNums);
// [ 1, 2, 3, 4]
console.log(this.state.nums);
// [ 1, 2, 3 ]
```

As the same reason, we can use `Object.assign` to modifiy the `this.state` objects. Check this link ['Object.assign']('https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign')