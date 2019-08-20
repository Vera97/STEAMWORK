<template>
  <div class="box-card">
    <div class="students-ask-box">
      学生提问队列
    </div>
    <div v-for="item in questions" :key="item" class="students-list-box">
      <el-tag type="warning" style="color: black;background-color: #d58512" @click="solvePrompt" ref={{item.stuId}}>
        {{item}}
      </el-tag>
    </div>
  </div>
</template>

<script>
    import store from '../../store'
    import {api, fakeData} from '../../api'
    import utils from '../../utils'

    export default {
        name: "ask-list",
        props: {
            classroomId: Number
        },
        data () {
            return {
                questions: [],
                callback: null
            }
        },
        methods: {
            getQueue () {
                utils.request({
                    invoke: api.requestQueueStu,
                    params: {
                        code: 'get_stuQueue',
                        classroomId: this.classroomId,
                    },
                    result: fakeData.STU_QUESTION
                }).then(function(res) {
                    this.questions = [];
                    this.questions.push(...res.data.questionList);
                    this.callback = setInterval(() => this.getQueue(),5000);
                }.bind(this))
            },
            solvePrompt () {
                this.$confirm('是否解决了该学生问题？确认后该学生学号将从队列中移除。', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                })
                    .then(function () {
                        this.open()
                    }.bind(this))
                    .catch(function () {
                        this.$message.info('已取消')
                    }.bind(this))
            },
            open() {
                utils.request({
                    invoke: api.requestSolveQuestion,
                    params: {
                        code: 'solve_question',
                        stuId: store.state.stuId
                    },
                    result: fakeData.STU_QUESTION
                })//向后端请求操作
                    .then(function(res) {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '成功移除该学生学号'
                            });
                        } else {
                            this.$message({
                                type: 'error',
                                message: '请求失败'
                            });
                        }
                    }.bind(this))//后端请求移除学生学号
            },
            destroyed () {
                clearInterval(this.callback)
            }
        }
    }
</script>

<style scoped>
  .students-ask-box {
    text-align: center;
    background-color: #d58512;
    color: white;
    border-radius: 2px;
    font-size: 18px;
    margin-top: 30px;
    margin-bottom: 10px;
    padding: 5px;
  }

  .students-list-box {
    padding: 0;
    float: left;
    margin: 1px;
    text-align: center;
  }

  p {
    margin-top: 60px;
  }
</style>
