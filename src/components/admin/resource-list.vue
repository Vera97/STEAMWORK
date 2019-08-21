<template>
  <div>
      <el-table
              :data="courseData.filter(data => !search || data.courseName.toLowerCase().includes(search.toLowerCase()))"
              class="table-box">
        <el-table-column
                label="courseId"
                prop="courseId">
        </el-table-column>
        <el-table-column
                label="courseName"
                prop="title">
        </el-table-column>
        <el-table-column
                label="label">
          <template slot-scope="scope">
            <el-tag v-for="(item,index) in scope.row.labelList" :key="index" class="tag">{{item.labelName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
                align="right">
          <template slot="header" slot-scope="scope">
            <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
                    class="button1"
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">修改课程
            </el-button>
            <el-button
                    class="button2"
                    size="mini"
                    @click="handleRemove(scope.$index, scope.row)">删除课程
            </el-button>
            <el-button
                    class="button1"
                    size="mini"
                    @click="addLabel(scope.$index, scope.row)">增加标签
            </el-button>
            <el-button
                    class="button2"
                    size="mini"
                    @click="handleRemove(scope.$index, scope.row)">移除标签
            </el-button>
            <el-button
                    class="button3"
                    size="mini"
                    type="danger"
                    @click="handleShow(scope.$index, scope.row)">编辑课程
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="button-box-father">
        <el-button class="button-box" type="primary" round @click="handleAdd">增加课程</el-button>
      </div>
      <el-dialog title="addLabel" :visible.sync="dialogVisible">
        <div v-for="(item,index) in selectData" :key="index">
          <el-checkbox v-model="item.isChecked" :label="item.labelName" border></el-checkbox>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="add">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    import {api, fakeData} from '../../api'
    import utils from '../../utils'
    import store from '../../store'

    export default {
        name: "resource-list",
        data() {
            return {
                search: '',
                selectCourse: '',
                dialogVisible: false,
                selectLabel:{
                    labelName:'',
                    labelId:''
                },
                temp:''
            }
        },
        computed: {
            courseData() {
                return store.state.admin.courseData;
            }
        },
        methods: {
            handleShow(index, row){
                store.commit('admin/ADD_INDEX','edit-course')
            },
            addLabel(index, row) {
                console.log(row);
                utils.request({
                    invoke: api.requestGetLabelList,
                    params: {
                        adminId: 10
                    },
                    result: fakeData.GET_LABEL_LIST
                }).then(res => {
                    if (res.data.code === 1) {
                        this.selectData = res.data.labelList;
                        console.log(this.selectData);
                    }
                });
                utils.request({
                    invoke: api.requestAssignedGet,
                    params: {
                        courseId: row.courseId
                    },
                    result: fakeData.GET_LABEL_HAVE
                }).then(res => {
                    let that=this;
                    if (res.data.code === 1) {
                        for(let i=0;i<that.selectData.length;i++){
                            this.$set(this.selectData[i], 'isChecked', '');
                            res.data.labelList.forEach(function(value,index){
                                if (value.labelId===that.selectData[i].labelId) {
                                    that.selectData.splice(index,1);
                                }
                            });
                        }
                        this.dialogVisible = true;
                    }
                });
                this.$set(this.selectCourse,'course',row);
                this.$set(this.selectCourse,'index',index);
            },
            add(){
                this.dialogVisible = false;
                let that=this;
                that.selectData.forEach(function(value){
                    //只有为true时才添加
                    if (value.isChecked) {
                        utils.request({
                            invoke: api.requestGetLabel,
                            params: {
                                labelId:value.labelId,
                            },
                            result: fakeData.GET_LABEL_CHECKED
                        }).then(res=>{
                            if(res.data.code===1){
                                that.selectLabel.labelName=res.data.labelName;
                                that.selectLabel.labelId=value.labelId;
                            }
                        });
                        utils.request({
                            invoke: api.requestAssignLabel,
                            params: {
                                labelId:value.labelId,
                                courseId: that.selectCourse.course.courseId
                            },
                            result: fakeData.GET_LABEL_HAVE
                        }).then(res => {
                            if(res.data.code===1){
                                store.state.admin.courseData[that.selectCourse.index].labelList.push(that.selectLabel);
                            }
                        });
                    }
                });
            }
        },
        mounted() {
            utils.request({//请求数据库中已有课程并渲染到表格中
                invoke: api.getCourseChunk,
                params: {
                    code: 'course_all',
                    gotten: 0,
                    length: 0
                },
                result: fakeData.SEARCH_COURSE
            }).then(res => {
                utils.request({
                    invoke: api.getCourseChunk,
                    params: {
                        code: 'course_all',
                        gotten: 0,
                        length: res.data.totalCount
                    },
                    result: fakeData.SEARCH_COURSE
                }).then(res => {
                    store.commit('admin/ADD_COURSE_DATA', res.data.chunks);
                    for (let i = 0; i < store.state.admin.courseData.length; i++) {
                        utils.request({
                            invoke: api.requestAssignedGet,
                            params: {
                                courseId: store.state.admin.courseData[i].courseId
                            },
                            result: fakeData.GET_LABEL_HAVE
                        }).then(res => {
                            if (res.data.code === 1) {
                                this.$set(store.state.admin.courseData[i], 'labelList', res.data.labelList)
                            }
                        })
                    }
                });
            });
        }
    }
</script>

<style scoped>
  .tag {
    margin-right: 2%;
  }

  .button1 {
    width: 33%;
  }

  .button1 {
    width: 33%;
  }

  .button3 {
    margin-top: 3%;
    width: 71%;
  }
</style>