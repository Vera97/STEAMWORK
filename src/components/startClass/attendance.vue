<template>
  <div class="outer-most">
    <div>已到学生人数：{{ arrivedNumber }}</div>
    <div>未到学生：</div>
    <el-button
            type="plain"
            v-for="item in absentList"
            :key="item.stuId"
            size="medium"
    >
      {{ `${item.stuName}(${item.stuNumber})` }}
    </el-button>
  </div>
</template>

<script>
    export default {
        name: "attendance",
        data() {
            return {
                arrivedNumber: 10,
                absentList: [
                    {
                        stuId: 123345,
                        stuName: '李钢蛋',
                        stuNumber: 8888899
                    },
                    {
                        stuId: 333333,
                        stuName: '赵铁柱',
                        stuNumber: 8884342
                    }
                ]
            }
        }
    }
</script>

<style scoped lang="scss">
  .outer-most {
    text-align: left;

    div {
      margin: 1em 0;
    }
  }
</style>
