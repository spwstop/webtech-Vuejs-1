<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="register">
            <div><label for="username">Username</label></div>
            <div><input v-model="input.username" type="text" autocomplete="off" placeholder="Username"></div>
            <div><label for="email">Email</label></div>
            <div><input v-model="input.email" type="text" autocomplete="off" placeholder="Email"></div>
            <div><label for="password">Password</label></div>
            <div><input v-model="input.password" type="password" placeholder="Password"></div>

            <!-- TODO #2 : ทำ Confirm Password -->
            <!-- <div><label for="password_confirmation">Confirm Password</label></div>
            <div><input v-model="input.password_confirmation" type="password" placeholder="Confirm Password"></div> -->

            <div><button type="submit">Register</button></div>
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
                // password_confirmation: ''
            }
        } 
    },
    methods: {
        async register() {
            let res = await AuthUser.dispatch('register', this.input)
            if (res.success) {
                this.$swal("Register Success", `Welcome ${res.user.username}`, "success")
                this.$router.push("/user")
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
