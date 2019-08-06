<template>
  <div>
    <el-card class="ppt-box">
      <i class="el-icon-close" @click="open(current)"></i>
      <component v-bind:is="currentTabComponent" :exerciseId="exercise.exerciseId" ></component>
    </el-card>
  </div>
</template>
<script>
    import resourceShow from "../../components/startClass/resource-show";
    import questionAnswer from "../../components/startClass/question-answer";
    import textPlay from "../../components/startClass/text-play";
    export default {
        name:'new-comp',
        components: {resourceShow, questionAnswer, textPlay},
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
            getCurrentComponent(){
                if(this.exercise.type ==='资源播放')
                {
                    this.currentTabComponent='resource-show';
                    console.log(this.currentTabComponent);
                }
                else if(this.exercise.type ==='文本播放')
                {
                    this.currentTabComponent='text-play';
                    console.log(this.currentTabComponent);
                }
                else if(this.exercise.type ==='互动问答')
                {
                    this.currentTabComponent='question-answer';
                    console.log(this.currentTabComponent);
                }
            }
        },
        created(){
            this.getCurrentComponent();
        }
    }
</script>

<style scoped>
  .ppt-box{
    text-align: center;
    height:463px;
  }
  .el-icon-close{
    float:right;
  }
</style>