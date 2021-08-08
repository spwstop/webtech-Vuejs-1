<template>

  <div>
    place for reward table
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Reward </th>
          <th>Use Point</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rew, index) in rewards" :key="index">

          <td>{{ index +1 }}</td>

          <td v-if="index !== editIndex">{{ rew.name_rewards }}</td>
          <td v-if="index === editIndex">
            <input type="text" v-model="form.name_rewards" />
          </td>

          <td v-if="index !== editIndex">{{ rew.reward_point }}</td>
          <td v-if="index === editIndex">
            <input type="integer" v-model="form.reward_point" />
          </td>

          <td v-if="index !== editIndex">{{ rew.total_reward }}</td>
          <td v-if="index === editIndex">
            <input type="integer" v-model="form.total_reward" />
          </td>

          <td v-if="index !== editIndex">
            <button @click="openForm(index, rew)">Edit</button>
            <button @click="deleteReward(index, rew)"> Delete</button>
          </td>

          <td v-if="index === editIndex">
            <button @click="editReward(rew)">Update Reward</button>
            <button @click="closeForm">Cancel</button>
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
        reward_point: "",
        total_reward: "",
      },
      
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

    openForm(index, reward){
     this.editIndex = index
     let cloned = JSON.parse(JSON.stringify(reward))
     this.form.name_rewards = cloned.name_rewards
     this.form.reward_point = cloned.reward_point
     this.form.total_reward = cloned.total_reward
  },

  closeForm(){
    this.editIndex = -1
    this.form = {
      name_rewards: "",
      reward_point: "",
      total_reward: "",
    }
  },

  async editReward(rew){
    
    let payload = {
      id: rew.id,
      name_rewards: this.form.name_rewards,
      reward_point: this.form.reward_point,
      total_reward: this.form.total_reward,
    }
    console.log(payload);
    await AdminStore.dispatch("editReward", payload)
    this.closeForm()
    this.fetchReward()
  },

  async deleteReward(){
    let payload = {
      id: this.rewards[this.deleteIndex].id,
      name_rewards: this.form.name_rewards,
      reward_point: this.form.reward_point,
      total_reward: this.form.total_reward,

    }
    await AdminStore.dispatch("deleteIndex", payload)
    this.fetchReward()
  },

  }

}


</script>

<style>

</style>