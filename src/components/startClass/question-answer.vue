<template>
  <div>
    <p>问题：{{question.contentQuestion}}</p>
    <div v-for="(item,index) in question.contentAnswerList" :key="index"><p>{{item.choice}}:{{item.choiceContent}}&emsp;{{item.select}}</p>
    </div>
    <div>答案：<span v-for="item in question.answer" :key="item">{{item}}</span></div>
    <el-button type="primary" @click="stop" v-if="isStop">停止作答，查看结果</el-button>
    <div v-else>
         <p>答对：{{right}}</p>
         <p>答错：{{wrong}}</p>
         <p>未完成：{{unComplete}}</p>
    </div>
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
        data(){
            return{
                isStop:true,
                right:15,
                wrong:12,
                unComplete:10
            }
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
        },
        methods:{
            stop(){
                this.isStop=true;
                for(let i=0;i<this.question.contentAnswerList.length;i++){
                    this.$set(this.question.contentAnswerList[i],'select',15);
                }
            }
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
