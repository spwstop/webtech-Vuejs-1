<template>
  <div id="app">
    <div id="nav">

      <router-link v-if="!isAuthen()" to="/login">Login</router-link> 
      <router-link v-if="isAuthen() && !isAdmin()" to="/user"> User </router-link> 
      <router-link v-if="isAuthen() && !isAdmin()" to="/finished"> Finished </router-link> 
      <router-link v-if="isAuthen() && isAdmin()" to="/scoreboard"> Score Board </router-link> 
      <router-link v-if="isAuthen() && !isAdmin()" to="/redeemreward"> Redeem Reward </router-link> 
      <router-link v-if="isAuthen() && !isAdmin()" to="/redeemed"> Redeemed </router-link> 
      <router-link v-if="!isAuthen()" to="/register">Register</router-link> 
      <router-link v-if="isAuthen()" to="/logout"> logout</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<script>
import AuthUser from '@/store/AuthUser'
export default {
  data() {
      return {
        currentUser: '',
      }
  },
  methods:{
    isAuthen(){
      return AuthUser.getters.isAuthen
    },
    isAdmin(){
      return AuthUser.getters.isAdmin
    },
    getCurrentUser () {
      this.currentUser = AuthUser.getters.user
    },
  },
  created(){
    this.getCurrentUser()
  },
}
</script>

<style lang="scss">
html{
  background-attachment:fixed;
  background: linear-gradient(#e3e9f1, #C8D6ED, #CFD4FD, #e9c8e2, #f5a6db);
}
#app {
  font-family: "Lucida Console", "Courier New", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  text-align: right;
  padding: 50px 10px 50px 30px;
  
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
    padding: 30px;
    background-color: #a4b6d3;

    &.router-link-exact-active {
      color: white;
    }
  }
}


</style>
