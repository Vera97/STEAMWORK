<template>
  <div class="content">
    <el-card class="box-card">
      <h3>小组成员列表</h3>
      <el-tree :data="groupData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
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
                defaultProps: {
                    children: '',
                    label: 'stuName'
                },
                groupData: [],
                stuId: 12
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
                            if (this.stuId === res.data.groupList[i].members[j].stuId) {
                                this.groupData = res.data.groupList[i].members;
                            }
                        }
                    }
                }
            });
        }
    }
</script>

<style scoped>
  .button1 {
    width: 48%;
  }

  .button2 {
    float: right;
    width: 48%;
  }

  .box-card {
    margin-top: 20px;
    width: 100%;
  }
</style>
