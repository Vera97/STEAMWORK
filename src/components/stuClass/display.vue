<template>
  <div>
    上传你的作品
    <el-upload
            ref="upload"
            action="#"
            class="upload-demo"
            :http-request="imageUpload"
            :auto-upload="false"
            :limit="1"
            :on-exceed="handleExceed"
            :on-remove="beforeRemove"
            :file-list="fileList"
    >
      <el-button slot="trigger" size="medium" type="">&emsp;选择&emsp;</el-button>
      <el-button class="upload-button" size="medium" type="primary" @click="uploadImage">&emsp;上传&emsp;</el-button>
      <div class="el-upload__tip" slot="tip">只能图片文件</div>
    </el-upload>
  </div>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'

    export default {
        name: "display",
        methods: {
            uploadImage() {
                this.$refs.upload.submit()
            },
            imageUpload(e) {
                let that = this;
                this.$confirm('确认上传此照片？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let formData = new FormData();
                    formData.append('image', e.file);
                    formData.append('courseSectionId', this.courseSectionId);
                    utils.request({
                        invoke: api.uploadFile,
                        params: formData,
                        result: fakeData.UPLOAD_RESPONSE
                    })
                        .then(res => {
                            if (res.data.code === 1) {
                                this.$message.success('成功上传');
                                that.uploaded = true;
                                that.url = res.data.url;
                                that.$emit('upload', res.data.url, res.data.pptImagesList);
                            } else {
                                this.$message.error('上传失败')
                            }
                        })
                }).catch()
            },
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handleExceed() {
                this.$message.info("只能上传一个文件")
            },
            deletePPT() {
                console.log('delete')
            }
        }
    }
</script>

<style scoped>
  .upload-demo {
    margin: 1em 0;
    float-offset: 2%;
    width: 50%;
  }

  .upload-button {
    margin-left: 1em;
  }
</style>
