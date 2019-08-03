<template>
  <el-container>
    <el-header>
      <NavStu></NavStu>
    </el-header>
    <el-main class="main-box">
      <el-row :gutter="24">
        <el-col :span="5">
          <growUp></growUp>
        </el-col>
        <el-col :span="14">
          <pptCenter></pptCenter>
        </el-col>
        <el-col :span="5">
          <task></task>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
    import NavStu from "../../components/stu-nav";
    import Footer from "../../components/hd-footer";
    import growUp from "../../components/resource/growUp";
    import task from "../../components/resource/task";
    import pptCenter from "../../components/resource/ppt-center";

    export default {
        name: "resource",
        components: {pptCenter, task, growUp, Footer, NavStu},


    }
</script>

<style scoped>
  * {
    margin-left: 0px;
    padding-left: 0px;
  }

  .main-box {
    margin-left: 10px;
  }
</style>
