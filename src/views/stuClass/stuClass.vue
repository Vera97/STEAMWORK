<template>
  <el-container>
    <el-header>
      <nav-stu active-index="4"></nav-stu>
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
        beforeRouteEnter (to, from, next) {
            utils.request({
                invoke: api.requestJoinClass,
                params: {
                    stuId: store.state.stuId
                },
                result: fakeData.REQUEST_JOIN_CLASS_RESPONSE_SUCCESSFUL
            })
                .then(function (res) {
                    if(res.data.code === 1) {
                        store.commit('STU_CLASSROOM_ID', {classroomId: res.data.classroomId});
                        store.commit('STU_GROUP_LIST', {groupList: res.data.groupList});
                        store.commit('STU_COURSE_SECTION_ID', {courseSectionId: res.data.courseSectionId});
                        store.commit('STU_PPT_ID', {pptId: res.data.pptId});
                        next(vm => {
                            vm.pptImagesList.push(...res.data.pptImagesList);
                        })
                    } else {
                        this.$message.error('上课尚未开始')
                    }
                }.bind(this))
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
