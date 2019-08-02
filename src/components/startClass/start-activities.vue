<template>
  <div>
    <div v-for="o in 4" :key="o" class="button-box">
      <el-button type="primary" plain style="width: 100%">{{'启动活动' + o + ': xxxxxx'}}</el-button>
    </div>
    <el-button type="primary" plain style="width: 100%">……</el-button>
  </div>
</template>

<script>

</script>

<style scoped>
  .button-box {
    margin: 2px;
    text-align: center;
  }
</style>
