<template>
    <el-card class="box-card">
        <el-button type="primary">+ 新建课程</el-button>
        <h3>课程列表</h3>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </el-card>
</template>

<script>
    export default {
        name: "Coursedirectory",
        data() {
            return {
                data: [{
                    label: '3D打印（6）',
                    children: [{
                        label: '整体设计',
                        children: [
                            {label: '·课时1：标题'},
                            {label: '·课时2：标题'},
                            {label: '·课时3：标题'},
                            {label: '·课时4：标题'},
                            {label: '·课时5：标题'},
                            {label: '·课时6：标题'}
                      ]
                    }]
                }, {
                    label: '无人机（10）',
                    children: [{
                        label: '编程',
                        children: [{
                            label: '课时1：标题'
                        }]
                    }],
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
</style>