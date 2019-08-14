<template>
  <div>
    <div class="left-box">
      <el-tag class="wealth" @addWealth="addWealth">财富:{{wealthAll}}</el-tag>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-menu-item index="1" @click="answer">
          <i class="el-icon-phone-outline"></i>
          <span slot="title">常见问题及解答</span>
        </el-menu-item>
        <el-menu-item index="2" @click="open">
          <i class="el-icon-question"></i>
          <span slot="title">寻求老师帮助</span>
        </el-menu-item>
        <el-menu-item index="3" @click="previous">
          <i class="el-icon-caret-left"></i>
          <span slot="title">返回上一页ppt</span>
        </el-menu-item>
        <el-menu-item v-for="item in exerciseList" :key="item.exerciseId" @click="openAct(item)">
          <i class="el-icon-star-off" v-if="!item.state"></i>
          <i class="el-icon-star-on"  v-else></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right-box" v-if="cur">
      <div class="time">
        <p>·10:12(倒计时）</p>
      </div>
      <img
              v-for="(item, index) in slideList"
              class="display"
              :key="index"
              :src="item"
              v-show="index === display"
              alt="there is some error in the slides"
      >
    </div>
    <actList v-else :exercise="exercise" @onEmmitCur="onEmmitCur" class="list"></actList>
  </div>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'
    import store from '../../store'
    import actList from '../stuClass/act-list'

    export default {
        name: "ppt-view",
        components: {actList},
        data() {
            return {
                name: 'stuClass',
                slideList: [],
                isCollapse: true,
                display: 0,
                cur: true,
                wealth: 0,
                callback: null
            }
        },
        computed: {
            number() {
                return store.state.stuClass.number;
            },
            pptId() {
                return store.state.stuClass.pptId;
            },
            exerciseList() {
                return store.state.stuClass.exerciseList;
            },
            exercise(){
                return store.state.stuClass.exercise;
            },
            wealthAll(){
                return store.state.stuClass.wealthAll;
            }
        },
        methods: {
            open() {
                utils.request({//请求学生提问排队人数
                    invoke: api.requestQueueStu,
                    params: {
                        code: 'get_stuQueue',
                        classroomId: this.Id
                    },
                    result: fakeData.STU_QUESTION
                })
                    .then(res => {
                        store.commit('stuClass/ADD_NUMBER', res.data.questionList.length);
                        this.$alert('<el-tag class="students-query-box">你之前还有<p style="text-decoration:underline;display:inline">' + res.data.questionList.length + '</p>位同学在排队\n' +
                            '</el-tag>', '提示', {
                            dangerouslyUseHTMLString: true
                        });
                    });
            },
            getSlides(courseSectionId) {
                let that = this;
                utils.request({
                    invoke: api.requestPPT,
                    params: {
                        courseSectionId: courseSectionId
                    },
                    result: fakeData.GET_SLIDES_RESPONSE
                })
                    .then(res => {
                        if (res.data.code === 1) {
                            that.slideList.push(...res.data.pptImagesList)
                        } else that.$message.error('获取ppt失败');
                        store.commit('stuClass/ADD_pptId', res.data.pptId)
                    })
            },
            previous() {//向前翻页
                this.display = this.display === 0 ? 0 : this.display - 1
            },
            getPage() {//向后端请求教师端当前页数
                utils.request({
                    invoke: api.requestPushPPTpage,
                    params: {
                        classroomId: this.classroomId,
                        stuId: this.stuId
                    },
                    result: fakeData.PUSH_PPT
                })
                    .then(res => {
                        if (res.data.pptPage !== this.display) {
                            this.display = res.data.pptPage;
                        }
                    })
            },
            openAct(item) {//点击活动按钮
                utils.request({//向后端请求当前活动是否被开启
                    invoke: api.requestIsStartActivity,
                    params: {
                        classroomId:this.classroomId,
                        exerciseId: item.exerciseId,
                    },
                    result: fakeData.IS_START
                })
                    .then(res => {
                        if (res.data.code === 1) {
                            this.cur = false;//打开活动组件
                            store.commit('stuClass/ADD_CURRENT_EXERCISE',item);//传递当前点击的活动内容
                        } else {
                            this.$alert('该活动尚未开启', '提示', {
                                confirmButtonText: '确定',
                            });
                        }
                    });
            },
            onEmmitCur() {//接受从act-list关闭按钮传值，以关闭活动组件
                this.cur = true;
            },
            getAct() {//向后端请求活动列表
                utils.request({
                    invoke: api.requestExercise,
                    params: {
                        pptId: store.state.stuClass.pptId,
                        progress: this.display
                    },
                    result: fakeData.STU_EXERCISE_LIST
                })
                    .then(res => {
                        store.commit('stuClass/ADD_EXERCISE', res.data.exerciseList);
                    })
            },
            addWealth() {//修改财富值
                utils.request({
                    invoke: api.requestEditCourseWealth ,
                    params: {
                        stuId: this.stuId,
                        courseSectionId: this.courseSectionId,
                        wealthNum:10
                    },
                    result: fakeData.EDIT_WEALTH
                })
                    .then(res => {
                        if(res.data.code===1){
                            store.commit('stuClass/ADD_WEALTH',res.data.wealthAll);
                        }
                    })
            },
            answer() {
                utils.request({
                    invoke: api.requestClassStuQuestion,
                    params: {
                        stuId: this.stuId,
                        courseId: this.courseId,
                        courseSectionId: '',
                    },
                    result: fakeData.STU_QUESTIONS,
                }).then(res => {
                    let template = '';
                    for (let i of res.data.question) {
                        let tmp = `<div>问题：${i.question}<br>解答：${i.answer}<br></div>`;
                        template += tmp;
                    }
                    this.$alert(template, '常见问题及解答', {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: '关闭',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${action}`
                            });
                        }
                    });
                })
            },
            getWealth(){//获取财富值
                utils.request({
                    invoke: api.requestGetCourseWealth ,
                    params: {
                        stuId: this.stuId,
                        courseSectionId: this.courseSectionId
                    },
                    result: fakeData.GET_WEALTH
                })
                    .then(res => {
                        if(res.data.code===1){
                            store.commit('stuClass/ADD_WEALTH',res.data.wealthAll);
                        }
                    })
            }
        },
        mounted() {
            this.getSlides(0);//获取并显示ppt
            this.getAct();//向后端请求活动列表
            this.getWealth();//获取财富值
            this.callback = setInterval(this.getPage, 5000);//定时向后端请求教师端当前ppt页数
        },
        destroyed() {
            clearInterval(this.callback);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .time {
    margin-top: 10px;
    position: absolute;
    display: inline-block;
    z-index: 1;
    margin-left: 27%;
  }

  .left-box {
    float: left;
    width: 10%;
  }

  .right-box {
    width: 71%;
    float: right;
    margin-right: 13%;
  }

  .display {
    width: 100%;
  }

  .list {
    float: right;
    width: 71%;
    margin-right: 13%;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .wealth {
    width: 63px;
    text-align: center;
    margin-bottom: 10px;
  }
</style>
