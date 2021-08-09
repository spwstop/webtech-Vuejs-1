<template>
  <div>
    <form @submit.prevent="login">
      <div id="login-text">Login</div>
      <div><img src="../assets/login-icon.png"></div>
      <div><label  for="username">Username</label></div>
      <div><input v-model="form.username" type="text" placeholder="Username" autocomplete="off"></div>

      <div><label for="password">Password</label></div>
      <div><input v-model="form.password" type="password" placeholder="Password" autocomplete="off"></div>
      

      <div>
        <button class="loginBtn">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
// import AuthService from '@/services/AuthService'
import AuthUser from "@/store/AuthUser"
export default {
  data() {
    return {
      form : {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    async login() {
      let res = await AuthUser.dispatch('login', this.form)
      if (res.success) {
            this.$swal("Login Success", `Welcome, ${res.user.username}`, "success")
            this.$router.push('/user')
      } else {
            this.$swal("Login Failed", res.message, "error")
            this.clearForm()
            
      }
    },
    clearForm() {
      this.form = {
        username: '',
        password: '',
      }
    }
  }
}
</script>

<style lang="scss">

form{

    font-weight: bold;
    font-family: "Lucida Console", "Courier New", monospace;
    width: 50%;
    margin-left: 25%;
    padding: 0px 0px 80px 0px;
    font-size: 20px;
    background: linear-gradient(#EBF0F7,#f4f4ff, #dae3f1, #CFD4FD, #F1D2EB, #F4DCEC);
    color: #242b35;
    margin-bottom: 20%;
}
#login-text {
    background: #a4b6d3;
    font-size:100px;
    padding-top: 40px;
    padding-bottom: 40px;
    margin-bottom: 20px;
}
input {
    text-align: center;
    padding: 10px 15px 10px 15px;
    margin-bottom: 10px;
    border-radius: 20px;
}


.loginBtn{
  font-family: "Lucida Console", "Courier New", monospace;
  border : none;
  margin-top: 10px ;
  padding: 15px 75px 15px 75px;
  background-color: #a4b6d3;
  font-weight: bold;
  border-radius: 20px;
}
.loginBtn:hover{
  background: #5a779c;
  transition-duration: 0.4s;
}
img{
  width: 10%;
  margin-bottom: 20px;
}
  
</style>