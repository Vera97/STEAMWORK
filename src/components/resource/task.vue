<template>
    <div class="box-card">
        <el-card>
            <div class="task-box">
                <div>进阶任务</div>
                <div><b>拍照并填写记录回答问题</b></div>
                <div>(点击任务后在跳出的弹窗内完成)</div>
            </div>
        </el-card>
        <div><el-button class="help" type="warning">请求老师帮助！</el-button></div>
        <div><el-button class="help" type="info">等待3位同学</el-button></div>
    </div>

</template>

<script>

    export default {
        name: "task",
        props: {
            id: String,
        },
        data() {
            return{

        }
        }
    }


</script>

<style scoped>
    .task-box div:first-child{
        color: red;
        text-align: center;
        margin-bottom: 40%;
    }
    .task-box div:nth-child(2){
        text-align: center;
        margin-bottom: 50%;
    }
    .task-box div:last-child{
        color: grey;
    }
    .help{
        width: 100%;
        margin-top: 10%;
    }

</style>
