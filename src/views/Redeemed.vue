<template>
    <span>
        <div>Username: {{currentUser.username}} </div>
        <div>Point:{{currentUser.point}}</div>

            <thead>
            <tr>
                <th>Reward name |</th>
                <th>| Reward point</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(rew, index) in redeemeds" :key="index">
                <td >{{rew.reward.reward_point}}</td>
                <td  >{{rew.reward.name_rewards}}</td>
                <!-- <td v-if="rew.users_permissions_user.username === currentUser.username">{{rew.reward.reward_point}}</td>
                <td v-if="rew.users_permissions_user.username === currentUser.username">{{rew.reward.name_rewards}}</td> -->
            
            </tr>
        </tbody>
        
    </span>
</template>

<script>

import RewardStore from '@/store/RewardStore'
import AuthUser from "@/store/AuthUser"
export default {
    data() {
        return {
            redeemeds: [],
            currentUser: ''
        }
    },
    methods: {
        getCurrentUser () {
            this.currentUser = AuthUser.getters.user
        },
        async fetchRedeemed(){
            await RewardStore.dispatch('fetchRedeemed')
            this.redeemeds = RewardStore.getters.redeemeds
        },
    },
    created() {
        this.getCurrentUser()
        this.fetchRedeemed()
    }

}
</script>

<style>

</style>