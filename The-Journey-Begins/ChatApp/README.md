# Chat App

## Introduction 介绍

> This Chat App is made by MongoDB and Socket.io written in JavaScript ES6.

> 此简易聊天应用基于JavaScript ES6语法, MongoDB 和 Socket.io编写而成。其目的是为了了解MongoDB和Scoket.io的一些具体应用。详细用法：[MongoDB]('https://github.com/mongodb/node-mongodb-native')，[Scoket.io]('https://github.com/socketio/socket.io').

## Version 版本号
> MongoDB 3.4.7 version, Socket.io 2.0.3 version.

## How to run it 如何运行它
1. Clone this project and run `npm install` first. 下载本项目，然后在该项目的目录下运行 `npm install`。
2. Make sure that you have started the MongoDB server. Just Check the [MongoDB]('https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/')。确保你已经打开了MongoDB的服务。
3. Run `npm start` and just open the `index.html` and check it. 然后运行`npm start`，再打开`index.html`即可


## How to achieve it
1. Connect to mongo first.The `URL` will be like `mongodb://127.0.0.1/xxxxx`（replace the `xxxxx` to the database's name you use）
2. Connect to the Socket.io
3. Write the logic functions about this App