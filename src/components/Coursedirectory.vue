<template>
    <el-card class="box-card">
        <el-button type="primary" @click="open1">+ 新建课程</el-button>
        <h3>课程列表</h3>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"  :render-content="renderContent">
        </el-tree>
    </el-card>
</template>

<script>
    import store from'../store'
    import {api,fakeData} from '../api'
    import utils from '../utils'
    export default {
        name: "Coursedirectory",
        data() {
            return {
                data: [{
                    label: '无人机',
                    children: [{
                        label: '二级 1-1'
                    }]
                }, {
                    label: '人工智能',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
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
            },
            appendSection(data) {
                const newChild = { label: 'testtest', children: [] };
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },
            renderContent(){
                return (
                           <div>{node.label}</div>
                           <el-button size="mini" type="text" on-click={( ) => this.appendSection(data) }>增加课时</el-button>
                   );
            },
            //appendCourse(list, data) {
              //  alert(list);
                //list.append({label: data, children: []});
            //},
            open1()//加入课程
            {
                let that = this;
                this.$prompt('请输入课程名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    utils.request({
                        invoke: api.requestNewCourse,
                        params: {
                            courseId: that.id,
                            courseSectionName: value
                        },
                        result: fakeData.COURSE_LIST
                    })
                        .then(res => {
                            store.commit('ppt/ADD_COURSE', res.data);
                            this.$options.methods.appendCourse(that.nodeData,value);
                            this.$options.methods.newSectionButton();
                        })
                   }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消输入'
                        })
                    });
               },
               open2()//加入课时
               {
                let that=this;
                   this.$prompt('请输入课时名称', '提示', {
                       confirmButtonText: '确定',
                       cancelButtonText: '取消',
                   }).then(({value}) => {
                       utils.request({
                           invoke: api.requestNewCourseSection,
                           params: {
                               teacherId: that.id,
                               courseName: value
                           },
                           result: fakeData.COURSE_SECTION
                       })
                           .then(res => {
                               store.commit('ppt/ADD_SECTION', res.data);
                               this.$options.methods.append(value);
                           })
                   }).catch(() => {
                       this.$message({
                           type: 'info',
                           message: '取消输入'
                       })
                   });
               }
            }
       }
</script>

<style scoped>

</style>