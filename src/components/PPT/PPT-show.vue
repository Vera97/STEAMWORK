<template>
  <el-card class="box-card">
    <el-row :gutter="0">
      <el-col :span="6" class="ppt-wrapper">
        <div class="box-card" v-for="(item, index) in pptData.pptImagesList" :key="index" :offset="index > 0 ? 1 : 0">
          <course-ppt class="slide-cell" :src="item" @click.native="selectSlide(index)" :class="{highlight: index === select}"></course-ppt>
        </div>
      </el-col>
      <el-col :span="17" style="float:right;">
        <div style="margin-bottom:5px;">
          <el-tabs type="border-card" class="border-card">
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
                      :ppt-id="pptId"
                      :ppt-page="select"
                      @delete-activity="deleteHandler"
              ></component>
              </div>
            </el-tab-pane>
            <el-tab-pane label="+ 编辑当页常见问题及解答">
              <div class="ali">
                <el-input
                        class="text"
                        type="textarea"
                        autosize
                        :rows="2"
                        placeholder="请输入问题名称"
                        v-model="textarea1">
                </el-input>
                <el-input
                        class="text"
                        type="textarea"
                        :autosize="{ minRows:6, maxRows:12}"
                        :rows="2"
                        placeholder="请输入问题内容及解答"
                        v-model="textarea2">
                </el-input>
              </div>
              <div class="buttonlist" style="float:right;margin-bottom:5%;">
                <el-button type="primary" @click="save">保存</el-button>
                <el-button type="primary">修改</el-button>
                <el-button type="primary">删除</el-button>
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
                    '文本编辑'
                ],
                displayComponent: '',
                pptId: 1234,               /* not available yet. */
                exerciseId: null
            }
        },
        computed: {
            tag() {
                return store.state.ppt.flag;
            }
        },
        created() {
            // console.log(this.tag);
        },
        methods: {
            conserve() {
                if (this.tag === '文本编辑' || this.getValue(this.type) === 10) {
                    // alert("nibuh");
                }
                if (this.tag === '互动问答' || this.getValue(this.type) === 5) {
                    // alert("nibuh");
                    utils.request({
                        invoke: api.requestNewExerciseQuestion,
                        params: {
                            pptId: 1234,
                            pptPage: 10,
                            type: '互动问答',
                            contentQuestion: 'sss',
                            contentAnswerList: [{choice: 'A', choiceContent: 'sss'},],
                            answer: 'A'
                        },
                        result: fakeData.NEW_QUESTIONS
                    }).then(res => {
                        store.commit('ppt/ADD_QUESTIONS', res.data);
                        // alert(res.data.exerciseId);
                        alert('文本已经保存！')
                    });
                }

            },
            edit() {
                if (this.tag === '互动问答' || this.getValue(this.type) === 5) {
                    // alert("nibuh");

                    //     .then(res=>{
                    //     store.commit('ppt/ADD_TEXT',text);
                    // });
                }
                if (this.tag === '互动问答' || this.getValue(this.type) === 5) {
                    // alert("nibuh");
                    utils.request({
                        invoke: api.requestEditExerciseQuestion,
                        params: {
                            exerciseId: 1234,
                            contentQuestion: 'sss',
                            contentAnswerList: [{choice: 'A', choiceContent: 'sss'},],
                            answer: 'A'
                        },
                        result: fakeData.EDIT_QUESTIONS
                    })
                    //     .then(res=>{
                    //     store.commit('ppt/ADD_TEXT',text);
                    // });
                }
            },

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
                        flex: '1',
                        display: 'flex',
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
                    default:
                        alert('暂不支持的活动类型！');
                    }
                    store.commit("ppt/ADD_FLAG", data.type);
                }
            },
            getValue(value) {
                if (value === '人员统计')
                    return 1;
                if (value === '所需材料')
                    return 2;
                if (value === '环境布置')
                    return 3;
                if (value === '资源播放')
                    return 4;
                if (value === '互动问答')
                    return 5;
                if (value === '小组分组')
                    return 6;
                if (value === '设计方案')
                    return 7;
                if (value === '讨论记录')
                    return 8;
                if (value === '作品展示')
                    return 9;
                if (value === '文本编辑')
                    return 10;
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
                }).then(() => {
                    // alert(that.getValue(that.type));
                    that.listData[0].activities.push({
                        exerciseId: null,
                        type: that.type,
                        title: that.type,
                        state: true
                    });
                    that.type = ''
                }).catch()
            },
            deleteActivity(data) {
                let that = this;
                this.$confirm('确定删除这个活动吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
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
                        page: index + 1
                    },
                    result: fakeData.EXERCISE_LIST
                })
                    .then((function (res) {
                        this.listData[0].activities = [];
                        for(let i of res.data.exerciseList) {
                            this.listData[0].activities.push(i)
                        }
                    }).bind(this))
            },
            // this method is used to select the first slide and get its content
            init() {
                this.selectSlide(0)
            },
            save() {
                let that = this;
                utils.request({
                    invoke: api.requestNewQuestion,
                    params: {
                        pptId: that.pptId,
                        pptPage: that.pptPage,
                        name: that.textarea1,
                        content: that.textarea2
                    },
                    result: fakeData.NEW_QUESTIONS
                }).then(res => {
                    if(res.data.code===1)
                        alert("保存成功!");
                });
            },
            // this function is to handle the delete request emitted by the sub component
            deleteHandler({exerciseId}) {
                this.deleteActivity({exerciseId})
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
</style>
