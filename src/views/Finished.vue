<template>
    <span>
        <div>Username: {{currentUser.username}} </div>
        <div>Point:{{currentUser.point}}</div>

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
        
    </span>
</template>

<script>
import ActivitiesStore from '@/store/ActivitiesStore'
import AuthUser from "@/store/AuthUser"
export default {
    data() {
        return {
            finished: [],
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
    },
    created() {
        this.getCurrentUser()
        this.fetchFinished()
    }

}
</script>

<style>

</style>