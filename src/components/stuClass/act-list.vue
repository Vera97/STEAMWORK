<template>
  <div>
    <el-card class="ppt-box">
      <i class="el-icon-close" @click="open"></i>
      <component
              ref="exerciseComp"
              :complete="complete"
              v-bind:is="currentTabComponent"
              :exercise-body="exerciseBody"
      ></component>
      <el-button type="primary" class="button" @click="complete" v-if="isNeed">确认完成</el-button>
    </el-card>
  </div>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'
    import store from '../../store'
    import { mapState } from 'vuex'

    import stuResourceShow from "../../components/stuClass/stu-resource-show"
    import stuDesign from "../../components/stuClass/stu-design"
    import stuTextPlay from "../../components/stuClass/stu-text-play"
    import answer from './answer'
    import display from './display'

    export default {
        name: "act-list",
        components: {stuResourceShow, stuDesign, stuTextPlay, answer, display},
        data() {
            return {
                currentTabComponent: '',
                isNeed: true,
                exerciseBody: null
            }
        },
        computed: {
            ...mapState({
                currentExercise: state => state.stuClass.currentExercise
            })
        },
        methods: {
            load (exerciseBody) {
                this.exerciseBody = exerciseBody;
                switch (exerciseBody.exerciseType) {
                case '文本播放':
                    this.currentTabComponent = 'stu-text-play';
                    break;
                case '资源播放':
                    this.currentTabComponent = 'stu-resource-show';
                    break;
                case '互动问答':
                    this.currentTabComponent = 'answer';
                    break;
                case '设计方案':
                    this.currentTabComponent = 'stu-design';
                    break;
                case '作品展示':
                    this.currentTabComponent = 'display';
                    break;
                }
            },
            open() {
                this.$parent.onEmmitCur();
            },
            complete() {
                if (this.$refs.exerciseComp.complete) {
                    this.$refs.exerciseComp.complete()
                }
                this.$parent.requestActivityStatus(this.exerciseBody)
                    .then(function (data) {
                        if (data.code === 1)//教师端未关闭此活动
                        {
                            utils.request({
                                invoke: api.requireConfirmTask,
                                params: {
                                    stuId: store.state.stuId,
                                    exerciseId: this.exerciseBody.exerciseId,
                                    courseSectionId: store.state.courseSectionId
                                },
                                result: fakeData.SINGLE_NUMBER_CODE
                            })
                                .then(function (res) {
                                    if (res.data.code === 1) {
                                        this.$parent.onEmmitCur();
                                        this.$parent.addWealth();
                                    } else {
                                        this.$message.error('请求完成失败')
                                    }
                                }.bind(this))
                        } else {//教师端关闭此活动
                            this.$parent.onEmmitCur();
                            this.$alert('本活动完成时间已超时', '提示', {
                                confirmButtonText: '确定',
                            });
                        }
                    }.bind(this));

                //向后端请求更改活动状态，
                for(let i = 0;i < store.state.stuClass.exerciseList.length; i++){
                    if(store.state.stuClass.exerciseList[i].exerciseId === store.state.stuClass.currentExercise.exerciseId){
                        store.state.stuClass.exerciseList[i].state=1;
                    }
                }
            }
        }
    }
</script>

<style scoped>
  .el-icon-close {
    float: right;
    cursor: pointer;
  }

  .ppt-box {
    width:100%;
    height:90%;
    min-height: 600px;
  }
  .button {
    float: right;
    margin-top:10px;
  }
</style>
