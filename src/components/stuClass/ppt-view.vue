<template>
    <div>
        <div>
            <div>
                <el-card class="ppt-box">
                    <div class="time">
                         <p>·10:12(倒计时）</p>
                    </div>
                    <p class="title">幻灯片</p>
                    <div class="col-box">
                            <el-button type="primary" plain icon="el-icon-arrow-left"></el-button>
                    </div>
                 </el-card>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "ppt-view",
        data () {
            return {
                name: 'stuClass'
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .ppt-box{
        /*padding-bottom: 180px;*/
        text-align: center;
        background-color: #5bc0de;
    }
    .col-box{

        margin-bottom: 10px;
    }
    .time{
        margin-top:10px;
    }
    .title{
        margin-top:150px;
        margin-bottom:150px;
    }
</style>
