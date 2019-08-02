<template>
  <el-container>
    <el-header>
      <Nav active-index="2"></Nav>
    </el-header>
    <el-main>
      <el-col :span="4" class="cd">
        <course-directory></course-directory>
      </el-col>
      <el-col :span="19" class="ct">
        <Content></Content>
      </el-col>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
    import Nav from "../../components/hd-nav";
    import Footer from "../../components/hd-footer";
    import Content from "../../components/design/content";
    import courseDirectory from "../../components/course-directory";


    export default {
        name: "Design",
        components: {Footer, Content, courseDirectory, Nav},
        props: {
            id: String
        },
        data (){
            return {
                name: '新建课程',
            }
        },

    }
</script>

<style scoped>
  * {
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .ct {
    float: right;
    margin-right: 10px;
  }

  .cd {
    margin-left: 10px;
  }
</style>
