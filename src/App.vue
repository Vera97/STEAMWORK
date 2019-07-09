<template>
    <div id="app">
        <!--路由渲染出口-->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        //由于用vue-router进行路由，所以这里可以不用导入，并注册组件了，提供vue-router渲染出口即可
        /*
        components: {
          HelloWorld
        }*/
        data() {
            return {
                //约定课程type，
                // 1为上午1-2节，2为上午3-4节，3为下午1-2节，4为下午3-4节，5为上午123节，6为下午123节
            }
        },
        methods: {
            setdata() {
                this.$store.commit('PUSH_COURSE',this.selected_course);
            }
        },
        //以下是模拟请求完毕后向vuex推入数据，以备后续子组件使用，这里放在mounted()周期钩子里执行
        //生命周期钩子，这里稍微注意，必须在数据加载完成以后才可以读取到methods，data，所以在mounted钩子中执行
        mounted() {
            this.setdata()
        }
    }
</script>

<style>
    /* do not delete these */
    body {
        margin: 0;
    }

    * {
        box-sizing: border-box;
    }
</style>
