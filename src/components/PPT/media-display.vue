<template>
  <div>
    <el-card>
      <h4>请上传视频资源</h4>
      <media-uploader
              class="uploader"
              :exercise-id="exerciseId"
              :api-base="base"
      ></media-uploader>
    </el-card>
  </div>
</template>

<script>
    import MediaUploader from '../../upload/media-uploader'
    import { base } from '../../api/api'

    export default {
        name: "media-display",
        components: {MediaUploader},
        props: {
            exerciseId: Number
        },
        data () {
            return {
                base: base
            }
        }
    }
</script>

<style scoped>
  .uploader {
    width: 100%;
    height: 100%;
  }
</style>
