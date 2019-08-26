<template>
  <div>
    <div class="table" v-if="isActive">
      <el-table
              :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())||
              data.sex.toLowerCase().includes(search.toLowerCase())||data.introduceHtml.toLowerCase().includes(search.toLowerCase()))"
              class="table-box">
        <el-table-column
                label="Id"
                prop="id">
        </el-table-column>
        <el-table-column
                label="Name"
                prop="name">
        </el-table-column>
        <el-table-column
                label="Password"
                prop="password">
        </el-table-column>
        <el-table-column
                label="Sex"
                prop="sex">
        </el-table-column>
        <el-table-column
                label="Introduce"
                prop="introduceHtml">
        </el-table-column>
        <el-table-column
                align="right">
          <template slot="header" slot-scope="scope">
            <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索">
            </el-input>
          </template>
          <template slot-scope="scope">
            <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">Edit
            </el-button>
            <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="button-box-father">
        <el-button class="button-box" type="primary" round @click="add">增添用户</el-button>
      </div>
    </div>
      <model :list="selectedList" :type="type" v-else v-cloak @modify="modify" @changeOverlay="changeOverlay"></model>
  </div>
</template>

<script>
    import {api, fakeData} from '../../api'
    import utils from '../../utils'
    import model from '../admin/model'

    export default {
        name: 'teacher-list',
        components: {model},
        data() {
            return {
                tableData: [],
                search: '',
                selectedList: {}, // 选中的信息
                selected: -1,
                isActive: true,
                type:''
            }
        },
        methods: {
            modify(list) {
                if (this.selected > -1) {
                    this.$set(this.tableData, this.selected, list);
                    this.selected = -1;
                } else {
                    this.tableData.push(list);
                }
                this.changeOverlay();
            },
            changeOverlay() {
                this.isActive = !this.isActive;
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.type='Edit';
                this.selected = index;
                this.selectedList = JSON.parse(JSON.stringify(this.tableData[index]));
                this.changeOverlay();
            },
            handleDelete(index, row) {
                console.log(index, row);
                utils.request({
                    invoke: api.requestDeleteTeacher,
                    params: {
                        teacherId: row.id
                    },
                    result: fakeData.DELETE_TEACHER
                }).then(res => {
                    if (res.data.code === 1) {
                        this.$delete(this.tableData, index);
                        this.$message('删除成功！');
                    }
                });
            },
            add(){
                this.type='Add';
                this.changeOverlay();
            }
        },
        mounted() {
            utils.request({
                invoke: api.requestGetTeacher,
                params: {
                    adminId: 10
                },
                result: fakeData.GET_TEACHER
            }).then(res => {
                if (res.data.code === 1) {
                    this.tableData = res.data.teacherAccountList;
                }
            })
        }
    }
</script>

<style scoped>
  .table-box {
    width: 100%;
    height: 500px;
    overflow: auto;
  }

  .button-box {
    margin-top: 1%;
    width: 50%;
  }

  .button-box-father {
    text-align: center;
  }
</style>
