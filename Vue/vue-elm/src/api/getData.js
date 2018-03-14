import fetch from '../config/fetch'

const getData = () => fetch('GET', 'http://cangdu.org:8001/v1/cities', {
  type: 'hot'
})

export { getData }
