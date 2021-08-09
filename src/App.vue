<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="!isAuthen()" to="/login">Login</router-link> 
      <router-link v-if="isAuthen()" to="/user"> User </router-link> 
      <router-link v-if="isAuthen()" to="/finished"> Finished </router-link> 
      <router-link v-if="isAuthen()" to="/scoreboard"> Score Board </router-link> 
      <router-link v-if="isAuthen()" to="/redeemreward"> Redeem Reward </router-link> 
      <router-link v-if="isAuthen()" to="/redeemed"> Redeemed </router-link> 
      <router-link v-if="!isAuthen()" to="/register">Register</router-link> 
      <router-link v-if="isAuthen()" to="/logout"> logout</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<script>
import AuthUser from '@/store/AuthUser'
export default {
  methods:{
    isAuthen(){
      return AuthUser.getters.isAuthen
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  text-align: right;
  padding: 30px 10px 30px 30px;
:hover{
  background: #5a779c;
  transition-duration: 0.7s;
}
  a {
    border-right: 1px black dotted;
    text-decoration: none;
    font-size: 18px;
    font-weight: bold;
    color: black;
    padding: 20px;
    background-color: #a4b6d3;

    &.router-link-exact-active {
      color: white;
    }
  }
}


</style>
