<template>
    <el-container>
        <el-header><Nav></Nav></el-header>
        <el-main>
            <el-row :gutter="0">
                <!--,对应图片左侧classList为左侧班级列表 -->
                <el-col :span="4" class="classlist" >
                    <el-button type="primary" class="button" @click="open"> + 创建班级</el-button>
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
    import Nav from "../../components/Nav";
    import Footer from "../../components/Footer";
    import classList  from "../../components/classList";
    import rStuList from  "../../components/studentsList/rStuList";
    export default {
        name: "studentsList",
        components: {Footer, Nav, classList, rStuList},
        methods: {
            open() {
                this.$prompt('班级名称:', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                })
            }
        }
    }
</script>

<style scoped>
    *{
        margin-left: 0px;
        padding-left: 0px;
    }
    .classlist{
        margin-left:20px;
    }
     .button{
        margin-bottom:10px;
         width:100%;
     }
</style>
