import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../views/Home.vue'
import ContactPage from '../views/Contact.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/contact',
      name: 'ContactPage',
      component: ContactPage
    }
  ]
})