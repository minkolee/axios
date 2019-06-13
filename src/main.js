import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'

import axios from 'axios';

axios.defaults.baseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';

Vue.use(Vuelidate)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created: function () {
    store.dispatch("tryAutoLogin").then(() => console.log("成功装载信息"));
  }

});
