<template>
    <div>
        <span>Username: {{currentUser.username}} </span>
        <span>Point:{{currentUser.point}}</span>

        <thead>
            <tr>
                <th>Activities name |</th>
                <th>| Activities point</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for = "(acti, index) in activities" :key = "index">
                <td>{{acti.activity_name}}</td>
                <td>{{acti.activity_point}}</td>
                <td>
                    <button @click="plus">+</button>
                </td>
            </tr>
        </tbody>
        
 
   </div>
</template>

<script>
import ActivitiesStore from '@/store/ActivitiesStore'
import AuthUser from "@/store/AuthUser"

export default {
    data() {
    return {
        activities: [],

        currentUser: '',
      }
    },
    methods: {
        getCurrentUser () {
            this.currentUser = AuthUser.getters.user
        },
        async fetchActivities(){
            await ActivitiesStore.dispatch('fetchActivities')
            this.activities = ActivitiesStore.getters.activities
        },
        plus() {
            this.currentUser.point + 1
            console.log(this.currentUser.point+1);
        }
    },
    created() {
        this.getCurrentUser()
        this.fetchActivities()
        // console.log(this.currentUser);
        // console.log("______________");
        // console.log(this.activities);
    }
}
</script>

<style lang="scss">
span{
    font-size: 50px;
}
    
</style>

    