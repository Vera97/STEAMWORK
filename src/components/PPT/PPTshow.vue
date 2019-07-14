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
    import Courseppt from "../PPT/Courseppt";
    export default {
        name: "PPT",
        components: {Courseppt},
        data() {
            return {
                input: '',
                textarea1:'',
                textarea2:'',
                textarea3:'',
                textarea4:'',
                title:'幻灯片',
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