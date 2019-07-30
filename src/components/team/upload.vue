<template>
    <div class="content">
        <el-card class="box-card">
            <h3 class="title">小组成员：<p style="display:inline">{{member}}</p></h3>
            <h4 class="tip">当教师开启“小组讨论”活动时启用：组内成员可提出观点，上传图片</h4>
            <el-button type="primary" @click="open1" class="button1">
                发送文字
            </el-button>
            <el-button class="button2" type="primary">绘制头脑风暴图并发送</el-button>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "upload",
        methods: {
            open1() {
                this.$prompt('观点:', {
                    cancelButtonText: '取消',
                    confirmButtonText: '发送'
                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        },
        data(){
            return {
                studentID:'学生ID',
                member:'XX,XXX,XXX,XXX',
                fileList:[]
            };
        }
    }
</script>

<style scoped>
     .title{
         text-align:center;
         margin-bottom:100px;
     }
    .tip{
        text-align:center;
        margin-bottom:200px;
    }
     .button1{
         margin-left:15%;
         width:15%;
         margin-bottom:5px;
     }
    .button2{
        width:55%;
        margin-bottom:5px;
    }
</style>