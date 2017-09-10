# Dive in DOM

## What we can do by DOM ?
> * Change/Remove HTML elements in the DOM / on the page
> * Change & add CSS styles to elements
> * Read & change element attributes(href, src, alt, custom)
> * Create new HTML elements and insert them into the DOM / the page
> * Attach event listeners to elements (click, keypress, submit)

## What we'll cover ?
> * Naviating the DOM and the Query Selector
> * Changing the DOM / manipulating HTML elements, content & CSS
> * Interacting with forms & events (submit, click, keypress)
> * Creating new elements via JS and insert them into the DOM
> * Creating a mini reading list app

## `getElementsByClassName()` `getElementsByTagName()` `querySelectorAll()` will return a `HTML collections` not Array
In this case, we can not use something like `forEach()`, `map()` to loop the collections
NOTE: If you get a element like `ul`, and you want to loop that, you should treat this `ul` as `HTML collections`. 

```js
const titles = document.getElementsByClassName('title');
console.log(titles.__proto__);  // HTMLCollection

// Uncaught TypeError: titles.forEach is not a function
// titles.forEach(title => {
//     console.log(title);
// });

// Uncaught TypeError: titles.map is not a function
// titles.map(title => {
//     console.log(title);
// });

// The right way to loop titles is
// to change the titles to Array by using Array.from()
Array.from(titles).forEach(title => {
    console.log(title);
});

Array.from(titles).map(title => {
    console.log(title);
});
```

Reference: [Array.from()]('https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from')

## Node Type
JavaScript has 12 kinds of Node Type. All the `nodeNme` will return uppperCase. 

```js
const banner = document.querySelector('#page-banner');

console.log('#page-banner node type is: ', banner.nodeType);    // 1
console.log('#page-banner node name is: ', banner.nodeName);    // DIV
console.log('#page-banner has child nodes: ', banner.hasChildNodes());  // true

const clonedBanner = banner.cloneNode(true);    // Clone all content of banner
console.log(clonedBanner);

// const clonedBanner = banner.cloneNode(false);    // Only clone banner
```

[More about Node Type]('https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType')