<template>
    <div>
        <div>
            <div  class="score">教师评分：A</div>
            <div  class="out"><a href="#">导出内容</a></div>
        </div>
        <div>
            <el-card class="box-card">
                <div class="card-box">
                    <div style="text-align: center;margin-bottom: 15px">
                        <div>XX学生XX课程实验日志</div>
                        <div>第X学时</div>
                    </div>
                    <div class="pro">
                        <div>实验目的：</div>
                        <div>所用器材：</div>
                        <div>实验步骤：</div>
                        <div>成果展示：</div>
                        <div>问答：</div>
                        <div>附加练习:</div>
                    </div>
                    <div style="color: grey">(该部分内容由学生课堂任务填写后自动生成)</div>
                </div>
            </el-card>
        </div>
    </div>


</template>

<script>
    export default {
        name: "diary",
    }
</script>

<style scoped>
    .score{
        font-size: 20px;
        display: block;
        /*float: left;*/
        text-align: center;
    }
    .out{
        font-size: 18px;
        display: block;
        margin-left: 90%;
        margin-bottom: 10px;
    }
    .pro{
        margin-bottom: 20px;
    }
    .pro>div{
        margin-bottom: 12px;
        font-size: 16px;
    }


</style>
