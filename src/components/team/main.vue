<template>
  <div class="content">
    <p>this is the uploaded content</p>
    <img src="#" alt="not available yet. ">
    <vue-drawing></vue-drawing>
    <el-button type="primary" size="medium">提交</el-button>
  </div>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'

    export default {
        name: "main",
        data() {
            return {
            };
        },
        created () {

        }
    }
</script>

<style scoped>
  .content {
    height: 100%;
  }
  .title {
    text-align: center;
    margin-bottom: 100px;
  }

  .tip {
    text-align: center;
    margin-bottom: 200px;
  }

  .button1 {
    margin-left: 15%;
    width: 15%;
    margin-bottom: 5px;
  }

  .button2 {
    width: 55%;
    margin-bottom: 5px;
  }
</style>
