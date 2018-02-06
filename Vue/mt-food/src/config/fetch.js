export default async (url, data = {}, type = 'GET') => {
  if (type === 'GET') {
    let dataStr = ''
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })

    if (dataStr !== '') {
      dataStr = '?' + dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + dataStr
    }
  }
  // Can Use Fetch
  if (window.fetch) {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'default'
    }

    if (type === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
      const request = await fetch(url, requestConfig)
      const requestJson = await request.json()
      console.log('Request: ', request, 'requestJSON: ', requestJson)
      return requestJson
    } catch (error) {
      throw error
    }
  } else {
    // Can Not Use Fetch
    console.log('YOUR BROWSER DOES NOT SUPPORT FETCH')
  }
}
