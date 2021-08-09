<template>
    <div>
        <form @submit.prevent="register">
            <div id="register-text">Register</div>
            <div><img src="../assets/regis-icon.png"></div>
            <div><label for="username">Username</label></div>
            <div><input v-model="input.username" type="text" autocomplete="off" placeholder="Username"></div>
            <div><label for="email">Email</label></div>
            <div><input v-model="input.email" type="text" autocomplete="off" placeholder="Email"></div>
            <div><label for="password">Password</label></div>
            <div><input v-model="input.password" type="password" placeholder="Password"></div>
            <div><button class="regisBtn" type="submit">Register</button></div>
        </form>
    </div>
</template>

<script>
import AuthUser from "@/store/AuthUser"
export default {
    data() {
        return {
            input: {
                username: '',
                email: '',
                password: '',
            }
        } 
    },
    methods: {
        async register() {
            let res = await AuthUser.dispatch('register', this.input)
            if (res.success) {
                this.$swal("Register Success", `Welcome ${res.user.username}`, "success")
                this.$router.push("/")
            } else {
                this.$swal("Register Failed", res.message, "error")
                this.clearInput()
            }
        },
        clearInput() {
            this.input = {
                username: '',
                email: '',
                password: ''
            }
        },
        isAuthen() {
            return AuthUser.getters.isAuthen
        },
    },
    mounted() {
        if (this.isAuthen()) {
            this.$router.push("/login")
        }
    }
}
</script>

<style lang="scss" >

form{
    font-weight: bold;
    font-family: "Lucida Console", "Courier New", monospace;
    width: 50%;
    margin-left: 25%;
    padding: 50px 20px 30px 20px;
    font-size: 20px;
    color: #242b35;
}
#register-text {
    background: #a4b6d3;
    font-size:100px;
    padding-top: 40px;
    padding-bottom: 40px;
    margin-bottom: 20px;
}
input {
    padding: 10px;
    margin-bottom: 10px;
}
.regisBtn{
  font-family: "Lucida Console", "Courier New", monospace;
  border : none;
  margin-top: 10px ;
  padding: 15px 75px 15px 75px;
  background-color: #a4b6d3;
  font-weight: bold;
  border-radius: 20px;
}
.regisBtn:hover{
  background: #5a779c;
  transition-duration: 0.5s;
}
</style>