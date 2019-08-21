<template>
  <el-card class="box-card">
    <p><strong>互动问答</strong></p>
    <el-input
            type="textarea"
            label="问题："
            :rows="2"
            placeholder="请输入您要编辑的问题"
            v-model="contentQuestion">
    </el-input>
      <div v-for="(item, index) in contentAnswerList" :key="index">
        <el-checkbox class="choice-tag" :label="answerChoices[index]" v-model="answer" size="medium"></el-checkbox>
        <el-input
                placeholder="输入选项内容"
                v-model="contentAnswerList[index].choiceContent"
                class="option-box"
                clearable>
        </el-input>
        <i class="el-icon-delete" @click="deleteChoice(index)"></i>
      </div>
    <el-button type="plain" size="medium" class="add-option" @click="addItems"><i class="el-icon-circle-plus-outline"></i>增加选项</el-button>
    <div class="edit-pane">
      <el-button type="primary" @click="saveActivity">保存</el-button>
    </div>
  </el-card>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'

    export default {
        name: "reactive-question",
        props: {
            exerciseId: Number,
        },
        data () {
            return {
                answerChoices: ['A','B','C','D','E','F','G','H','I','J','K','O','P','Q','R','S'],
                contentQuestion: '',
                contentAnswerList: [],
                answer: []
            }
        },
        methods: {
            saveActivity() {
                utils.request({
                    invoke: api.requestEditExerciseQuestion,
                    params: {
                        exerciseId: this.exerciseId,
                        contentQuestion: this.contentQuestion,
                        contentAnswerList: this.contentAnswerList,
                        answerList: this.answer
                    },
                    result: fakeData.SINGLE_NUMBER_CODE
                })
                    .then(function (res) {
                        if (res.data.code === 1) this.$message.success('保存成功');
                        else this.$message.error('保存失败')
                    }.bind(this))
            },
            addItems(){
                this.contentAnswerList.push({
                    choice: this.answerChoices[this.contentAnswerList.length],
                    choiceContent: ''
                })
            },
            deleteChoice(index){
                this.$confirm('此操作将删除该选项, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.contentAnswerList.splice(index,1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            }
        },
        created() {
            utils.request({
                invoke: api.requestExerciseQuestion,
                params: {
                    exerciseId: this.exerciseId
                },
                result: fakeData.EXERCISE_QUESTION
            })
                .then(function (res) {
                    this.contentQuestion = res.data.contentQuestion;
                    for(let i of res.data.contentAnswerList) {
                        this.contentAnswerList.push(i)
                    }
                    if (res.data.answer.length > 0) this.answer.push(...res.data.answer)
                }.bind(this))
        }
    }
</script>

<style scoped>
  .box-card {
    position: relative;
  }

  .option-box {
    width: 60%;
    margin: .5em 0;
  }

  .in{
    width: 20%;
    margin-top: 1%;
    margin-right: 1%;
  }

  .add-option {
    display: block;
    position: relative;
    width: 8em;
    text-align: center;
    margin: 1em auto;
  }

  .edit-pane {
    margin-top: 1em;
  }

  .choice-tag {
    display: inline-block;
    width: 3em;
    text-align: center;
  }
  .el-icon-delete{
    margin-left:1em;
  }
</style>
