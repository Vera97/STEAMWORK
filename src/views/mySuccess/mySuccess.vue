<template>
  <el-container>
    <el-header>
      <NavStu active-index="2"></NavStu>
    </el-header>
    <el-main class="main-box">
      <el-row :gutter="24">
        <el-col :span="5">
          <stuClassList></stuClassList>
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
</style>
