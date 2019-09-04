<template>
  <div>
  <div v-if="isActive">
    <el-table
            :data="tableData.filter(data => !search || data.labelName.toLowerCase().includes(search.toLowerCase()))"
            class="table-box">
      <el-table-column
              label="labelId"
              prop="labelId">
      </el-table-column>
      <el-table-column
              label="labelName"
              prop="labelName">
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
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="button-box-father"><el-button class="button-box" type="primary" round @click="handleAdd">增添标签</el-button></div>
  </div>
    <editLabel :list="selectedList" :type="type" v-else v-cloak @modify="modify" @changeOverlay="changeOverlay"></editLabel>
  </div>
</template>

<script>
    import {api, fakeData} from '../../api'
    import utils from '../../utils'
    import editLabel from '../admin/edit-label'

    export default {
        name:'tag-list',
        components:{editLabel},
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
                this.type='edit';
                this.selected = index;
                this.selectedList = JSON.parse(JSON.stringify(this.tableData[index]));
                this.changeOverlay();
            },
            handleDelete(index, row) {
                utils.request({
                    invoke: api.requestDeleteLabel,
                    params: {
                        labelId: row.labelId
                    },
                    result: fakeData.DELETE_TEACHER
                }).then(res => {
                    alert('ni');
                    if (res.data.code === 1) {
                        this.$delete(this.tableData, index);
                        this.$message('删除成功！');
                    }
                });
            },
            handleAdd() {//新增标签
                this.type='add';
                this.changeOverlay();
            }
        },
        mounted(){
            utils.request({
                invoke: api.requestGetLabelList,
                params: {
                    adminId: 10
                },
                result: fakeData.GET_LABEL_LIST
            }).then(res => {
                if (res.data.code === 1) {
                    this.tableData = res.data.labelList;
                }
            })
        }
    }
</script>

<style scoped>
  .table-box{
    width: 100%;
    height: 500px;
    overflow: auto;
  }
  .button-box{
    margin-top: 1%;
    width: 50%;
  }
  .button-box-father{
    text-align: center;
  }

</style>