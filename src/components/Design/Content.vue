<template>
    <el-card>
        <div>
            <el-row>
                <el-col :span="24"><div>
                <p><strong>整体设计</strong></p>
                <a href="#">导出内容</a>
                </div></el-col>
            </el-row>
            <div class="ali">
                <el-input v-model="input" placeholder="教学目标" value="教学目标" class="inp"></el-input>
                <el-input
                        class="text"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea">
                </el-input>
            </div>
            <div class="ali">
                <el-input v-model="input" type="text" placeholder="设计思路" value="设计思路" class="inp"></el-input>
                <el-input
                        class="text"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea">
                </el-input>
            </div>
            <div class="ali">
                <el-input v-model="input" placeholder="所需材料" value="所需材料" class="inp"></el-input>
                <el-input
                        class="text"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea">
                </el-input>
            </div>
            <div class="ali">
                <el-input v-model="input" placeholder="自定义" class="inp"></el-input>
                <el-input
                        class="text"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea">
                </el-input>
            </div>
            <div class="ali">
                <el-input v-model="input" placeholder="自定义" class="inp"></el-input>
                <el-input
                        class="text"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea">
                </el-input>
            </div>
        </div>
    </el-card>

</template>

<script>
    export default {
        name: "Content",
        data() {
            return {
                input: '',
                textarea:''
            }
        }
    }
</script>

<style scoped>
    a{
        float: right;
        display: inline-block;
    }
    p{
        display: inline-block;
        font-size: large;
    }
    .ali{
        margin-top: 20px;
    }
    .inp{
        display: inline-block;
        width: 15%;
        margin-top: 0px;
        margin-right: 20px;
    }
    .text{
        display: inline-block;
        vertical-align: top;
        width: 80%;
        padding: 0px;
    }


</style>