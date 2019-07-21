<template>
    <div class="content">
    <div class="top">
        <el-button
                class="title"
                plain
                @click="open2">
            <h4>学生列表</h4>
        </el-button>
        <a href="#"><h5 class="export">导出成绩</h5></a>
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
                    label="第一课"
                    width="220px">
                <template slot-scope="scope">
                    <a href="scope.row.address1">作业/报告</a>
                    <el-input
                            placeholder="请输入成绩"
                            v-model="scope.row.goal1"
                            class="input"
                            clearable>
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column
                    label="第二课"
                    width="220px">
                <template slot-scope="scope">
                    <a href="scope.row.address2">作业/报告</a>
                    <el-input
                            placeholder="请输入成绩"
                            v-model="scope.row.goal2"
                            class="input"
                            clearable>
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column
                    label="第三课"
                    width="220px">
                <template slot-scope="scope">
                    <a href="scope.row.address3">作业/报告</a>
                    <el-input
                            placeholder="请输入成绩"
                            v-model="scope.row.goal3"
                            class="input"
                            clearable>
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column
                    label="第四课"
                    width="220px">
                <template slot-scope="scope">
                    <a href="scope.row.address4">作业/报告</a>
                    <el-input
                            placeholder="请输入成绩"
                            v-model="scope.row.goal4"
                            class="input"
                            clearable>
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column
                    label="第n课"
                    width="220px">
                <template slot-scope="scope">
                    <a href="scope.row.address5">作业/报告</a>
                    <el-input
                            placeholder="请输入成绩"
                            v-model="scope.row.goal5"
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
                            @click.native.prevent="deleteRow(scope.$index, tableData4)"
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
        <el-select  class="select" v-model="value8" filterable placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-input
                class="search"
                placeholder="搜索"
                v-model="input10"
                clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
</template>

<script>
    export default {
        name: "rStuList",
        methods: {
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            open2() {
                this.$notify({
                    title: '说明',
                    message: '说明：“第1课”至“第n课”等列由教师“关联课程”后，按照课程学时自动生成，其“作业/报告”为学生每次课堂活动生成的报告，教师可点击查看并评分。',
                    duration: 0
                });
            }
        },
        data() {
            return {
                tableData: [{
                   stuName:'王小虎',
                    address1:'',
                    goal1:'',
                    address2:'',
                    goal2:'',
                    address3:'',
                    goal3:'',
                    address4:'',
                    goal4:'',
                    address5:'',
                    goal5:''

                },{
                    stuName:'王小虎',
                    address1:'',
                    goal1:'',
                    address2:'',
                    goal2:'',
                    address3:'',
                    goal3:'',
                    address4:'',
                    goal4:'',
                    address5:'',
                    goal5:''
                },{
                    stuName:'王小虎',
                    address1:'',
                    goal1:'',
                    address2:'',
                    goal2:'',
                    address3:'',
                    goal3:'',
                    address4:'',
                    goal4:'',
                    address5:'',
                    goal5:''
                },{
                    stuName:'王小虎',
                    address1:'',
                    goal1:'',
                    address2:'',
                    goal2:'',
                    address3:'',
                    goal3:'',
                    address4:'',
                    goal4:'',
                    address5:'',
                    goal5:''
                },{
                    stuName:'王小虎',
                    address1:'',
                    goal1:'',
                    address2:'',
                    goal2:'',
                    address3:'',
                    goal3:'',
                    address4:'',
                    goal4:'',
                    address5:'',
                    goal5:''
                },{
                    stuName:'王小虎',
                    address1:'',
                    goal1:'',
                    address2:'',
                    goal2:'',
                    address3:'',
                    goal3:'',
                    address4:'',
                    goal4:'',
                    address5:'',
                    goal5:''
                },{
                    stuName:'王小虎',
                    address1:'',
                    goal1:'',
                    address2:'',
                    goal2:'',
                    address3:'',
                    goal3:'',
                    address4:'',
                    goal4:'',
                    address5:'',
                    goal5:''
                },{
                    stuName:'王小虎',
                    address1:'',
                    goal1:'',
                    address2:'',
                    goal2:'',
                    address3:'',
                    goal3:'',
                    address4:'',
                    goal4:'',
                    address5:'',
                    goal5:''
                }],
                options: [{
                    value: '选项1',
                    label: '课程1'
                }, {
                    value: '选项2',
                    label: '课程2'
                }, {
                    value: '选项3',
                    label: '课程3'
                }, {
                    value: '选项4',
                    label: '课程4'
                }, {
                    value: '选项5',
                    label: '课程5'
                }],
                value8:'',
                input10:''
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
    .title{
        padding-top:0;
        padding-bottom:0;
    }
    .export{
        float:right;
    }
    .relative{
        width:10%;
        float:left;
    }
    .select{
        width:60%;
    }
    .search{
        float:right;
        width:20%;
    }
    .input{
        float:right;
        width:60%;
        padding-top:0px;
        padding-bottom:0px;
    }
</style>