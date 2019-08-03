<template>
  <el-container>
    <el-header>
      <Nav active-index="2"></Nav>
    </el-header>
    <el-main class="w">
      <el-row :gutter="0">
        <el-col :span="5">
          <course-directory></course-directory>
        </el-col>
        <el-col :span="18" style="float:right;">
          <el-upload
                  v-if="!uploaded"
                  ref="upload"
                  action="#"
                  class="upload-demo"
                  :http-request="pptUpload"
                  :auto-upload="false"
                  :limit="1"
                  :on-exceed="handleExceed"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :file-list="fileList"
          >
            <el-button slot="trigger" size="medium" type="">&emsp;选择&emsp;</el-button>
            <el-button class="upload-button" size="medium" type="primary" @click="uploadPPT">&emsp;上传&emsp;</el-button>
            <div class="el-upload__tip" slot="tip">只能上传ppt/pptx文件</div>
          </el-upload>
          <PPTshow :ppt-data="pptData"></PPTshow>
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

    import utils from '../../utils';
    import {api, fakeData} from '../../api';

    export default {
        name: "PPT",
        components: {PPTshow ,courseDirectory, Nav, Footer},
        data() {
            return {
                fileList: [],    /* it's not used. */
                uploaded: false,
                pptData: {
                    url: '',
                    pptImagesList: []
                }
            };
        },
        methods: {
            uploadPPT() {
                this.$refs.upload.submit()
            },
            pptUpload(e) {
                let that = this;

                this.$confirm('确认上传此文件？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'}).then(() => {
                        let formData = new FormData();
                        formData.append('ppt_file', e.file);
                        formData.append('courseSectionId', 111);
                        console.log(formData.get("ppt_file"));
                        utils.request({
                            invoke: api.uploadFile,
                            params: formData,
                            result: fakeData.UPLOAD_RESPONSE
                        })
                            .then(res => {
                                if(res.data.code === 1) {
                                    this.$message.success('成功上传');
                                    that.uploaded = true;
                                    that.pptData.url = res.data.url;
                                    that.pptData.pptImagesList.push(...res.data.pptImagesList)
                                } else {
                                    this.$message.error('上传失败')
                                }
                            })
                }).catch()
            },
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
            }
        }
    }

</script>

<style scoped>
  * {
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .ll {
    float: right;
    margin-top: 20px;
  }

  .w {
    margin-left: 10px;
    margin-right: 10px;
  }

  .upload-demo {
    margin-bottom: 1em;
    float-offset: 2%;
    width: 50%;
  }

  .upload-button {
    margin-left: 1em;
  }
</style>
