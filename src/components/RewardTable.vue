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

          <td class="rwTd" v-if="index !== editIndex">{{ rew.reward_point }}</td>
          <td class="rwTd" v-if="index === editIndex">
            <input type="integer" v-model="form.reward_point" />
          </td>

          <td class="rwTd" v-if="index !== editIndex">{{ rew.total_reward }}</td>
          <td class="rwTd" v-if="index === editIndex">
            <input type="integer" v-model="form.total_reward" />
          </td>

          <td v-if="index !== editIndex">
            <button class="finishBtn" @click="openForm(index, rew)">Edit</button>
            <button class="delBtn" @click="deleteReward(rew)"> Delete</button>
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
        reward_point: "",
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
      console.log("reward",this.rewards);
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

  deleteReward(rew) {
      this.$swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.deleteInStore(rew)
          location.reload()  
          swal("Success! Your item has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your reward is safe!");
        }
      });
    },

    async deleteInStore(rew) {
      await AdminStore.dispatch("deleteItem", rew);
    },

  }

}


</script>

<style>

</style>