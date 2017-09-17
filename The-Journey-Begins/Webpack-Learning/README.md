# Webpack Learning

## Modules
when we import some modules from other files, we should set `default` in the imported file.Otherwise, we should specify what module(functions) we want to import. 

## node-sass
FUCK INSTALLING `node-sass` ON WINDOWS
Here's the way to solve it.

I use the `yarn` to install the package.So
1. Check the `yarn config list`
2. Set the registry. `yarn config set registry https://registry.npm.taobao.org -g`
3. Check the `yarn cofig list` again. You will see that `registry: 'https://registry.npm.taobao.org'`
4. Set the `node-sass` source. `yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass`
5. Run `yarn add node-sass --dev`

## Use URL in CSS
Asume we have a `scss` file that contains something like this:
```scss
.test {
    background: url('./images/share-_same_memory.png');
}
```

>* If you don't want to change the Webpack Config. You can use the Absolute Path. If you don't, the `webpack` will try to search the `url` in the same root.

`webpack.config.js`
```js
rules: [
            {
                test: /\.s[ac]ss/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: "style-loader"
                })
            },
```

`main.scss`
```scss
.test {
    background: url('/images/share-_same_memory.png');
}
```

>* If you don't want to change the `scss`, you can use the `css-loader` option

`webpack.config.js`
```js
        rules: [
            {
                test: /\.s[ac]ss/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: { url: false }
                        },
                        'sass-loader'
                    ],
                    fallback: "style-loader"
                })
            },
```

>* If your image not in the `dist` folder.

`webpack.config.js`
```js
            {
                test: /\.png$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            },
```