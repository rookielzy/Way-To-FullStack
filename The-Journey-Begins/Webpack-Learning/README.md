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