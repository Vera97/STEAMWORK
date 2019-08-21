<template>
  <el-container>
    <el-header>
      <nav-stu active-index="2"></nav-stu>
    </el-header>
    <el-main class="main-box">
      <el-row :gutter="24">
        <el-col :span="5">
          <stu-class-list></stu-class-list>
        </el-col>
        <el-col :span="18">
          <diary></diary>
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
    import stuClassList from "../../components/mySuccess/stu-class-list"
    import diary from "../../components/mySuccess/diary";

    export default {
        name: "mySuccess",
        components: {diary, stuClassList, Footer, NavStu}

    }
</script>

<style scoped>
  * {
    margin-left: 0;
    padding-left: 0;
  }

  .main-box {
    margin-left: 10px;
    min-height:505px;
  }

  .el-footer {
    padding-right: 0;
  }
</style>
