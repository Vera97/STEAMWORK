<template>
  <div>
    <el-card class="ppt-box">
      <i class="el-icon-close" @click="open"></i>
      <component :complete="complete" v-bind:is="currentTabComponent" :currentExercise="currentExercise"></component>
      <el-button type="primary" class="button" @click="complete" v-if="isNeed">确认完成</el-button>
    </el-card>
  </div>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'
    import store from '../../store'

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
                name: "act-list",
                currentTabComponent: '',
                isNeed: true
            }
        },
        computed: {
            currentExercise() {
                return store.state.stuClass.currentExercise;
            }
        },
        methods: {
            open() {
                this.$parent.onEmmitCur();
            },
            getCurrentComponent() {
                if (store.state.stuClass.currentExercise.type === '资源播放') {
                    this.currentTabComponent = 'stu-resource-show';
                } else if (store.state.stuClass.currentExercise.type === '文本播放') {
                    this.currentTabComponent = 'stu-text-play';
                } else if (store.state.stuClass.currentExercise.type === '方案设计') {
                    this.currentTabComponent = 'stu-design';
                    this.isNeed=false;
                } else if (store.state.stuClass.currentExercise.type === '互动问答') {
                    this.currentTabComponent = 'answer';
                    this.isNeed=false;
                } else if (store.state.stuClass.currentExercise.type === '作品展示') {
                    this.currentTabComponent = 'display'
                }
            },
            complete() {
                utils.request({
                    invoke: api.requestIsOver,
                    params: {
                        classroomId: store.state.classroomId,
                        exerciseId: store.state.resource.currentExercise.exerciseId,
                    },
                    result: fakeData.IS_OVER,
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
                //向后端请求更改活动状态，
                for(let i = 0;i < store.state.stuClass.exerciseList.length; i++){
                    if(store.state.stuClass.exerciseList[i].exerciseId === store.state.stuClass.currentExercise.exerciseId){
                        store.state.stuClass.exerciseList[i].state=1;
                    }
                }
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
