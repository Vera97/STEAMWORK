<template>
    <el-card class="box-card">
        <h3>常见问题及解答</h3>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </el-card>
</template>

<script>
    export default {
        name: "ques-solve",
        data() {
            return {
                data: [{
                    label: '问题1：描述',
                    children: [{
                        label: '解答解答解答解答',
                    }]
                }, {
                    label: '问题2：描述',
                    children: [{
                        label: '解答解答解答',
                    }]
                },{
                    label: '问题3：描述',
                    children: [{
                        label: '解答解答解答',
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