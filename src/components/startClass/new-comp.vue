<template>
  <div>
    <el-card class="ppt-box">
      <i class="el-icon-close" @click="open(current)"></i>
      <component v-bind:is="currentTabComponent" :exerciseId="exercise.exerciseId"></component>
    </el-card>
  </div>
</template>
<script>
    import resourceShow from "../../components/startClass/resource-show";
    import grouping from "../../components/startClass/grouping";
    import attendance from "../../components/startClass/attendance";

    export default {
      name:'new-comp',
      components: {resourceShow, grouping, attendance},
      props:['exercise'],
      data() {
        return {
          current: true,
          currentTabComponent:''
      }
    },
    methods: {
      open(current){
        this.$emit('onEmmitCurrent', current)
      },
        getCurrentComponent() {
            if (this.exercise.type === '资源播放') {
                this.currentTabComponent = 'resource-show';
                console.log(this.currentTabComponent);
            } else if(this.exercise.type === '小组分组') {
                this.currentTabComponent = 'grouping'
            } else if(this.exercise.type === '人员统计') {
                this.currentTabComponent = 'attendance'
            }
        }
    },
        created(){
          this.getCurrentComponent();
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
</style>
