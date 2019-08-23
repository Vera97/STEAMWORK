<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div>
        <el-button type="primary" style="width: 100%;margin: 0 0 1%" @click="edit">修改课程名称</el-button>
        <el-button type="primary" @click="open" style="width: 100%;margin:0 0 10px">添加课时</el-button>
        <el-card class="box-card">
          <h3>课时列表</h3>
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
    </el-col>
    <el-col :span="18">
      <div>
        <el-input
                type="textarea"
                :rows="10"
                placeholder="请输入内容"
                v-model="textarea">
        </el-input>
      </div>
      <div>
        <el-button class="button-box" type="primary">
          点击上传音视频文件
        </el-button>
      </div>
      <div>
        <el-button class="button" type="primary" round @click="conserve">保存</el-button><el-button @click="nodo" class="button" type="primary" round>取消</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
    import store from '../../store'
    import {api, fakeData} from '../../api'
    import utils from '../../utils'
    export default {
        name: "edit-course",
        data() {
            return {
                textarea:'',
                defaultProps: {
                    children: 'courseStepList',
                    label: function(data, node) {
                        if(node.level === 1) return data.courseSectionName;
                        else return data.title;
                    }
                },
                listData: []
            };
        },
        methods: {
            edit(courseId){
                // let that = this;
                // alert(`del for ${courseId}`);
                this.$prompt('修改课程名称：', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    utils.request({
                        invoke: api.requestEditCourseName,
                        params: {
                            courseId: courseId,
                            courseName: value,
                        },
                        result: fakeData.EDIT_COURSE
                    })
                    //     .then(() => {//编辑
                    //     const index = that.listData.findIndex(d => d.courseId=== store.state.courseId);
                    //     const temp = that.listData[index];
                    //     that.$set(temp, 'title', value);
                    //     that.$set(that.listData,index,temp);
                    // });
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
            nodo(){
                store.commit('admin/ADD_INDEX','resource-list');
            },
            conserve(){
                alert("保存成功！");
            },
            handleNodeClick(data, node) {
                if(node.isLeaf) {
                    this.$emit('section-selected', {
                        courseSectionId: data.courseSectionId,
                        courseSectionName: data.courseSectionName
                    })
                }
            },
            open(data,courseId) {
                let that = this;
                this.$prompt('请输入课时名称：', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    //向后端请求加入数据库
                    utils.request({
                        invoke: api.requestNewCourseSection,
                        params: {
                            courseId: courseId,
                            courseName: value
                        },
                        result: fakeData.COURSE_SECTION
                    }).then(res => {
                        that.listData.push({
                            courseSectionId:res.data.courseSectionId,
                            courseSectionName:value,
                            courseStepList: []
                        });
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
                            'margin-right': '20%'
                        },
                    },
                    ['']
                );
                let editCourse = h(
                    'i',
                    {
                        'class': 'el-icon-edit',
                        props: {
                            size: 'mini',
                            type: 'button',
                        },
                        on: {
                            click() {
                                that.editCourse(data.courseSectionId)
                            }
                        },
                        style: {
                            'margin-right': '20%'
                        },
                    },
                    ['']
                );
                let delCourse = h(
                    'i',
                    {
                        'class':'el-icon-delete',
                        props: {
                            size: 'mini',
                            type: 'button',

                        },
                        on: {
                            click() {
                                that.delCourse(data.courseSectionId)
                            }
                        },
                        style: {
                            'margin-right': '20px'
                        },
                    },
                    [' ']
                );
                let removeSection = h(
                    'i',
                    {
                        'class':'el-icon-delete',
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
                            'float':'right'
                        },
                    },
                    [' ']
                );
                let button;
                button = node.level === 1 ? [addSection,editCourse,delCourse] : removeSection;
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
            addCourseSection(node, courseId, sectionId) {
                this.$prompt('新建的步骤名称:', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    utils.request({
                        invoke: api.requestNewCourseSectionStep,
                        params: {
                            courseId: courseId,
                            courseSectionId: sectionId,
                        },
                        result: fakeData.SECTION_STEP
                    }).then(res => {
                        if(res.data.code === 1){
                            node.data.courseStepList.push({
                                title: value,
                                courseStepId:res.data.courseStepId,
                            });
                        }
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
                utils.request({
                    invoke: api.requestDeleteCourseSection,
                    params: {
                        courseSectionId: sectionId,
                    },
                    result: fakeData.COURSE_SECTION
                }).then(() => {
                    const child=node.parent.data.courseSection;
                    const index = child.findIndex(d => d.courseSectionId === sectionId);
                    child.splice(index, 1);
                })
            },

            addCourse(teacherId){
                alert(`add for ${teacherId}`);
            },
            editCourse(courseSectionId){//修改课时名称，对应图标铅笔
                let that = this;
                // alert(`del for ${courseId}`);
                this.$prompt('修改课时名称：', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    utils.request({
                        invoke: api.requestEditCourseSectionName,
                        params: {
                            courseSectionId: courseSectionId,
                            courseSectionName: value
                        },
                        result: fakeData.EDIT_COURSE
                    }).then(() => {//编辑
                        const index = that.listData.findIndex(d => d.courseSectionId=== courseSectionId);
                        console.log(that.listData[index]);
                        const temp = that.listData[index];
                        that.$set(temp, 'courseSectionName', value);
                        that.$set(that.listData,index,temp);
                    });
                    this.$message({
                        type: 'success',
                        message: '您更改后的课时名称是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            delCourse(courseSectionId){
                let that = this;
                this.$confirm('此操作将永久删除整个课时, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    utils.request({
                        invoke: api.requestDeleteCourseSection,
                        params: {
                            courseSectionId: store.state.courseSectionId,
                        },
                        result: fakeData.COURSE_SECTION
                    }).then(() => {
                        const index = that.listData.findIndex(d => d.courseSectionId === courseSectionId);
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
                invoke: api.requestCourseDetail,
                params: {
                    courseId: store.state.courseId
                },
                result: fakeData.COURSE_DETAIL
            }).then(res => {
                this.listData = res.data.courseSection.map(item => {
                    return {
                        courseSectionId: item.courseSectionId,
                        courseSectionName: item.courseSectionName,
                        courseStepList: []
                    }
                });
            });
            for(let i = 0; i < this.listData.length; i++) {
                utils.request({
                    invoke: api.requestCourseSteps,
                    params: {
                        code: 'step_contents',
                        stepId: ''
                    },
                    result:fakeData.PERIOD_STEPS
                })
                    .then(res => {
                        this.listData[i].courseStepList.push(...res.data);
                    })
            }
        }
    }
</script>

<style scoped>
  .button-box{
    margin-top: 1%;
    width: 100%;
  }
  .button{
    margin-top: 1%;
    float: right;
    margin-left: 2%;
  }
  h3{
    margin-top: 0px;
  }

</style>