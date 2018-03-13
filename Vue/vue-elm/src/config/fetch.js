export default (type = 'GET', url = '', data = {}) => {
  return new Promise((resolve, reject) => {
    let requestObj = {
      method: type,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    if (type === 'GET') {
      // 拼接路由
      url += '?'
      Object.keys(data).forEach((key) => {
        url += `${key}=${data[key]}&`
      })
      url = url.slice(0, -1)
    } else {
      Object.defineProperty(requestObj, 'body', {
        value: JSON.stringify(data)
      })
    }

    fetch(url, requestObj).then((res) => {
      if (res.status === 200) {
        return res.json()
      } else {
        return reject(res)
      }
    }).then((data) => {
      resolve(data)
    }).catch((error) => {
      reject(error)
    })
  })
}
