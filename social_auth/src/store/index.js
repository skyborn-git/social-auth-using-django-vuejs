import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import VueResource from 'vue-resource'
import axios from 'axios';
import router from '../router'

Vue.use(VueResource)
Vue.use(Vuex)

const debug = process.env.NODE_EVN !== 'production'

// api end point
const API_END_POINT = 'http://localhost:8000/'

// mutation
const mutations = {
  [types.LOGIN] (state) {
    state.pending = true;
  },
  [types.LOGIN_SUCCESS] (state) {
    state.isLoggedIn = true;
    state.pending = false;
  },
  [types.LOGOUT] (state) {
    state.isLoggedIn = false;
  }
}
// state
const state = {
    isLoggedIn: !!localStorage.getItem('auth')
}

// actions
const actions = {
    login({ commit }, token) {
        commit(types.LOGIN);
        axios.post(API_END_POINT + 'auth/facebook/', {
            access_token: token.accessToken
        }).then(response => {
            localStorage.setItem("auth", response.data.key);
            commit(types.LOGIN_SUCCESS);
            console.log('backend auth successful');
            router.push({name:'home'})
        })
        .catch(response => {
            if(response.status === 400) {
                console.log('Not authorized.');
            } else if (response.status === 403){
                console.log('You are not suposed to see this message. Contact Administrator');
            }
        });
      },
      logout({ commit }) {
        localStorage.removeItem("auth");
        commit(types.LOGOUT);
      }
}

// getters
const getters = {
  isLoggedIn: state => state.isLoggedIn
}

// one store for entire application
export default new Vuex.Store({
  state,
  strict: debug,
  getters,
  actions,
  mutations
})

