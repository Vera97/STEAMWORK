<template>
    <div>
        <el-button type="primary" @click="open" style="width: 100%;margin-bottom: 10px">+ 新建课程</el-button>
        <el-card class="box-card">
            <h3>课程列表</h3>
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-card>
    </div>
</template>

<script>
    import store from '../store'
    import {api, fakeData} from '../api'
    import utils from '../utils'

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
            },
            open() {
                this.$prompt('请输入课程名称：', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    //向后端请求加入数据库
                        utils.request({
                            invoke:api.requestNewCourse,
                            param:{
                                courseId: this.id,
                                courseSectionName: value
                            },
                            result: fakeData.ADD_COURSE
                        }).then(res => {
                            store.commit('ppt/ADD_COURSE', res.data);
                            console.log(res.data)
                        })
                    this.$message({
                        type: 'success',
                        message: '你新建的课程名称: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },


        }
    }
</script>

<style scoped>

</style>