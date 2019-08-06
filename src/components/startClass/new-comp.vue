<template>
  <div>
    <el-card class="ppt-box">
      <i class="close el-icon-close" @click="open(current)"></i>
      <component
              v-bind:is="currentTabComponent"
              :exerciseId="exercise.exerciseId"
              :classroom-id="classroomId"
              :ppt-index="pptIndex"
              :class-id="classId"
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

    export default {
        name: 'new-comp',
        components: {resourceShow, grouping, attendance, questionAnswer, textPlay},
        props: {
            classroomId: Number,
            pptIndex: Number,
            classId: Number
        },
        data() {
            return {
                current: true,
                currentTabComponent: '',
                exercise: {
                    exerciseId: 1,
                    title: '文本播放',
                    type: '文本播放'
                }
            }
        },
        methods: {
            open(current) {
                this.$emit('onEmmitCurrent', current)
            },
            getCurrentComponent(exercise) {
                if(!this.classroomId) {
                    this.$message.error('请先选择上课的课时');
                    return
                }
                this.exercise = exercise;
                if (this.exercise.type === '资源播放') {
                    this.currentTabComponent = 'resource-show';
                    console.log(this.currentTabComponent);
                } else if (this.exercise.type === '小组分组') {
                    this.currentTabComponent = 'grouping'
                } else if (this.exercise.type === '人员统计') {
                    this.currentTabComponent = 'attendance'
                } else if(this.exercise.type ==='文本播放') {
                    this.currentTabComponent='text-play';
                }
                else if(this.exercise.type ==='互动问答') {
                    this.currentTabComponent='question-answer';
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
