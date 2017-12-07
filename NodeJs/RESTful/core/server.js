const http = require('http')
const products = require('../controllers/products')

http.createServer((req, res) => {
  switch (req.method) {
    case 'GET':
      if (req.url === '/products') {
        
      }
      break
    case 'POST':
      if (req.url === '/products') {
        products.createProduct()
      }
      break
    case 'PUT':
      break
    case 'DELETE':
      break
    default:
      break
  }

  res.end()
}).listen(3000, () => {
  console.log('Server Listening at localhost:3000')
})
