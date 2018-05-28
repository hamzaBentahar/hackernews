import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'
import {router} from "./router";

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
      Vue.toasted.show('You have been logged out')
      if (router.history.current.meta.isAuthenticated){
        router.push('/')
      }
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
