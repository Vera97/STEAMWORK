<template>
  <el-container>
    <el-header><Nav></Nav></el-header>
    <el-main>
      <h3 style="margin-top:5px;">3D打印&nbsp;课时1：&nbsp;#课时1的标题#</h3>
      <el-row :gutter="0">
        <!-- 这里是教学步骤栏，放置一列按钮组展示相应课程的教学步骤 -->
        <el-col :span="7" ><Steps></Steps></el-col>
        <!-- 这里是教学步骤内容展示栏，放置教学视频、图片 -->
        <el-col :span="16" class="vshow"><Videoshow></Videoshow></el-col>
      </el-row>
    </el-main>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>

<script>
  import Nav from "../../components/Nav";
  import Footer from "../../components/Footer";
  import Steps from "../../components/Assignment/Steps";
  import Videoshow from "../../components/Assignment/Videoshow";

  export default {
    name: "Assignment",
    components: {Videoshow ,Steps, Footer, Nav},
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
  *{
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .template{
    overflow: hidden;
  }
  .vshow{
    float: right;
  }
</style>
