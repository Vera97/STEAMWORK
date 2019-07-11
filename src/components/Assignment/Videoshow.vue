<template>
    <el-card class="box-card">
        <h5 style="margin-top:5px;margin-bottom:0px;">步骤2</h5><br>
        <h5 style="margin-top:5px;margin-bottom:5px;">文字描述</h5>
        <div v-for="o in 3" :key="o" class="text item">
            {{'·&emsp;关键点 ' + o }}
        </div>
        <video width="100%" height="230px"  controls>
            <source src="movie.mp4" type="video/mp4">
            <source src="movie.ogg" type="video/ogg">
            您的浏览器不支持Video标签。
        </video>
    </el-card>
</template>

<script>
    import CourseCell from "../Course-cell";
    export default {
        name: "videoshow",
    }
</script>

<style scoped>
    .box-card{
        width:100%;
        height:20%;
        margin-top:5px;
        margin-bottom:0px;
    }
</style>
>