<template>
  <el-container>
    <el-header><Nav></Nav></el-header>
    <el-main class="main-box">
      <h3 style="margin-top:5px;">3D打印&nbsp;课时1：&nbsp;#课时1的标题#</h3>
      <el-row :gutter="0">
        <!-- 这里是教学步骤栏，放置一列按钮组展示相应课程的教学步骤 -->
        <el-col :span="7" ><Steps :steps="steps"></Steps></el-col>
        <!-- 这里是教学步骤内容展示栏，放置教学视频、图片 -->
        <el-col :span="16" class="vshow"><Videoshow></Videoshow></el-col>
      </el-row>
    </el-main>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
</template>
<script>
  import Nav from "../../components/Nav";
  import Footer from "../../components/Footer";
  import Steps from "../../components/Assignment/Steps";
  import Videoshow from "../../components/Assignment/Videoshow";
  import {api, fakeData} from '../../api';
  import utils from '../../utils';
  import store from '../../store';


  export default {
    name: "Assignment",
    components: {Videoshow ,Steps, Footer, Nav},
    props: {
      id: String
    },
    data () {
      return {
        name: 'Assignment',
        steps: [ ]
      }
    },
    created(){
      let that=this;
      utils.request({
        invoke: api.requstCourseSteps,
        params: {
          code: 'course_steps',
          courseId: this.id           /* period id */
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
                  invoke: api.requstCourseSteps,
                  params: {
                    code: 'step_contents',
                    stepId: step.stepId
                  },
                  result: fakeData.STEP_CONTENT
                })
                        .then(res => {
                          store.commit('assignment/ADD_COURSE', res.data)
                        })
              })
    }
  }
</script>

<style scoped>
  *{
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .template{
    overflow: hidden;
  }
  .vshow{
    float: right;
  }
</style>
