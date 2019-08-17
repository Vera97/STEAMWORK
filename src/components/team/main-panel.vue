<template>
  <el-card>
    <div class="title">{{ memberShow }}的讨论内容</div>
    <div v-if="!inOwn" class="close" @click="closePeek"><i class="el-icon-circle-close"></i></div>
    <div class="not-submitted" v-if="!submitted">你还没有提交过讨论内容（在画板中编辑讨论内容，然后点击右上角小箭头提交）</div>
    <div class="record" v-else v-html="content"></div>
    <div v-if="submitted && inOwn" class="clue">你也可以提交新的内容，覆盖之前的提交</div>
    <vue-drawing v-if="inOwn" @image-export="submit"></vue-drawing>
  </el-card>
</template>

<script>
    import utils from '../../utils'
    import {api, fakeData} from '../../api'
    import store from '../../store'

    export default {
        name: "main-panel",
        props: {
            discussionNumber: Number,
            groupId: Number
        },
        data() {
            return {
                submitted: false,
                content: null,
                memberShow: '您'
            };
        },
        computed: {
            inOwn () {
                return this.memberShow === '您'
            }
        },
        methods: {
            submit (svg) {
                this.$confirm('确定要提交讨论内容吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                })
                    .then(function () {
                        utils.request({
                            invoke: api.requestStuDiscussionUpload,
                            params: {
                                groupId: this.groupId,
                                stuId: store.state.stuId,
                                discussionNumber: this.discussionNumber,
                                discussionContent: svg
                            },
                            result: fakeData.SINGLE_NUMBER_CODE
                        })
                            .then(function (res) {
                                if (res.data.code === 1) {
                                    this.$message.success('提交成功');
                                    this.$router.go(0)
                                }
                                else this.$message.error('提交失败')
                            }.bind(this))
                    }.bind(this))
                    .catch()
            },
            getHistory (stuId) {
                let id = stuId ? stuId : store.state.stuId;
                utils.request({
                    invoke: api.requestStuDiscussionGet,
                    params: {
                        groupId: this.groupId,
                        stuId: id,
                        discussionNumber: this.discussionNumber
                    },
                    result: fakeData.DISCUSSION_CONTENT
                })
                    .then(function (res) {
                        if (res.data.code === 1) {
                            this.submitted = true;
                            this.content = res.data.discussionContent
                        }
                    }.bind(this))
            },
            load (student) {
                this.memberShow = `${student.stuName}(${student.stuNumber})`;
                this.getHistory(student.stuId)
            },
            closePeek () {
                this.memberShow = '您';
                this.getHistory()
            }
        }
    }
</script>

<style scoped lang="scss">
  .content {
    height: 100%;
  }

  .not-submitted {
    text-align: center;
    margin: 1em 0;
  }

  .history {
    text-align: center;
  }

  .title {
    position: absolute;
    font-weight: bold;
  }

  .close {
    cursor: pointer;
    float: right;
    transition: .5s;
    &:hover {
      color: #2aabd2;
    }
  }

  .record {
    text-align: center;
    border: gray dashed;
    width: 500px;
    position: relative;
    margin: 3em auto;
  }

  .clue {
    margin: 1em auto;
  }
</style>
