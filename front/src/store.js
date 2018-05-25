import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user: jwt.decode(localStorage.getItem('token'))
  },
  getters: {
    authenticatedUser(state) {
      return state.user
    },
    isAuthenticated(state) {
      return state.user ? true : false
    }
  },
  mutations: {
    login(state, payload) {
      state.user = jwt.decode(payload)
      localStorage.setItem('token', payload)
      console.log('hello')
    },
    logout(state) {
      localStorage.removeItem('token')
      state.user = false
    }
  },
  actions: {
    login({ commit }, payload){
      commit('login' ,payload)
    },
    logout({ commit }){
      commit('logout')
    }
  }
})
