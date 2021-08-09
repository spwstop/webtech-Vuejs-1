<template>
    <div>
        <div class="info">
            <span>Username: </span>
            <span class="showUser">{{currentUser.username}} </span>
        </div>
        <div class="table">
            <thead>
            <tr>
                <th class="headName">Reward name</th>
                <th class="headPoint">Reward point</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="(rew, index) in redeemeds" :key="index">
                <td class="finname" v-if="rew.users_permissions_user.username === currentUser.username">{{rew.reward.name_rewards}}</td>
                <td class="finpoint" v-if="rew.users_permissions_user.username === currentUser.username">{{rew.reward.reward_point}}</td>
                
            
            </tr>
        </tbody>
        </div>
    </div>
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