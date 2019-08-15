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
    margin-left: 0;
    padding-left: 0;
    margin-right:0;
    padding-right:0;
    margin-top:0;
    padding-top:0;
  }
  .leader-box{
      float:left;
      margin-left:1%;
      width:15%;
      margin-right:2%;
    }
  .table-box{
      float:right;
      width:75%;
      margin-right:3%
    }
</style>