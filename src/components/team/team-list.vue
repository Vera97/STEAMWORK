<template>
  <div class="content">
    <el-card class="box-card">
      <h3>小组成员列表</h3>
      <el-tree
              :data="data"
              :props="defaultProps"
              @node-click="handleNodeClick"></el-tree>
    </el-card>
  </div>
</template>

<script>
    import store from '../../store'
    import {api, fakeData} from '../../api'
    import utils from '../../utils'
    export default {
        name: "team-list",
        data() {
            return {
                data: [],
                defaultProps: {
                    children: 'children',
                    label(data) {
                        return `${data.stuName}(${data.stuNumber})`
                    }
                },
                groupId: null,
                discussionNumber: 123       /* need a way to get it */
            };
        },
        methods: {
            handleNodeClick(data) {
                console.log(data);
                utils.request({
                    invoke: api.requestStuDiscussionGet,
                    params: {
                        groupId: this.groupId,
                        stuId: this.stuId,
                        discussionNumber: this.discussionNumber,
                    },
                    result: fakeData.GROUP_CODE
                })
                    .then(res => {
                        store.commit('team/GROUP_CONTENT', res.data.discussionContent);
                    })
            }
        },
        created() {
            utils.request({
                invoke: api.requestStuGroup,
                params: {
                    classroomId: this.classroomId,
                },
                result: fakeData.GET_GROUP
            }).then(res => {
                if (res.data.code === 1) {
                    for (let i = 0; i < res.data.groupList.length; i++) {
                        for (let j = 0; j < res.data.groupList[i].members.length; j++) {
                            if (store.state.stuId === res.data.groupList[i].members[j].stuId) {
                                this.data = res.data.groupList[i].members;
                                this.groupId = res.data.groupList[i].groupId;
                                return
                            }
                        }
                    }
                }
            });
        }
    }
</script>

<style scoped lang="scss">
  .content {
    width: 80%;
    margin-top: 1em;

    .header {
      font-weight: bolder;
      margin-bottom: 1em;
      text-indent: 1em;
    }
  }
</style>
