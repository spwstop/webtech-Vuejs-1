import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import ScoreBoard from '@/views/ScoreBoard.vue'

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

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
