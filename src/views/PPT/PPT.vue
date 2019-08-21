<template>
  <el-container>
    <el-header>
      <Nav active-index="2"></Nav>
    </el-header>
    <el-main class="w">
      <el-row :gutter="0">
        <el-col :span="5">
          <course-directory @section-selected="sectionSelect"></course-directory>
        </el-col>
        <el-col :span="18" style="float:right;">
          <ppt-upload
                  ref="pptUpload"
                  :course-section-id="courseSectionId"
                  :course-section-name="courseSectionName"
                  @upload="handleUpload"
          ></ppt-upload>
          <PPTshow ref="PPTshow" :ppt-data="pptData"></PPTshow>
          <el-button type="primary" style="margin-bottom:2%;margin-top:2%;">&emsp;上传相关学习资源（上传后将出现在学生端“课程资源”处）&emsp;
          </el-button>
          <a href="#" class="ll">导出内容</a>
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
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
    import Nav from "../../components/hd-nav";
    import courseDirectory from "../../components/course-directory";
    import PPTshow from "../../components/PPT/PPT-show";
    import Footer from "../../components/hd-footer";
    import PptUpload from "../../components/PPT/ppt-upload";

    import utils from '../../utils'
    import {api, fakeData} from '../../api'

    export default {
        name: "PPT",
        components: {PptUpload, PPTshow ,courseDirectory, Nav, Footer},
        data() {
            return {
                pptData: {
                    pptImagesList: [],
                    pptId: null
                },
                courseSectionId: null,
                courseSectionName: null,
                fileList:[]
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
                this.pptData.url = url;
                this.pptData.pptImagesList.push(...pptImagesList)
            },
            sectionSelect({courseSectionId, courseSectionName}) {
                this.courseSectionId = courseSectionId;
                this.courseSectionName = courseSectionName;
                utils.request({
                    invoke: api.requestSlides,
                    params: {
                        courseSectionId: parseInt(courseSectionId)
                    },
                    result: fakeData.UPLOAD_RESPONSE
                })
                    .then((function(res) {
                        if(res.data.code === 1) {
                            this.pptData.pptId = res.data.pptId;
                            this.pptData.pptImagesList.push(...res.data.pptImagesList);
                            this.$refs.pptUpload.inject();
                            this.$refs.PPTshow.init()
                        }
                    }).bind(this))
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
    margin-left: 10px;
    margin-right: 10px;
    min-height: 505px;
  }
</style>
