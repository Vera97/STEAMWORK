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
          <span slot="title">{{item.type}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right-box" v-if="cur">
      <div class="time">
        <p>·10:12（倒计时）</p>
      </div>
      <img
              v-for="(item, index) in pptImagesList"
              class="display"
              :key="index"
              :src="item"
              v-show="index === display"
              alt="there is some error in the slides"
      >
    </div>
    <actList ref="actList" v-show="!cur" @onEmmitCur="onEmmitCur" class="list"></actList>
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
        props: {
            pptId: Number,
            pptImagesList: Array
        },
        data() {
            return {
                isCollapse: true,
                display: 0,
                cur: true,
                callback: null,
            }
        },
        computed: {
            number() {
                return store.state.stuClass.number;
            },
            exerciseList() {
                return store.state.stuClass.exerciseList;
            },
            wealthAll() {
                return store.state.stuClass.wealthAll;
            }
        },
        methods: {
            open() {
                utils.request({//请求学生提问排队人数
                    invoke: api.requestQueueStu,
                    params: {
                        code: 'get_stuQueue',
                        classroomId: store.state.classroomId
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
            previous() {//向前翻页
                this.display = this.display === 0 ? 0 : this.display - 1;
                store.commit('STU_PPT_PAGE', {currentPage: this.display})
            },
            getPage() {//向后端请求教师端当前页数
                utils.request({
                    invoke: api.requestGetPPTPage,
                    params: {
                        classroomId: store.state.classroomId,
                        stuId: store.state.stuId
                    },
                    result: fakeData.GET_PPT_PAGE
                })
                    .then(function(res) {
                        let progress=this.display/res.data.pptPage;
                        console.log(progress);
                        utils.request({
                            invoke: api.requestPushProgressStu,
                            params: {
                                code:'stu_push_progress',
                                stuId: store.state.stuId,
                                progress:progress
                            },
                            result: fakeData.PUSH_PROGRESS
                        }).then(res=>{
                            if(res.data.code===1){
                                alert("上传进度成功！");
                            }
                        });
                        if (res.data.pptPage !== this.display) {
                            this.display = res.data.pptPage;
                            store.commit('STU_PPT_PAGE', {currentPage: this.display})
                        }
                    }.bind(this))
            },
            openAct(item) {//点击活动按钮
                if (item.state === 1) {
                    console.log(item);
                    this.$message.success('此活动已完成');
                    return
                }
                this.requestActivityStatus(item)
                    .then(function(data) {
                        if (data.code === 1) {
                            this.cur = false;
                            this.$refs.actList.load({
                                exerciseType: item.type,
                                exerciseId: item.exerciseId,
                                ...data
                            });
                            store.commit('stuClass/ADD_CURRENT_EXERCISE', {
                                exerciseType: item.type,
                                exerciseId: item.exerciseId,
                                ...data
                            });//传递当前点击的活动内容
                        } else {
                            this.$alert('该活动尚未开启', '提示', {
                                confirmButtonText: '确定',
                            });
                        }
                    }.bind(this));
            },
            async requestActivityStatus (item) {
                let requestMethod;
                switch (item.type) {
                case '文本播放':
                    requestMethod = api.requestGetCourseExerciseText;
                    break;
                case '资源播放':
                    requestMethod = api.requestGetCourseExerciseMedia;
                    break;
                case '互动问答':
                    requestMethod = api.requestGetCourseExerciseQuestion;
                    break;
                default:
                    requestMethod = api.requestCourseExerciseElse;
                    break;
                }
                return utils.request({//向后端请求当前活动是否被开启
                    invoke: requestMethod,
                    params: {
                        classroomId: store.state.classroomId,
                        exerciseId: item.exerciseId
                    },
                    result: fakeData.IS_START
                })
                    .then(function (res) {
                        console.log(`not null: ${item.title}`);
                        return Promise.resolve({
                            ...res.data,
                            exerciseId: item.exerciseId,
                            type: item.type,
                            title: item.title
                        })
                    })
            },
            onEmmitCur() {//接受从act-list关闭按钮传值，以关闭活动组件
                this.cur = true;
            },
            async getAct() {//向后端请求活动列表
                let status = await utils.request({
                    invoke: api.requestExerciseState,
                    params: {
                        stuId: store.state.stuId,
                        courseSectionId: store.state.courseSectionId
                    },
                    result: fakeData.GET_EXERCISE_STATE_COMPLETED
                })
                    .then(function (res) {
                        return Promise.resolve(res.data.exerciseStateList)
                    }.bind(this));
                let list = await utils.request({
                    invoke: api.requestExercise,
                    params: {
                        pptId: this.pptId,
                        page: this.display
                    },
                    result: fakeData.STU_EXERCISE_LIST
                })
                    .then(function (res) {
                        return Promise.resolve(res.data.exerciseList)
                    });
                list = list.filter(item => {
                    return item.type === '文本播放' ||
                        item.type === '互动问答' ||
                        item.type === '资源播放' ||
                        item.type === '设计方案' ||
                        item.type === '作品展示';
                });
                for (let i = 0; i < list.length; i++) {
                    for (let j of status) {
                        if (j.exerciseId === list[i].exerciseId) {
                            list[i].state = j.state ? 1 : 0
                        }
                    }
                }
                store.commit('stuClass/ADD_EXERCISE', list);
            },
            addWealth() {//修改财富值
                utils.request({
                    invoke: api.requestEditCourseWealth ,
                    params: {
                        stuId: store.state.stuId,
                        courseSectionId: store.state.courseSectionId,
                        wealthNum: 10
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
                        pptId: this.pptId,
                        pptPage: this.display
                    },
                    result: fakeData.PPT_QUESTION_RESPONSE,
                }).then(res => {
                    this.$alert(res.data.content, '常见问题及解答', {
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
                    invoke: api.requestGetCourseWealth,
                    params: {
                        stuId: store.state.stuId,
                        courseSectionId: store.state.courseSectionId
                    },
                    result: fakeData.GET_WEALTH
                })
                    .then(res => {
                        if(res.data.code === 1) {
                            store.commit('stuClass/ADD_WEALTH',res.data.wealthAll);
                        } else {
                            console.log(res.data)
                        }
                    })
            }
        },
        mounted() {
            this.getAct();//向后端请求活动列表
            this.getWealth();//获取财富值
            //this.callback = setInterval(this.getPage, 10000);//定时向后端请求教师端当前ppt页数
        },
        destroyed() {
            clearInterval(this.callback);
        }
    }
</script>

<style lang="scss" scoped>
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
