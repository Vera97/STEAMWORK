<template>
  <div class="wrapper">
    <el-form ref="form" label-width="5em" :model="formData">
      <el-form-item
              :label="`小组${index + 1}`"
              v-for="(_, index) in formData.groupNumber"
              :key="index"
      >
        <el-col :span="11">
          <el-select
                  v-model="formData.groups[index].leader.stuId"
                  @change="select"
                  multiple
                  multiple-limit="1"
                  filterable
                  placeholder="请选择组长"
                  @remove-tag="remove"
          >
            <el-option
                    v-for="(item, index) in stuList"
                    :key="index"
                    :label="`${item.stuName}(${item.stuNumber})`"
                    :value="item.stuId"
                    :disabled="item.selected"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="11">
          <el-select
                  v-model="formData.groups[index].groupMembers"
                  @change="select"
                  multiple
                  filterable
                  placeholder="请选择组员"
                  @remove-tag="remove"
          >
            <el-option
                    v-for="item in stuList"
                    :key="item.stuId"
                    :label="`${item.stuName}(${item.stuNumber})`"
                    :value="item.stuId"
                    :disabled="item.selected"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
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
            class="add"
            type="primary"
            size="medium"
            icon="el-icon-circle-plus-outline"
            round
            @click="addGroup"
    ></el-button>
    <el-button class="add" type="plain" size="medium" @click="save">保存</el-button>
  </div>
</template>

<script>
    import store from '../../store'
    import { mapState } from 'vuex'

    export default {
        name: "grouping",
        computed: mapState({
            stuList: state => state.startClass.stuList
        }),
        data () {
            return {
                formData: {
                    groupNumber: 3,
                    groups: []
                }
            }
        },
        created () {
            store.commit('startClass/SELECT_CLASS', 123);
            store.dispatch('startClass/getStuList');

            for(let i = 0; i < this.formData.groupNumber; i++) {
                this.formData.groups.push({
                    leader: {
                        stuId: 0,
                        stuName: '',
                        stuNumber: 0
                    },
                    groupMembers: []
                })
            }
        },
        methods: {
            save() {
                console.log(this.formData)
            },
            addGroup() {
                this.formData.groupNumber++;
                this.formData.groups.push({
                    leader: {
                        stuId: 0,
                        stuName: '',
                        stuNumber: 0
                    },
                    groupMembers: []
                })
            },
            removeGroup(e, index) {
                this.$confirm('确定要删除这个分组吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: '提示'
                })
                    .then((function () {
                        this.formData.groupNumber--;
                        for(let i of this.formData.groups[index].groupMembers) {
                            this.setDisable(parseInt(i), false)
                        }
                        this.setDisable(parseInt(this.formData.groups[index].leader.stuId), false);
                        this.formData.groups.splice(index, 1)
                    }).bind(this))
                    .catch()
            },
            select(e) {
                if(e instanceof Array) {
                    for(let i of e) {
                        this.setDisable(parseInt(i), true)
                    }
                }
                else {
                    this.setDisable(parseInt(e), true)
                }
            },
            remove(e) {
                this.setDisable(parseInt(e), false)
            },
            setDisable(stuId, selected) {
                for(let i = 0; i < this.stuList.length; i++) {
                    if(this.stuList[i].stuId === stuId) {
                        this.stuList[i].selected = selected;
                        break
                    }
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

  .add {
    display: block;
    position: relative;
    width: 5em;
    margin: 1em auto;
    text-align: center;
  }
</style>
