<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <label  for="username">Username</label>
        <input v-model="form.username" type="text" placeholder="Username" autocomplete="off">
      </div>

      <div>
        <label for="password">Password</label>
        <input v-model="form.password" type="password" autocomplete="off">
      </div>

      <div>
        <button>Login</button>
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
            this.$router.push('/scoreboard')
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