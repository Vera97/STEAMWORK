<template>
  <div class="content">
    <div class="top">
      <a href="#"><h5 class="export" @click="rate">导出成绩</h5></a>
      <a href="#"><h5 class="export" @click="addStudent">添加学生</h5></a>
    </div>
    <div class="center">
      <el-table
              class="table"
              :data="listData"
              border
              style="width:100%"
              max-height="350px">
        <el-table-column
                fixed
                prop="stuName"
                label="学生姓名"
                width="85px">
        </el-table-column>
        <el-table-column
                fixed
                prop="stuNumber"
                label="学生学号"
                width="120px">
        </el-table-column>
        <el-table-column
                v-for="(item, index) in periodsList"
                :key="index"
                :label="item.courseSectionName"
                width="220px">
          <template slot-scope="scope">
            <a href="#">作业/报告</a>
            <el-input
                    placeholder="请输入成绩"
                    v-model="scope.row.scoreList[item.courseSectionName]"
                    class="input"
                    clearable>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="50px">
          <template slot-scope="scope">
            <el-button
                    @click.native.prevent="deleteRow(scope.row)"
                    type="text"
                    size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bottom">
      <h4 class="relative">关联课程：</h4>
      <el-select
              value-key="courseId"
              class="select"
              multiple
              v-model="relatedList"
              filterable
              remote
              :remote-method="search"
              placeholder="请选择"
              @change="handleRelatedChange"
      >
        <el-option
                v-for="item in options"
                :key="item.courseId"
                :label="item.title"
                :value="item">
        </el-option>
      </el-select>
      <el-button type="primary" class="save" @click="savePrompt">保存</el-button>
    </div>
  </div>
</template>

