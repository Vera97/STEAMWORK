<template>
  <el-card :body-style="{ padding: '0px' }">
    <div style="padding: 14px;">
      <div>{{title}}</div>
      <div class="bottom">
        <div class="info">{{introduction}}</div>
        <el-link type="primary" :underline="false" href="/course/123">查看详情</el-link>
      </div>
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "Course-cell",
        props: ['title', 'introduction', 'id']
    }
</script>

<style scoped lang="scss">
  .info{
    color:#CCCCCC;
  }

  .el-card {
    text-align: center;
  }
</style>
