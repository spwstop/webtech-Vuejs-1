<template>
  <div id="app">
    <div id="nav">
      <router-link to="/login">Login</router-link> |
      <router-link to="/scoreboard">Score Board</router-link> |
      <router-link to="/redeemreward">Redeem Reward</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link v-if="isAuthen()" to="/logout">logout</router-link> 
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
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
