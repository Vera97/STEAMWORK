<template>
  <el-card class="box-card">
    <el-row :gutter="5">
      <el-col :span="6" class="ppt-wrapper">
        <div class="box-card" v-for="(item, index) in pptData.pptImagesList" :key="index" :offset="index > 0 ? 1 : 0">
          <course-ppt class="slide-cell" :src="item" @click.native="selectSlide(index)"
                      :class="{highlight: index === select}" @deletePPT="deletePPT(index)"></course-ppt>
        </div>
        <el-button type="primary" @click="addPpt">新增PPT</el-button>
      </el-col>
      <el-col :span="18" style="float:right;">
        <div style="margin-bottom:5px;">
          <el-tabs type="border-card">
            <el-tab-pane label="+ 添加教学活动">

              <el-row type="flex" class="border-card">
                <el-col :span="8">
                  <el-tree
                          class="activities-tree"
                          :expand-on-click-node="false"
                          :data="listData"
                          :props="defaultProps"
                          default-expand-all
                          :render-content="renderContent"
                          @node-click="handleNodeClick">
                  </el-tree>
                </el-col>
                <el-col :span="20">
                  <div id="menu3" style="z-index:1;float:right;width:100%;" class="box-card3 text-center">
                    <component
                            :is="displayComponent"
                            :exercise-id="exerciseId"
                            :ppt-id="pptId"
                            :ppt-page="select"
                            @delete-activity="deleteHandler"
                    ></component>
                  </div>
                </el-col>
              </el-row>

            </el-tab-pane>
            <el-tab-pane label="+ 编辑当页常见问题及解答" class="border-card">
              <div v-for="(item,index) in commonQuestion" :key="index" class="ali">
                <el-input
                        class="text"
                        type="textarea"
                        autosize
                        :rows="2"
                        placeholder="请输入问题"
                        v-model=item.questionName>
                </el-input>
                <el-input
                        class="text"
                        type="textarea"
                        :autosize="{ minRows:4, maxRows:12}"
                        :rows="2"
                        placeholder="输入问题解答"
                        v-model=item.questionContent>
                </el-input>
              </div>
              <el-button type="plain" size="medium" class="add-option" @click="addItems"><i
                      class="el-icon-circle-plus-outline"></i>新增常见问题
              </el-button>
              <div class="buttonlist" style="float:right;margin-bottom:5%;">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button type="warning">修改</el-button>
                <el-button type="danger">删除</el-button>
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
                exerciseId: null,                /* for the current editing exercise. */
                commonQuestion: [{
                    questionName:'',
                    questionContent:''
                }]
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
                        h('i', {
                            'class': 'el-icon-plus',
                            props: {size: 'mini', type: 'button'}, on: {
                                click() {
                                    that.addActivity()
                                }
                            }
                        }, [''])
                    ])]
                } else {
                    children = [data.type, h('span', {}, [
                        h('i', {
                            'class': 'el-icon-delete',
                            props: {size: 'mini', type: 'text'}, on: {
                                click() {
                                    that.deleteActivity(data)
                                }
                            }
                        }, [''])
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
                if (node.isLeaf) {
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
                    attrs: {placeholder: '请选择种类', value: that.type},
                    props: {
                        value: that.type
                    },
                    on: {
                        change(e) {
                            that.type = e;
                            if(e === "互动问答"){
                                that.displayComponent = 'reactiveQuestion';
                            }
                            else if(e === "文本播放"){
                                that.displayComponent = 'textDisplay';
                            }
                        }
                    }
                }, optionList);
                this.$msgbox({
                    title: '请选择活动种类',
                    message: vnode,
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(function () {
                    switch (this.type) {
                    case '文本播放': {
                        this.addTextDisplay();
                        break;
                    }
                    case '互动问答': {
                        this.addReactiveQuestion();
                        break;
                    }
                    case '视频播放': {
                        alert('not supported yet ');
                        break;
                    }
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
                        for (let i of res.data.exerciseList) {
                            this.listData[0].activities.push(i)
                        }
                    }).bind(this))
            },
            addTextDisplay() {
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
            addReactiveQuestion() {
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
            addExercise(type) {
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
            save() {//添加常见问题
                let that = this;
                for(let i=0;i<that.commonQuestion.length;i++){
                    utils.request({
                        invoke: api.requestNewQuestion,
                        params: {
                            pptId: that.pptId,
                            pptPage: that.pptPage,
                            name: that.commonQuestion[i].questionName,
                            content: that.commonQuestion[i].questionContent
                        },
                        result: fakeData.NEW_QUESTIONS
                    }).then(res => {
                        if (res.data.code === 1)
                            console.log(that.commonQuestion[i].questionName)
                    });
                }
                alert("保存成功!");
            },
            // this function is to handle the delete request emitted by the sub component
            deleteHandler({exerciseId}) {
                this.deleteActivity({exerciseId})
            },
            addPpt() {
                this.$emit('addPPT');
            },
            deletePPT(index) {
                this.pptData.pptImagesList.splice(index, 1);
            },
            addItems() {
                this.commonQuestion.push({
                    questionName:'',
                    questionContent:''
                })
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
    margin-bottom: 2%;
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
    width: 95%;
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
  .border-card{
    max-height: 480px;
    overflow: auto;
  }
  p{
    margin-top: 0;
  }
</style>
