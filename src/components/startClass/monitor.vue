<template>
  <div class="student-box">
    <div>
      <el-button type="success" class="button-box" style="width: 100%">学生学习进度监控</el-button>
    </div>
    <div v-for="item in prog" :key="item.stuId">
      <div v-bind:style="miStatusColor(item.progress)" class="student-id-box">{{item.stuId}}</div>
    </div>
    <div><p>编号为学生ID，黄色表示学习进度正常，颜色越深表示学习越落后。</p></div>
  </div>
</template>

<script>
    export default {
        name: 'monitor',
        props: {
            prog: Array
        },
        data() {
            return {
                miStatusColor:
                    function (val) {
                        if (val <= 0.25) {
                            return 'background-color:#FFFF33;'
                        } else if (val > 0.25 && val <= 0.5) {
                            return 'background-color:#FFCC22;'
                        } else if (val > 0.5 && val <= 0.75) {
                            return 'background-color:#FFAA33;'
                        } else if (val > 0.75 && val <= 1) {
                            return 'background-color:#d58512;'
                        } else {
                            return 'background-color:#FFFF33;'
                        }
                    },
            }
        }
    }
</script>

<style scoped>
  .button-box {
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .student-id-box {
    padding: 0px;
    width: 24px;
    float: left;
    margin: 2px;
    text-align: center;
    border-radius: 2px;
  }

  p {
    margin-top: 130px;
  }
</style>
