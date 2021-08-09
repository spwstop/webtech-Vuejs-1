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
.showU,.showP {
  color: rgb(71, 177, 111);
  font-size: 24px;
  font-weight: bold;
}
.show{
  font-weight: bold;
  font-size: 24px;
}

</style>