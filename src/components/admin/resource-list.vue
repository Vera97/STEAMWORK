<template>
  <div class="list">
    <el-select v-model="selectArray" multiple placeholder="请选择筛选课程的标签" class="elSelect">
      <el-option
              v-for="item in options"
              :key="item.labelId"
              :label="item.labelName"
              :value="item.labelId">
      </el-option>
    </el-select>
    <el-card class="box-card">
      <h3>课程列表</h3>
      <el-tree
              :data="listData"
              class="filter-tree"
              :props="defaultProps"
              :expand-on-click-node="true"
              :render-after-expand="false"
              :render-content="renderContent"
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
              accordion
              ref="tree"
      >
      </el-tree>
    </el-card>
    <el-button type="primary" @click="addCourse" style="width: 100%;margin-top: 3%;">+ 新建课程</el-button>
  </div>
</template>

<script>
    import store from '../../store'
    import {api, fakeData} from '../../api'
    import utils from '../../utils'

    export default {
        name: "resource-list",
        watch: {
            selectArray(val) {
                this.$refs.tree.filter(val);
            },
        },
        data() {
            return {
                listData: [],
                defaultProps: {
                    children: 'child',
                    label: function (data) {
                        return data.title;
                    }
                },
                key: 0,                 /* a unique key for the node. to select a node after loaded. */
                expandKey: [],
                options: [],
                selectArray: [],
            };
        },
        methods: {
            async filterNode(value, data, node) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
                let answer = false;
                if (node.level === 1) {
                    for (let i = 0; i < value.length; i++) {
                        await utils.request({
                            invoke: api.requestLabelFilter,
                            params: {
                                labelId: value[i].labelId
                            },
                            result: fakeData.FILTER_LABEL
                        }).then(res => {
                            if (res.data.code === 1) {
                                for (let j = 0; j < res.data.courseList.length; j++) {
                                    if (res.data.courseList[j].courseId === data.courseId) {
                                        answer = true;
                                    }
                                }
                            }
                        });
                    }
                    console.log(answer);
                    return answer;
                }
            },
            select() {
                utils.request({
                    invoke: api.requestGetLabelList,
                    params: {
                        adminId: 10
                    },
                    result: fakeData.GET_LABEL_LIST
                }).then(res => {
                    if (res.data.code === 1) {
                        console.log(res.data.labelList);
                        this.options = res.data.labelList;
                    }
                });
            },
            handleNodeClick(data, node) {
                if (node.level === 1) {
                    this.$emit('course-selected', {
                        courseId: data.courseId,
                        courseName: data.title
                    })
                } else if (node.level === 2) {
                    this.$emit('section-selected', {
                        courseSectionId: data.courseSectionId,
                        courseSectionName: data.title
                    })
                } else {
                    this.$emit('step-selected', {
                        stepId: data.stepId,
                        stepName: data.title
                    })
                }
            },
            renderContent(h, {node, data}) {
                let that = this;
                let add = h(
                    'i',
                    {
                        'class': 'el-icon-plus',
                        props: {
                            size: 'mini',
                            type: 'button'
                        },
                        on: {
                            click() {
                                if (node.level === 1) {
                                    that.addCourseSection(node, data.courseId)
                                } else if (node.level === 2) {
                                    that.addCourseSectionStep(node, data.courseSectionId)
                                }
                            }
                        },
                        style: {
                            'margin-right': '20px'
                        },
                    },
                    ['']
                );
                let edit = h(
                    'i',
                    {
                        'class': 'el-icon-edit',
                        props: {
                            size: 'mini',
                            type: 'button',
                        },
                        on: {
                            click() {
                                if (node.level === 1) {
                                    that.editCourse(node, data.courseSectionId)
                                } else if (node.level === 2) {
                                    that.editCourseSection(node, data.courseSectionId)
                                } else
                                    that.editStep(node, data.stepId)
                            }
                        },
                        style: {
                            'margin-right': '20%'
                        },
                    },
                    ['']
                );
                let del = h(
                    'i',
                    {
                        'class': 'el-icon-delete',
                        props: {
                            size: 'mini',
                            type: 'button',

                        },
                        on: {
                            click() {
                                if (node.level === 1) {
                                    that.delCourse(node, data.courseId)
                                } else if (node.level === 2) {
                                    that.delCourseSection(node, data.courseSectionId)
                                } else {
                                    that.delStep(data.stepId)
                                }

                            }
                        },
                        style: {
                            'margin-right': '20px'
                        },
                    },
                    [' ']
                );
                let button;
                button = node.level === 3 ? [edit, del] : [add, edit, del];
                let panel = h(
                    'span',
                    {},
                    [
                        button
                    ]
                );
                return h(
                    'span',
                    {
                        style: {
                            flex: '1',
                            display: 'flex',
                            'align-items': 'center',
                            'justify-content': 'space-between',
                            'font-size': '14px',
                            'padding-right': '8px',
                            // 'margin-left': '10%',
                        },
                    },

                    [
                        h(
                            'span',
                            {},
                            [node.label]
                        ),
                        panel
                    ]
                )
            },
            editStep(node, stepId) {//缺少api
                this.$prompt('修改步骤名称为', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    utils.request({
                        invoke: api.requestNewCourse,
                        params: {
                            adminId: this.adminId,
                            courseName: value
                        },
                        result: fakeData.ADD_COURSE
                    }).then(res => {
                        this.$set(node.data, 'title', value);
                    });
                    this.$message({
                        type: 'success',
                        message: '修改步骤名称为: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            editCourseSection(node, courseSectionId) {
                this.$prompt('修改课时名称为', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    utils.request({
                        invoke: api.requestEditCourseSectionName,
                        params: {
                            courseSectionId: courseSectionId,
                            courseSectionName: value
                        },
                        result: fakeData.EDIT_COURSE
                    }).then(res => {
                        if (res.data.code === 1)
                            this.$set(node.data, 'title', value);
                    });
                    this.$message({
                        type: 'success',
                        message: '修改课时名称为: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            editCourse(node, courseId) {
                this.$prompt('修改课程名称为', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    utils.request({
                        invoke: api.requestEditCourseName,
                        params: {
                            courseId: courseId,
                            courseName: value
                        },
                        result: fakeData.EDIT_COURSE
                    }).then(res => {
                        if (res.data.code === 1)
                            this.$set(node.data, 'title', value);
                    });
                    this.$message({
                        type: 'success',
                        message: '修改课程名称为: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },

            delCourse(node, courseId) {
                this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    utils.request({//api修改
                        invoke: api.requestDeleteCourse,
                        params: {
                            courseSectionId: store.state.courseSectionId,
                        },
                        result: fakeData.COURSE_SECTION
                    }).then(() => {
                        const index = this.listData.findIndex(d => d.courseId === courseId);
                        this.listData.splice(index, 1);
                    });
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            delCourseSection(node, courseSectionId) {
                this.$confirm('此操作将永久删除该课时, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    utils.request({//api修改
                        invoke: api.requestDeleteCourse,
                        params: {
                            courseSectionId: store.state.courseSectionId,
                        },
                        result: fakeData.COURSE_SECTION
                    }).then(() => {
                        for (let i = 0; i < this.listData.length; i++) {
                            for (let j = 0; j < this.listData[i].child.length; j++) {
                                if (this.listData[i].child[j].courseSectionId === courseSectionId) {
                                    const index = this.listData[i].child.findIndex(d => d.courseSectionId === courseSectionId)
                                    this.listData[i].child.splice(index, 1);
                                }
                            }
                        }
                    });
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            delStep(stepId) {
                this.$confirm('此操作将永久删除该步骤, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    utils.request({//api缺少
                        invoke: api.requestDeleteCourse,
                        params: {
                            courseSectionId: store.state.courseSectionId,
                        },
                        result: fakeData.COURSE_SECTION
                    }).then(() => {
                        utils.request({//api缺少
                            invoke: api.requestDeleteCourse,
                            params: {
                                courseSectionId: store.state.courseSectionId,
                            },
                            result: fakeData.COURSE_SECTION
                        }).then(() => {
                            for (let i = 0; i < this.listData.length; i++) {
                                for (let j = 0; j < this.listData[i].child.length; j++) {
                                    for (let t = 0; t < this.listData[i].child[j].child.length; t++)
                                        if (this.listData[i].child[j].child[t].stepId === stepId) {
                                            const index = this.listData[i].child[j].child.findIndex(d => d.stepId === stepId);
                                            this.listData[i].child[j].child.splice(index, 1);
                                        }
                                }
                            }
                        });
                    });
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addCourse() {
                this.$prompt('请输入新增课程名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    utils.request({
                        invoke: api.requestNewCourse,
                        params: {
                            adminId: this.adminId,
                            courseName: value
                        },
                        result: fakeData.ADD_COURSE
                    }).then(res => {
                        this.listData.push({
                            courseId: res.data.courseId,
                            title: value,
                            child: []
                        });
                    });
                    this.$message({
                        type: 'success',
                        message: '新增课程名称是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            addCourseSection(node, courseId) {
                this.$prompt('请输入课时名称：', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    //向后端请求加入数据库
                    utils.request({
                        invoke: api.requestNewCourseSection,
                        params: {
                            courseId: courseId,
                            courseName: value
                        },
                        result: fakeData.COURSE_SECTION
                    }).then(res => {
                        node.data.child.push({
                            courseSectionId: res.data.courseSectionId,
                            title: value,
                            child: []
                        });
                    });
                    this.$message({
                        type: 'success',
                        message: '你新建的课时名称: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            addCourseSectionStep(node, sectionId) {
                this.$prompt('新建的步骤名称:', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    this.$emit('addStep',value);
                    node.data.child.push({
                        title: value
                    });
                    this.$message({
                        type: 'success',
                        message: '你新建的步骤名称: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    })
                });
            }
        },
        created() {
            this.select();
            utils.request({//请求数据库中已有课程并渲染到树形控件中
                invoke: api.getCourseChunk,
                params: {
                    code: 'course_all',
                    gotten: 0,
                    length: 0
                },
                result: fakeData.SEARCH_COURSE
            }).then(res => {
                utils.request({
                    invoke: api.getCourseChunk,
                    params: {
                        code: 'course_all',
                        gotten: 0,
                        length: res.data.totalCount
                    },
                    result: fakeData.SEARCH_COURSE
                }).then(res => {
                    this.listData = res.data.chunks.map(item => {
                        return {
                            courseId: item.courseId,
                            title: item.title,
                            child: []
                        }
                    });
                    for (let i = 0; i < this.listData.length; i++) {
                        utils.request({
                            invoke: api.requestCourseDetail,
                            params: {
                                courseId: this.listData[i].courseId
                            },
                            result: fakeData.COURSE_DETAIL
                        }).then(res => {
                            this.listData[i].child = res.data.courseSection.map(item => {
                                return {
                                    courseSectionId: item.courseSectionId,
                                    title: item.courseSectionName,
                                    child: []
                                }
                            });
                            for (let j = 0; j < this.listData[i].child.length; j++) {
                                utils.request({
                                    invoke: api.requestCourseSteps,
                                    params: {
                                        code: 'step_contents',
                                        stepId: ''
                                    },
                                    result: fakeData.PERIOD_STEPS
                                })
                                    .then(res => {
                                        this.listData[i].child[j].child = res.data.map(item => {
                                            return {
                                                stepId: item.stepId,
                                                title: item.title
                                            }
                                        });
                                    })
                            }
                        });
                    }
                });
            });
        }
    }
</script>

<style scoped>
  .elSelect {
    width: 100%;
    margin-bottom: 3%;
  }

  .box-card {
    overflow: auto;
    min-height: 30em;
    max-height: 30em
  }
</style>

