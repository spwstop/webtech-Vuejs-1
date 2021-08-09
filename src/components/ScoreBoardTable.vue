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
      <input class="endDate" type="date" v-model="endDate">
      <button class="scrBtn" @click="filterItem()">Filter Date</button>
      <button class="scrBtn" @click="findTopRank()">Sort Point</button>
    </div>
    <table class="scTb">
      <thead>
        <tr>
          <th class="scoreHead">Rank</th>
          <th class="scoreHead">Username</th>
          <th class="scoreHead">Total Point</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in userFilter" :key="index">
          <td class="scsTd">{{ index +1 }}</td>
          <td class="scsTd">{{ user.username }}</td>
          <td class="scsTd">{{ user.user_point }}</td>
          <td class="scsTd">{{ user.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import HistoryUseScore from '@/store/HistoryUseScore'
export default {
  data(){
    return{
      users: [],
      userFilter: [],
      form: {
        username: "",
        use_point: "",
        user_point: ""
      },
      startDate: "",
      endDate: "",
    }
    
  },

  created(){
    this.fetchUser()
  },
  methods: {
    async fetchUser(){
      await  HistoryUseScore.dispatch("fetchUser")
      this.users = HistoryUseScore.getters.users
      this.userFilter = this.users
    },
    findTopRank(){
      let sortable = [];
      for(let i in this.userFilter){
        sortable.push(this.userFilter[i])
        sortable.sort((a, b) => b.user_point - a.user_point)
      };
      this.userFilter = sortable
    },
    filterItem() {
      const startDate = new Date(this.startDate);   
      const endDate = new Date(this.endDate);  
      
      console.log(this.startDate, this.endDate);
      this.userFilter = this.users.filter(item => {
        const itemDate = new Date(item.date)
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