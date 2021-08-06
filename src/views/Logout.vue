<template>
    
</template>

<script>

import AuthUser from '@/store/AuthUser'
export default {
    mounted(){
        AuthUser.dispatch('logout')
        this.$router.push('/login')
    }
}
</script>

<style>

</style>