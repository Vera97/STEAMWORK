<template>
  <el-card :body-style="{ padding: '0px' }">
    <div style="padding: 14px;">
      <span>{{title}}</span>
      <div class="bottom">
        <span class="info">{{introduction}}</span>
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

<style scoped>
  .info{
    color:#CCCCCC;
  }
</style>
