<template>
  <div>
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
            <td> {{ rew.point }}</td>
            <td> {{ rew.total_reward }}</td>

            <td v-if="index !== redeem">
            <button @click="redeem(rew)">Redeem</button>
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