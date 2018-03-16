import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: ['^pages/index/index', 'pages/order/order', 'pages/discovery/discovery', 'pages/mine/mine'], // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '饿了么',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      'selectedColor': '#1296db',
      'list': [
        {
          'pagePath': 'pages/index/index',
          'text': '首页',
          'iconPath': 'static/images/home_off.png',
          'selectedIconPath': 'static/images/home_on.png'
        },
        {
          'pagePath': 'pages/order/order',
          'text': '订单',
          'iconPath': 'static/images/order_off.png',
          'selectedIconPath': 'static/images/order_on.png'
        },
        {
          'pagePath': 'pages/discovery/discovery',
          'text': '发现',
          'iconPath': 'static/images/discovery_off.png',
          'selectedIconPath': 'static/images/discovery_on.png'
        },
        {
          'pagePath': 'pages/mine/mine',
          'text': '我的',
          'iconPath': 'static/images/mine_off.png',
          'selectedIconPath': 'static/images/mine_on.png'
        }
      ]
    }
  }
}
