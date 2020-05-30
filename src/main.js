import Vue from 'vue'
import Vuex from 'vuex'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import JQuery from 'jquery'
import products from '../podcasts.js'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueCookie from 'vue-cookie'
import VueRouter from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import {
  routes
} from './routes'

Vue.use(VueCookie);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
window.$ = JQuery;

const store = new Vuex.Store({
  modules: {
    products
  }
})

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
