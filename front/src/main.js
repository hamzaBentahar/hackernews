// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {store} from './store'
import Toasted from 'vue-toasted'

require('./assets/sass/main.scss')

axios.defaults.baseURL = "http://localhost:1337/api/v1"

Vue.use(Toasted, {
  duration: 5000
})
Vue.use(axios)

window.Event = new Vue()

window.fbAsyncInit = function() {
  FB.init({
    appId            : '170790930238149',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v3.0'
  });
  Event.$emit('fbInit')
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0&appId=401266616557642&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'))

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
