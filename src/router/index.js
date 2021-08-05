import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import ScoreBoard from '@/views/ScoreBoard.vue'
import Register from '@/views/Register.vue'
import RedeemReward from '@/views/RedeemReward.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/scoreboard',
    name: 'ScoreBoard',
    component: ScoreBoard
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/redeemreward',
    name: 'RedeemReward',
    component: RedeemReward
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
