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
    import pptView from "../../components/stuClass/ppt-view";

    import store from '../../store'
    import {api, fakeData} from '../../api'
    import utils from '../../utils'

    export default {
        name: "stuClass",
        components: {pptView, Footer, Navstu},
        data() {
            return {
                display: 0,
                current: true
            }
        },
        beforeRouteEnter (to, from, next) {
            utils.request({
                invoke: api.requestJoinClass,
                params: {
                    stuId: store.state.stuId
                },
                result: null
            })
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
