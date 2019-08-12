<template>
  <el-container>
    <el-header>
      <Navstu active-index="4"></Navstu>
    </el-header>
    <el-main class="main-box">
      <pptView></pptView>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
    import Navstu from "../../components/stu-nav";
    import Footer from "../../components/hd-footer";
    // import question from "../../components/stuClass/question"
    // import help from "../../components/stuClass/help";
    // import task from "../../components/stuClass/task";
    import pptView from "../../components/stuClass/ppt-view";
    // import problem from "../../components/stuClass/problem";
    //import newMenu from "../../components/stuClass/new-menu"

    export default {
        name: "stuClass",
        components: {pptView, Footer, Navstu},
        props: [
            'id'
        ],
        data() {
            return {
                display: 0,
                current: true
            }
        }
    }
</script>

<style scoped>
  * {
    margin-left: 0;
    padding-left: 0;
  }

  .main-box {
    margin-left: 10px;
    margin-top: 0;
  }

  .el-footer {
    padding-right: 0;
  }
</style>
