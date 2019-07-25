<template>
    <el-card class="box-card">
        <h3>班级列表</h3>
        <el-tree :data="listData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </el-card>
</template>

<script>
    import store from '../store'

    export default {
        name: "class-list",
        props: {
            ['list-data']: Array
        },
        data() {
            return {
                defaultProps: {
                    children: 'courseDetail',
                    label(data) {
                        if(data.className) {
                            return data.className
                        } else if(data.name) {
                            return data.name
                        } else {
                            throw new DOMException()
                        }
                    }
                }
            };
        },
        methods: {
            handleNodeClick(data, node) {
                if(node.isLeaf) {
                    store.dispatch('studentsList/render_course').then()
                }
            }
        }
    }
</script>

<style scoped>
</style>
