<template>
  <div class="list">
    <el-button type="primary" @click="addCourse" style="width: 100%;margin-bottom: 10px">+ 新建课程</el-button>
    <el-card class="box-card">
      <h3>课程列表</h3>
      <el-tree
              :data="listData"
              :props="defaultProps"
              :expand-on-click-node="true"
              :render-content="renderContent"
              accordion
              @node-click="handleNodeClick"
      >
      </el-tree>
    </el-card>
  </div>
</template>

<script>
    import store from '../../store'
    import {api, fakeData} from '../../api'
    import utils from '../../utils'

    export default {
        name: "try",
        data() {
            return {
                listData: [],
                defaultProps: {
                    children: 'child',
                    label: function (data, node) {
                        return data.title;
                    }
                },
                key: 0,                 /* a unique key for the node. to select a node after loaded. */
                expandKey: [],
            };
        },
        methods: {
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
                                if(node.level===1){
                                    that.addCourseSection(node, data.courseId)
                                }
                                else if(node.level===2){
                                    that.addCourseSectionStep(node, data.courseSectionId)
                                }
                            }
                        },
                        style: {
                            'margin-right': '20%'
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
                            click(node,data) {
                                if(node.level===1){
                                    that.editCourse(data.courseSectionId)
                                }else if(node.level===2){
                                    that.editCourseSection(data.courseSectionId)
                                }
                                    that.editCourseSection(data.courseSectionId)
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
                        'class':'el-icon-delete',
                        props: {
                            size: 'mini',
                            type: 'button',

                        },
                        on: {
                            click(node,data) {
                                if(node.level===1){
                                    that.delCourse(node,data.courseId)
                                }
                                else if(node.level===2){
                                    that.delCourseSection(node,data.courseSectionId)
                                }else{
                                    that.delStep(node,data.courseStepId)
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
                button = node.level === 3 ? [add,edit,del] : [edit,del];
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
            delCourse(node,courseId){
                const index =this.listData.findIndex(d => d.courseId === courseId)
                this.listData.splice(index,1);
            },
            delCourseSection(node,courseSectionId){
                for(let i=0;i<this.listData.length;i++){
                    for(let j=0;j<this.listData[i].child.length;j++){
                        if(this.listData[i].child[j].courseSectionId===courseSectionId){
                            const index =this.listData[i].child.findIndex(d => d.courseSectionId=== courseSectionId)
                            this.listData[i].child.splice(index,1);
                        }
                    }
                }
            },
            delStep(node,courseStepId){
                for (let i = 0; i < this.listData.length; i++) {
                    for (let j = 0; j < this.listData[i].child.length; j++) {
                        for (let t = 0; t < this.listData[i].child[j].child[t].length; t++)
                            if (this.listData[i].child[j].child[t].courseStepId === courseStepId) {
                                const index = this.listData[i].child[j].child.findIndex(d => d.courseStepId === courseStepId)
                                this.listData[i].child[j].child.splice(index, 1);
                            }
                    }
                }
            },
            addCourse(){
                this.$prompt('请输入新增课程名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
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
            addCourseSection(node,courseId){
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
                        node.data.child.push({
                            courseSectionId:res.data.courseSectionId,
                            title:value,
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
            addCourseSectionStep(node, sectionId){
                this.$prompt('新建的步骤名称:', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    utils.request({
                        invoke: api.requestNewCourseSectionStep,
                        params: {
                            courseSectionId: sectionId,
                            stepName:value,
                            stepContent:''
                        },
                        result: fakeData.SECTION_STEP
                    }).then(res => {
                        if(res.data.code === 1){
                            node.data.courseStepList.push({
                                title: value,
                                courseStepId:res.data.courseStepId
                            });
                        }
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
            utils.request({//请求数据库中已有课程并渲染到表格中
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
                                                title:item.title
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
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .select-confirm {
    position: relative;
    width: 5em;
    margin: 0 auto;
    display: block;
  }
</style>

