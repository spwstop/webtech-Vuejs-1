import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import AuthService from '../services/AuthService'


let api_endpoint = process.env.ADMIN_ENDPOINT || 'http://localhost:1337'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    currentUser:[]
  },

  getters: {
    users: (state) => state.data,
    currentUser: (state) => state.currentUser
  },
  mutations: {
    fetchUser(state, { res }){
      state.data = res.data
    },
    fetchUserId(state, {res}){
      state.currentUser = res.data
    }
  },
  actions: {
    async fetchUser({ commit }){
      const headers = AuthService.getHeaders()
      let res = await axios.get(api_endpoint + "/users", headers)
      commit("fetchUser", { res })
      
    },
    async fetchUserById({ commit }, id){
      const headers = AuthService.getHeaders()
      let res = await axios.get(api_endpoint + `/users/${id}`, headers)
      commit("fetchUserId", { res })
      
    },
  },
  modules: {
  }
})
