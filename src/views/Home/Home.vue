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
    import Nav from "../../components/hd-nav";
    import Search from "../../components/home/search";
    import Carousel from "../../components/home/carousel";
    import ClassList from "../../components/home/class-list";
    import Footer from "../../components/hd-footer";

    import store from '../../store';

    export default {
        name: "home",
        components: {Footer, ClassList, Carousel, Search, Nav},
        created() {},
        beforeRouteLeave(to, from, next) {
            store.commit('home/PUSH_COUNT', 0);
            store.commit('home/CLEAR_ALL');
            next()
        }
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
