<template>
  <el-card>
    <div class="text-center" style="padding: 15px;">
      <span><h3>{{title}}</h3></span>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: "Courseppt",
    props: ['title']
  }
</script>

<style scoped>
  .info {
    color: #CCCCCC;
  }
</style>

