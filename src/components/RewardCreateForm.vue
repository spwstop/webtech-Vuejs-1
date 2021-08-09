<template>
  <div class="allRewardForm">
    <div class="reward">
      <label for="name_rewards">Add Reward  </label>
        <input type="text" v-model="form.name_rewards" placeholder="Reward">
        <label for="point">  Add Point  </label>
        <input type="integer" v-model="form.point" placeholder="Point">
        <label for="total_reward"> Total</label>
        <input type="integer" v-model="form.total" placeholder="Total">
    </div>
    <div>
        <button class="rewardBtn" @click="addReward">Add</button>
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
        point: "",
        total_reward:"",
      },
    }
  },
  methods: {
    clearForm(){
      this.form = {
        name_rewards: "",
        point: "",
        total_reward: "",
      }
    },
    addReward(){
      let payload = {
        name_rewards: this.form.name_rewards,
        point: this.form.point,
        total: this.form.total_reward,
      }

      AdminStore.dispatch("addReward", payload)
      this.clearForm()

    },

  },

}
</script>

<style>

</style>