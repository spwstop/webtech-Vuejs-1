<template>
  <div>
    place for reward create form
    <div>
      <label for="name_rewards">Add Reward  </label>
        <input type="text" v-model="form.name_rewards">
        <label for="point">  Add Point  </label>
        <input type="integer" v-model="form.reward_point">
        <label for="point">  Add total  </label>
        <input type="integer" v-model="form.total_reward">
    </div>
    <div>
        <button @click="addReward">Add</button>
      </div>
  </div>
</template>

<script>
import AdminStore from "@/store/AdminStore"
export default {
  data(){
    return{
      form:{
        name_rewards: "",
        reward_point: "",
        total_reward: ""
      },
    }
  },
  methods: {
    clearForm(){
      this.form = {
        name_rewards: "",
        reward_point: "",
        total_reward: ""
      }
    },
    addReward(){
      let payload = {
        name_rewards: this.form.name_rewards, 
        reward_point: this.form.reward_point,
        total_reward: this.form.total_reward
      }

      AdminStore.dispatch("addReward", payload)
      this.clearForm()

    },

  },

}
</script>

<style>

</style>