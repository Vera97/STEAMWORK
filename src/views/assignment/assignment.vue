<template>
  <el-container>
    <el-header>
      <Nav></Nav>
    </el-header>
    <el-main class="main-box">
      <h3 style="margin-top:5px;">3D打印&nbsp;课时1：&nbsp;#课时1的标题#</h3>
      <el-row :gutter="0">
        <!-- 这里是教学步骤栏，放置一列按钮组展示相应课程的教学步骤 -->
        <el-col :span="7">
          <Steps :steps="steps"></Steps>
        </el-col>
        <!-- 这里是教学步骤内容展示栏，放置教学视频、图片 -->
        <el-col :span="16" class="vshow">
          <Videoshow></Videoshow>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
    import Nav from "../../components/hd-nav";
    import Footer from "../../components/hd-footer";
    import Steps from "../../components/assignment/steps";
    import Videoshow from "../../components/assignment/video-show";

    import {api, fakeData} from '../../api';
    import utils from '../../utils';
    import store from '../../store';

    export default {
        name: "assignment",
        components: {Videoshow ,Steps, Footer, Nav},
        props: {
            id: String
        },
        data () {
            return {
                name: '3d打印',
                steps: []
            }
        },
        created() {
            let that = this;

            utils.request({
                invoke: api.requestCourseSteps,
                params: {
                    code: 'course_steps',
                    courseId: parseInt(this.id)           /* period id */
                },
                result: fakeData.PERIOD_STEPS
            })
                .then(res => {
                    that.steps = [];
                    that.steps.push(...res.data)
                })
                .then(() => {
                    let step = that.steps[0];

                    store.commit('assignment/ADD_STEP',step);
                    utils.request({
                        invoke: api.requestStepsContent,
                        params: {
                            stepId: parseInt(step.stepId)
                        },
                        result: fakeData.STEP_CONTENT
                    })
                        .then(res => {
                            store.commit('assignment/ADD_CONTENT', res.data.html)
                        })
                })
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

  .template {
    overflow-x: hidden;
  }

  .vshow {
    float: right;
  }
</style>
