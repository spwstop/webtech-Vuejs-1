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
    finisheds: (state) => state.data,
    activities: (state) => state.data
  },
  mutations: {
      fetchFinished(state, { res }){
          state.data = res.data
      },
  },
  actions: {
      async fetchFinished({ commit }){
          let res = await axios.get(api_endpoint + "/finisheds")
          commit("fetchFinished", { res })
      },
      async fetchActivities ({ commit }){
          let res = await axios.get(api_endpoint + "/activities")
          commit("fetch", { res })
      }

  },
  modules: {
  }
})
