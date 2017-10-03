var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const fs = require('fs');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs Start
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop', {useMongoClient: true});

// SET UP SESSIONS START
const db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

// SET UP SESSIONS END
app.use(session({
    secret: 'mySecretString',
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
    store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}));

// SAVE SESSION CART API
app.post('/cart', (req, res) => {
    let cart = req.body;
    req.session.cart = cart;
    req.session.save(err => {
        if (err) {
            throw err;
        }
        res.json(req.session.cart);
    })
});

// GET SESSION CART API
app.get('/cart', (req, res) => {
    if (typeof req.session.cart !== 'undefined') {
        res.json(req.session.cart);
    }
});

const Books = require('./models/books');

// POST BOOKS
app.post('/books', (req, res) => {
  let book = req.body;

  Books.create(book, (err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

// GET BOOKS
app.get('/books', (req, res) => {
  Books.find((err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

// DELETE BOOKS
app.delete('/books/:_id', (req, res) => {
  let query = {_id: req.params._id};

  Books.remove(query, (err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

// UPDATE BOOKS
app.put('/books/:_id', (req, res) => {
  let book = req.body;
  let query = req.params._idl
  let update = {
    '$set': {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };

  let options = {new: true};

  Books.findOneAndUpdate(query, update, options, (err, books) => {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

// GET BOOKS IMAGES API
app.get('/images', (req, res) => {
  const imgFolder = __dirname + '/public/images/';
  fs.readdir(imgFolder, (err, files) => {
    if (err) {
      return console.error(err);
    }
    const filesArr = [];
    files.forEach(file => {
      filesArr.push({name: file});
    });

    res.json(filesArr);
  });
});

// APIs End

app.listen(3001, err => {
    if (err) {
        return console.log(err);
    }
    console.log('API Server is listening on http:localhost:3001');
});