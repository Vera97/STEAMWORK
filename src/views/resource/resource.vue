<template>
  <el-container>
    <el-header>
      <NavStu active-index="1"></NavStu>
    </el-header>
    <el-main class="main-box">
          <pptCenter></pptCenter>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
    import NavStu from "../../components/stu-nav";
    import Footer from "../../components/hd-footer";
    import pptCenter from "../../components/resource/ppt-center";

    import utils from '../../utils'
    import {api, fakeData} from '../../api'
    import store from '../../store'

    export default {
        name: "resource",
        components: {pptCenter, Footer, NavStu},
        beforeRouteEnter(to, from, next) {
            let flag = true;

            utils.request({
                invoke: api.requestExerciseState,
                params: {
                    stuId: store.state.stuId,
                    courseSectionId: store.state.courseSectionId
                },
                result: fakeData.GET_EXERCISE_STATE_COMPLETED
            })
                .then((function (res) {
                    for(let i of res.data.exerciseStateList) {
                        if(i.state === 0) {
                            this.$message.error('请先完成所有练习');
                            flag = false;
                            break
                        }
                    }
                    if(flag) next()
                }).bind(this))
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
  }

  .el-footer {
    padding-right: 0;
  }
</style>
