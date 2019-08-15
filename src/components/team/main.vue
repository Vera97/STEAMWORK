<template>
  <div class="content">
    <el-tabs type="border-card" v-model="active">
      <el-tab-pane label="聊天互动" name="聊天互动">编辑文字</el-tab-pane>
      <el-tab-pane label="绘制头脑风暴" name="绘制头脑风暴">
        <vue-drawing></vue-drawing>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
        name: "upload",
        data() {
            return {
                active: '聊天互动'
            };
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
