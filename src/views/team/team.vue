<template>
  <el-container>
    <el-header>
      <nav-stu active-index="3"></nav-stu>
    </el-header>
    <el-main class="main-box">
      <el-row :gutter="0">
        <!-- 这里是小组列表栏，应该展示小组创建按钮及小组列表，对应图左边部分 -->
        <el-col :span="7">
          <team-list :group-data="groupData" :group-id="groupId" @peek-peer="peek"></team-list>
        </el-col>
        <!-- 这里文字及头脑风暴上传区，对应图右边部分 -->
        <el-col :span="16" style="float:right;">
          <main-panel ref="main-panel" :group-id="groupId" :discussion-number="discussionNumber"></main-panel>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <hd-footer></hd-footer>
    </el-footer>
  </el-container>
</template>

<script>
    import NavStu from "../../components/stu-nav";
    import teamList from "../../components/team/team-list";
    import mainPanel from "../../components/team/main-panel";
    import hdFooter from "../../components/hd-footer";

    import utils from '../../utils'
    import { api, fakeData } from '../../api'
    import store from '../../store'

    export default {
        name: "team",
        components: {teamList, mainPanel, hdFooter, NavStu},
        data () {
            return {
                discussionNumber: null,
                groupId: null,
                groupData: null
            }
        },
        methods: {
            peek (student) {
                this.$refs['main-panel'].load(student)
            }
        },
        beforeRouteEnter(to, from, next) {
            if (to.params.code === 1) next();
            else next('/stuClass')
        },
        async created () {
            await utils.request({
                invoke: api.requestStuGroup,
                params: {
                    classroomId: store.state.classroomId,
                },
                result: fakeData.GET_GROUP
            }).then(function (res) {
                if (res.data.code === 1) {
                    for (let i = 0; i < res.data.groupList.length; i++) {
                        for (let j = 0; j < res.data.groupList[i].members.length; j++) {
                            if (store.state.stuId === res.data.groupList[i].members[j].stuId) {
                                this.groupData = res.data.groupList[i].members;
                                this.groupId = res.data.groupList[i].groupId;
                                return
                            }
                        }
                    }
                }
            }.bind(this));

            await utils.request({
                invoke: api.requestStuDiscussion,
                params: {
                    classroomId: store.state.classroomId
                },
                result: fakeData.GET_DISCUSSION_LIST
            })
                .then(function (res) {
                    for (let i of res.data.discussionList) {
                        if (i.pptPage === store.state.currentPage) {
                            this.discussionNumber = i.discussionNumber;
                            break
                        }
                    }
                }.bind(this));

            this.$refs['main-panel'].getHistory()
        }
    }

</script>

<style scoped>
  .main-box{
    min-height: 715px;
  }
</style>

