<template>
    <div>
        <div>
            <div><el-card class="ppt-box"><b>幻灯片</b>
                    <div class="col-box">
                        <el-button-group>
                            <el-button type="primary" plain icon="el-icon-arrow-left"></el-button>
                            <el-button type="primary" plain><i class="el-icon-arrow-right el-icon--right"></i></el-button>
                        </el-button-group>
                    </div>
                 </el-card>
            </div>

        </div>
        <div class="button-box">
            <el-button type="primary">课程相关资源(点击可下载)</el-button>
        </div>
    </div>

</template>

<script>

</script>

<style scoped>
    .ppt-box{
        padding-top: 180px;
        /*padding-bottom: 180px;*/
        text-align: center;
        background-color: #5bc0de;
    }
    .col-box{
        margin-top: 180px;
    }
    .button-box{
        text-align: center;
        margin-top: 10px;
    }

</style>
