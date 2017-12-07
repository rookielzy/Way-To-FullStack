const ProductModel= require('../core/db')
const mongoose = require('mongoose')

exports.getAllProduct = function () {

}

exports.getProduct = function () {

}

exports.createProduct = function () {
  let product = new ProductModel({name: 'nike', price: 99})
  product.save()
  console.log('create success')
}