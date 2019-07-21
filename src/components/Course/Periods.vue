<template>
    <div id="periods">
        <h3>3D打印</h3>
        <div v-for="o in 6" :key="o">
            <el-button class="periods-length">{{'课时' + o + ': #课时' + o + '的标题#' }}</el-button>
        </div>
    </div>

</template>

<script>


</script>

<style scoped>
    .periods-length {
        width: 100%;
        text-align: center;
        margin: 0.1%;

    }
</style>
