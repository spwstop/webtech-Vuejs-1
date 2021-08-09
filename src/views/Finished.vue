<template>
    <div>
        <div class="info">
            <span>Username: </span>
            <span class="showUser">{{currentUser.username}} </span>
        </div>
        <div class="table">
            <thead>
            <tr>
                <th class="headName">Activities name </th>
                <th class="headPoint"> Activities point</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for = "(fin, index) in finished" :key = "index">
                <td class="finname" v-if="fin.users_permissions_user.username === currentUser.username">{{fin.activity.activity_name}}</td>
                <td class="finpoint" v-if="fin.users_permissions_user.username === currentUser.username">{{fin.activity.activity_point}}</td>
            </tr>

            
        </tbody>
        </div>
        
    </div>
</template>

<script>
import ActivitiesStore from '@/store/ActivitiesStore'
import AuthUser from "@/store/AuthUser"
import AdminStore from '@/store/AdminStore'
export default {
    data() {
        return {
            finished: [],
            users:[],
            currentUser: ''
        }
    },
    methods: {
        getCurrentUser () {
            this.currentUser = AuthUser.getters.user
        },
        async fetchFinished(){
            await ActivitiesStore.dispatch('fetchFinished')
            this.finished = ActivitiesStore.getters.finished
        },
        async fetchUser(){
            await AdminStore.dispatch('fetchUser')
            this.users = AdminStore.getters.users
        }
    },
    created() {
        this.getCurrentUser()
        this.fetchFinished()
        this.fetchUser()
    }

}
</script>

<style>

tbody{
    background: white;
}
.finname,.finpoint{
    padding: 15px;
}
tr:nth-child(even){ 
  background-color: #e9eef6;
}
</style>