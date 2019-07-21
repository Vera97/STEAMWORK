<template>
    <div class="student-box">
        <div><el-button type="success" class="button-box" style="width: 100%">学生学习进度监控</el-button></div>
        <div v-for="o in 50" :key="o">
            <div class="student-id-box">{{o}}</div>
        </div>
        <div><p>编号为学生ID，黄色表示学习进度正常，颜色越深表示学习越落后。</p></div>
    </div>
</template>

<script>

</script>

<style scoped>
    .button-box{
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .student-id-box{
        padding: 0px;
        width: 24px;
        float: left;
        margin: 2px;
        text-align: center;
        background-color: #FFEF60;
        border-radius: 2px;
    }
    p{
        margin-top: 130px;
    }

</style>
