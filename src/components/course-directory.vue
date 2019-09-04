<template>
  <div>
    <el-button type="primary" @click="open" style="width: 100%;margin-bottom: 10px">+ 新建课程</el-button>
    <el-card class="box-card">
      <h3>课程列表</h3>
      <el-tree
              :data="listData"
              :props="defaultProps"
              :expand-on-click-node="true"
              :render-content="renderContent"
              accordion
              @node-click="handleNodeClick">
      </el-tree>
    </el-card>
  </div>
</template>

<script>
    import store from '../store'
    import {api, fakeData} from '../api'
    import utils from '../utils'

    export default {
        name: "course-directory",
        data() {
            return {
                defaultProps: {
                    children: 'courseSection',
                    label: function (data, node) {
                        if (node.level === 1) return data.title;
                        else return data.courseSectionName
                    }
                },
                listData: [],
            };
        },
        methods: {
            handleNodeClick(data, node) {
                if (node.level === 2) {
                    this.$emit('section-selected', {
                        courseSectionId: data.courseSectionId,
                        courseSectionName: data.courseSectionName
                    })
                }
            },
            open() {
                this.$prompt('请输入课程名称：', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(function({value}) {
                    //向后端请求加入数据库
                    utils.request({
                        invoke: api.requestNewCourse,
                        params: {
                            teacherId: store.state.teacherId,
                            courseName: value
                        },
                        result: fakeData.ADD_COURSE
                    }).then(function(res) {
                        this.listData.push({
                            courseId: res.data.courseId,
                            title: value,
                            courseSection: []
                        });
                    }.bind(this));
                    this.$message({
                        type: 'success',
                        message: '你新建的课程名称: ' + value
                    });
                }.bind(this)).catch(function() {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                }.bind(this));
            },
            renderContent(h, {node, data}) {
                let that = this;
                let addSection = h(
                    'i',
                    {
                        'class': 'el-icon-plus',
                        props: {
                            size: 'mini',
                            type: 'button'
                        },
                        on: {
                            click() {
                                that.addCourseSection(node, data.courseId)
                            }
                        },
                        style: {
                            'margin-right': '8px'
                        },
                    },
                    [' ']
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
                                    that.editCourse(data.courseId)
                                } else if (node.level === 2) {
                                    that.editCourseSection(data.courseSectionId, node)
                                }
                            }
                        },
                        style: {
                            'margin-right': '8px'
                        },
                    },
                    ['']
                );
                let delCourse = h(
                    'i',
                    {
                        'class': 'el-icon-delete',
                        props: {
                            size: 'mini',
                            type: 'button',

                        },
                        on: {
                            click() {
                                that.delCourse(data.courseId)
                            }
                        },
                        style: {
                            'margin-right': '0'
                        },
                    },
                    [' ']
                );
                let removeSection = h(
                    'i',
                    {
                        'class': 'el-icon-delete',
                        props: {
                            size: 'mini',
                            type: 'button'
                        },
                        on: {
                            click() {
                                that.removeCourseSection(node, node.parent.data.courseId, data.courseSectionId)
                            }
                        },
                        style: {
                            'float': 'right'
                        },
                    },
                    [' ']
                );
                let button;
                button = node.level === 1 ? [addSection, edit, delCourse] : [edit,removeSection];
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
                            //'margin-left': '10%',
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
            addCourseSection(node, courseId) {
                this.$prompt('新建的课时名称:', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    utils.request({
                        invoke: api.requestNewCourseSection,
                        params: {
                            courseId: courseId,
                            courseSectionName: value
                        },
                        result: fakeData.COURSE_SECTION
                    }).then(res => {
                        node.data.courseSection.push({
                            courseSectionId: res.data.courseSectionId,
                            courseSectionName: value
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
                    })
                });
            },
            removeCourseSection(node, courseId, sectionId) {
                this.$confirm('此操作将删除该课时, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    utils.request({
                        invoke: api.requestDeleteCourseSection,
                        params: {
                            courseSectionId: sectionId,
                        },
                        result: fakeData.COURSE_SECTION
                    }).then(() => {
                        const child = node.parent.data.courseSection;
                        const index = child.findIndex(d => d.courseSectionId === sectionId);
                        child.splice(index, 1);
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

            addCourse(teacherId) {
                alert(`add for ${teacherId}`);
            },
            editCourse(courseId) {
                this.$prompt('修改课程名称：', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(function({value}) {
                    utils.request({
                        invoke: api.requestEditCourseName,
                        params: {
                            courseId: courseId,
                            courseName: value,
                        },
                        result: fakeData.SINGLE_NUMBER_CODE
                    }).then(function(res) {//编辑
                        if (res.data.code === 1) {
                            const index = this.listData.findIndex(d => d.courseId === courseId);
                            this.$set(this.listData[index], 'title', value);
                            this.$message({
                                type: 'success',
                                message: '您更改后的课程名称是: ' + value
                            });
                        } else {
                            this.$message.error('修改失败')
                        }

                    }.bind(this));
                }.bind(this))
            },
            editCourseSection(courseSectionId, node) {//缺少修改课程名称的api
                this.$prompt('修改课时名称：', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(function({value}) {
                    utils.request({
                        invoke: api.requestEditCourseSectionName,
                        params: {
                            courseSectionId: courseSectionId,
                            courseSectionName: value
                        },
                        result: fakeData.SINGLE_NUMBER_CODE
                    }).then(function(res) {//编辑
                        if (res.data.code === 1) {
                            node.data.courseSectionName = value;
                            // for (let i = 0; i < this.listData.length; i++) {
                            //     const index = this.listData[i].courseSection.findIndex(d => d.courseSectionId === courseSectionId);
                            //     if (index!==undefined) {
                            //         const temp = this.listData[i].courseSection[index];
                            //         this.$set(temp, 'courseSectionName', value);
                            //         this.$set(this.listData[i], index, temp);
                            //         break;
                            //     }
                            // }
                            this.$message({
                                type: 'success',
                                message: '您更改后的课时名称是: ' + value
                            });
                        } else {
                            this.$message.error('修改失败')
                        }
                    }.bind(this));
                }.bind(this))
            },
            delCourse(courseId) {
                let that = this;
                this.$confirm('此操作将永久删除整个课程, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    utils.request({
                        invoke: api.requestDeleteCourse,
                        params: {
                            courseId: courseId,
                        },
                        result: fakeData.DELETE_COURSE
                    }).then(() => {//删除课程主要代码
                        const index = that.listData.findIndex(d => d.courseId === courseId);
                        that.listData.splice(index, 1);
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
            }
        },
        async created() {
            await utils.request({
                invoke: api.requestTeacherOwnCourses,
                params: {
                    teacherId: store.state.teacherId
                },
                result: fakeData.TEACHER_OWN_COURSE
            }).then(res => {
                this.listData = res.data.courses.map(item => {
                    return {
                        courseId: item.courseId,
                        title: item.title,
                        courseSection: []
                    }
                });
            });
            for (let i = 0; i < this.listData.length; i++) {
                utils.request({
                    invoke: api.requestCourseDetail,
                    params: {
                        courseId: this.listData[i].courseId
                    },
                    result: fakeData.COURSE_DETAIL
                })
                    .then(res => {
                        this.listData[i].courseSection.push(...res.data.courseSection)
                    })
            }
        }
    }
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .box-card{
    max-height:30em;
    overflow:auto;
  }
  h3{
    margin-top: 0px;
  }
</style>
