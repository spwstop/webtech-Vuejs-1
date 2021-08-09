import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from "@/services/AuthService"

let api_endpoint = process.env.VUE_APP_ENDPOINT || 'http://localhost:1337'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data:[],
  },

  getters: {
    rewards: (state) => state.data,
  },
  mutations: {
    fetch(state, { res }){
      state.data = res.data
    },
    add(state, payload){
      state.data.push(payload)
    },
    edit(state, payload ){
      state.data = payload
    },
    delete(state, { payload }) {
      state.data[payload.index] = payload.data
    }
  },
  actions: {
    async fetchReward({ commit }){
      let res = await axios.get(api_endpoint + "/rewards")
      commit("fetch", { res })
      console.log(res)
    },

    async editReward({ commit }, payload){
      
      let url = api_endpoint + "/rewards/" + payload.id
      let body = {
        name_rewards: payload.name_rewards,
        reward_point: payload.reward_point,
        total_reward: payload.total_reward
      }
      
      let res = await axios.put(url, body)
      console.log("console log" ,res)
      if (res.status === 200){
        commit("edit", payload)
      }else {
        console.err(res)
      }
    
    },

    async addReward({ commit }, payload){
      let url = api_endpoint + "/rewards"
      let body = {
        name_rewards: payload.name_rewards,
        reward_point: payload.reward_point    ,
        total_reward: payload.total_reward
      }
      let res = await axios.post(url, body)
      if (res.status === 200){
        commit("add", res.data)
      }else {
        console.error(res)
      }
    },

    async deleteItem({ commit }, payload) {
      let url = api_endpoint + "/rewards/" + payload.id
      let headers = AuthService.getApiHeader()
      let res = await axios .delete(url, headers)
      if (res.status === 200) {
          commit("edit", res)
          return {
              success: true,
              data: res
          }
      }
  }
  },
  modules: {},
  
  
})