<script>
    import {api, fakeData} from '../../api'
    import utils from '../../utils'

    export default {
        name: "r-stu-list",
        data() {
            return {
                options: [],
                baseOptions: [],          /* holds the original related courses. */
                value: [],
                input: '',
                listData: [],             /* holds the data for the students. */
                relatedList: [],
                periodsList: [],
                classId: null,
                courseId: null
            }
        },
        methods: {
            deleteRow: function (row) {
                this.$confirm('确定要移除这位学生吗？（所有相关信息将无法恢复）:', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    utils.request({
                        invoke: api.requestAlterStudentList,
                        params: {
                            code: 'stu_list_remove',
                            classId: parseInt(this.classId),
                            stuId: parseInt(row.stuId)
                        },
                        result: fakeData.SINGLE_NUMBER_CODE
                    })
                        .then((function(res) {
                            if(res.data.code === 1) {
                                this.listData = this.listData.filter(item => {
                                    return item.stuId.toString() !== row.stuId.toString()
                                });
                                this.$message.success('移除成功')
                            } else {
                                this.$message.error('移除失败')
                            }
                        }).bind(this))
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消移除'
                    });
                })
            },
            search(input) {
                utils.request({
                    invoke: api.requestSearchCourses,
                    params: {
                        course_name_keyword: input
                    },
                    result: fakeData.SEARCH_COURSE
                })
                    .then((function (res) {
                        this.options = res.data.chunks.map(item => {
                            return {title: item.title, courseId: item.courseId}
                        });
                    }).bind(this))
            },
            savePrompt() {
                this.$confirm('是否保存学生名单与成绩？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                })
                    .then((function () {
                        this.save()
                    }).bind(this))
                    .catch();
            },
            async save() {
                for(let student of this.listData) {
                    for(let period in student.scoreList) {

                        let courseSectionId = undefined;
                        for(let i of this.periodsList) {
                            if(i.courseSectionName === period) {
                                courseSectionId = i.courseSectionId;
                                break;
                            }
                        }

                        await utils.request({
                            invoke: api.requestClassStuScore,
                            params: {
                                code: 'stu_score_edit',
                                stuId: student.stuId,
                                courseId: this.courseId,     /* may be not valid */
                                courseSectionId: courseSectionId,
                                score: parseInt(student.scoreList[period])
                            },
                            result: fakeData.SINGLE_NUMBER_CODE
                        })
                    }
                }

                // this.$emit('change-class-list', this.value);
                //
                // utils.request({
                //     invoke: api.requestAlterClassCourseList,
                //     params: {
                //         code: 'course_list_edit',
                //         classId: store.state.studentsList.classId,
                //         courseList: this.value
                //     },
                //     result: fakeData.SINGLE_RESPONSE_WORD
                // })
                //     .then();
                //
                // this.value = []
            },
            rate() {
                console.log(this.listData)
            },

            // note that only fields in the first layer will be responsive under directly assignment
            // unfortunately, scoreList is a second layer field, which need to be assigned manually
            // use Object.assign in this.listData will destroy the array structure. so i split the assignment into two steps.
            async render(classId, courseId) {
                // get the students list.
                [this.classId, this.courseId] = [classId, courseId];
                this.listData = [];
                this.periodsList = [];
                await utils.request({
                    invoke: api.requestStudentList,
                    params: {
                        classId: parseInt(classId)
                    },
                    result: fakeData.STUDENT_LIST
                })
                    .then((function(res) {
                        for(let i of res.data.stuList) {
                            this.listData.push({...i, scoreList: {}})
                        }
                    }).bind(this));

                if(!courseId) return;

                let tmp;

                await utils.request({
                    invoke: api.requestCourseDetail,
                    params: {
                        courseId: parseInt(courseId)
                    },
                    result: fakeData.COURSE_DETAIL
                })
                    .then(res => {
                        // get the names corresponding to the courseId.
                        tmp = res.data.courseSection;
                    });

                for(let k = 0; k < this.listData.length; k++) {
                    let id = this.listData[k].stuId;

                    // get the score of each student according to all of the period names
                    for(let i of tmp) {
                        await utils.request({
                            invoke: api.requestClassStuScore,
                            params: {
                                code: 'stu_score',
                                stuId: parseInt(id),
                                courseId: parseInt(courseId),
                                courseSectionId: i.courseSectionId
                            },
                            result: fakeData.STUDENT_SCORE
                        })
                            .then((function(res) {
                                this.$set(this.listData[k].scoreList, i.courseSectionName, res.data.score)
                            }).bind(this))
                    }
                }

                this.periodsList.push(...tmp);

                this.relatedList = [];
                utils.request({
                    invoke: api.requestClassCourseList,
                    params: {
                        classId: classId
                    },
                    result: fakeData.COURSES_IN_CLASS
                })
                    .then((function (res) {
                        for(let i of res.data.courseList) {
                            this.relatedList.push({
                                title: i.courseName,
                                courseId: i.courseId
                            })
                        }
                    }).bind(this));

                this.baseOptions = this.relatedList;
                this.options = this.baseOptions
            },
            addStudent() {
                this.$prompt('学生名称:', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                })
                    .then(res => {
                        if(res.action === 'confirm') {
                            let scoreList = {};
                            if(this.listData.length > 0 && this.listData[0].scoreList !== {}) {
                                for(let i in this.listData[0].scoreList) {
                                    scoreList[i] = 0
                                }
                            }
                            this.listData.push({
                                stuId: '123',
                                stuName: res.value,
                                scoreList: scoreList
                            })
                        }
                    })
            },
            handleRelatedChange(e) {
                console.log('hit');
                console.log(e)
            }
        }
    }
</script>

<style scoped>
  .top {
    margin-bottom: 10px;
  }

  .bottom {
    margin-top: 10px;
  }

  .export {
    float: right;
    margin-left: 2em;
  }

  .relative {
    width: 10%;
    float: left;
  }

  .select {
    width: 70%;
  }

  .save {
    float: right;
    width: 10%;
  }

  .input {
    float: right;
    width: 60%;
    padding-top: 0;
    padding-bottom: 0;
  }
</style>
