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
        data() {
            return {}
        },
        methods: {
        },
        //以下是模拟请求完毕后向vuex推入数据，以备后续子组件使用，这里放在mounted()周期钩子里执行
        //生命周期钩子，这里稍微注意，必须在数据加载完成以后才可以读取到methods，data，所以在mounted钩子中执行
        mounted() {
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
