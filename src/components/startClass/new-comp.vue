<template>
  <div>
    <el-card class="ppt-box">
      <i class="close el-icon-close" @click="open(current)"></i>
      <component
              v-bind:is="currentTabComponent"
              :exercise="exercise"
              :classroom-id="classroomId"
              :ppt-index="pptIndex"
              :class-id="classId"
              :students-list="studentsList"
              :course-section-id="courseSectionId"
      ></component>
    </el-card>
  </div>
</template>
<script>
    import resourceShow from "../../components/startClass/resource-show";
    import grouping from "../../components/startClass/grouping";
    import attendance from "../../components/startClass/attendance";
    import questionAnswer from "../../components/startClass/question-answer";
    import textPlay from "../../components/startClass/text-play";
    import ElseActivity from './else-activity'

    import utils from '../../utils'
    import { api, fakeData } from '../../api'

    export default {
        name: 'new-comp',
        components: {resourceShow, grouping, attendance, questionAnswer, textPlay, ElseActivity},
        props: {
            classroomId: Number,
            pptIndex: Number,
            classId: Number,
            studentsList: Array,
            courseSectionId: Number
        },
        data() {
            return {
                current: true,
                currentTabComponent: '',
                exercise: null
            }
        },
        methods: {
            open(current) {
                let openMethod = api.requestEndActivity;
                switch (this.exercise.type) {
                case '人员统计':
                case '小组分组':
                    this.$emit('onEmmitCurrent', current);
                    break;
                case '讨论记录':
                    openMethod = api.requestCloseDiscussion;
                // eslint-disable-next-line no-fallthrough
                default:
                    utils.request({
                        invoke: openMethod,
                        params: {
                            exerciseId: this.exercise.exerciseId
                        },
                        result: fakeData.SINGLE_NUMBER_CODE
                    })
                        .then(function (res) {
                            if (res.data.code === 1) {
                                this.$emit('onEmmitCurrent', current);
                            } else this.$message.error('关闭失败')
                        }.bind(this))
                }
            },
            /**
             * @param exercise the exercise object of the exercise
             * clicked in the start activity component.
             */
            getCurrentComponent(exercise) {
                if (!this.classroomId) {
                    this.$message.error('请先选择上课的课时');
                    return
                }
                this.exercise = exercise;
                if (this.exercise.type === '资源播放') {
                    this.currentTabComponent = 'resource-show';
                } else if (this.exercise.type === '小组分组') {
                    this.currentTabComponent = 'grouping'
                } else if (this.exercise.type === '人员统计') {
                    this.currentTabComponent = 'attendance'
                } else if (this.exercise.type === '文本播放') {
                    this.currentTabComponent = 'text-play';
                } else if (this.exercise.type === '互动问答') {
                    this.currentTabComponent = 'question-answer';
                } else {
                    this.currentTabComponent = 'else-activity';
                }
            }
        }
    }
</script>

<style scoped>
  .ppt-box {
    text-align: center;
    height: 463px;
  }

  .el-icon-close {
    float: right;
  }

  .close:hover {
    cursor: pointer;
  }
</style>
