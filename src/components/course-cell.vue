<template>
  <el-card :body-style="{ padding: '0px' }">
    <div style="padding: 14px;">
      <div class="caption">{{title}}</div>
      <div class="bottom">
        <div class="info">{{introduction}}</div>
        <div class="link">
          <router-link :to="{name: 'course', params: {courseId: courseId}}">查看详情</router-link>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "course-cell",
        props: {title: String, introduction: String, courseId: Number},
        methods: {}
    }
</script>

<style scoped lang="scss">
  .info {
    color: #CCCCCC;
    font-size: .9em;
    margin: 1em 0;
    height: 3em;
  }

  .el-card {
    text-align: center;
  }

  .caption {
    font-size: 1.2em;
  }
</style>
