<template>
  <el-container>
    <el-header><Nav></Nav></el-header>
    <el-main>
      <Search></Search>
      <Carousel></Carousel>
      <ClassList></ClassList>
    </el-main>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>

<script>
    import Nav from "../../components/Home/Nav";
    import Search from "../../components/Home/Search";
    import Carousel from "../../components/Home/Carousel";
    import ClassList from "../../components/Home/ClassList";
    import Footer from "../../components/Footer";
    export default {
        name: "home",
        components: {Footer, ClassList, Carousel, Search, Nav},
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
