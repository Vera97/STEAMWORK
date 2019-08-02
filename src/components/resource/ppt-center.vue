<template>
  <div>
    <div>
      <div>
        <el-card class="ppt-box">
          <div class="time">
            <p>·10:12(倒计时）</p>
          </div>
          <p class="title">幻灯片</p>
          <div class="col-box">
            <el-button-group>
              <el-button type="primary" plain icon="el-icon-arrow-left"></el-button>
              <el-button type="primary" plain><i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </el-button-group>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ppt-center",
    }
</script>

<style scoped>
  .ppt-box {
    /*padding-bottom: 180px;*/
    text-align: center;
    background-color: #5bc0de;
  }

  .col-box {

    margin-bottom: 10px;
  }

  .time {
    margin-top: 10px;
  }

  .title {
    margin-top: 150px;
    margin-bottom: 150px;
  }
</style>
