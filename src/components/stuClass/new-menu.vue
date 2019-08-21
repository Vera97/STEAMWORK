<template slot="title">
  <div>
    <el-tag class="wealth">财富:0</el-tag>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
      <el-menu-item index="1">
        <i class="el-icon-phone-outline"></i>
        <span slot="title">常见问题及解答</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-question" @click="open"></i>
        <span slot="title">寻求老师帮助</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-back" @click="previous" ></i>
        <span slot="title">返回上一页ppt</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'
    import store from '../../store'

    export default {
        name: 'new-menu',
        data() {
            return {
                isCollapse: true
            };
        },
        computed: {
            number() {
                return store.state.stuClass.number;
            }
        },
        methods: {
            open() {
                utils.request({
                    invoke: api.requestQueueStu,
                    params: {
                        code: 'get_stuQueue',
                        classroomId: this.Id
                    },
                    result: fakeData.STU_QUESTION
                })
                    .then(res => {
                        store.commit('stuClass/ADD_NUMBER', res.data.questionList.length);
                        this.$alert('<el-tag class="students-query-box">你之前还有<p style="text-decoration:underline;display:inline">' + res.data.questionList.length + '</p>位同学在排队\n' +
                            '</el-tag>', '提示', {
                            dangerouslyUseHTMLString: true
                        });
                    });
            },
            previous() {
                this.display = this.display === 0 ? 0 : this.display - 1;
                this.$emit('onEmitDisplay', this.display)
            },
        },

    }
</script>
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .wealth{
    width:63px;
    text-align:center;
    margin-bottom:10px;
  }
</style>
