<template>
  <div>

      <div  class="reward">
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

      <table  class="scTb">
          <thead>
              <tr>
                  <th class="scoreHead">Number</th>
                  <th class="scoreHead">Username</th>
                  <th class="scoreHead">activities</th>
                  <th class="scoreHead">point</th>
                  <th class="scoreHead">date</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(fin, index) in finishFilter" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ fin.users_permissions_user.username }}</td>
                  <td>{{ fin.activity.activity_name }}</td>
                  <td>{{ fin.activity.activity_point }}</td>
                  <td>{{ fin.created_at }}</td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import PointStore from '@/store/PointStore'

export default {
    data(){
        return{
            finisheds:[],
            finishFilter: [],
            form: {
                users_permissions_user:{
                    username: "",
                },
                activity: {
                    activity_name: "",
                    activity_point: "",
                },
                created_at: ""
            },
            startDate: "",
            endDate: "",
        }
    },

    created(){
        this.fetchFinished()
    },
    methods: {
        async fetchFinished(){
            await PointStore.dispatch("fetchFinished")
            this.finisheds = PointStore.getters.finisheds
            this.finishFilter = this.finisheds
        },
        findTopRank(){
            let sortable = [];
            for(let i in this.finishFilter){
                sortable.push(this.finishFilter[i])
                sortable.sort((a, b) => b.activity.activity_point - a.activity.activity_point)
            };
         this.finishFilter = sortable
        },
        filterItem() {
            const startDate = new Date(this.startDate);   
            const endDate = new Date(this.endDate);  
      
            console.log(this.startDate, this.endDate);
            this.finishFilter = this.finisheds.filter(item => {
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
td{
    padding: 15px;
}
</style>