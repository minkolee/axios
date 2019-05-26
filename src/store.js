import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        idToken: null,
        userId: null,
        userdata: null
    },
    mutations: {
        authUser: function (state, userData) {
            console.log("AuthUser执行了");
            state.idToken = userData.token;
            state.userId = userData.userId;
        },
        storeUser: function (state, userData) {
            state.userdata = userData.userdata;
        }
    },
    actions: {
        signup({commit}, authData) {
            axios.post('/signupNewUser?key=AIzaSyAtwQ-RL7GKu0T1h4kOy32JRXmbmQPqiHM', {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            })
                .then(res => {
                    console.log(res);
                    commit('authUser', {
                        token: res.data.idToken,
                        userId: res.data.localId
                    })
                })
                .catch(err => console.log(err));
        },
        login({commit}, authData) {
            axios.post('/verifyPassword?key=AIzaSyAtwQ-RL7GKu0T1h4kOy32JRXmbmQPqiHM', {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            })
                .then(res => {
                    console.log(res);
                    commit('authUser', {
                        token: res.data.idToken,
                        userId: res.data.localId
                    });
                    const now = (new Date()).getTime();
                    const expirationDate = now + res.data.expiresIn * 1000;
                    localStorage.setItem('token', res.data.idToken);
                    localStorage.setItem('expiresDate', expirationDate);
                })
                .catch(err => console.log(err));
        },
        fetchUser(context) {
            if (context.state.idToken) {
                axios.get('https://myaxios-66666.firebaseio.com/user-admin.json' + '?auth=' + context.state.idToken)
                    .then(res => {
                        console.log("fetchUser执行了");
                        context.commit('storeUser', {
                            userdata: res.data
                        });
                    })
                    .catch(err => console.log(err));
            }
        },

        tryAutoLogin(context) {
            const token = localStorage.getItem('token');
            const expireDate = localStorage.getItem('expiresDate');
            const now = (new Date()).getTime();
            if ((now <= expireDate) && token) {
                context.commit("authUser", {
                    token: token,
                    userId: null
                });
            }
        }


    },
    getters: {}
})
