import fetch from '@/config/fetch'
import { baiduurl, baidukey } from '@/config/env'

export const weather = (location) => fetch('GET', baiduurl, {
  location: location,
  output: 'json',
  ak: baidukey
})
