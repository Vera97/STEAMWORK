<template>
    <el-card>
        <div>
            <el-row>
                <el-col :span="24"><div>
                <a href="#">导出内容</a>
                </div></el-col>
            </el-row>
            <div class="ali">
                <el-input v-model="input1" placeholder="教学目标" value="教学目标" class="inp"></el-input>
                <el-input
                        class="text"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea1">
                </el-input>
            </div>
            <div class="ali">
                <el-input v-model="input2" type="text" placeholder="设计思路" value="设计思路" class="inp"></el-input>
                <el-input
                        class="text"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea2">
                </el-input>
            </div>
            <div class="ali">
                <el-input v-model="input3" placeholder="所需材料" value="所需材料" class="inp"></el-input>
                <el-input
                        class="text"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea3">
                </el-input>
            </div>
            <div class="ali">
                <el-input v-model="input4" placeholder="自定义" class="inp"></el-input>
                <el-input
                        class="text"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea4">
                </el-input>
            </div>
            <div class="ali">
                <el-input v-model="input5" placeholder="自定义" class="inp"></el-input>
                <el-input
                        class="text"
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea5">
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
                input1: '',
                input2: '',
                input3: '',
                input4: '',
                input5: '',
                textarea1:'',
                textarea2:'',
                textarea3:'',
                textarea4:'',
                textarea5:'',
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