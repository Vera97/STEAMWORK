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

    export default {
        name: "stuClass",
        components: {pptView, Footer, navStu},
        data() {
            return {
                display: 0,
                current: true,
                pptId: null,
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
                        next(vm => {
                            vm.pptId = res.data.pptId;
                            vm.pptImagesList.push(...res.data.pptImagesList);
                        })
                    } else {
                        this.$message.error('上课尚未开始')
                    }
                }.bind(this))
        },
        async beforeRouteLeave (to, from, next) {
            let flag = false;
            if (to.path !== '/team' || (to.path === '/team' && to.params.code === 1)) {
                next();
                return
            }
            for (let i of store.state.stuClass.exerciseList) {
                if (i.type === '互动讨论') {
                    await utils.request({
                        invoke: api.requestCourseExerciseElse,
                        params: {
                            stuId: store.state.stuId,
                            exerciseId: i.exerciseId
                        },
                        result: fakeData.SINGLE_NUMBER_CODE
                    })
                        .then(function (res) {
                            if (res.data.code === 1) {
                                flag = true;
                                next({
                                    name: 'team',
                                    params: {
                                        code: 1         // this code will be checked before enter the page.
                                    }
                                });
                            }
                        }.bind(this));
                    if (flag) return
                }
            }
            this.$alert('互动讨论尚未开始', '消息', {
                confirmButtonText: '确定',
                callback: function () {
                    this.$router.go(0)
                }.bind(this)
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
