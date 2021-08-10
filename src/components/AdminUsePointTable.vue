<template>
  <div>

      <div class="reward">
          <label>
              Start date
          </label>
          <input type="date" v-model="startDate">
          <label>
              End date
          </label>
          <input type="date" v-model="endDate">
          <button class="scrBtn" @click="findTopRank()">sort point</button>
          <button class="scrBtn" @click="filterItem()">Filter Date</button>

      </div>

      <table class="scTb">
          <thead>
              <tr>
                  <th class="scoreHead">Number</th>
                  <th class="scoreHead">Username</th>
                  <th class="scoreHead">reward</th>
                  <th class="scoreHead">UsePoint</th>
                  <th class="scoreHead">date</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(red, index) in redeemFilter" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ red.users_permissions_user.username }}</td>
                  <td>{{ red.reward.name_rewards }}</td>
                  <td>{{ red.reward.reward_point }}</td>
                  <td>{{ red.created_at }}</td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import UsePointStore from '@/store/UsePointStore'

export default {
    data(){
        return{
            redeemeds:[],
            redeemFilter: [],
            form: {
                users_permissions_user:{
                    username: "",
                },
                reward: {
                    name_rewards: "",
                    reward_point: "",
                },
                created_at: ""
            },
            startDate: "",
            endDate: "",
        }
    },

    created(){
        this.fetchRedeemeds()
    },
    methods: {
        async fetchRedeemeds(){
            await UsePointStore.dispatch("fetchRedeemeds")
            this.redeemeds = UsePointStore.getters.redeemeds
            this.redeemFilter = this.redeemeds
        },
        findTopRank(){
            let sortable = [];
            for(let i in this.redeemFilter){
                sortable.push(this.redeemFilter[i])
                sortable.sort((a, b) => b.reward.reward_point - a.reward.reward_point)
            };
         this.redeemFilter = sortable
        },
        filterItem() {
            const startDate = new Date(this.startDate);   
            const endDate = new Date(this.endDate);  
      
            console.log(this.startDate, this.endDate);
            this.redeemFilter = this.redeemeds.filter(item => {
             const itemDate = new Date(item.created_at)
                if (startDate !== null && endDate !== null) {
                 return startDate <= itemDate && itemDate <= endDate;
                }
                if (startDate !== null && endDate === null) {
                 return startDate <= itemDate;
                }
                if (startDate === null && endDate !== null) {
                return itemDate <= endDate;
                }
                return true;  
             })
            }

    }

}
</script>

<style>

</style>