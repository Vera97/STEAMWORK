<template>
  <el-container>
    <el-header>
      <Nav active-index="4"></Nav>
    </el-header>
    <el-main class="main-box">
      <el-row :gutter="24">
        <el-col :span="5">
          <class-list :show-section="true" :show-options="false" @section-selected="loadMaterial"></class-list>
          <askList ref="askList" :classroom-id="classroomId"></askList>
        </el-col>
        <el-col :span="14">
          <show
                  ref="show"
                  :classroom-id="classroomId"
                  v-show="current"
                  @page-turning="pageTurning"
                  @get-ppt="getPPTId"
          ></show>
          <newComp
                  :class-id="classId"
                  :ppt-index="pptIndex"
                  :classroom-id="classroomId"
                  :students-list="studentsList"
                  v-show="!current"
                  @onEmmitCurrent="onEmmitCurrent"
                  ref="newComp"
          ></newComp>
        </el-col>
        <el-col :span="5">
          <start-activities
                  @onEmitIndex="onEmitIndex"
                  ref="activity"
          ></start-activities>
          <monitor @progress-get="getProgress"></monitor>
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
    import classList from "../../components/class-list"
    import askList from "../../components/startClass/ask-list";
    import monitor from "../../components/startClass/monitor";
    import show from "../../components/startClass/show";
    import newComp from "../../components/startClass/new-comp";
    import startActivities from "../../components/startClass/start-activities";

    import {api, fakeData} from '../../api';
    import utils from '../../utils';
    import store from '../../store';

    export default {
        name: "startClass",
        components: {askList, monitor, show, newComp, startActivities, classList, Footer, Nav},
        data () {
            return {
                current: true,
                selectedSectionId: null,
                classId: null,
                classroomId: null,
                pptIndex: 0,
                pptId: null,
                studentsList: []
            }
        },
        methods: {
            async getProgress() {
                let progressList = [];
                for (let student of this.studentsList) {
                    await utils.request({
                        invoke: api.requestGetProgressStu,
                        params: {
                            code: 'stu_get_progress',
                            stuId: student.stuId
                        },
                        result: fakeData.PROGRESS_STU
                    })
                        .then(function (res) {
                            progressList.push({
                                stuId: student.stuId,
                                progress: res.data.progress,
                                stuName: student.stuName
                            })
                        }.bind(this))
                }
                store.commit('startClass/GET_PROG', progressList);
                // the progress list is submitted above.
                console.log(progressList);
                console.log(store.state.startClass.prog)
            },
            // start the class, request the classroom, load the material
            loadMaterial(courseSectionId, classId) {
                this.classId = classId;
                utils.request({
                    invoke: api.requestStartClass,
                    params: {
                        teacherId: store.state.teacherId,
                        classId: classId,
                        courseSectionId: courseSectionId
                    },
                    result: fakeData.START_CLASS_RESPONSE
                })
                    .then((function(res) {
                        if(res.data.code === 1) {
                            this.classroomId = res.data.classroomId;
                            this.selectedSectionId = parseInt(courseSectionId);
                            this.getStuList();
                            this.$message.success('成功开始上课！');
                            this.startClass()
                        }
                        else this.$message.error('开课失败')
                    }).bind(this))
            },
            getStuList() {
                utils.request({
                    invoke: api.requestStudentList,
                    params: {
                        classId: this.classId
                    },
                    result: fakeData.STUDENT_LIST
                })
                    .then((function (res) {
                        if(res.data.code === 1) {
                            for (let item of res.data.stuList) {
                                this.studentsList.push({
                                    stuId: item.stuId,
                                    stuName: item.stuName,
                                    stuNumber: item.stuNumber,
                                    selected: false
                                })
                            }
                        } else this.$message.error('获取学生列表失败')
                    }).bind(this))
            },
            startClass () {
                this.$refs.askList.getQueue();
                this.$refs.show.getSlides(this.selectedSectionId);
            },
            onEmitIndex(index) {
                if(!this.selectedSectionId) {
                    this.$message.warning('请先选择课时')
                } else {
                    this.current = false;
                    utils.request({
                        invoke: api.requestStartActivity,
                        params: {
                            exerciseId: index.exerciseId
                        },
                        result: fakeData.SINGLE_NUMBER_CODE
                    })
                        .then(function (res) {
                            if (res.data.code === 1) {
                                this.$refs.newComp.getCurrentComponent(index);
                            } else {
                                this.$message.error('开启失败')
                            }
                        }.bind(this))
                }
            },
            onEmmitCurrent(current) {
                this.current = current
            },
            pageTurning(index) {
                this.pptIndex = index
            },
            getPPTId (pptId) {
                this.pptId = pptId;
                this.$refs.activity.getExercise(this.pptId, this.pptIndex)
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
    min-height: 715px;
  }

  .el-footer {
    padding-right: 0;
  }

  .banner {
    text-align: center;
  }
</style>
