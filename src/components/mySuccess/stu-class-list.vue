<template>
  <div>
    <el-button type="primary" @click="open" style="width: 100%;margin-bottom: 10px">+ 新建课程</el-button>
    <el-card class="box-card">
      <h3>课程列表</h3>
      <el-tree
              :data="listData"
              :props="defaultProps"
              :expand-on-click-node="true"
              accordion
              @node-click="handleNodeClick">
      </el-tree>
    </el-card>
  </div>
</template>

<script>
    import store from '../../store'
    import {api, fakeData} from '../../api'
    import utils from '../../utils'
    export default {
        name: "stu-class-list",
        data() {
            return {
                defaultProps: {
                    children: 'courseSectionList',
                    label: function(data, node) {
                        if(node.level === 1) return data.courseName;
                        else return data.courseSectionName
                    }
                },
                listData: []
            };
        },
        methods: {
            handleNodeClick(data, node) {
                if(node.level===1)
                {
                    store.commit('mySuccess/SHOW_COURSE',data);
                }
                if(node.level===2)
                {
                    store.commit('mySuccess/SHOW_COURSESECTION',data);
                    utils.request({
                        invoke: api.requestGetCourseWealth ,
                        params: {
                            stuId: store.state.stuId,
                            courseSectionId: store.state.mySuccess.courseSection.courseSectionId
                        },
                        result: fakeData.GET_WEALTH
                    })
                        .then(res => {
                            if(res.data.code===1){
                                store.commit('mySuccess/SHOW_WEALTH',res.data.wealthAll);
                            }
                        });
                    utils.request({//请求分数
                        invoke: api.requestClassStuScore,
                        params: {
                            code:'stu_score',
                            stuId:store.state.stuId,
                            courseId:store.state.mySuccess.course.courseId,
                            courseSectionId: store.state.mySuccess.courseSection.courseSectionId
                        },
                        result: fakeData.STUDENT_SCORE
                    }).then(res => {
                        if(res.data.code===1){
                            store.commit('mySuccess/SHOW_SCORE',res.data.score);
                        }
                    });
                    utils.request({//请求活动答案（设计方案）
                        invoke: api.requestGetCourseExerciseDesign,
                        params: {
                            stuId:store.state.stuId,
                        },
                        result: fakeData.EXERCISE_CONTENT_DESIGN
                    }).then(res => {
                        if(res.data.code===1){
                            store.commit('mySuccess/SHOW_DESIGN',res.data. designContent);
                        }
                    });
                    utils.request({//请求活动答案（拍照上传）
                        invoke: api.requestGetCourseExercisePhoto ,
                        params: {
                            stuId:store.state.stuId,
                        },
                        result: fakeData.EXERCISE_CONTENT_PHOTO
                    }).then(res => {
                        if(res.data.code===1){
                            store.commit('mySuccess/SHOW_PHOTO',res.data.photoList);
                        }
                    });
                    utils.request({//请求活动答案（互动问答）
                        invoke: api.requestGetCourseExerciseQuestion,
                        params: {
                            stuId:store.state.stuId,
                        },
                        result: fakeData.EXERCISE_CONTENT_QUESTION
                    }).then(res => {
                        if(res.data.code===1){
                            store.commit('mySuccess/SHOW_ANSWER',res.data.answerList);
                        }
                    });
                }
                if(node.isLeaf) {
                    this.$emit('section-selected', data.courseSectionId)
                }
            },
            open() {
                let that = this;
                this.$prompt('请输入课程名称：', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    //向后端请求加入数据库
                    utils.request({
                        invoke: api.requestNewCourse,
                        params: {
                            teacherId: store.state.teacherId,
                            courseName: value
                        },
                        result: fakeData.ADD_COURSE
                    }).then(res => {
                        that.listData.push({
                            courseId:res.data.courseId,
                            title:value,
                            courseSection: []
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
            }
        },
        async created() {
            await utils.request({
                invoke: api.requestStuCourseList,
                params: {
                    stuId: store.state.stuId
                },
                result: fakeData.STUDENT_OWN_COURSE
            }).then(res => {
                this.listData = res.data.stuCourseList;
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
</style>
