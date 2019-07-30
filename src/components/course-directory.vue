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
                alert(`add for ${courseId}`)
            },
            removeCourseSection(node, courseId, sectionId) {
                alert(`remove for ${courseId} and ${sectionId}`)
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
