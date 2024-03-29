<template>
  <div class="content">
    <div class="center" v-if="classId !== null">
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
    <div class="bottom" v-if="classId !== null">
      <el-button type="plain" class="save" @click="rate" size="medium">导出</el-button>
      <el-button type="plain" class="save" @click="savePrompt" size="medium">保存</el-button>
      <el-button type="primary" class="save" @click="addStudent" size="medium">添加学生</el-button>
    </div>
    <div v-else class="absent"><h1>&hearts;&emsp;请选择一个班级&emsp;&hearts;</h1></div>
  </div>
</template>

<script>
    import {api, fakeData} from '../../api'
    import utils from '../../utils'

    const iconv = require('iconv-lite');

    export default {
        name: "r-stu-list",
        data() {
            return {
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
            },
            rate() {
                let buffer = '学生姓名,学生学号,';
                for (let item of this.periodsList) {
                    buffer += item.courseSectionName + ','
                }
                buffer += '\n';
                for (let item of this.listData) {
                    buffer += item.stuName + ',' + item.stuNumber.toString() + ',';
                    for (let period of this.periodsList) {
                        buffer += item.scoreList[period.courseSectionName] + ','
                    }
                    buffer += '\n'
                }
                if (/[Ww]in/.exec(navigator.platform)) {
                    buffer = iconv.encode(buffer, 'GBK')
                }
                let downloadBlobURL = URL.createObjectURL(new Blob([buffer], {
                    type: 'text/csv'
                }));
                let tmpNode = document.createElement('a');
                tmpNode.setAttribute('href', downloadBlobURL);
                tmpNode.setAttribute('download', '学生成绩.csv');
                tmpNode.click();
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
        }
    }
</script>

<style scoped>
  .bottom {
    margin-top: 10px;
  }

  .save {
    float: right;
    width: 10%;
    margin-left: 1em;
  }

  .input {
    float: right;
    width: 60%;
    padding-top: 0;
    padding-bottom: 0;
  }

  .absent {
    text-align: center;
    margin-top: 3em;
  }
</style>
