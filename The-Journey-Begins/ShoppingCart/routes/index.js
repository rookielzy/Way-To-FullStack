var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Product = require('../models/product');
var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  var products = Product.find(function(err, docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productChunks });
  });
});

// GET Sign Up Page
router.get('/user/signup', function(req, res, next) {
  var message = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken(), message: message, hasErrors: message.length > 0});
});

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: 'profile',
  failureRedirect: 'signup',
  failureFlash: true
}));

router.get('/user/profile', function(req, res, next) {
  res.render('user/profile');
});

router.get('/user/signin', function(req, res, next) {
  var message = req.flash('error');
  res.render('user/signin', {csrfToken: req.csrfToken(), message: message, hasErrors: message.length > 0});
});

router.post('/user/signin', passport.authenticate('local.signin', {
  successRedirect: 'profile',
  failureRedirect: 'signin',
  failureFlash: true
}))
module.exports = router;
