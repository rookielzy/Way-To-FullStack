const path = require('path')

export default {
  entry: {
    'jetui': './src/components/index.js'
  },
  ouput: {
    path: path.resolve(__dirname, '../package'),
    publicPath: '/package/',
    library: 'jetui',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
}
