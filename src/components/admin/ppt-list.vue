<template>
  <el-main class="w">
    <el-row :gutter="20" class="row">
      <el-col :span="5">
        <course-directory @section-selected="sectionSelect"></course-directory>
        <ppt-upload
                ref="pptUpload"
                :course-section-id="courseSectionId"
                :course-section-name="courseSectionName"
                @upload="handleUpload"
                class="upload"
                v-if="!isSelect"
        ></ppt-upload>
      </el-col>
      <el-col :span="19">
        <el-card v-if="isSelect" class="tip">
          请先选择课时
        </el-card>
        <div v-show="isShow">
          <PPTshow ref="PPTshow" @addPPT="addPPT"></PPTshow>
          <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
          </el-upload>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
    import courseDirectory from "./course-directory";
    import PPTshow from "./PPT-show";
    import PptUpload from "./ppt-upload";

    import utils from '../../utils'
    import {api, fakeData} from '../../api'

    export default {
        name: "ppt-list",
        components: {PptUpload, PPTshow ,courseDirectory},
        data() {
            return {
                pptData: {
                    pptImagesList: [],
                    pptId: null
                },
                courseSectionId: null,
                courseSectionName: null,
                fileList:[],
                isSelect:true,
                isShow:false
            }
        },
        methods: {
            handleExceed() {
                this.$message.info("只能上传一个文件")
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handleUpload(url, pptImagesList) {
                this.isShow=true;
                this.pptData.url = url;
                this.pptData.pptImagesList.push(...pptImagesList)
            },
            sectionSelect({courseSectionId, courseSectionName}) {
                this.isSelect=false;
                this.courseSectionId = courseSectionId;
                this.courseSectionName = courseSectionName;
                utils.request({
                    invoke: api.requestSlides,
                    params: {
                        courseSectionId: courseSectionId
                    },
                    result: fakeData.UPLOAD_RESPONSE
                })
                    .then((function(res) {
                        if(res.data.code === 1) {
                            this.pptData.pptId = res.data.pptId;
                            this.pptData.pptImagesList.push(...res.data.pptImagesList);
                            this.$refs.pptUpload.inject();
                            this.$refs.PPTshow.init(this.pptData);
                            this.isShow = true
                        }
                    }).bind(this))
            },
            addPPT(){
                this.pptData.pptImagesList.push("");
                this.select=this.pptData.pptImagesList.length-1;
            }
        }
    }

</script>

<style scoped>
  * {
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
  }

  .ll {
    float: right;
    margin-top: 20px;
  }

  .w {
    min-height: 715px;
  }

  .tip {
    text-align: center;
    padding: 12em;
  }

  .row {
    width: 100%;
  }

  .up-load {
    width: 100%;
  }
</style>
