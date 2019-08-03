<template>
  <el-container>
    <el-header>
      <NavStu></NavStu>
    </el-header>
    <el-main class="main-box">
      <el-row :gutter="24">
        <el-col :span="5">
          <classList></classList>
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
    import classList from "../../components/class-list"
    import diary from "../../components/mySuccess/diary";

    export default {
        name: "mySuccess",
        components: {diary, classList, Footer, NavStu}

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
