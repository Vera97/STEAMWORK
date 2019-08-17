<template>
  <div class="content">
    <el-card class="box-card">
      <h3>小组成员列表</h3>
      <el-tree
              :data="groupData"
              :props="defaultProps"
              @node-click="handleNodeClick"></el-tree>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "team-list",
        props: {
            groupData: Array
        },
        data() {
            return {
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
                this.$emit('peek-peer', data)
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
