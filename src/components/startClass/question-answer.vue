<template>
    <div>
        <p>问题：{{question.contentQuestion}}</p>
        <div v-for="item in question.contentAnswerList" :key="item.choice"><p>{{item.choice}}:{{item.choiceContent}}</p></div>
        <div>答案：<span v-for="item in question.answer" :key="item">{{item}}</span></div>

    </div>
</template>

<script>
  import store from '../../store'
  import {api, fakeData} from '../../api'
  import utils from '../../utils'
  export default {
    name: "question-answer",
    props:['exerciseId'],
    computed:{
      question(){
        return store.state.startClass.exerciseQuestion
      },
    },
    created(){
      // let that = this;
      utils.request({
        invoke: api.requestExerciseQuestion,
        params: {
          exerciseId:this.exerciseId
        },
        result: fakeData.EXERCISE_QUESTION
      })
        .then(res => {
          console.log(res.data.contentQuestion);
          alert(res.data.contentQuestion);
          store.commit('startClass/QUESTION_RESOURCE', res.data);
          // that.text = [];
          // that.text.push(...res.data)
        })
    }
  }
</script>

<style scoped>
    .video{
        margin-top:10px;
        width:100%;
        height:400px;
    }
</style>