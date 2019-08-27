<template>
  <div>
    <div class="left-box">
      <el-tag class="wealth" @addWealth="addWealth">财富:{{wealthAllStu}}</el-tag>
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
        <el-menu-item index="3" @click="next">
          <i class="el-icon-caret-right"></i>
          <span slot="title">开始下一页ppt</span>
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
    <actListResource v-else @onEmmitCur="onEmmitCur" class="list"></actListResource>
  </div>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'
    import store from '../../store'
    import actListResource from '../resource/act-list-resource'

    import { mapState } from 'vuex'

    export default {
        name: "ppt-center",
        components: {actListResource},
        data() {
            return {
                slideList: [],
                isCollapse: true,
                display: 0,
                cur: true,
                callback: null
            }
        },
        computed: {
            ...mapState({
                courseSectionId: state => state.courseSectionId,
                number: state => state.resource.number,
                pptId: state => state.resource.pptId,
                exerciseList: state => state.resource.exerciseList,
                wealthAllStu: state => state.resource.wealthAllStu
            })
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
                        store.commit('resource/SHOW_NUMBER', res.data.questionList.length);
                        this.$alert('<el-tag class="students-query-box">你之前还有<p style="text-decoration:underline;display:inline">' + res.data.questionList.length + '</p>位同学在排队\n' +
                            '</el-tag>', '提示', {
                            dangerouslyUseHTMLString: true
                        });
                    });
            },
            getSlides(courseSectionId) {
                utils.request({
                    invoke: api.requestPPT,               // TODO need a way to obtain the ppt in the resource page.
                    params: {
                        courseSectionId: courseSectionId
                    },
                    result: fakeData.GET_SLIDES_RESPONSE
                })
                    .then(function(res) {
                        if (res.data.code === 1) {
                            this.slideList.push(...res.data.pptImagesList);
                            store.commit('resource/SHOW_PPT', res.data.pptId);
                            this.getAct()
                        } else this.$message.error('获取ppt失败');
                    }.bind(this))
            },
            previous() {//向前翻页
                this.display = this.display === 0 ? 0 : this.display - 1
            },
            next() {//向后翻页
                this.display = this.display === this.slideList.length - 1 ? this.display : this.display + 1;
            },
            openAct(item) {//点击活动按钮
                if(item.state===0){
                    this.cur = false;//打开活动组件
                    store.commit('resource/ADD_CURRENT_EXERCISE', item);//传递当前点击的活动内容
                }
                else{
                    this.$alert('该活动已完成', '提示', {
                        confirmButtonText: '确定',
                    });
                }
            },
            onEmmitCur() {//接受从act-list关闭按钮传值，以关闭活动组件
                this.cur = true;
            },
            getAct() {
                utils.request({//向后端请求活动列表及状态
                    invoke: api.requestExercise,
                    params: {
                        pptId: this.pptId,
                        page: this.display
                    },
                    result: fakeData.GET_STATE_EXERCISE
                })
                    .then(res => {//将后端请求回来的活动状态与store进行对接
                        store.commit('resource/SHOW_EXERCISE', res.data.exerciseStateList);
                        console.log(store.state.resource.exerciseList);
                    })
            },
            addWealth() {//修改财富值
                utils.request({
                    invoke: api.requestEditCourseWealth,
                    params: {
                        stuId: this.stuId,
                        courseSectionId: this.courseSectionId,
                        wealthNum: 10
                    },
                    result: fakeData.EDIT_WEALTH
                })
                    .then(res => {
                        if (res.data.code === 1) {
                            store.commit('resource/SHOW_WEALTH', res.data.wealthAll);
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
                    result: fakeData.STU_QUESTIONS,         // this fakeData may not be correct, check it.
                }).then(function(res) {
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
                }.bind(this))
            },
            getWealth() {//获取财富值
                utils.request({
                    invoke: api.requestGetCourseWealth,
                    params: {
                        stuId: store.state.stuId,
                        courseSectionId: this.courseSectionId
                    },
                    result: fakeData.GET_WEALTH
                })
                    .then(res => {
                        if (res.data.code === 1) {
                            store.commit('resource/SHOW_WEALTH', res.data.wealthAll);
                        }
                    })
            }
        },
        mounted() {
            this.getSlides(this.courseSectionId);//获取并显示ppt
            this.getWealth();//获取财富值
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
