<template>
  <div>
    <el-card class="task-item">
      <h3 style="text-align:center;color:red;margin-bottom:20px;">即时任务</h3>
      <el-button type="primary" @click="open" style="width:100%;">
        拍照并填写记录
      </el-button>
    </el-card>
    <div><p>任务有老师发布的某些活动生成，例如讨论记录，作品展示等。强制性完成后方可进入下一页。学生在弹框中完成操作后，结果将保存在“成就”里，最终生成实验报告</p></div>
  </div>
</template>

<script>
    export default {
        name: "task",
        methods: {
            open() {
                this.$prompt('活动记录:', {
                    confirmButtonText: '保存',
                    cancelButtonText: '取消'
                })
            }
        }
    }
</script>

<style scoped>
  .task-item {
    margin-top: 20px;
  }
</style>
