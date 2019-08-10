<template>
  <el-card
          class="box-card"
  >
    <p><strong>互动问答</strong></p>
    <el-input
            type="textarea"
            label="问题："
            :rows="2"
            placeholder="请输入您要编辑的问题"
            v-model="contentQuestion">
    </el-input>
    <div v-for="(item, index) in contentAnswerList" :key="index">
      <span class="choice-tag">{{ contentAnswerList[index].choice }}</span>
      <el-input
              placeholder="输入选项内容"
              v-model="contentAnswerList[index].choiceContent"
              class="option-box"
              clearable>
      </el-input>
    </div>
    <el-button type="plain" size="medium" class="add-option" @click="addItems"><i class="el-icon-circle-plus-outline"></i>增加选项</el-button>
    <div class="edit-pane">
      <el-button type="primary" @click="saveActivity">保存</el-button>
      <el-button type="danger" @click="deleteActivity">删除</el-button>
    </div>
  </el-card>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'
    const answerChioce=['E','F','G','H','I','J','K','L','M','N','o','P','Q','R','S','T'];
    let choiceIndex=0;

    export default {
        name: "reactive-question",
        props: {
            exerciseId: Number,
            pptId: Number,
            pptPage: Number
        },
        data () {
            return {
                contentQuestion: '',
                contentAnswerList: [],

            }
        },
        methods: {
            saveActivity() {
                alert('保存')
            },
            deleteActivity() {
                alert('删除')
            },
            addItems(){
                let that = this;
                let obj = {choice: answerChioce[choiceIndex], choiceContent: 'sss'};
                choiceIndex += 1;
                that.contentAnswerList.push(obj);
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
                .then((function (res) {
                    this.contentQuestion = res.data.contentQuestion;
                    for(let i of res.data.contentAnswerList) {
                        this.contentAnswerList.push(i)
                    }
                }).bind(this))
        }
    }
</script>

<style scoped>
  .box-card {
    position: relative;
  }

  .option-box {
    width: 70%;
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
</style>
