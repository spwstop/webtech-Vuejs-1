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
        activities: (state) => state.data,
    },

    mutations: {
        fetch(state, {res}){
            state.data = res.data
        },
        // add(state, payload){
        //     state.data[payload.id].point = payload.point
        // }
    },

    actions: {
        async fetchActivities ( {commit} ) {
            let res = await Axios.get(api_endpoint + "/activities")
            commit("fetch", {res})
            console.log("__________");
            console.log(res);
        },
        // async addActivities({commit}, payload){
        //     let url = api_endpoint + "/activities"
        //     let body = {
        //         activity_name: payload.activity_name,
        //         point: payload.point,
                
        //     }
        // }
    },
    modules: {},
})