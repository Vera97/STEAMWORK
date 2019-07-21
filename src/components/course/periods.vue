<template>
    <div id="periods">
        <h3>{{ title }}</h3>
        <el-button class="period" v-for="item in periodList" :key="item.title">{{ item.title }}</el-button>
    </div>

</template>

<script>
    export default {
        name: 'Periods',
        props: [
                'title',
                'periodList'
        ]
    }
</script>

<style scoped>
    .periods-length {
        width: 100%;
        text-align: center;
        margin: 0.1%;
    }

    .period {
        width: 100%;
        margin-left: 1em;
        margin-top: .5em;
    }
</style>
