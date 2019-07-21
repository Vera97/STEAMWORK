<template>
    <el-container>
        <el-header><Nav></Nav></el-header>
        <el-main>
            <el-row :gutter="0">
                <!--,对应图片左侧classList为左侧班级列表 -->
                <el-col :span="4" >
                    <el-button type="primary" class="button"> + 创建班级</el-button>
                    <classList></classList>
                </el-col>
                <!-- 对应图片右侧，rstulist为右侧学生列表 -->
                <el-col :span="19" style="float:right;"><rStuList></rStuList></el-col>
            </el-row>
        </el-main>
        <el-footer><Footer></Footer></el-footer>
    </el-container>
</template>

<script>
    import Nav from "../../components/hd-nav";
    import Footer from "../../components/hd-footer";
    import classList  from "../../components/class-list";
    import rStuList from "../../components/studentsList/r-stu-list";
    export default {
        name: "studentsList",
        components: {Footer, Nav,classList,rStuList},
    }
</script>

<style scoped>
     .button{
        margin-bottom:10px;
     }
</style>
