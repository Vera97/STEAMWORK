<template>
  <div class="wrapper">
    <el-form ref="form" :model="{groups}">
      <el-form-item
              v-for="(group, index) in groups"
              :key="index"
              label-width="0"
      >
        <el-col :span="3">
          <el-input
                  v-model="group.groupName"
                  placeholder="组名"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-select
                  value-key="stuId"
                  v-model="group.leader"
                  @change="select"
                  multiple
                  :multiple-limit="1"
                  filterable
                  placeholder="请选择组长"
                  @remove-tag="remove"
          >
            <el-option
                    v-for="(item, index) in studentsList"
                    :key="index"
                    :label="`${item.stuName}(${item.stuNumber})`"
                    :value="item"
                    :disabled="item.selected"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="13">
          <el-select
                  v-model="group.members"
                  value-key="stuId"
                  @change="select"
                  multiple
                  filterable
                  placeholder="请选择组员"
                  @remove-tag="remove"
          >
            <el-option
                    v-for="(item, index) in studentsList"
                    :key="index"
                    :label="`${item.stuName}(${item.stuNumber})`"
                    :value="item"
                    :disabled="item.selected"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="1">
          <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-circle-check"
                  circle
                  @click="saveGroup($event, index)"
          ></el-button>
        </el-col>
        <el-col :span="1">
          <el-button
                  class="delete"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="removeGroup($event, index)"
          ></el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <el-button
            type="plain"
            size="medium"
            icon="el-icon-circle-plus-outline"
            @click="addGroup"
    >新增分组</el-button>
  </div>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'

    export default {
        name: "grouping",
        props: {
            classroomId: Number,
            classId: Number,
            studentsList: Array
        },
        data () {
            return {
                groups: []
            }
        },
        async created () {
            // store.commit('startClass/SELECT_CLASS', this.classId);
            // await store.dispatch('startClass/getStuList');

            this.groups = [];
            utils.request({
                invoke: api.requestStuGroup,
                params: {
                    classroomId: this.classroomId
                },
                result: fakeData.GET_GROUPS_RESPONSE
            })
                .then((function(res) {
                    for(let i of res.data.groupList) {
                        // set the select status of each student.
                        this.setDisable(i.leaderStuId, true);
                        for(let j of i.members) this.setDisable(j.stuId, true);

                        let leader;
                        for(let j of this.studentsList) {
                            if(j.stuId === i.leaderStuId) {
                                leader = {
                                    stuId: j.stuId,
                                    stuNumber: j.stuNumber,
                                    stuName: j.stuName
                                };
                                break
                            }
                        }
                        this.groups.push({
                            groupName: i.groupName,
                            groupId: i.groupId,
                            leader: [leader],
                            members: i.members
                        })
                    }
                }).bind(this))
        },
        methods: {
            addGroup() {
                utils.request({
                    invoke: api.requestNewStuGroup,
                    params: {
                        classroomId: this.classroomId,
                        leaderStuId: 0,                   // add a blank group and alter it later
                        groupName: '新增分组',
                        members: []
                    },
                    result: fakeData.NEW_GROUP_RESPONSE
                })
                    .then(function (res) {
                        if (res.data.code === 1) {
                            this.$message.success('新建成功');
                            this.groups.push({
                                groupName: '新建分组',
                                groupId: res.data.groupId,
                                leader: [],
                                members: []
                            })
                        } else {
                            this.$message.error('新建失败')
                        }
                    }.bind(this))
            },
            removeGroup(e, index) {
                this.$confirm('确定要删除这个分组吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: '提示'
                })
                    .then((function () {
                        utils.request({
                            invoke: api.requestDeleteGroup,
                            params: {
                                groupId: this.groups[index].groupId
                            },
                            result: null
                        });
                        for(let i of this.groups[index].members) {
                            this.setDisable(parseInt(i.stuId), false);
                        }
                        this.setDisable(parseInt(this.groups[index].leader.stuId), false);
                        this.groups.splice(index, 1)
                    }).bind(this))
                    .catch()
            },
            select(e) {
                if(e instanceof Array) {
                    for(let i of e) {
                        this.setDisable(parseInt(i.stuId), true)
                    }
                }
                else {
                    this.setDisable(parseInt(e.stuId), true)
                }
            },
            remove(e) {
                this.setDisable(parseInt(e.stuId), false)
            },
            setDisable(stuId, selected) {
                for(let i = 0; i < this.studentsList.length; i++) {
                    if(this.studentsList[i].stuId === stuId) {
                        this.studentsList[i].selected = selected;
                        break
                    }
                }
            },
            saveGroup(e, index) {
                let callback = function (res) {
                    if(res.data.code === 1) this.$message.success('保存成功')
                };
                if(this.groups[index].groupId) {
                    utils.request({
                        invoke: api.requestAlterGroup,
                        params: {
                            groupId: this.groups[index].groupId,
                            leaderStuId: this.groups[index].leader.stuId,
                            groupName: this.groups[index].groupName,
                            members: this.groups[index].members
                        },
                        result: fakeData.SINGLE_NUMBER_CODE
                    })
                        .then(callback.bind(this))
                } else {
                    utils.request({
                        invoke: api.requestNewStuGroup,
                        params: {
                            leaderStuId: this.groups[index].leader.stuId,
                            groupName: this.groups[index].groupName,
                            members: this.groups[index].members,
                            classroomId: this.classroomId
                        },
                        result: fakeData.NEW_GROUP_RESPONSE
                    })
                        .then(callback.bind(this))
                }
            }
        }
    }
</script>

<style scoped>
  .wrapper {
    height: 26em;
    overflow-y: scroll;
  }

  .el-select {
    width: 100%;
  }

  .el-form {
    width: 60em;
    padding-right: 2em;
  }
</style>
