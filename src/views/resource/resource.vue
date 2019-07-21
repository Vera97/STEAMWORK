<template>
    <el-container>
        <el-header><Nav></Nav></el-header>
        <el-main class="main-box">
            <el-row :gutter="24">
                <el-col :span="5"><growUp></growUp></el-col>
                <el-col :span="14"><show></show></el-col>
                <el-col :span="5"><task></task></el-col>
            </el-row>

        </el-main>
        <el-footer><Footer></Footer></el-footer>
    </el-container>
</template>

<script>
    import Nav from "../../components/Nav";
    import Footer from "../../components/Footer";
    import growUp from "../../components/resource/growUp";
    import task from "../../components/resource/task";
    import show from "../../components/startClass/show";

    export default {
        name: "resource",
        components: {show, task, growUp, Footer, Nav},

    }
</script>

<style scoped>
    *{
        margin-left: 0px;
        padding-left: 0px;
    }
    .main-box{
        margin-left: 10px;
    }

</style>
