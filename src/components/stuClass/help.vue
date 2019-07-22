<template>
    <div class="box-card">
        <el-button class="students-ask-box">找不到答案？请求老师帮助！</el-button>
        <div>
              <el-tag class="students-query-box">你之前还有<p style="text-decoration:underline;display:inline">{{position}}</p>位同学在排队</el-tag>
        </div>
    </div>

</template>

<script>
    export default {
        name: "help",
        data(){
            return {
                studentID:'学生ID',
                position:'2'
            }
        }
    }
</script>

<style scoped>
    .students-ask-box{
        text-align: center;
        background-color: #d58512;
        color: white;
        border-radius: 2px;
        font-size: 16px;
        margin-top: 30px;
        margin-bottom: 10px;
        padding: 7px;
        width:100%;
    }
    /*.box-card{*/
    /*    width: 20%;*/
    /*}*/
    .students-query-box{
        text-align: center;
        background-color:#BCB9B9;
        color: black;
        border-radius: 2px;
        font-size: 16px;
        margin-top: 10px;
        margin-bottom: 10px;
        width:100%;
    }
</style>
