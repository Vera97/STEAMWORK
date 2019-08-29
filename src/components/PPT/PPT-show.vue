<template>
  <el-card class="box-card">
    <el-row :gutter="0">
      <el-col :span="6" class="ppt-wrapper">
        <div class="box-card" v-for="(item, index) in pptData.pptImagesList" :key="index" :offset="index > 0 ? 1 : 0">
          <course-ppt
                  class="slide-cell"
                  :src="item"
                  @click.native="selectSlide(index)"
                  :class="{highlight: index === select}"
                  @delete-ppt="removePage(index)"
          ></course-ppt>
        </div>
        <div class="add-ppt">
          <el-button class="add-ppt" size="small" @click="addPage" round><i class="el-icon-circle-plus-outline"></i>添加ppt</el-button>
        </div>
      </el-col>
      <el-col :span="17" style="float:right;">
        <div style="margin-bottom:5px;">
          <el-tabs type="border-card" class="border-card tabs">
            <el-tab-pane label="+ 添加教学活动" class="pane">
              <el-tree
                      class="activities-tree"
                      :expand-on-click-node="false"
                      :data="listData"
                      :props="defaultProps"
                      default-expand-all
                      :render-content="renderContent"
                      @node-click="handleNodeClick">
              </el-tree>
              <div id="menu3" style="z-index:1;float:right;width:100%;" class="box-card3 text-center">
                <component
                        :is="displayComponent"
                        :exercise-id="exerciseId"
                        :ppt-id="pptData.pptId"
                        :ppt-page="select"
                        @delete-activity="deleteHandler"
                ></component>
              </div>
            </el-tab-pane>
            <el-tab-pane label="+ 编辑当页常见问题及解答">
              <div v-for="(item,index) in commonQuestion" :key="index" class="ali">
                <el-input
                        class="text"
                        type="textarea"
                        autosize
                        :rows="2"
                        placeholder="请输入问题"
                        v-model="item.question">
                </el-input>
                <el-input
                        class="text"
                        type="textarea"
                        :autosize="{ minRows:4, maxRows:12}"
                        :rows="2"
                        placeholder="输入问题解答"
                        v-model="item.answer">
                </el-input>
                <el-button type="primary" size="small" @click="saveQuestion(item)">保存</el-button>
                <el-button type="danger" size="small" @click="deleteQuestion(item.questionId, index)">删除</el-button>
              </div>
              <div class="add-question">
                <el-button type="plain" size="medium" class="add-option" @click="addItems">
                  <i class="el-icon-circle-plus-outline"></i>新增常见问题
                </el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
    import coursePpt from "./course-ppt";
    import reactiveQuestion from './reactive-question'
    import textDisplay from './text-display'
    import utils from '../../utils';
    import {api, fakeData} from '../../api';
    import store from '../../store';
    export default {
        name: "PPT",
        components: {coursePpt, reactiveQuestion, textDisplay},
        props: {
            pptData: Object,
            courseSectionId: Number
        },
        data() {
            return {
                flag: 0,
                input: '',
                textarea1: '',
                textarea2: '',
                select: 0,                /* the index of the selected ppt page. */
                listData: [{
                    activities: []
                }],
                defaultProps: {
                    label: 'type',
                    children: 'activities'
                },
                type: '',
                options: [
                    '人员统计',
                    '所需材料',
                    '环境布置',
                    '资源播放',
                    '互动问答',
                    '小组分组',
                    '设计方案',
                    '讨论记录',
                    '作品展示',
                    '文本播放'
                ],
                displayComponent: null,
                commonQuestion: [],
                exerciseId: null                  /* for the current editing exercise. */
            }
        },
        computed: {
            tag() {
                return store.state.ppt.flag;
            }
        },
        methods: {
            renderContent(h, {node, data}) {
                let children, that = this;
                if (node.level === 1) {
                    children = ['活动列表', h('span', {}, [
                        h('el-button', {
                            props: {size: 'mini', type: 'text'}, on: {
                                click() {
                                    that.addActivity()
                                }
                            }
                        }, ['新增活动'])
                    ])]
                } else {
                    children = [data.type, h('span', {}, [
                        h('el-button', {
                            props: {size: 'mini', type: 'text'}, on: {
                                click() {
                                    that.deleteActivity(data)
                                }
                            }
                        }, ['删除活动'])
                    ])]
                }
                return h('span', {
                    style: {
                        'flex': '1',
                        'display': 'flex',
                        'align-items': 'center',
                        'justify-content': 'space-between',
                        'font-size': '14px',
                        'padding-right': '8px'
                    }
                }, children)
            },
            handleNodeClick(data, node) {
                if(node.isLeaf) {
                    switch (data.type) {
                    case '互动问答':
                        this.exerciseId = data.exerciseId;
                        this.displayComponent = 'reactiveQuestion';
                        break;
                    case '文本播放':
                        this.exerciseId = data.exerciseId;
                        this.displayComponent = 'textDisplay';
                        break;
                    case '资源播放':
                        alert('暂不支持的类型');
                        break;
                    default:
                        break
                    }
                    store.commit("ppt/ADD_FLAG", data.type);
                }
            },
            addActivity() {
                const h = this.$createElement;
                let that = this;
                let optionList = [];
                for (let i of this.options) {
                    optionList.push(h('el-option', {props: {key: i, label: i, value: i}, attrs: {value: i}}))
                }
                let vnode = h('el-select', {
                    attrs: {placeholder: '请选择种类'},
                    props: {
                        value: that.type
                    },
                    on: {
                        change(e) {
                            that.type = e
                        }
                    }
                }, optionList);
                this.$msgbox({
                    title: '请选择活动种类',
                    message: vnode,
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                })
                    .then(function () {
                        switch (this.type) {
                        case '文本播放':
                            this.addTextDisplay();
                            break;
                        case '互动问答':
                            this.addReactiveQuestion();
                            break;
                        case '视频播放':
                            alert('not supported yet ');
                            break;
                        default:
                            this.addExercise(this.type)
                        }
                        this.type = ''
                    }.bind(this)).catch()
            },
            deleteActivity(data) {
                let that = this;
                this.$confirm('确定删除这个活动吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.displayComponent = null;
                    utils.request({
                        invoke: api.requestDeleteExercise,
                        params: {
                            exerciseId: data.exerciseId
                        },
                        result: fakeData.SINGLE_NUMBER_CODE
                    })
                        .then(res => {
                            if (res.data.code === 1) {
                                for (let i = 0; i < that.listData[0].activities.length; i++) {
                                    if (that.listData[0].activities[i].exerciseId === data.exerciseId) {
                                        that.listData[0].activities.splice(i, 1);
                                        break
                                    }
                                }
                                that.$message.info('成功删除');
                            } else that.$message.info('删除失败')
                        })
                }).catch(() => {
                    this.$message.info('已取消删除')
                })
            },
            selectSlide(index) {
                this.select = index;
                utils.request({
                    invoke: api.requestExercise,
                    params: {
                        pptId: this.pptData.pptId,
                        page: index
                    },
                    result: fakeData.EXERCISE_LIST
                })
                    .then((function (res) {
                        this.listData[0].activities = [];
                        for(let i of res.data.exerciseList) {
                            this.listData[0].activities.push(i)
                        }
                    }).bind(this));
                utils.request({
                    invoke: api.requestClassStuQuestion,
                    params: {
                        pptId: this.pptData.pptId,
                        pptPage: index
                    },
                    result: fakeData.STU_QUESTIONS
                })
                    .then(function (res) {
                        this.commonQuestion = [];
                        this.commonQuestion.push(...res.data.question)
                    }.bind(this))
            },
            addTextDisplay () {
                utils.request({
                    invoke: api.requestNewExerciseText,
                    params: {
                        pptId: this.pptData.pptId,
                        pptPage: this.select,
                        type: '文本播放',
                        content: ''
                    },
                    result: fakeData.NEW_EXERCISE_RESPONSE
                })
                    .then(function (res) {
                        if (res.data.code === 1) {
                            this.$message.success('添加成功');
                            this.listData[0].activities.push({
                                exerciseId: res.data.exerciseId,
                                title: '文本播放',
                                type: '文本播放'
                            })
                        } else {
                            this.$message.error('添加失败')
                        }
                    }.bind(this))
            },
            addReactiveQuestion () {
                utils.request({
                    invoke: api.requestNewExerciseQuestion,
                    params: {
                        pptId: this.pptData.pptId,
                        pptPage: this.select,
                        type: '互动问答',
                        contentQuestion: '',
                        contentAnswerList: [],
                        answerList: []
                    },
                    result: fakeData.NEW_EXERCISE_RESPONSE
                })
                    .then(function (res) {
                        if (res.data.code === 1) {
                            this.$message.success('添加成功');
                            this.listData[0].activities.push({
                                exerciseId: res.data.exerciseId,
                                title: '互动问答',
                                type: '互动问答'
                            })
                        } else {
                            this.$message.error('添加失败')
                        }
                    }.bind(this))
            },
            addExercise (type) {
                utils.request({
                    invoke: api.requestNewExercise,
                    params: {
                        pptId: this.pptData.pptId,
                        pptPage: this.select,
                        type: type
                    },
                    result: fakeData.NEW_EXERCISE_RESPONSE
                })
                    .then(function (res) {
                        if (res.data.code === 1) {
                            this.$message.success('添加成功');
                            this.listData[0].activities.push({
                                exerciseId: res.data.exerciseId,
                                title: type,
                                type: type
                            })
                        } else {
                            this.$message.error('添加失败')
                        }
                    }.bind(this))
            },
            // this method is used to select the first slide and get its content
            init() {
                this.selectSlide(0)
            },
            // this function is to handle the delete request emitted by the sub component
            deleteHandler({exerciseId}) {
                this.deleteActivity({exerciseId})
            },
            removePage (index) {
                this.$confirm('是否删除该页ppt?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                })
                    .then(function () {
                        this.$emit('remove-page', index)
                    }.bind(this)).catch()
            },
            addPage () {
                utils.request({
                    invoke: api.requestAddPage,
                    params: {
                        pptId: this.pptData.pptId,
                        page: this.pptData.pptImagesList.length
                    },
                    result: fakeData.SINGLE_NUMBER_CODE
                })
                    .then(function (res) {
                        if (res.data.code === 1) {
                            this.$message.success('添加成功');
                            this.pptData.pptImagesList.push('#')
                        } else {
                            this.$message.error('添加失败')
                        }
                    }.bind(this))
            },
            addItems() {
                utils.request({
                    invoke: api.requestNewQuestion,
                    params: {
                        pptId: this.pptData.pptId,
                        pptPage: this.select,
                        content: ''
                    },
                    result: fakeData.ADD_COMMON_QUESTION
                })
                    .then(function (res) {
                        if (res.data.code === 1) {
                            this.$message.success('添加成功');
                            this.commonQuestion.push({
                                question: '新问题',
                                answer: '',
                                questionId: res.data.questionId
                            })
                        } else {
                            this.$message.error('新增失败')
                        }
                    }.bind(this))
            },
            saveQuestion (item) {
                utils.request({
                    invoke: api.requestEditCommonQuestion,
                    params: {
                        questionId: item.questionId,
                        content: ''
                    },
                    result: fakeData.SINGLE_NUMBER_CODE
                })
                    .then(function (res) {
                        if (res.data.code === 1) {
                            this.$message.success('保存成功');
                        } else {
                            this.$message.error('保存失败')
                        }
                    }.bind(this))
            },
            deleteQuestion (questionId, index) {
                utils.request({
                    invoke: api.requestDeleteCommonQuestion,
                    params: {
                        questionId: questionId
                    },
                    result: fakeData.SINGLE_NUMBER_CODE
                })
                    .then(function (res) {
                        if (res.data.code === 1) {
                            this.$message.success('成功删除');
                            this.commonQuestion.splice(index, 1)
                        } else {
                            this.$message.error('删除失败')
                        }
                    }.bind(this))
            }
        }
    }
</script>
<style scoped>
  .ppt-wrapper {
    padding: .5em;
    max-height: 30em;
    overflow-y: scroll;
  }
  .box-card {
    width: 100%;
    height: 100%;
    margin-bottom: 2%;
    max-height: 40em;
  }
  .ali {
    margin-top: 20px;
  }
  .text {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    padding: 0;
    margin-bottom: 5px;
  }
  .activities-tree {
    width: 30%;
  }
  .highlight {
    border: #6495ED solid .1em;
    border-radius: .5em;
  }
  .slide-cell {
    cursor: pointer;
  }
  .slide-cell:hover {
    border: #6495ED90 solid .1em;
    border-radius: .5em;
  }
  p{
    margin-top: 0;
  }

  .add-ppt {
    text-align: center;
    width: 100%;
    margin: .5em 0;
  }

  .add-ppt .el-button {
    width: 50%;
  }

  .add-question {
    width: 100%;
    text-align: center;
  }

  .tabs {
    max-height: 30em;
    overflow-y: scroll;
  }
</style>
