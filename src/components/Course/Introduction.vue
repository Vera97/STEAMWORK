<template>
    <el-row>
            <el-card :body-style="{ padding: '14px' }" class="card-position">
                <span>&nbsp;课程介绍：<br> &emsp;&emsp;简介如下，简介如下，简介如下，简介如下,简介如下，简介如下，简介如下，简介如下，简介如下,简介如下，简介如下，简介如下
                简介如下，简介如下，简介如下.</span>
                <el-card class="box-card">
                    <a href="#"><i class="el-icon-video-camera-solid "></i></a>
                </el-card>
            </el-card>
    </el-row>
</template>

<script>
    export default {
        name: "Introduction"
    }
</script>

<style scoped>
    .card-position{
        width:100%;
    }
    .box-card{
        font-size:110px;
        text-align:center;
    }
</style>
