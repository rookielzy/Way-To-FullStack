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