<template>
  <div>
    <p>问题：{{question.contentQuestion}}</p>
    <div v-for="(item,index) in question.contentAnswerList" :key="index"><p>{{item.choice}}:{{item.choiceContent}}</p>
    </div>
    <div>答案：<span v-for="item in question.answer" :key="item">{{item}}</span></div>
  </div>
</template>

<script>
    import store from '../../store'
    import {api, fakeData} from '../../api'
    import utils from '../../utils'

    export default {
        name: "question-answer",
        props: {
            exercise: Object
        },
        computed:{
            question(){
                return store.state.startClass.exerciseQuestion
            },
        },
        created(){
            utils.request({
                invoke: api.requestExerciseQuestion,
                params: {
                    exerciseId: this.exercise.exerciseId
                },
                result: fakeData.EXERCISE_QUESTION
            })
                .then(res => {
                    store.commit('startClass/QUESTION_RESOURCE', res.data);
                })
        }
    }
</script>

<style scoped>
  .video {
    margin-top: 10px;
    width: 100%;
    height: 400px;
  }
</style>
