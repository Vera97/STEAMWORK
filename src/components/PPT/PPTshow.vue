<template>
    <el-card class="box-card">
        <el-row :gutter="20">
            <el-col :span="5">
                <div v-for="o in 3" :key="o" class="text item">
                    <el-card class="box-card1">
                        <h2>幻灯片+'o'</h2>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="17" float="right">
                <el-card class="box-card2">
                    <div id="header" style="margin-bottom:5px;">
                        <el-button type="primary">+ 添加教学活动</el-button>
                        <el-button>+ 编辑当页常见问题及解答</el-button>
                    </div>
                    <div id="menu1" style="float:left;width:7%;">
                        <h3>活动1:</h3>
                    </div>
                    <div id="menu2" style="float:left;width:28%">
                        <el-dropdown split-button type="primary" @click="handleClick">
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
                        <el-card class="box-card3">
                            <h2>填写相关内容</h2>
                            <h4>（根据活动类型跳出对应的内容填写模板）</h4>
                        </el-card>
                        <div class="buttonlist" style="float:right;margin-bottom:5%;">
                            <el-button type="primary">保存</el-button>
                            <el-button type="primary">修改</el-button>
                            <el-button type="primary">删除</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    export default {
        name: "PPT"
    }
</script>
<style scoped>
    .box-card{
        width:100%;
        height:100%;
    }
    .box-card3{
        margin-bottom:5%;
    }
</style>