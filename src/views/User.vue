<template>
    <div>
        <div>Username: {{currentUser.username}} </div>
        <div>Point:{{currentUser.point}}</div>
        <span>
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
                    <button @click="openForm(index,acti)">Finish !</button>
                </td>
            </tr>
        </tbody>
        </span>

        <!-- <span>
            <thead>
            <tr>
                <th>Activities name |</th>
                <th>| Activities point</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for = "(fin, index) in finished" :key = "index">
                <td v-if="fin.users_permissions_user.username === currentUser.username">{{fin.activity.activity_name}}</td>
                <td v-if="fin.users_permissions_user.username === currentUser.username">{{fin.activity.activity_point}}</td>

            </tr>
        </tbody>
        </span> -->
        
 
   </div>
</template>

<script>
import ActivitiesStore from '@/store/ActivitiesStore'
import AuthUser from "@/store/AuthUser"
import AuthService from '@/services/AuthService'

export default {
    data() {
    return {
        activities: [],
        activity:'',


        finished: [],
        currentUser: '',

        pointForm:{
            newPoint : '',
            userId:''
        },

        form:{
            activityId: "",
            userId:""          
        }
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
        async fetchFinished(){
            await ActivitiesStore.dispatch('fetchFinished')
            this.finished = ActivitiesStore.getters.finished
        },

        openForm(index, activities) {
            console.log('index', index);
            console.log('activities', activities);
            this.activity = activities
            this.form.userId = this.currentUser.id
            this.form.activityId = this.activity.id

            this.pointForm.userId = this.currentUser.id
            this.pointForm.newPoint = this.currentUser.point + this.activity.activity_point
            let rev = AuthService.addPoint(this.pointForm)
            let res = AuthService.addFinished(this.form)
            this.$swal("Login Success", `Welcome`, "success")
            this.$router.push('/finished')
        }
    },
    created() {
        this.getCurrentUser()
        this.fetchActivities()
        this.fetchFinished()
    }
}
</script>

<style lang="scss">
span{
    font-size: 20px;
}
    
</style>

    