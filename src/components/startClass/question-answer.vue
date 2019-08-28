<template>
  <div>
    <p>问题：{{question.contentQuestion}}</p>
    <div v-for="(item,index) in question.contentAnswerList" :key="index"><p>{{item.choice}}:{{item.choiceContent}}&emsp;{{item.select}}</p>
    </div>
    <div>答案：<span v-for="item in question.answer" :key="item">{{item}}</span></div>
    <el-button type="primary" @click="stop" v-if="isStop" class="button-box">停止学生作答，查看结果</el-button>
    <el-button type="primary" @click="look" v-if="!isStop" class="button-box">学生作答结束，查看结果</el-button>
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
                show:false,
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
                this.isStop=false;
                for(let i=0;i<this.question.contentAnswerList.length;i++){
                    this.$set(this.question.contentAnswerList[i],'select',15);
                }
                let template = '答对人数:' + this.right +'\n答错人数:' + this.wrong + '\n未完成人数:' + this.unComplete;
                this.$alert(template, '作答结果', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                });
            },
            look(){
                let template = '答对人数:' + this.right +'\n答错人数:' + this.wrong + '\n未完成人数:' + this.unComplete;
                this.$alert(template, '活动结束,作答结果为:', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                });
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
