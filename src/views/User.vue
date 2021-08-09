<template>
    <div>
        <div class="info">
            <span>Username: </span>
            <span class="showUser">{{currentUser.username}} </span>
            <span>Point: </span>
            <span class="showPoint">{{currentUser.point}}</span>
        </div>
        
        <div class="table">
            <thead>
                <tr >
                    <th class="headName">Activities name </th>
                    <th class="headPoint"> Activities point</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for = "(acti, index) in activities" :key = "index">
                    <td class="actiname">{{acti.activity_name}}</td>
                    <td class="actipoint">{{acti.activity_point}}</td>
                    <td>
                        <button class="finishBtn" @click="openForm(index,acti)">Finish</button>
                    </td>
                </tr>
            </tbody>
        </div>

        
 
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
            let rev = AuthUser.dispatch('addPoint', this.pointForm)
            console.log(rev);
            let res = AuthService.addFinished(this.form)
            this.$swal("Excellent!", `Do it more`, "success")
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
.info{
    color: black;
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 50px;
    font-size: 26px;
    
}
.showPoint,.showUser{
    color: rgb(71, 177, 111);
    font-size: 26px;
}
td{
    border: 1px solid #a4b6d3;
}
tr:nth-child(even){ 
    background-color: #e9eef6;
}
.table{
    color: black;
    padding: 0 20% 0 20%;
    margin-bottom: 30%;
}
.headName,.headPoint{

    font-family: "Lucida Console", "Courier New", monospace;
    padding: 30px 200px 30px 200px;
    text-align: center;
    font-size: 20px;
    background-color: #a4b6d3;
}

.finishBtn {
    float: none;
    font-weight: bold;
    padding: 15px;
    border: none;
    background: #f9fbff;
    border: 5px solid #a4b6d3;

}
.finishBtn:hover{
    background: #a4b6d3;
    transition-duration: 0.5s;
}
    
</style>

    