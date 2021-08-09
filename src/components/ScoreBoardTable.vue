<template>
  <div> placre for scoreboard table
    <button @click="findTopRank()">Sort Point</button>
    <div>
      <label>
        start date
      </label>
      <input type="date" v-model="startDate">
      <label>
        before date
      </label>
      <input type="date" v-model="endDate">
      <button @click="filterItem()">Filter Date</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>#Rank</th>
          <th>Username</th>
          <th>Gain Point</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in userFilter" :key="index">
          <td>{{ index +1 }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.use_point }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ActivitiesStore from "../store/ActivitiesStore"
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
    },
    
  }

}
</script>

<style>

</style>