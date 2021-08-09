<template>
  <div>
      <table class="userTb">
        <thead>
          <span>Username: </span>
          <span class="showUser">{{currentUser.username}} </span>
          <span>Point: </span>
          <span class="showPoint">{{currentUser.point}}</span>
          <tr class="rwTr">
            <th class="rewardHead">Number</th>
            <th class="rewardHead">Reward</th>
           <th class="rewardHead">Use Point</th>
           <th class="rewardHead">Total</th>
          </tr>
          
        </thead>
        <tbody>
          <tr v-for="(rew, index) in rewards" :key="index">
            <td class="rwTd">{{ index + 1}}</td>
            <td class="rwTd"> {{ rew.name_rewards }}</td>
            <td class="rwTd"> {{ rew.reward_point }}</td>
            <td class="rwTd"> {{ rew.total_reward }}</td>

            <td v-if="index !== redeem">
            <button class="redBtn" @click="openForm(currentUser, rew)">Redeem</button>
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

    async openForm(currentUser ,rewards) {
        if(currentUser.point >= rewards.reward_point){
            let payload = {
                id: rewards.id,
                name_rewards: rewards.name_rewards,
                reward_point: rewards.point,
                total_reward: rewards.total_reward-1,
            }
            await AdminStore.dispatch("editReward", payload)
            this.fetchReward()
            this.reward = rewards
            this.form.userId = this.currentUser.id
            this.form.rewardId = this.reward.id
            this.pointForm.userId = this.currentUser.id
            this.pointForm.newPoint = this.currentUser.point - this.reward.reward_point
            let rev = AuthUser.dispatch('addPoint', this.pointForm)
            let res = AuthService.addRedeemed(this.form)
            this.$swal("Redeem Success")
            this.$router.push('/redeemed')
        } else {
        this.$swal({
          icon: "error", title: "YOU NOT ENOUNG POINT!!!"});
        }
            
      },
  }

}
</script>

<style>

</style>