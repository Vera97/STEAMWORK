<template>
  <el-row :gutter="20">
    <el-col :span="6">
     <resourceList @course-selected="selectedCourse" @section-selected="selectedSection" @step-selected="selectedStep"></resourceList>
    </el-col>
    <el-col :span="18">
      <resourceContent
              ref="child"
              :selectData="selectData"
              :isSelect="isSelect"
              :courseId="courseId"
              :courseName="courseName"
              :courseSectionId="courseSectionId"
              :courseSectionName="courseSectionName"
              :stepId="stepId"
              :stepName="stepName"
              @addStep="addStep"></resourceContent>
    </el-col>
  </el-row>
</template>

<script>
    import resourceList from '../admin/resource-list'
    import resourceContent from '../admin/resource-content'

    import {api, fakeData} from '../../api'
    import utils from '../../utils'

    export default {
        name: "resource-manage",
        components:{resourceList,resourceContent},
        data(){
            return{
                courseId:-1,
                courseName: '',
                courseSectionId: -1,
                courseSectionName: '',
                stepId: -1,
                stepName:'',
                newStepId:-1,
                isSelect:true,
                isUpload:false,
                selectData:[]
            }
        },
        methods:{
            selectedCourse(data){
                this.isSelect=false;
                this.courseId=data.courseId;
                this.courseName=data.title;
                utils.request({
                    invoke: api.requestAssignedGet,
                    params: {
                        courseId:this.courseId
                    },
                    result: fakeData.GET_LABEL_HAVE
                }).then(res => {
                    if (res.data.code === 1) {
                        this.selectData = res.data.labelList;
                    }
                });
            },
            selectedSection(data){
                this.isSelect=false;
                this.courseSectionId=data.courseSectionId;
                this.courseSectionName=data.title;
            },
            selectedStep(data){
                this.isSelect=false;
                this.stepId=data.stepId;
                this.stepName=data.title;
                this.$refs.child.getStep();
            },
            addStep(value){
                this.stepName=value;
            }
        }
    }
</script>

<style scoped>

</style>