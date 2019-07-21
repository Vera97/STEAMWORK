<template>
  <el-container>
    <el-header><Nav></Nav></el-header>
    <el-main>
      <Search></Search>
      <Carousel></Carousel>
      <classList></classList>
    </el-main>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>

<script>
    import Nav from "../../components/Nav";
    import Search from "../../components/Home/Search";
    import Carousel from "../../components/Home/Carousel";
    import classList from "../../components/classList";
    import Footer from "../../components/Footer";
    export default {
        name: "home",
        components: {Footer, classList, Carousel, Search, Nav},
        // beforeRouteEnter(to, from, next) {
        //     get();
        //     next(vm => {
        //         set(vm);
        //     })
        // }
    }

</script>

<style scoped>
  .el-header{
    padding:0;
  }
  .el-footer{
    padding:0;
  }
</style>

