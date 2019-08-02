<template>
  <el-container>
    <el-header>
      <Navstu></Navstu>
    </el-header>
    <el-main class="main-box">
      <el-row :gutter="24">
        <el-col :span="5">
          <question></question>
          <help></help>
        </el-col>
        <el-col :span="14">
          <pptView></pptView>
        </el-col>
        <el-col :span="5">
          <problem></problem>
          <task></task>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
    import Navstu from "../../components/hd-nav";
    import Footer from "../../components/hd-footer";
    import question from "../../components/stuClass/question"
    import help from "../../components/stuClass/help";
    import task from "../../components/stuClass/task";
    import pptView from "../../components/stuClass/ppt-view";
    import problem from "../../components/stuClass/problem";

    export default {
        name: "stuClass",
        components: {help, task, pptView, problem, question, Footer, Navstu},
        props: [
            'id'
        ],
        data () {
            return {
                name: 'stuClass',
            }
        }
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
