<template>
    <el-container>
        <el-header>
            <Nav></Nav>
        </el-header>
        <el-main>
            <el-col :span="4" class="cd"><Coursedirectory></Coursedirectory></el-col>
            <el-col :span="19" class="ct"><Content></Content></el-col>
        </el-main>
        <el-footer><Footer></Footer></el-footer>
    </el-container>
</template>

<script>
    import Nav from "../../components/Nav";
    import Footer from "../../components/Footer";
    import Content from "../../components/Design/Content";
    import Coursedirectory from "../../components/Coursedirectory";
    export default {
        name: "Design",
        components: {Footer, Content, Coursedirectory, Nav}
    }
</script>

<style scoped>
    * {
        margin-left: 0px;
        margin-right: 0px;
        padding-left: 0px;
        padding-right: 0px;
    }
    .ct{
        float: right;
        margin-right: 10px;
    }
    .cd{
        margin-left: 10px;
    }

</style>