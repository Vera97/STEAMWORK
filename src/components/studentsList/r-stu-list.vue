<template>
    <div class="content">
    <div class="top">
        <a href="#"><h5 class="export" @click="rate">导出成绩</h5></a>
        <a href="#"><h5 class="export">添加学生</h5></a>
    </div>
    <div class="center">
        <el-table
                class="table"
                :data="tableData"
                border
                style="width:100%"
                max-height="350px">
            <el-table-column
                    fixed
                    prop="stuName"
                    label="学生姓名"
                    width="85px">
            </el-table-column>
            <el-table-column
                    v-for="(item, index) in periodsList"
                    :key="index"
                    :label="item"
                    width="220px">
                <template slot-scope="scope">
                    <a href="#">作业/报告</a>
                    <el-input
                            placeholder="请输入成绩"
                            v-model="scope.row.scoreList[index]"
                            class="input"
                            clearable>
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="50px">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="deleteRow(scope.row)"
                            type="text"
                            size="small">
                        移除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="bottom">
        <h4 class="relative">关联课程：</h4>
        <el-select  class="select" multiple v-model="value" filterable remote :remote-method="search" placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-button type="primary" class="save" @click="save">保存</el-button>
      </div>
    </div>
</template>

<script>
    import store from '../../store'
    import {api, fakeData} from '../../api'
    import utils from '../../utils'

    export default {
        name: "r-stu-list",
        methods: {
            deleteRow: function (row) {
                this.$confirm('确定要移除这位学生吗？（所有相关信息将无法恢复）:', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.commit('studentsList/REMOVE_STUDENT', row.stuId);
                    this.$message({
                        type: 'success',
                        message: '移除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消移除'
                    });
                })
            },
            search(input) {
                let that = this;

                utils.request({
                    invoke: api.getCourses,
                    params: {
                        code: 'search',
                        course_name_keyword: input
                    },
                    result: fakeData.SEARCH_COURSE
                })
                        .then(res => {
                            that.options = res.data.map(item => {
                                return {label: item.title, value: item.courseId}
                            })
                        })
            },
            save() {
                alert(this.value.join(','));
                this.value = []
            },
            rate() {
                console.log(store.state.studentsList.stuList)
            }
        },
        computed: {
            tableData() {
                return store.state.studentsList.stuList
            },
            periodsList() {
                return store.state.studentsList.periodsList
            }
        },
        data() {
            return {
                count: 5,
                options: [],
                value: [],
                input: ''
            }
        }
    }
</script>

<style scoped>
    .top{
        margin-bottom:10px;
    }
    .bottom{
        margin-top:10px;
    }
    .export{
        float:right;
        margin-left: 2em;
    }
    .relative{
        width:10%;
        float:left;
    }
    .select{
        width:70%;
    }
    .save{
        float:right;
        width:10%;
    }
    .input{
        float:right;
        width:60%;
        padding-top:0;
        padding-bottom:0;
    }
</style>
