<template>
  <div>
      <table class="userTb">
        <thead>
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
            <td class="rwTd"> {{ rew.point }}</td>
            <td class="rwTd"> {{ rew.total_reward }}</td>

            <td v-if="index !== redeem">
            <button class="redBtn" @click="redeem(rew)">Redeem</button>
          </td>
            <!-- <td v-if="index=== reedeem">
              <input type="integer" v-model="form.total_reward">
            </td> -->
            

          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>

import AdminStore from "@/store/AdminStore"
export default {
  data(){
    return {
      rewards: [],

      editIndex: -1,
      form: {
        name_rewards: "",
        point: "",
        total_reward: ""     
       }
    }
  },

  created(){
    this.fetchReward()
  },
  methods: {
    async fetchReward(){
      await AdminStore.dispatch("fetchReward")
      this.rewards = AdminStore.getters.rewards
    },
    async redeem(rew){
      let payload = {
        id: rew.id,
        name_rewards: rew.name_rewards,
        point: rew.point,
        total_reward: rew.total_reward-1,
      }
      await AdminStore.dispatch("editReward", payload)
      this.fetchReward()
    },
  }

}
</script>

<style>

</style>