var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs Start
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop', {useMongoClient: true});

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

// APIs End

app.listen(3001, err => {
    if (err) {
        return console.log(err);
    }
    console.log('API Server is listening on http:localhost:3001');
});