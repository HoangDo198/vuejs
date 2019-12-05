import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || null,
    user: localStorage.getItem('user_info') || null
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({
            url: 'http://157.245.156.221:3000/api/login/',
            data: user,
            method: 'POST'
          })
          .then(resp => {
            console.log(resp);
          
            const token = resp.data.jwtToken
            const user = resp.data.user.user_email
            localStorage.setItem('token', token)
            localStorage.setItem('user_info', user)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            localStorage.removeItem('user_info')
            reject(err)
          })
      })
    },
    logout({
      commit
    }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('user_info')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  }
})