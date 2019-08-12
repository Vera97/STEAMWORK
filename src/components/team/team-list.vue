<template>
  <div class="content">
    <div class="header">小组成员</div>
    <el-card>
      <el-tree
              :data="data"
              :props="defaultProps"
              :node-click="handleNodeClick"
      >
      </el-tree>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "team-list",
        data() {
            return {
                data: [
                    {
                        stuName: '张三',
                        stuId: 1233,
                        stuNumber: 1015555
                    },
                    {
                        stuName: '李四',
                        stuId: 1234,
                        stuNumber: 1015565
                    },
                    {
                        stuName: '王五',
                        stuId: 1235,
                        stuNumber: 1015755
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label(data) {
                        return `${data.stuName}(${data.stuNumber})`
                    }
                }
            };
        },
        methods: {
            handleNodeClick(data) {
                console.log(data);
            }
        }
    }
</script>

<style scoped lang="scss">
  .content {
    width: 80%;
    margin-top: 1em;

    .header {
      font-weight: bolder;
      margin-bottom: 1em;
      text-indent: 1em;
    }
  }
</style>
