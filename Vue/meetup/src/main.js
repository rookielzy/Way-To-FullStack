import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import * as firebase from 'firebase'
import { store } from './store'
import DateFilter from './filters/date'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyDxyJxEhidJMSOjGuheEjwmqYbE47koAug",
      authDomain: "meetup-rookielzy.firebaseapp.com",
      databaseURL: "https://meetup-rookielzy.firebaseio.com",
      projectId: "meetup-rookielzy",
      storageBucket: "meetup-rookielzy.appspot.com",
    })
  }
})