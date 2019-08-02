<template>
  <div>
    <el-button type="primary" @click="open" style="width: 100%;margin-bottom: 10px">+ 新建课程</el-button>
    <el-card class="box-card">
      <h3>课程列表</h3>
      <el-tree
              :data="listData"
              :props="defaultProps"
              default-expand-all
              :expand-on-click-node="false"
              :render-content="renderContent"
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
                    label: function(data, node) {
                        if(node.level === 1) return data.title;
                        else return data.courseSectionName
                    }
                },
                listData: []
            };
        },
        methods: {
            handleNodeClick(data) {
                console.log(data);
            },
            open() {
                this.$prompt('请输入课程名称：', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    //向后端请求加入数据库
                        utils.request({
                            invoke:api.requestNewCourse,
                            param:{
                                courseId: this.id,
                                courseSectionName: value
                            },
                            result: fakeData.ADD_COURSE
                        }).then(res => {
                            store.commit('ppt/ADD_COURSE', res.data);
                            console.log(res.data)
                        });
                    this.$message({
                        type: 'success',
                        message: '你新建的课程名称: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            renderContent(h, { node, data, store }) {
                let that = this;

                let addSection = h(
                    'el-button',
                    {
                        props: {
                            size: 'mini',
                            type: 'text'
                        },
                        on: {
                            click() {
                                that.addCourseSection(node, data.courseId)
                            }
                        }
                    },
                    ['添加课时']
                );
                let editCourse = h(
                    'el-button',
                    {
                        props: {
                            size: 'mini',
                            type: 'text',
                        },
                        on: {
                            click() {
                                that.editCourse(data.courseId)
                            }
                        }
                    },
                    ['修改']
                );
                let delCourse = h(
                    'el-button',
                    {
                        props: {
                            size: 'mini',
                            type: 'text',
                        },
                        on: {
                            click() {
                                that.delCourse(data.courseId)
                            }
                        }
                    },
                    ['删除']
                );
                let removeSection = h(
                    'el-button',
                    {
                        props: {
                            size: 'mini',
                            type: 'text'
                        },
                        on: {
                            click() {
                                that.removeCourseSection(node, node.parent.data.courseId, data.courseSectionId)
                            }
                        }
                    },
                    ['移除课时']
                );
                let button;
                button = node.level === 1 ? addSection : removeSection;
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
                            'padding-right': '8px'
                        }
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
                this.$prompt('请输入课时名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    utils.request({
                        invoke: api.requestNewCourseSection,
                        params: {
                            courseId: courseId,
                            courseName: value
                        },
                        result: fakeData.COURSE_SECTION
                    }).then(res => {
                        node.data.courseSection.push({
                            courseSectionId: res.data.courseSectionId,
                            courseSectionName:value
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    })
                });
            },
            removeCourseSection(node, courseId, sectionId) {
                this.$confirm('此操作将永久删除本课时, 是否继续?', '提示', {
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
                    }).then(()=> {
                        const child=node.parent.data.courseSection;
                        const index = child.findIndex(d => d.courseSectionId ===sectionId);
                        child.splice(index, 1);
                    })
                });
            },
            editCourse(courseId){
                this.$prompt('修改课程名称：', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    let that=this;
                    utils.request({
                        invoke: api.requestEditCourseName,
                        params: {
                            courseId: courseId,
                            courseName: value,
                        },
                        result: fakeData.EDIT_COURSE
                    }).then(()=> {//编辑
                        const index = that.listData.findIndex(d => d.courseId=== courseId);
                        const temp=that.listData[index];
                        that.$set(temp,'title',value);
                        that.$set(that.listData,index,tag);
                    });
                    this.$message({
                        type: 'success',
                        message: '您更改后的课程名称是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            delCourse(courseId){
                this.$confirm('此操作将永久删除整个课程, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let that=this;
                    utils.request({
                        invoke: api.requestDeleteCourse,
                        params: {
                            courseId: courseId,
                        },
                        result: fakeData.DELETE_COURSE
                    }).then(() => {//删除课程主要代码
                        const index = that.listData.findIndex(d => d.courseId=== courseId);
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
            })
                    .then(res => {
                        this.listData = res.data.courses.map(item => {
                            return {
                                courseId: item.courseId,
                                title: item.title,
                                courseSection: []
                            }
                        });
                    });

            for(let i = 0; i < this.listData.length; i++) {
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
</style>
