<template>
  <div>
    <el-card class="ppt-box">
      <i class="el-icon-close" @click="open"></i>
      <component v-bind:is="currentTabComponent"></component>
      <el-button type="primary" class="button" @click="complete">确认完成</el-button>
    </el-card>
  </div>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'

    import resourceShow from "../../components/startClass/resource-show";
    import grouping from "../../components/startClass/grouping";
    import attendance from "../../components/startClass/attendance";
    import questionAnswer from "../../components/startClass/question-answer";
    import textPlay from "../../components/startClass/text-play";

    export default {
        name: "act-list",
        components: {resourceShow, grouping, attendance, questionAnswer, textPlay},
        props: ['exercise'],
        data() {
            return {
                name: "act-list",
                currentTabComponent: '',
            }
        },
        methods: {
            open() {
                this.$parent.onEmmitCur();
            },
            getCurrentComponent() {
                if (this.exercise.type === '资源播放') {
                    this.currentTabComponent = 'resource-show';
                    console.log(this.currentTabComponent);
                } else if (this.exercise.type === '小组分组') {
                    this.currentTabComponent = 'grouping'
                } else if (this.exercise.type === '人员统计') {
                    this.currentTabComponent = 'attendance'
                } else if (this.exercise.type === '文本播放') {
                    this.currentTabComponent = 'text-play';
                } else if (this.exercise.type === '互动问答') {
                    this.currentTabComponent = 'question-answer';
                }
            },
            complete() {
                utils.request({
                    invoke: api.requestIsOver,
                    params: {
                        exerciseId: this.exercise.exerciseId,
                    },
                    result: fakeData.IS_OVER
                })
                    .then(res => {
                        if (res.data.code === 1)//教师端未关闭此活动
                        {
                            this.$parent.onEmmitCur();
                            this.$parent.addWealth();
                        } else {//教师端关闭此活动
                            this.$parent.onEmmitCur();
                            this.$alert('本活动完成时间已超时', '提示', {
                                confirmButtonText: '确定',
                            });
                        }
                    });
            }
        },
        mounted() {
            this.getCurrentComponent();
        }
    }
</script>

<style scoped>
  .el-icon-close {
    float: right;
  }

  .ppt-box {
    height: 530px;
  }

  .button {
    float: right;
  }
</style>