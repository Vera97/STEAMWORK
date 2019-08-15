<template>
  <el-container>
    <el-main class="main-box">
      <div class="main-box">
        <div class="leader-box"><menuList></menuList></div>
        <div class="table-box"><adminComp></adminComp></div>
      </div>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
    import menuList from "../../components/admin/menu-list";
    import adminComp from "../../components/admin/admin-comp";
    import Footer from "../../components/hd-footer";

    export default {
        name: "admin",
        components:{menuList,adminComp,Footer},
    }
</script>

<style scoped>
  * {
    margin-left: 0px;
    padding-left: 0px;
  }
  .leader-box{
      float:left;
      margin-top:2%;
      margin-left:2%;
      width:20%;
    }
  .table-box{
      float:right;
      width:75%;
      margin-right:3%
    }
</style>