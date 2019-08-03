<template>
    <div>
        <el-card class="ppt-box">
            <i class="el-icon-close" @click="open(current)"></i>
            <b>新组件</b>
        </el-card>
    </div>
</template>
<script>
  export default {
    props:['exerciseId'],
    computed:{
      current(){
        return this.current;
      }
    },
    data() {
      return {
        current:true
      };
    },
    methods: {
      open(current){
        this.$emit('onEmmitCurrent', current)
      }
    }
  };
</script>

<style scoped>
    .ppt-box{
        text-align: center;
        height:463px;
        background-color: #5bc0de;
    }
    .el-icon-close{
        float:right;
    }
</style>