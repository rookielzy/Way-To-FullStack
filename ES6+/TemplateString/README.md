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
// 如果使用了没有声明的变量，浏览器将会报错
```

同样，我们还可以在模板字符串里嵌入模板字符串
```js
const lists = `<div class="lists">
                    ${[1,2,3]map(item => `<li>${item}</li>`)}
               </div>`;
```

我们还可以在模板字符串里调用函数
```js
const obj = {
    "name": "jet",
    "age": "24",
    "keywords": ["web", "developer", "design", "game"]
};

function renderKeywords(keywords) {
    return `
        <ul>
            ${keywords.map(keyword => `<li${keyword}</li>`).join('')}
        </ul>
    `;
}

const markup = `
        <div>
            <h2>${obj.name}</h2>
            <p>${obj.age}</p>
            ${renderKeywords(obj.keywords)}
        </div>
`
```

接下来，让我们来尝试更有趣的玩法。
```js
    const name = "Jet";
    const age = 24;

    function highlight(strings, ...values) {
        let str = '';
        strings.forEach((string, i) => {
            str += `${string} <span class="hl">${values[i] || ''}</span>`;
        })
        return str;
    }

    const sentence = highlight`My name is ${name}, I am a Web Developer, I am ${age} years old.`;
    document.body.innerHTML = sentence;
```
这里我们用到了ES6的`rest`参数，直接将模板字符串作为函数的参数进行调用。其中`rest`参数的用途就是来获取多余的参数。在上述的例子中，看似函数只调用了模板字符串一个参数，其实，模板字符串会自动将各个参数分割开，`strings -> ['My name is ', ', I am a Web Developer, I am ', ' years old']`，`values -> ['Jet', 24]`。

如果我们在`{}`里使用的是常量字符串呢？
```js
    const name = "Jet";
    const age = 24;
    const dict = {
        HTML: "Hyper Text Markup Language",
        CSS: "Cascading Style Sheets",
        JS: "JavaScript"
    };
    function addAbbreviations(strings, ...values) {
        const abbreviated = values.map(value => {
            if (dict[value]) {
                return `<abbr title="${dict[value]}">${value}</abbr>`;
            }
            return value;
        })
        return strings.reduce((sentence, string, i) => {
            return `${sentence}${string}${abbreviated[i] || ''}`
        }, '');
    }

    const sentence = addAbbreviations`My name is ${name}, I am a Web Developer, I am ${age} years old.  I love ${'HTML'}, ${'CSS'}, ${'JS'}.`;
    document.body.innerHTML = sentence;
```
其实，也就是把它当成普通的字符串而已，只不过也算是变量的一部分。