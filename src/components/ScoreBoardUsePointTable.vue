<template>
  <div>
      place for scoreboard use point table
      <table>
        <thead>
          <tr>
            <th>#Rank</th>
            <th>Username</th>
            <th>Use Point</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
              <td>{{ index +1 }}</td>

              <td>{{ user.username }}</td>
              <td>{{ user.use_point }}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>

import HistoryUseScore from '@/store/HistoryUseScore'
export default {
  data(){
    return {
      users: [],

      form: {
        username: "",
        use_point: "",
      },
    }
  },

  created(){
    this.fetchUser()
  
  },
  methods: {
    async fetchUser(){
      await HistoryUseScore.dispatch("fetchUser")
      this.users = HistoryUseScore.getters.users
    },
  }

}
</script>

<style>

</style>