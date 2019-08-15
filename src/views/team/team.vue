<template>
  <el-container>
    <el-header>
      <nav-stu active-index="3"></nav-stu>
    </el-header>
    <el-main>
      <el-row :gutter="0">
        <!-- 这里是小组列表栏，应该展示小组创建按钮及小组列表，对应图左边部分 -->
        <el-col :span="7">
          <team-list></team-list>
        </el-col>
        <!-- 这里文字及头脑风暴上传区，对应图右边部分 -->
        <el-col :span="16" style="float:right;">
          <main-panel></main-panel>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <hd-footer></hd-footer>
    </el-footer>
  </el-container>
</template>

<script>
    import NavStu from "../../components/stu-nav";
    import teamList from "../../components/team/team-list";
    import mainPanel from "../../components/team/main";
    import hdFooter from "../../components/hd-footer";

    export default {
        name: "team",
        components: {teamList, mainPanel, hdFooter, NavStu},
        beforeRouteEnter(to, from, next) {
            // TODO check whether group discussion is available
            next()
        }
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

