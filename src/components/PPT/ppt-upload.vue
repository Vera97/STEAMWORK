<template>
  <div>
    <el-upload
            v-if="!uploaded"
            ref="upload"
            action="#"
            class="upload-demo"
            :class="{full: full, half: !full}"
            :http-request="uploadPrompt"
            :auto-upload="false"
            :limit="1"
            :on-exceed="handleExceed"
            :on-remove="beforeRemove"
            :file-list="fileList"
    >
      <el-button slot="trigger" size="mini" type="plain">&emsp;选择&emsp;</el-button>
      <el-button class="upload-button" size="mini" type="primary" @click="uploadPPT">&emsp;上传&emsp;</el-button>
      <div class="el-upload__tip" slot="tip">只能上传ppt/pptx文件</div>
    </el-upload>
    <div class="ppt-name" v-else>
      <span>{{ courseSectionName + '的ppt' }}</span>
      <el-button type="danger" @click="deletePPT" size="mini">删除</el-button>
    </div>
  </div>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'
    export default {
        name: "ppt-upload",
        props: {
            full: {
                type: Boolean,
                default: false
            },
            courseSectionId: Number,
            courseSectionName: String
        },
        data() {
            return {
                fileList: [],    /* it's not used. */
                uploaded: false,
            }
        },
        methods: {
            uploadPPT() {
                this.$refs.upload.submit()
            },
            uploadPrompt (e) {
                if(!this.courseSectionId) {
                    this.$message.error('请先选择课时');
                    return
                }
                this.$confirm('确认上传此文件？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(function () {
                        this.pptUpload(e)
                    }.bind(this)).catch()
            },
            pptUpload(e) {
                let formData = new FormData();
                formData.append('ppt_file', e.file);
                formData.append('courseSectionId', this.courseSectionId);
                console.log(formData.get("ppt_file"));
                utils.request({
                    invoke: api.uploadFile,
                    params: formData,
                    result: fakeData.UPLOAD_RESPONSE
                })
                    .then(function(res) {
                        if (res.data.code === 1) {
                            this.$message.success('成功上传');
                            this.uploaded = true;
                            console.log(res.data);
                            this.$emit('upload', res.data.pptId, res.data.pptImagesList);
                        } else {
                            this.$message.error('上传失败')
                        }
                    }.bind(this))
            },
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handleExceed() {
                this.$message.info("只能上传一个文件")
            },
            deletePPT() {
                console.log('delete');
                this.uploaded = false;
                this.$emit('delete')
            },
            inject() {
                this.uploaded = true
            }
        }
    }
</script>

<style scoped lang="scss">
  .upload-demo {
    margin-bottom: 1em;
    float-offset: 2%;
  }
  .upload-button {
    margin-left: 1em;
  }
  .ppt-name {
    margin: 1em;
    span {
      font-size: .8em;
      margin-right: 1em;
    }
  }

  .full {
    margin-top: 1em;
    width: 100%;
  }

  .half {
    width: 50%;
  }
</style>
