<template>
  <el-card class="box-card">
    <el-row :gutter="0">
      <el-col :span="6" class="ppt-wrapper">
        <div class="box-card" v-for="(item, index) in pptData.pptImagesList" :key="index" :offset="index > 0 ? 1 : 0">
          <course-ppt class="slide-cell" :src="item" @click.native="selectSlide($event, index)" :class="{highlight: index === select}"></course-ppt>
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
              <el-card v-model="type" class="box-card" v-if="tag === '互动问答' || getValue(type) === 5">
                <p><strong>互动问答</strong></p>
                <el-input type="textarea"
                          label="问题："
                          :rows="2"
                          placeholder="请输入您要编辑的问题"
                          v-model="textarea1">
                </el-input>
                <el-input
                        placeholder="输入选项内容"
                        v-model="input1"
                        class="in"
                        clearable>
                </el-input>
                <el-input
                        placeholder="输入选项内容"
                        v-model="input2"
                        class="in"
                        clearable>
                </el-input>
                <el-button type="primary" icon="el-icon-plus" class="in">增加选项</el-button><br>
                <el-button type="primary" icon="el-icon-plus" class="in">增加问题</el-button>
              </el-card>

              <el-card v-model="type" class="box-card3 text-center" v-else-if="tag === '文本编辑' || getValue(type) === 10">
                <p><strong>编辑文本</strong></p>
                <el-input type="textarea"
                          :rows="6"
                          placeholder="请输入您要编辑的内容"
                          v-model="textarea2">
                </el-input>
              </el-card>


                <el-card v-model="type" class="box-card3 text-center" v-else>
                  <h2>填写相关内容</h2><br><br>
                  <h4>（根据活动类型跳出对应的内容填写模板）</h4>
                </el-card>

                <div class="buttonlist" style="float:right;margin-bottom:5%;">
                  <el-button type="primary" @click="conserve">保存</el-button>
                  <el-button type="primary" @click="edit">修改</el-button>
