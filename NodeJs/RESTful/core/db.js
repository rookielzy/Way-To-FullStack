const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', {useMongoClient: true})
mongoose.Promise = global.Promise

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number
})

module.exports = mongoose.model('Product', ProductSchema)