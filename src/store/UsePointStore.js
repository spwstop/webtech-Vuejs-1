import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

let api_endpoint = process.env.ADMIN_ENDPOINT || 'http://localhost:1337'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
      data: []
  },

  getters: {
    redeemeds: (state) => state.data,
    rewards: (state) => state.data
  },
  mutations: {
      fetchRedeemeds(state, { res }){
          state.data = res.data
      },
  },
  actions: {
      async fetchRedeemeds({ commit }){
          let res = await axios.get(api_endpoint + "/redeemeds")
          commit("fetchRedeemeds", { res })
      },
      async fetchRewards ({ commit }){
          let res = await axios.get(api_endpoint + "/rewards")
          commit("fetch", { res })
      }

  },
  modules: {
  }
})
