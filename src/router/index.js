import Vue from 'vue'
import VueRouter from 'vue-router'
import ScoreBoard from '@/views/ScoreBoard.vue'
import Register from '@/views/Register.vue'
import RedeemReward from '@/views/RedeemReward.vue'
import Login from '@/views/Login.vue'
import Logout from '@/views/Logout.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/scoreboard',
    name: 'ScoreBoard',
    component: ScoreBoard
  },
  {
    path: '/redeemreward',
    name: 'RedeemReward',
    component: RedeemReward
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
