<template>
  <el-container>
    <el-header><Nav></Nav></el-header>
    <el-main>
      <el-row :gutter="75">
        <!-- 这里是课时介绍栏，应该展示相应课程的id和课时列表 -->
        <el-col :span="16" ><Periods></Periods></el-col>
        <!-- 这里是课程信息介绍，对应图右上角 -->
        <el-col :span="8"><Introduction></Introduction></el-col>
      </el-row>
      <el-row :gutter="75">
        <!-- 相关课程，课程卡片我提取成了独立的组件，在Course-cell.vue中，使用的时候传入标题，介绍，id即可。现在可以给它们随意传入一些信息，真实的标题介绍等内容以后加上 -->
       <el-col :span="16"><Related></Related></el-col>
       <!-- 这里是按钮，对应图右下角 -->
        <el-col :span="8">
          <el-button type="primary">收藏课程 </el-button><br>
          <el-button type="primary">另存为“我的课程”</el-button>
        </el-col>
      </el-row>
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
  }
</script>

<style scoped>
  .el-header{
    padding:0;
  }
  .el-footer{
    padding:0;
  }
  .el-row {
    margin-bottom: 0px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-button {
    width:70%;
    margin-top:15px;
    margin-left:15%;
    margin-right:15%;
  }
  .el-main{
    overflow: hidden;
  }
</style>
