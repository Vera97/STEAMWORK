<template>
    <el-row class="el-row">
        <h3>相关课程</h3>
        <el-col :span="4" v-for="(o, index) in 5" :key="o" :offset="index > 0 ? 1 : 0">
            <CourseCell :title="title+o" :introduction="introduction+o" :id="123"></CourseCell>
        </el-col>
    </el-row>
</template>

<script>
    import CourseCell from "../Course-cell";
    export default {
        name: "Related",
        components: {CourseCell},
        data(){
            return {
                title:'其他课程',
                introduction:'一句话的简介xxxx',
            }
        }
    }
</script>

<style scoped>
    .el-row{
        width: 100%;
    }

</style>
>