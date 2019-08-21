<template>
  <div class="content">
    <div>
      <el-card class="box-card">
        <h3>课程列表</h3>
        <el-tree
                :data="courseData"
                :props="defaultProps"
                :expand-on-click-node="true"
                accordion
                @node-click="handleNodeClick">
        </el-tree>
      </el-card>
      <PPTshow></PPTshow>
      <pptDeal :courseSectionId="courseSectionId" :courseSectionName="courseSectionName" class="upload"></pptDeal>
    </div>
  </div>
</template>

<script>
    import {api, fakeData} from '../../api'
    import utils from '../../utils'
    import store from '../../store'
    import pptDeal from '../admin/ppt-deal'
    // import coursePpt from '../PPT/course-ppt'
    // import PPTshow from '../admin/PPT-show'

    export default {
        name: "ppt-list",
        components:{pptDeal},
        data() {
            return {
                defaultProps: {
                    children: 'courseSection',
                    label: function(data, node) {
                        if(node.level === 1) return data.title;
                        else return data.courseSectionName
                    }
                },
                pptList:[],
                courseSectionId:-1,
                courseSectionName:'',
                pptData: {
                    pptImagesList: [],
                    pptId: null
                }
            };
        },
        computed:{
            courseData() {
                return store.state.admin.courseData;
            }
        },
        methods:{
            handleNodeClick(data,node){
                if(node.level===2){
                    this.courseSectionId=data.courseSectionId;
                    this.courseSectionName=data.courseSectionName;
                    utils.request({
                        invoke: api.requestSlides,
                        params: {
                            courseSectionId: parseInt(data.courseSectionId)
                        },
                        result: fakeData.UPLOAD_RESPONSE
                    })
                        .then((function(res) {
                            if(res.data.code === 1) {
                                this.pptData.pptId = res.data.pptId;
                                this.pptData.pptImagesList.push(...res.data.pptImagesList);
                            }
                        }).bind(this))
                }
            }
        },
        mounted() {
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
                    this.pptList= res.data.chunks;
                    for(let i=0;i<this.pptList.length;i++){
                        utils.request({
                            invoke: api.requestCourseDetail,
                            params: {
                                courseId:this.pptList[i].courseId
                            },
                            result: fakeData.COURSE_DETAIL
                        }).then(res=>{
                            this.$set(this.pptList[i],'courseSection',res.data.courseSection);
                        });
                    }
                    store.commit('admin/ADD_COURSE_DATA', this.pptList);
                });
            });
        }
    }
</script>

<style scoped>
  .box-card{
    float:left;
    width:30%;
  }
  .box-card2 {
    width: 98%;
    margin-bottom: 10px;
    float:right;
    text-align:center;
  }
  .pptTable{
    max-height: 30em;
    overflow-y: scroll;
  }
  .slide-cell{
    cursor: pointer;
    height:30em;
  }
  .slide-cell:hover {
    border: #6495ED90 solid .1em;
    border-radius: .5em;
  }
</style>