<!--                  <el-button type="primary" @click="del">删除</el-button>-->
                </div>

              </div>
            </el-tab-pane>
            <el-tab-pane label="+ 编辑当页常见问题及解答">
              <div class="ali">
                <el-input
                        class="text"
                        type="textarea"
                        autosize
                        :rows="2"
                        placeholder="自定义问题"
                        v-model="textarea1">
                </el-input>
                <el-input
                        class="text"
                        type="textarea"
                        autosize
                        :rows="2"
                        placeholder="请输入解答"
                        v-model="textarea2">
                </el-input>
              </div>
              <div class="ali">
                <el-input
                        class="text"
                        type="textarea"
                        autosize
                        :rows="2"
                        placeholder="自定义问题"
                        v-model="textarea3">
                </el-input>
                <el-input
                        class="text"
                        type="textarea"
                        autosize
                        :rows="2"
                        placeholder="请输入解答"
                        v-model="textarea4">
                </el-input>
              </div>
              <div class="buttonlist" style="float:right;margin-bottom:5%;">
                <el-button type="primary">保存</el-button>
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
    import utils from '../../utils';
    import {api, fakeData} from '../../api';
    import store from '../../store';

    export default {
        name: "PPT",
        components: {coursePpt},
        props: {
            pptData: Object
        },
        data() {
            return {
                flag:0,
                input: '',
                textarea1:'',
                textarea2:'',
                textarea3:'',
                textarea4:'',
                title:'幻灯片',
                select: 0,
                listData: [
                    {
                        activities: [
                            {
                                exerciseId: 1,
                                pptId: 12334,
                                pptPage: 1,
                                type: 'abc',
                                content: ''
                            },
                            {
                                exerciseId: 2,
                                pptId: 223345,
                                pptPage: 2,
                                type: 'def',
                                content: ''
                            }
                        ]
                    }
                ],
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
                ]
            }
        },
        computed:{
            tag(){
                return store.state.ppt.flag;
            }
        },
        created(){
            // console.log(this.tag);
        },
        methods: {
            conserve(){
                if(this.tag === '文本编辑' || this.getValue(this.type) === 10){
                    // alert("nibuh");
                    utils.request({
                        invoke: api.requestNewExerciseText,
                        params: {
                            pptId: 1234,
                            pptPage: 10,
                            type: '文本播放',
                            content: 'sss',
                        },
                        result: fakeData.NEW_TEXT
                    }).then(res => {
                        store.commit('ppt/ADD_TEXT',res.data);
                        alert('已经保存当前文本');
                    });
                }
                if(this.tag === '互动问答' || this.getValue(this.type) === 5){
                    // alert("nibuh");
                    utils.request({
                        invoke: api.requestNewExerciseQuestion,
                        params: {
                            pptId: 1234,
                            pptPage: 10,
                            type: '互动问答',
                            contentQuestion: 'sss',
                            contentAnswerList: [{choice: 'A', choiceContent: 'sss'}, ],
                            answer: 'A'
                        },
                        result: fakeData.NEW_QUESTIONS
                    }).then(res=>{
                        store.commit('ppt/ADD_QUESTIONS',res.data);
                        // alert(res.data.exerciseId);
                        alert('文本已经保存！')
                    });
                }

            },
            edit(){
                if(this.tag === '互动问答' || this.getValue(this.type) === 5){
                    // alert("nibuh");
                    utils.request({
                        invoke: api.requestEditExerciseText,
                        params: {
                            exerciseId: 1234,
                            content: 'sss'
                        },
                        result: fakeData.EDIT_TEXT
                    })
                    //     .then(res=>{
                    //     store.commit('ppt/ADD_TEXT',text);
                    // });
                }
                if(this.tag === '互动问答' || this.getValue(this.type) === 5){
                    // alert("nibuh");
                    utils.request({
                        invoke: api.requestEditExerciseQuestion,
                        params: {
                            exerciseId: 1234,
                            contentQuestion: 'sss',
                            contentAnswerList: [{choice: 'A', choiceContent: 'sss'}, ],
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
                if(node.level === 1) {
                    children = ['活动列表', h('span', {}, [
                        h('el-button', {props: {size: 'mini', type: 'text'}, on: {click() {that.addActivity()}}}, ['新增活动'])
                    ])]
                } else {
                    children = [data.type, h('span', {}, [
                        h('el-button', {props: {size: 'mini', type: 'text'}, on: {click() {that.deleteActivity(data)}}}, ['删除活动'])
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
            handleNodeClick(data) {
                // alert(data.type);
                store.commit("ppt/ADD_FLAG",data.type);
            },
            getValue(value){
                if(value === '人员统计')
                    return 1;
                if(value === '所需材料')
                    return 2;
                if(value === '环境布置')
                    return 3;
                if(value === '资源播放')
                    return 4;
                if(value === '互动问答')
                    return 5;
                if(value === '小组分组')
                    return 6;
                if(value === '设计方案')
                    return 7;
                if(value === '讨论记录')
                    return 8;
                if(value === '作品展示')
                    return 9;
                if(value === '文本编辑')
                    return 10;
            },
            addActivity() {
                const h = this.$createElement;
                let that = this;

                let optionList = [];
                for(let i of this.options) {
                    optionList.push(h('el-option', {props: {key: i, label: i, value: i}, attrs: {value: i}}))
                }

                let vnode = h('el-select', {
                    attrs: {placeholder: '请选择种类'},
                    props: {
                        value: that.type
                    },
                    on: {
                        change: function (event) {
                            that.type = event;
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
                        exerciseId: 3,
                        pptId: 12334,
                        pptPage: 1,
                        type: that.type,
                        content: ''
                    });
                    // that.type = ''
                }).catch()
            },
            deleteActivity(data) {
                let that = this;
                this.$confirm('确定删除这个课时吗', '提示', {
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
                            if(res.data.code === 1) {
                                for(let i = 0; i < that.listData[0].activities.length; i++) {
                                    if(that.listData[0].activities[i].exerciseId === data.exerciseId) {
                                        that.listData[0].activities.splice(i, 1);
                                        break
                                    }
                                }
                                that.$message.info('成功删除');
                            }
                            else that.$message.info('删除失败')
                        })
                }).catch(() => {
                    this.$message.info('已取消删除')
                })
            },
            selectSlide (event, index) {
                this.select = index
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

  .box-card3 {
    margin-bottom: 5%;
  }

  .ali {
    margin-top: 20px;
  }

  .text {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    padding: 0px;
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
  .in{
    width: 20%;
    margin-top: 1%;
    margin-right: 1%;
  }
  p{
    margin-top: 0px;
  }
</style>
