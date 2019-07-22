<template>
    <div class="content">
          <el-button type="primary" class="button1">
              +创建小组
          </el-button>
        <el-button type="primary" class="button2">
            +加入小组
        </el-button>
        <el-card class="box-card">
            <h3>小组列表</h3>
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "team-list",
        data() {
        return {
            data: [{
                label: 'XX学校XX班（1)',
                children: [{
                    label: '3D打印',
                }]
            }, {
                label: 'XX学校XX班（1)',
                children: [{
                    label: '3D打印',
                }]
            },{
                label: 'XX学校XX班（2)',
                children: [{
                    label: '航模',
                },{
                    label: '无人机',
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
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

<style scoped>
    .button1{
        width:48%;
    }
    .button2{
        float:right;
        width:48%;
    }
     .box-card{
         margin-top:20px;
         width:100%;
     }
</style>