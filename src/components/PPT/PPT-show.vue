<template>
  <el-card class="box-card">
    <el-row :gutter="0">
      <el-col :span="6">
        <div class="box-card" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 1 : 0">
          <course-ppt :title="title+o"></course-ppt>
        </div>
      </el-col>
      <el-col :span="17" style="float:right;">
        <div style="margin-bottom:5px;">
          <el-tabs type="border-card" class="border-card">
            <el-tab-pane label="+ 添加教学活动">
              <el-tree
                      class="activities-tree"
                      :expand-on-click-node="false"
                      :data="listData"
                      :props="defaultProps"
                      default-expand-all
                      :render-content="renderContent"
              >
              </el-tree>
              <div id="menu3" style="float:right;width:65%;">
                <el-card class="box-card3 text-center">
                  <h2>填写相关内容</h2><br><br>
                  <h4>（根据活动类型跳出对应的内容填写模板）</h4>
                </el-card>
                <div class="buttonlist" style="float:right;margin-bottom:5%;">
                  <el-button type="primary">保存</el-button>
                  <el-button type="primary">修改</el-button>
                  <el-button type="primary">删除</el-button>
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

    export default {
        name: "PPT",
        components: {coursePpt},
        data() {
            return {
                input: '',
                textarea1:'',
                textarea2:'',
                textarea3:'',
                textarea4:'',
                title:'幻灯片',
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
                    '作品展示'
                ]
            }
        },
        methods: {
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
                            that.type = event
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
                        .then(() => {
                            that.listData[0].activities.push({
                                exerciseId: 3,
                                pptId: 12334,
                                pptPage: 1,
                                type: that.type,
                                content: ''
                            });
                            that.type = ''
                        }).catch(() => that.type = '')
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
                                            console.log('hit');
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
            }
        }
    }
</script>
<style scoped>
    .box-card{
        width:100%;
        height:100%;
        margin-bottom:2%
    }
    .box-card3{
        margin-bottom:5%;
    }
    .ali{
        margin-top: 20px;
    }
    .text{
        display: inline-block;
        vertical-align: top;
        width: 100%;
        padding: 0px;
        margin-bottom:5px;
    }

    .activities-tree {
        width: 30%;
    }
</style>
