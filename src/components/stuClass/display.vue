<template>
  <div>
    <image-uploader @upload="uploadHandler"></image-uploader>
  </div>
</template>

<script>
    import ImageUploader from '../image-uploader'

    import utils from '../../utils'
    import {api, fakeData} from '../../api'
    import store from '../../store'

    export default {
        name: "display",
        components: {ImageUploader},
        props: {
            exerciseBody: Object
        },
        methods: {
            uploadHandler (file) {
                this.$confirm('确认上传此照片？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    let formData = new FormData();
                    formData.append('image', file);
                    formData.append('stuId', store.state.stuId);
                    formData.append('courseSectionId', store.state.courseSectionId);
                    formData.append('exerciseId', this.exerciseBody.exerciseId);
                    console.log(this.exerciseBody.exerciseId);
                    utils.request({
                        invoke: api.requestUploadCourseExercisePhoto,
                        params: formData,
                        result: fakeData.UPLOAD_RESPONSE
                    })
                        .then(function(res) {
                            if (res.data.code === 1) {
                                this.$confirm('上传成功，请点击确认完成按钮完成任务获得财富');
                            } else {
                                this.$message.error('上传失败')
                            }
                        }.bind(this))
                }.bind(this)).catch()
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
