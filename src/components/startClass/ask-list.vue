<template>
    <div class="box-card">
        <div class="students-ask-box">
            学生提问队列
        </div>
        <div v-for="o in 7" :key="o" class="students-list-box">
            <el-tag type="warning" style="color: black;background-color: #d58512">{{o}}</el-tag>
        </div>
        <div>
            <p>顺序显示提问同学的ID，学生端确认解决问题后将从队列中移除。</p>
        </div>
    </div>

</template>

<script>
    export default {
        name: "askList",
        data(){
            return {
                studentID:'学生ID',
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
        font-size: 18px;
        margin-top: 30px;
        margin-bottom: 10px;
        padding: 5px;
    }
    /*.box-card{*/
    /*    width: 20%;*/
    /*}*/
    .students-list-box{
        padding: 0px;
        float: left;
        margin: 1px;
        text-align: center;
    }
    p{
        margin-top: 60px;
    }


</style>
