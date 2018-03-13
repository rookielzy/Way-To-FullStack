import Vue from 'vue'
import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('../components/home/home')), 'home')
const City = r => require.ensure([], () => r(require('../components/city/city')), 'city')
const Msite = r => require.ensure([], () => r(require('../components/msite/msite')), 'msite')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/city',
      name: 'City',
      component: City
    },
    {
      path: '/msite',
      name: 'Msite',
      component: Msite
    }
  ]
})
