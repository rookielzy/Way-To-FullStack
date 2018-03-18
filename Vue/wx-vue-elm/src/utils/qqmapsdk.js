const QQMapWX = require('./qqmap-wx-jssdk.min.js')
import { qqmapkey } from '../config/env'
console.log(QQMapWX, qqmapkey)
const qqmapsdk = new QQMapWX({
  key: qqmapkey
})
console.log(qqmapsdk)

export {
  qqmapsdk
}
