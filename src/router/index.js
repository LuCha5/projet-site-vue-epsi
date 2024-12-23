import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../views/Home.vue'
import ApiPage from '../views/Api.vue'
import ContactPage from '../views/Contact.vue'
import JokesPage from '../views/Jokes.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/api', name: 'API', component: ApiPage },
    { path: '/contact', name: 'Contact', component: ContactPage },
    { path: '/jokes', name: 'Jokes', component: JokesPage },
  ],
});