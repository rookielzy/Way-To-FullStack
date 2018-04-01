Function.prototype.addMethod = function (name, fn) {
  this.prototype[name] = fn
  return this
}

var Methods = function () {}


Methods.addMethod('hello', function () {
  console.log('hello')
}).addMethod('hi', function () {
  console.log('hi')
})


var methods = new Methods()


methods.hello()
methods.hi()