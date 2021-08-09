<template>

  <div>
    <table class="rwTb">
      <thead>
        <tr class="rwTr">
          <th class="rewardHead">Number</th>
          <th class="rewardHead">Reward </th>
          <th class="rewardHead">Use Point</th>
          <th class="rewardHead">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr class="rwTr2" v-for="(rew, index) in rewards" :key="index">

          <td class="rwTd">{{ index +1 }}</td>

          <td class="rwTd" v-if="index !== editIndex">{{ rew.name_rewards }}</td>
          <td class="rwTd" v-if="index === editIndex">
            <input type="text" v-model="form.name_rewards" />
          </td>

          <td class="rwTd" v-if="index !== editIndex">{{ rew.point }}</td>
          <td class="rwTd" v-if="index === editIndex">
            <input type="integer" v-model="form.point" />
          </td>

          <td class="rwTd" v-if="index !== editIndex">{{ rew.total_reward }}</td>
          <td class="rwTd" v-if="index === editIndex">
            <input type="integer" v-model="form.total_reward" />
          </td>

          <td v-if="index !== editIndex">
            <button class="finishBtn" @click="openForm(index, rew)">Edit</button>
            <button class="delBtn" @click="deleteReward(index, rew)"> Delete</button>
          </td>

          <td v-if="index === editIndex">
            <button class="editBtn" @click="editReward(rew)">Update Reward</button>
            <button class="finishBtn" @click="closeForm">Cancel</button>
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
     this.form.point = cloned.point
     this.form.total_reward = cloned.total_reward
  },

  closeForm(){
    this.editIndex = -1
    this.form = {
      name_rewards: "",
      point: "",
      total_reward: "",
    }
  },

  async editReward(rew){
    
    let payload = {
      id: rew.id,
      name_rewards: this.form.name_rewards,
      point: this.form.point,
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
      point: this.form.point,
      total_reward: this.form.total_reward,

    }
    await AdminStore.dispatch("deleteIndex", payload)
    this.fetchReward()
  },

  }

}


</script>

<style lang="scss">

</style>