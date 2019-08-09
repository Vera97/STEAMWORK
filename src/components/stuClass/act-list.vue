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
    import store from '../../store'

    import stuResourceShow from "../../components/stuClass/stu-resource-show";
    import stuDesign from "../../components/stuClass/stu-design";
    import stuTextPlay from "../../components/stuClass/stu-text-play";

    export default {
        name: "act-list",
        components: {stuResourceShow, stuDesign, stuTextPlay},
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
                    this.currentTabComponent = 'stu-resource-show';
                    console.log(this.currentTabComponent);
                }  else if (this.exercise.type === '文本播放') {
                    this.currentTabComponent = 'stu-text-play';
                } else if (this.exercise.type === '方案设计') {
                    this.currentTabComponent = 'stu-design';
                }
            },
            complete() {
                utils.request({
                    invoke: api.requestIsOver,
                    params: {
                        exerciseId: this.exercise.exerciseId,
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
                    if(store.state.stuClass.exerciseList[i].exerciseId === this.exercise.exerciseId){
                        store.state.stuClass.exerciseList[i].state=false;
                        console.log(store.state.stuClass.exerciseList[i].state);
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