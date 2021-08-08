import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'


let api_endpoint = process.env.VUE_APP_ENDPOINT || 'http://localhost:1337'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        data:[],
    },

    getters: {
        redeemed: (state) => state.data
    },

    mutations: {
        fetch(state, {res}){
            state.data = res.data
        },
        
    },

    actions: {

        async fetchRedeemed( {commit} ) {
            let res = await Axios.get(api_endpoint + "/redeemeds")
            commit("fetch", {res})
        },
    },
    modules: {},
})