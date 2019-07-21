<template>
    <el-card class="box-card">
        <h3>班级列表</h3>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </el-card>
</template>

<script>
    export default {
        name: "lList",
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
</style>