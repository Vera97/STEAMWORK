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
    import Nav from "../../components/Nav";
    import Footer from "../../components/Footer";
    import classList from "../../components/classList"
    import askList from "../../components/startClass/askList";
    import monitor from "../../components/startClass/monitor";
    import show from "../../components/startClass/show";
    import startActivities from "../../components/startClass/startActivities";

    export default {
        name: "startClass",
        components: {askList, monitor, show, startActivities, classList, Footer, Nav},
        props: [
            'id'
        ],
        data () {
            return {
                name: 'startClass'
            }
        }
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
