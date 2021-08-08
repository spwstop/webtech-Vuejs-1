<template>
  <div>
      <div>Username: {{currentUser.username}} </div>
        <div>Point:{{currentUser.point}}</div>

      This is your reward
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Reward</th>
           <th>Use Point</th>
           <th>Total</th>
          </tr>
          
        </thead>
        <tbody>
          <tr v-for="(rew, index) in rewards" :key="index">
            <td>{{ index + 1}}</td>
            <td> {{ rew.name_rewards }}</td>
            <td> {{ rew.reward_point }}</td>
            <td> {{ rew.total_reward }}</td>

            <td>
            <button @click="openForm(index, rew)">Reedeem</button>
            
          </td>
      
            

          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>

import RewardStore from "@/store/RewardStore"
import AdminStore from "@/store/AdminStore"
import AuthUser from "@/store/AuthUser"
import AuthService from '@/services/AuthService'

export default {
  data(){
    return {
      rewards: [],
      reward:'',

      redeemeds: [],
      currentUser: '',
      
      pointForm:{
            newPoint : '',
            userId:''
      },

      form:{
            userId:"",   
            rewardId: ""
                   
      },
    }
  },

  created(){
    this.getCurrentUser() 
    this.fetchReward()
    this.fetchRedeemeds()
  },
  methods: {
    getCurrentUser () {
            this.currentUser = AuthUser.getters.user
        },
    async fetchRedeemeds(){
            await RewardStore.dispatch('fetchRedeemed')
            this.redeemeds = RewardStore.getters.redeemeds
    },
    async fetchReward(){
      await AdminStore.dispatch("fetchReward")
      this.rewards = AdminStore.getters.rewards
    },

    openForm(index, rewards) { 
            this.reward = rewards
            this.form.userId = this.currentUser.id
            this.form.rewardId = this.reward.id
            this.pointForm.userId = this.currentUser.id
            this.pointForm.newPoint = this.currentUser.point - this.reward.reward_point
            let rev = AuthService.addPoint(this.pointForm)
            let res = AuthService.addRedeemed(this.form)
            this.$swal("Redeem Success")
            this.$router.push('/redeemed')
      },

  },

}
</script>

<style>

</style>