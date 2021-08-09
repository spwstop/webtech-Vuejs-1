<template>
  <div>
    <h1>Admin Management</h1>
     <reward-create-form></reward-create-form>
     <reward-table></reward-table>
      <admin-point-table></admin-point-table>
      <admin-use-point-table></admin-use-point-table>
  </div>
</template>

<script>
import ScoreBoardTable from '@/components/ScoreBoardTable.vue'
import ScoreBoardUsePointTable from '@/components/ScoreBoardUsePointTable.vue'
import RewardCreateForm from '@/components/RewardCreateForm.vue'
import RewardTable from '@/components/RewardTable.vue'
import AdminPointTable from '@/components/AdminPointTable.vue'
import AdminUsePointTable from '../components/AdminUsePointTable.vue'

export default {
    name: 'ScoreBoard',
  components: {
    ScoreBoardTable,
    ScoreBoardUsePointTable,
    RewardCreateForm,
    RewardTable,
    AdminPointTable,
    AdminUsePointTable
    

    
  }
}
</script>

<style lang="scss">
h1{
  font-size: 70px;
  color: black;
  margin-top: 10px;
  margin-bottom: 100px;
}
.reward {
  font-weight: bold;
  font-size: 20px;
  color: black;
}
.rewardBtn{
  font-family: "Lucida Console", "Courier New", monospace;
  border : none;
  margin-top: 10px ;
  padding: 15px 300px 15px 300px;
  background-color: #a4b6d3;
  font-weight: bold;
  border-radius: 20px;
  margin-bottom: 50px;
  font-size: 20px;
}
.rewardBtn:hover{
  background: #5a779c;
  transition-duration: 0.5s;
}
.rewardHead{
    font-family: "Lucida Console", "Courier New", monospace;
    padding: 25px 100px 25px 100px;
    text-align: center;
    font-size: 20px;
    background-color: #a4b6d3;
}
.scoreHead{
    font-family: "Lucida Console", "Courier New", monospace;
    padding: 25px 100px 25px 100px;
    text-align: center;
    font-size: 20px;
    background-color: #a4b6d3;
}
.rwTb{
  color: black;
  width: 90%;
  margin-left: auto;
  margin-bottom: 100px;
}
.scsTd{
  padding: 20px;
}
.scTb{
  color: black;
  width: 80%;
  margin-left: 10%;
  margin-bottom: 100px;
}
.userTb{
  color: black;
  width: 90%;
  margin-left: auto;
  margin-top: 100px;
  margin-bottom: 50%;
}
.delBtn {
    float: none;
    font-weight: bold;
    padding: 15px;
    border: none;
    background: #f9fbff;
    border: 5px solid red;

}
.editBtn:hover{
    background: rgb(79, 255, 73);
    transition-duration: 0.4s;
}
.editBtn {
    float: none;
    font-weight: bold;
    padding: 15px;
    border: none;
    background: #f9fbff;
    border: 5px solid rgb(79, 255, 73);

}
.delBtn:hover{
    background: red;
    transition-duration: 0.4s;
}

.redBtn:hover{
    background: rgb(200, 231, 21);
    transition-duration: 0.4s;
}
.redBtn {
    float: none;
    font-weight: bold;
    padding: 15px;
    border: none;
    background: #f9fbff;
    border: 5px solid rgb(200, 231, 21);

}
.endDate{
  margin-right: 300px;
}


.scrBtn {
    float: none;
    font-weight: bold;
    padding: 15px;
    border: none;
    background: #f9fbff;
    border: 5px solid #a4b6d3;
    margin-left: 20px;
    
}
.scrBtn:hover{
    background: #a4b6d3;
    transition-duration: 0.5s;
}


</style>

