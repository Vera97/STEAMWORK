<template>
    <el-card class="box-card">
        <h5 style="margin-top:5px;margin-bottom:0;">{{ step.title }}</h5><br>
        <div v-html="content"></div>
    </el-card>
</template>

<script>
    import store from '../../store'
    export default {
        name: "videoshow",
        computed: {
            step() {
                return store.state.assignment.step
            },
            content() {
                return store.state.assignment.content
            }
        }
    }
</script>

<style scoped>
    .box-card{
        width:100%;
        height:20%;
        margin-top:5px;
        margin-bottom:0;
    }
</style>