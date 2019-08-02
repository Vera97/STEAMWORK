<template>
  <el-row>
    <el-card :body-style="{ padding: '14px' }" class="card-position">
      <span>&nbsp;课程介绍：<br> &emsp;&emsp;{{ introduction }}</span>
      <video width="100%" height="100%" controls>
        <source :src="src" type="video/mp4">
        <source :src="src" type="video/ogg">
        您的浏览器不支持Video标签。
      </video>
    </el-card>
  </el-row>
</template>

<script>
    export default {
        name: "Introduction",
        props: {
            introduction: String,
            src: String
        }
    }
</script>

<style scoped>
  .card-position {
    width: 100%;
  }

  .box-card {
    font-size: 110px;
    text-align: center;
    width: 100%;
    height: 100%;
  }
</style>
