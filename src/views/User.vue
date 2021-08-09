<template>
    <div>
        <div id="user">Username: {{currentUser.username}} </div>
        <div id="point">Point:{{currentUser.point}}</div>
        <div class="table">
            <thead>
                <tr>
                    <th>Activities name |</th>
                    <th>| Activities point</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for = "(acti, index) in activities" :key = "index">
                    <td class="actiname">{{acti.activity_name}}</td>
                    <td class="actipoint">{{acti.activity_point}}</td>
                    <td>
                        <button class="finishBtn" @click="openForm(index,acti)">Finish !</button>
                    </td>
                </tr>
            </tbody>
        </div>

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
import HistoryUseScore from "../store/HistoryUseScore"
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
        async getCurrentUser () {
            const user = AuthUser.getters.user
            console.log("user", user);
            await HistoryUseScore.dispatch("fetchUserById", user.id);
            this.currentUser = HistoryUseScore.getters.currentUser
            console.log("current",this.currentUser);
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
            let rev = AuthUser.dispatch('addPoint', this.pointForm)
            console.log(rev);
            let res = AuthService.addFinished(this.form)
            this.$swal("Login Success", `Welcome`, "success")
            // location.reload()
            this.$router.push('/finished')
        }
    },
    created() {
        console.log(AuthUser.getters.jwt);
        console.log(AuthUser.getters.isAuthen);
        console.log(AuthUser.getters.user);
        this.getCurrentUser()
        this.fetchActivities()
        this.fetchFinished()
    }
}
</script>

<style lang="scss">
#user,#point{
    text-align: right;
    font-size: 40px;
}
.table{
    color: black;
    width: 90%;
    margin: auto;
}
th{
    padding: 30px 200px 30px 200px;
    text-align: center;
    font-size: 20px;
    background-color: salmon;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.actiname,.actipoint{
    background: white;
    border-bottom: 1px solid black;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}
.finishBtn {
    padding: 10px;
    margin-left: 0px;
}
    
</style>

    