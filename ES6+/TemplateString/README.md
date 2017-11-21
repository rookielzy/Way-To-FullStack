# Template String

模板字符串，增强版的字符串。JSX与它很相似。可以在模板字符串中嵌入JS代码。

在过去，我们在一些情况下需要拼装字符串时，我们经常这样做：
```js
var connectStr = '<div>' +
                    '<p>Hello World</p>' + 
                 '</div>';
// 这时候 connectStr 会自动去除多余的空格和换行
```
如果我们不小心忘记了一个`+` 或 `'`，那么我们就不能得到想要的connectStr。
而模板字符串的出现很好地解决了这种问题
```js
const connectStr = `<div>
                        <p>Hello World</p>
                    </div>`;
// connectStr 并没有去除多余的空格和换行。
```

当然，它的功能不仅仅如此，我们还可以在模板字符串里嵌入JS代码。
```js
let firstName = 'Jet', lastName = 'Luo';
`Hello, ${firstName} ${lastName}.`
```