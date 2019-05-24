import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import axios from 'axios';

axios.defaults.baseURL = 'https://myaxios-66666.firebaseio.com';
axios.defaults.headers.common['Authorization'] = 'gugugu';
axios.defaults.headers.get['Content-Type'] = 'application/json';

const inter1 =  axios.interceptors.request.use(
    config => {
      console.log(config);
      config.headers['1'] = "1";
      return config;
    }
);

const inter2 =  axios.interceptors.request.use(
    config => {
      console.log(config);
      config.headers['2'] = "2";
      return config;
    }
);

const inter3 =  axios.interceptors.request.use(
    config => {
      console.log(config);
      config.headers['3'] = "3";
      return config;
    }
);

axios.interceptors.request.eject(inter1);
axios.interceptors.request.eject(inter3);


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
