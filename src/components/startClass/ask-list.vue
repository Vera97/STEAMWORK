<template>
  <div class="box-card">
    <div class="students-ask-box">
      学生提问队列
    </div>
    <div v-for="item in questions" :key="item.stuId" class="students-list-box">
      <el-tag type="warning" style="color: black;background-color: #d58512" @click="open" ref={{item.stuId}}>
        {{item.stuId}}
      </el-tag>
    </div>
    <div>
      <p>顺序显示提问同学的ID，学生端确认解决问题后将从队列中移除。</p>
    </div>
  </div>
</template>

<script>
    import store from '../../store'
    import {api, fakeData} from '../../api'
    import utils from '../../utils'
    // import {request} from "../../utils/request";

    export default {
        name: "askList",
        props: {
            id: String,
            questions: Array,
        },
        data(){
            return {
                studentID:'学生ID',
            }
        },
        created(){
            let that = this;
            utils.request({
                invoke: api.requestQueueStu,
                params: {
                    code: 'get_stuQueue',
                    classroomId: this.id,
                },
                result: fakeData.STU_QUESTION
            }).then(res => {
                that.questions = [];
                that.questions.push(...res.data.questionList);
                setInterval(that.updateData,5000);
            })

        },
        methods: {
            //封装好的向后端请求读取队列的函数
            updateData(){
                let that = this;
                // alert("nihao");
                utils.request({
                    invoke:api.requestQueueStu,
                    params: {
                        code: 'get_stuQueue',
                        classroomId: this.id,
                    },
                    result: fakeData.STU_QUESTION
                }).then(res => {
                    that.questions = [];
                    that.questions.push(...res.data.questionList);
                })
            },
            open() {
                this.$confirm('是否解决了该学生问题？确认后该学生学号将从队列中移除。', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    utils.request({
                        invoke: api.requestSolveQuestion,//
                        params: {
                            code: 'solve_question',
                            stuId: store.state.userName
                        },
                        result: fakeData.STU_QUESTION
                    })//向后端请求操作
                        .then(res => {
                            if(res.data.code == '1'){
                                let that = this;
                                setInterval(that.updateData,5000);//定时向后端请求读取学生队列，五秒一次
                                this.$message({
                                    type: 'success',
                                    message: '成功移除该学生学号'
                                });

                            }
                            else{

                                this.$message({
                                    type: 'error',
                                    message: '请求失败'
                                });
                            }
                        })//后端请求移除学生学号
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                })
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

  /*.box-card{*/
  /*    width: 20%;*/
  /*}*/
  .students-list-box {
    padding: 0px;
    float: left;
    margin: 1px;
    text-align: center;
  }

  p {
    margin-top: 60px;
  }
</style>
