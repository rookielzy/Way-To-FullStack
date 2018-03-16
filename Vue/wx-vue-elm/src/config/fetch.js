import { baseUrl } from './env'

// 微信网络请求接口
export default (type = 'GET', url = '', data = {}) => {
  const method = type.toUpperCase()
  url = baseUrl + url
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
