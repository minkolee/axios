import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import axios from 'axios';

axios.defaults.baseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created: function () {
    store.dispatch("tryAutoLogin").then(() => console.log("成功装载信息"));
  }

});
