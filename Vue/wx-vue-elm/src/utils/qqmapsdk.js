const QQMapWX = require('./qqmap-wx-jssdk.min.js')
import { qqmapkey } from '../config/env'

const qqmapsdk = new QQMapWX({
  key: qqmapkey
})

export {
  qqmapsdk
}
