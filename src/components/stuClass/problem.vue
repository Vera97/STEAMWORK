<template>
  <div>
    <div class="button-box">
      <el-card class="problem-card">互动问题1：内容描述内容描述内容描述内容描述内容描述</el-card>
    </div>
    <el-button type="primary" class="button1">选项一</el-button>
    <br>
    <el-button class="button2">选项二</el-button>
    <br>
    <el-button class="button3">提交（剩余<p style="display:inline">{{time}}</p>秒）</el-button>
  </div>
</template>

<script>
    export default {
        name: "problem",
        data(){
            return {
                studentID:'学生ID',
                time:'19'
            }
        }
    }
</script>

<style scoped>
  .problem-card {
    margin-bottom: 10px;
  }

  .button1 {
    width: 100%;
    margin-bottom: 5px;
  }

  .button2 {
    width: 100%;
    margin-bottom: 5px;
  }

  .button3 {
    width: 100%;
    color: white;
    background-color: #4cae4c;
    border-color: #4cae4c;
  }
</style>
