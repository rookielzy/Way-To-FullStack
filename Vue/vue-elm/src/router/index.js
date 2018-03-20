import Vue from 'vue'
import Router from 'vue-router'

const Home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')
const City = r => require.ensure([], () => r(require('../pages/city/city')), 'city')
const Msite = r => require.ensure([], () => r(require('../pages/msite/msite')), 'msite')
const Login = r => require.ensure([], () => r(require('../pages/login/login')), 'login')

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
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
