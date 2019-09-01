<template>
  <div class="wrapper">
    <div class="main-box">
      <div v-if="!uploaded">请选择一张照片</div>
      <div v-else class="preview-box">
        <img :src="url" alt="some error"/>
      </div>
    </div>
    <el-button type="primary" size="text">
      <file-upload
              class="upload"
              ref="upload"
              v-model="files"
              post-action="#"
              extensions="gif,jpg,jpeg,png,webp"
              accept="image/png,image/gif,image/jpeg,image/webp"
              @input-file="inputFile"
      >
        <span>选择照片</span>
      </file-upload>
    </el-button>
    <el-button type="plain" size="mini" @click="uploadImage">确认上传</el-button>
  </div>
</template>

<script>
    import VueUploadComponent from 'vue-upload-component'

    export default {
        name: "image-uploader",
        data () {
            return {
                files: [],
                uploaded: false,
                url: '#'
            }
        },
        components: {
            FileUpload: VueUploadComponent
        },
        methods: {
            inputFile (newFile) {
                if (newFile) {
                    this.url = URL.createObjectURL(newFile.file);
                    this.uploaded = true
                }
            },
            uploadImage () {
                this.$emit('upload', this.files[0].file)
            }
        }
    }
</script>

<style scoped lang="scss">
  .wrapper {
    position: relative;
    width: 25em;
    margin: 1em auto;
    text-align: center;
  }

  .upload span{
    cursor: pointer;
  }

  .main-box {
    margin-bottom: 1em;
  }

  .preview-box {
    padding: .5em;
    border: gray dashed;
    border-radius: .5em;

    img {
      width: 20em;
    }
  }
</style>
