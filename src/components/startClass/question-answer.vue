<template>
  <div>
    <p>问题：{{question.contentQuestion}}</p>
    <div v-for="(item,index) in question.contentAnswerList" :key="index">
      <p>{{item.choice}}:{{item.choiceContent}}&emsp;{{item.select}}</p>
    </div>
    <div>答案：<span v-for="item in question.answer" :key="item">{{item}}</span></div>
    <el-button type="primary" @click="stop" v-if="isStop" class="button-box">停止学生作答，查看结果</el-button>
    <p v-else>学生作答已结束</p>
  </div>
</template>

<script>
    import store from '../../store'
    import {api, fakeData} from '../../api'
    import utils from '../../utils'

    export default {
        name: "question-answer",
        props: {
            exercise: Object,
            classroomId: Number,
            courseSectionId: Number
        },
        data () {
            return {
                show: false,
                isStop: true,
                right: 0,
                wrong: 0,
                unComplete: 0
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
            async stop () {
                await utils.request({
                    invoke: api.requestEndActivity,
                    params: {
                        exerciseId: this.exercise.exerciseId
                    },
                    result: fakeData.SINGLE_NUMBER_CODE
                });

                utils.request({
                    invoke: api.requestReactiveQuestionResult,
                    params: {
                        classroomId: this.classroomId,
                        courseSectionId: this.courseSectionId,
                        exerciseId: this.exercise.exerciseId
                    },
                    result: fakeData.REACTIVE_QUESTION_ANSWER
                })
                    .then(function (res) {
                        this.isStop = false;

                        this.right = res.data.trueNum;
                        this.wrong = res.data.falseNum;
                        this.unComplete = res.data.notNum;

                        for (let i = 0; i < this.question.contentAnswerList.length; i++) {
                            this.$set(this.question.contentAnswerList[i], 'select', 15);
                        }

                        let template = '答对人数:' + this.right + '\n答错人数:' + this.wrong + '\n未完成人数:' + this.unComplete;
                        this.$alert(template, '作答结果', {
                            confirmButtonText: '确定'
                        });
                    }.bind(this))
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
  .button-box{
    margin-top: 5%;
    width: 50%;
  }
</style>
