import Axios from "axios"
import Vue from "vue"
import Vuex from "vuex"
import AuthService from "@/services/AuthService"

const api_endpoint = process.env.VUE_APP_GAMBLE_ENDPOINT || "http://localhost:1337"

Vue.use(Vuex)

let auth_key = 'auth-user'
let auth = JSON.parse(localStorage.getItem(auth_key))

const initialState = {
    user: auth ? auth.user : "",
    jwt: auth ? auth.jwt : "",
    isAuthen: auth ? true : false
}

export default new Vuex.Store({
    state: initialState,
    mutations: {
        LOGIN_SUCCESS(state, user, jwt) {
            state.user = user
            state.jwt = jwt
            state.isAuthen = true
        },
        LOGOUT_SUCCESS(state) {
            state.user = ""
            state.jwt = ""
            state.isAuthen = false
        },
    },
    getters: {
        user: (state) => state.user,
        jwt: (state) => state.jwt,
        isAuthen: (state) => state.isAuthen,
    },
    actions: {
        async login ({ commit }, {username, password}) {
            let res = await AuthService.login({username, password})
            if (res.success) {
                commit('LOGIN_SUCCESS', res.user,res.jwt)
            }
            return res
        },
        // async logout ({ commit }) {
        //     AuthService.logout()
        //     commit('LOGOUT_SUCCESS')
        // },

        async register ({ commit }, user) {
            let res = await AuthService.register(user)
            if (res.success) {
                commit('LOGIN_SUCCESS', res.user)
            }
            return res
        },
        logout ({ commit }) {
            AuthService.logout()
            commit('LOGOUT_SUCCESS')
        },
    }
})