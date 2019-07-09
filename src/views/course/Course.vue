<template>
  <el-container>
    <el-header><Nav></Nav></el-header>
    <el-main>
      <!-- 这里是课时介绍栏，应该展示相应课程的id和课时列表 -->
      <Periods></Periods>
      <!-- 这里是课程信息介绍，对应图右上角 -->
      <Introduction></Introduction>
      <el-button type="primary">收藏课程</el-button>
      <el-button type="primary">另存为“我的课程”</el-button>
      <!-- 相关课程，课程卡片我提取成了独立的组件，在Course-cell.vue中，使用的时候传入标题，介绍，id即可。现在可以给它们随意传入一些信息，真实的标题介绍等内容以后加上 -->
      <Related></Related>
    </el-main>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>

<script>
    import Nav from "../../components/Nav";
    import Footer from "../../components/Footer";
    import Periods from "../../components/Course/Periods";
    import Introduction from "../../components/Course/Introduction";
    import Related from "../../components/Course/Related";
    export default {
        name: "Course",
        components: {Related, Introduction, Periods, Footer, Nav},
        props: [
            'id'
        ],
        data () {
            return {
                name: '3d打印'
            }
        }
    }
</script>

<style scoped>
  .el-header{
    padding:0;
  }
  .el-footer{
    padding:0;
  }
</style>
