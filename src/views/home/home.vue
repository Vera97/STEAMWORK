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
    import Nav from "../../components/Nav";
    import Search from "../../components/home/search";
    import Carousel from "../../components/home/carousel";
    import ClassList from "../../components/home/classList";
    import Footer from "../../components/Footer";
    import api from '@/api';
    import store from '@/views/home/store';

    export default {
        name: "home",
        components: {Footer, ClassList, Carousel, Search, Nav},
        created() {
            // api.getCourses({
            //     "code": "course_chunk",
            //     "start": "0",
            //     "length": "5"
            // }).then(res => {
            //     let len = res.data[0].totalCount;
            //     store.commit('PUSH_COUNT', len);
            //     store.commit('ADD_ALL', res.data.splice(1))
            // })
        },
        beforeRouteLeave(to, from, next) {
            store.commit('PUSH_COUNT', 0);
            store.commit('CLEAR_ALL');
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
