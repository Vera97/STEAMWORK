<template>
    <el-card class="box-card">
        <el-row :gutter="0">
            <el-col :span="6">
                <div class="box-card" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 1 : 0">
                    <Courseppt :title="title+o"></Courseppt>
                </div>
            </el-col>
            <el-col :span="17"  style="float:right;">
                    <div style="margin-bottom:5px;">
                        <el-tabs type="border-card" class="border-card">
                            <el-tab-pane label="+ 添加教学活动">
                                <div id="menu1" style="float:left;width:35px;">
                                    <h3>活动1:</h3>
                                </div>
                                <div id="menu2" style="float:left;width:28%">
                                    <el-dropdown split-button @click="handleClick">
                                        选择活动类型
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>人员统计</el-dropdown-item>
                                            <el-dropdown-item>所需材料</el-dropdown-item>
                                            <el-dropdown-item>环境布置</el-dropdown-item>
                                            <el-dropdown-item>资源播放</el-dropdown-item>
                                            <el-dropdown-item>互动问答</el-dropdown-item>
                                            <el-dropdown-item>小组分组</el-dropdown-item>
                                            <el-dropdown-item>设计方案</el-dropdown-item>
                                            <el-dropdown-item>讨论记录</el-dropdown-item>
                                            <el-dropdown-item>作品展示</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
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
    import Courseppt from "./course-ppt";
    import {api, fakeData} from '../../api';
    import utils from '../../utils';
    import store from '../../store';
    export default {
        name: "PPT",
        components: {Courseppt},
        data() {
            return {
                input: '',
                textarea1: '',
                textarea2: '',
                title: '幻灯片',
            }
        },
        methods:{
            save()
            {
                let that=this;
                utils.request({
                    invoke: api.requestNewQuestion,
                    params: {
                        pptId:that.pptId,
                        pptPage: that.pptPage,
                        name:that.textarea1,
                        content:that.textarea2
                    },
                    result: fakeData.NEW_QUESTION
                }).then(res => {
                    store.commit('ppt/ADD_QUESTION',res.data.question);
                    console.log(res.data);
            });
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
</style>
