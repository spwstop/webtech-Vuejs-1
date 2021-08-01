<template>
  <div class="home">
    <HelloWorld msg="WEBTECH MIDTERM PROJECT"/>
    <h1>THIS IS LOGIN PAGE</h1>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
h1{
  color: lightgreen;
}
  
</style>
