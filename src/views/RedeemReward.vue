<template>
  <div>
    <h1>Reward</h1>
    <reward-user></reward-user>
  </div>
</template>

<script>

import RewardUser from '@/components/RewardUser.vue'
export default {
    name: 'RedeemReward',
    components:{
      RewardUser,
    } 

  }

</script>

<style>
h1{
  font-size: 70px;
  color: black;
  margin-top: 100px;
  margin-bottom: 10px;
}
</style>