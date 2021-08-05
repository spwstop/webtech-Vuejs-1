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

            <td v-if="index !== reedeem">
            <button @click="reedeem(index, rew)">Reedeem</button>
            
          </td>
            

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

    async reedeem(index, reward){
      let payload = {
      id: this.rewards[this.editIndex].id,
      name_rewards: this.form.name_rewards,
      point: this.form.point,
      total_reward: this.form.total_reward -1,

    }
    await AdminStore.dispatch("deleteIndex", payload)
    this.fetchReward()
    },
  }

}
</script>

<style>

</style>