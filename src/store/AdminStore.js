import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'


let api_endpoint = process.env.ADMIN_ENDPOINT || 'http://localhost:1337'

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
      state.data[payload.id].name_rewards = payload.name_rewards
      state.data[payload.id].point = payload.point
      state.data[payload.id].total_reward = payload.total_reward
    },
    delete(state, payload){
      state.data.splice(payload)
    }
  },
  actions: {
    async fetchReward({ commit }){
      let res = await axios.get(api_endpoint + "/rewards")
      commit("fetch", { res })
      console.log(res)
    },

    async editReward({ commit }, payload){
      console.log("payload id",payload.id);
      let url = api_endpoint + "/rewards/" + payload.id
      let body = {
        name_rewards: payload.name_rewards,
        point: payload.point,
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
        point: payload.point,
        total_reward: payload.total_reward
      }
      let res = await axios.post(url, body)
      if (res.status === 200){
        commit("add", res.data)
      }else {
        console.error(res)
      }

      // let name_rewards = await Axios.get(api_endpoint + "/name_rewards")
      // name_rewards = name_rewards.data
      // type_ids = []
      // for (let type of name_rewards) {
      //   if (type.name_rewards === type){
      //     type_ids.push(type.id)
      //   }
      // }
      // console.log(type_ids)
      // let res = await axios.post(url, body)
      // let data = res.data
      // commit("add", data)
    },

    async DeleteReward({ commit }, payload){
      let url = api_endpoint + "/rewards"
      let body = {
        name_rewards: payload.name_rewards,
        point: payload.point,
        total_reward: payload.total_reward

      }
      let res = await axios.post(url, body)
      if(res.status === 200){
        commit("delete", res.data)
      }else{
        console.error(res)
      }

    }
  },
  modules: {},
  
  
})
