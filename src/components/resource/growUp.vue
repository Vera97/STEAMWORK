<template>
  <div class="box-card">
    <div v-for="o in 3" :key="o">
      <el-button type="primary" style="padding: 40px;width: 100%;margin: 3px">{{"课程资源"+o}}</el-button>
    </div>
    <div><p>说明：本页面适用于学习进度超前的学生，他们在完成课堂基本任务后可以利用该资源自学提升自学能力</p></div>
  </div>
</template>

<script>
    export default {
        name: "growUp",
    }
</script>

<style scoped>
</style>
