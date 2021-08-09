import Axios from "axios"
import Vue from "vue"
import Vuex from "vuex"
import AuthService from "@/services/AuthService"

const api_endpoint = process.env.VUE_APP_ENDPOINT || "http://localhost:1337"

Vue.use(Vuex)

let auth_key = 'auth-user'
let auth = JSON.parse(localStorage.getItem(auth_key))

const initialState = {
    user: auth ? auth.user : "",
    jwt: auth ? auth.jwt : "",
    isAuthen: auth ? true : false,
    isAdmin: auth ? auth.user.role.type === "admin" : false
}

export default new Vuex.Store({
    state: initialState,
    mutations: {
        LOGIN_SUCCESS(state, user, jwt) {
            state.user = user
            state.jwt = jwt
            state.isAuthen = true
            state.isAdmin = state.user.role.type === "admin"
        },
        LOGOUT_SUCCESS(state) {
            state.user = ""
            state.jwt = ""
            state.isAuthen = false
            state.isAdmin = false
        },
        UPDATE_USER(state, user){
            console.log(state.user);
            state.user = user
            console.log(state.user);
        }
    },
    getters: {
        user: (state) => state.user,
        jwt: (state) => state.jwt,
        isAuthen: (state) => state.isAuthen,
        isAdmin: (state) => state.isAdmin,
    },
    actions: {
        async login ({ commit }, {username, password}) {
            let res = await AuthService.login({username, password})
            if (res.success) {
                commit('LOGIN_SUCCESS', res.user,res.jwt)
            }
            return res
        },
        async logout ({ commit }) {
            AuthService.logout()
            commit('LOGOUT_SUCCESS')
        },

        async register ({ commit }, user) {
            let res = await AuthService.register(user)
            if (res.success) {
                commit('LOGIN_SUCCESS', res.user)
            }
            return res
        },
        async addPoint ({ commit }, {userId, newPoint}) {
            let res = await AuthService.addPoint({userId, newPoint})
            console.log(res);
            if (res.success) {
                commit('UPDATE_USER', res.user)
            }
            return res
        },
        logout ({ commit }) {
            AuthService.logout()
            commit('LOGOUT_SUCCESS')
        },
        
    }
})