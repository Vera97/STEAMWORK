<template>
    <el-row class="el-row">
        <h3>相关课程</h3>
        <el-col :span="4" v-for="(item, index) in relatedList" :key="index" :offset="index > 0 ? 1 : 0">
            <CourseCell :title="item.title" :introduction="item.introduction" :id="item.courseId"></CourseCell>
        </el-col>
    </el-row>
</template>

<script>
    import CourseCell from "../course-cell";
    export default {
        name: "Related",
        props: [
                'relatedList'
        ],
        components: {CourseCell},
        data(){
            return {}
        }
    }
</script>

<style scoped>
    .el-row{
        width: 100%;
    }
</style>
