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
      <el-select value-key="id" class="select" multiple v-model="value" filterable remote :remote-method="search"
                 placeholder="请选择">
        <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item">
        </el-option>
      </el-select>
      <el-button type="primary" class="save" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
    import store from '../../store'
    import {api, fakeData} from '../../api'
    import utils from '../../utils'

    export default {
        name: "r-stu-list",
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
                            classId: parseInt(store.state.studentsList.classId),
                            stuId: parseInt(row.stuId)
                        },
                        result: fakeData.SINGLE_NUMBER_CODE
                    })
                        .then(res => {
                            if(res.data.code === 1) {
                                store.commit('studentsList/REMOVE_STUDENT', row.stuId);
                                this.$message.success('移除成功')
                            } else {
                                this.$message.error('移除失败')
                            }
                        })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消移除'
                    });
                })
            },
            search(input) {
                let that = this;
                utils.request({
                    invoke: api.requestSearchCourses,
                    params: {
                        course_name_keyword: input
                    },
                    result: fakeData.SEARCH_COURSE
                })
                    .then(res => {
                        that.options = res.data.chunks.map(item => {
                            return {name: item.title, id: item.courseId}
                        })
                    })
            },
            save() {
                for(let student of this.listData) {
                    for(let period in student.scoreList) {

                        let courseSectionId = undefined;
                        for(let i of store.state.studentsList.periodsList) {
                            if(i.courseSectionName === period) {
                                courseSectionId = i.courseSectionId;
                                break;
                            }
                        }

                        utils.request({
                            invoke: api.requestClassStuScore,
                            params: {
                                code: 'stu_score_edit',
                                stuId: student.stuId,
                                courseId: store.state.studentsList.courseId,     /* may be not valid */
                                courseSectionId: courseSectionId,
                                score: parseInt(student.scoreList[period])
                            },
                            result: fakeData.SINGLE_NUMBER_CODE
                        })
                    }
                }

                this.$emit('change-class-list', this.value);

                utils.request({
                    invoke: api.requestClassCourseList,
                    params: {
                        code: 'course_list_edit',
                        classId: store.state.studentsList.classId,
                        courseList: this.value
                    },
                    result: fakeData.SINGLE_RESPONSE_WORD
                })
                    .then();

                this.value = []
            },
            rate() {
                console.log(store.state.studentsList.stuList)
            },

            // note that only fields in the first layer will be responsive under directly assignment
            // unfortunately, scoreList is a second layer filed, which need to be assigned manually
            // use Object.assign in this.listData will destroy the array structure. so i split the assignment into two steps.
            render() {
                this.listData = store.state.studentsList.stuList.map(item => {
                    return {
                        stuId: item.stuId,
                        stuName: item.stuName,
                        scoreList: {},
                        stuNumber: item.stuNumber
                    }
                });

                for(let i = 0; i < this.listData.length; i++) {
                    this.listData[i].scoreList = Object.assign({}, this.listData[i].scoreList, store.state.studentsList.stuList[i].scoreList)
                }
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
            }
        },
        computed: {
            periodsList() {
                return store.state.studentsList.periodsList
            }
        },
        data() {
            return {
                options: [],
                value: [],
                input: '',
                listData: []
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
