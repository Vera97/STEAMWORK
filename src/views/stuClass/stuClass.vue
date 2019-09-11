<template>
  <el-container>
    <el-header>
      <nav-stu
              active-index="4"
              @get-images="getImages"
      ></nav-stu>
    </el-header>
    <el-main class="main-box">
      <ppt-view :ppt-id="pptId" :ppt-images-list="pptImagesList"></ppt-view>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
    import navStu from "../../components/stu-nav";
    import Footer from "../../components/hd-footer";
    import pptView from "../../components/stuClass/ppt-view";

    import store from '../../store'
    import {api, fakeData} from '../../api'
    import utils from '../../utils'
    import { mapState } from 'vuex'

    export default {
        name: "stuClass",
        components: {pptView, Footer, navStu},
        computed: {
            ...mapState(['pptId'])
        },
        data() {
            return {
                current: true,
                pptImagesList: []
            }
        },
        methods: {
            getImages (imagesList) {
                this.pptImagesList.push(...imagesList)
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
    min-height: 715px;
  }

  .el-footer {
    padding-right: 0;
  }
</style>
