import Vue from 'vue'
import Router from 'vue-router'

const Food = r => require.ensure([], () => r(require('../pages/food/food')), 'food')
const Comment = r => require.ensure([], () => r(require('../pages/comment/comment')), 'comment')
const Restaurant = r => require.ensure([], () => r(require('../pages/restaurant/restaurant')), 'restaurant')

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/food'
  },
  {
    path: '/food',
    component: Food
  },
  {
    path: '/comment',
    component: Comment
  },
  {
    path: '/restaurant',
    component: Restaurant
  }
]

export default new Router({
  routes
})
