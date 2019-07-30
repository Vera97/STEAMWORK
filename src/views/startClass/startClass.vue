<template>
    <el-container>
        <el-header><Nav></Nav></el-header>
        <el-main class="main-box">
            <el-row :gutter="24">
                <el-col :span="5"><classList></classList><askList></askList></el-col>
                <el-col :span="14"><show></show></el-col>
                <el-col :span="5"><startActivities></startActivities><monitor></monitor></el-col>
            </el-row>

        </el-main>
        <el-footer><Footer></Footer></el-footer>
    </el-container>
</template>

<script>
    import Nav from "../../components/hd-nav";
    import Footer from "../../components/hd-footer";
    import classList from "../../components/class-list"
    import askList from "../../components/startClass/ask-list";
    import monitor from "../../components/startClass/monitor";
    import show from "../../components/startClass/show";
    import startActivities from "../../components/startClass/start-activities";

    export default {
        name: "startClass",
        components: {askList, monitor, show, startActivities, classList, Footer, Nav},
        props: {
            id: String
        },
        data () {
            return {
                name: 'startClass'
            }
        }
    }
</script>

<style scoped>
    *{
        margin-left: 0;
        padding-left: 0;
    }
    .main-box{
        margin-left: 10px;
    }

</style>
