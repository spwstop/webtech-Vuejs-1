<template>
  <div>
     Admin HomePage
     <reward-create-form></reward-create-form>
     <reward-table></reward-table>
      <score-board-table></score-board-table> 
      <score-board-use-point-table></score-board-use-point-table>
  </div>
</template>

<script>
import ScoreBoardTable from '@/components/ScoreBoardTable.vue'
import ScoreBoardUsePointTable from '@/components/ScoreBoardUsePointTable.vue'
import RewardCreateForm from '@/components/RewardCreateForm.vue'
import RewardTable from '@/components/RewardTable.vue'

export default {
    name: 'ScoreBoard',
  components: {
    ScoreBoardTable,
    ScoreBoardUsePointTable,
    RewardCreateForm,
    RewardTable
    
  }
}
</script>



</style>