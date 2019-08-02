<template>
  <el-container>
    <el-header>
      <NavStu></NavStu>
    </el-header>
    <el-main>
      <el-row :gutter="0">
        <!-- 这里是小组列表栏，应该展示小组创建按钮及小组列表，对应图左边部分 -->
        <el-col :span="7">
          <teamList></teamList>
        </el-col>
        <!-- 这里文字及头脑风暴上传区，对应图右边部分 -->
        <el-col :span="16" style="float:right;">
          <upload></upload>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <hdfooter></hdfooter>
    </el-footer>
  </el-container>
</template>

<script>
    import NavStu from "../../components/hd-nav";
    import teamList from "../../components/team/team-list";
    import upload from "../../components/team/upload";
    import hdfooter from "../../components/hd-footer";

    export default {
        name: "team",
        components: {teamList,upload,hdfooter, NavStu},
    }

</script>

<style scoped>
  .el-header {
    padding: 0;
  }

  .el-footer {
    padding: 0;
  }
</style>

